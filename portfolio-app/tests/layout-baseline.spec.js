import fs from 'node:fs'
import { expect, test } from '@playwright/test'

const report = JSON.parse(fs.readFileSync(new URL('./artifacts/layout-measurements.json', import.meta.url), 'utf8'))

const viewports = [
  { width: 1680, height: 900, label: 'desktop' },
  { width: 1440, height: 900, label: 'laptop' },
  { width: 1024, height: 768, label: 'tablet-landscape' },
  { width: 820, height: 1180, label: 'tablet-portrait' },
  { width: 390, height: 844, label: 'phone-portrait' },
  { width: 1440, height: 700, label: 'short-desktop' },
]

const routeChecks = [
  '/',
  '/software-engineering',
  '/bim-vdc',
  '/software-engineering/projects/mechanic-shop-api',
  '/bim-vdc/projects/bim-automation-suite',
]

for (const viewport of viewports) {
  test.describe(`viewport checks @ ${viewport.label} (${viewport.width}×${viewport.height})`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
    })

    test('homepage loads without horizontal overflow', async ({ page }) => {
      await page.goto('/')
      await expect(page.locator('body')).toBeVisible()
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
      expect(overflow).toBeFalsy()
    })
  })
}

test.describe('route stability', () => {
  test('direct routes render without a not-found state', async ({ page }) => {
    for (const route of routeChecks) {
      await page.goto(route)
      const mainText = await page.locator('main').first().textContent()
      expect(mainText).not.toContain('Page not found')
    }
  })

  test('home to BIM/VDC navigation works at mobile width', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.locator('.menu-toggle').click()
    await page.locator('a', { hasText: 'BIM/VDC' }).click()
    await expect(page).toHaveURL(/\/bim-vdc$/)
  })
})

test.describe('known regression tests', () => {
  for (const viewport of viewports) {
    test(`navbar geometry matches the original baseline at ${viewport.label} (${viewport.width}×${viewport.height})`, async ({ page }) => {
      const baseline = report.baseline.originalLandingPage[`${viewport.width}x${viewport.height}`]
      expect(baseline).toBeTruthy()

      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto('/bim-vdc')

      const actual = await page.evaluate(() => {
        const navbar = document.querySelector('.header-box')
        const rect = navbar?.getBoundingClientRect()
        return {
          width: rect ? Number(rect.width.toFixed(2)) : null,
          height: rect ? Number(rect.height.toFixed(2)) : null,
        }
      })

      expect(actual.width).not.toBeNull()
      expect(actual.height).not.toBeNull()
      expect(Math.abs((actual.width ?? 0) - (baseline.navbar.width ?? 0))).toBeLessThanOrEqual(Math.max(20, baseline.navbar.width * 0.08))
      expect(Math.abs((actual.height ?? 0) - (baseline.navbar.height ?? 0))).toBeLessThanOrEqual(Math.max(12, baseline.navbar.height * 0.08))
    })

    test(`marquee width and horizontal alignment remain within the approved baseline at ${viewport.label} (${viewport.width}×${viewport.height})`, async ({ page }) => {
      const baseline = report.baseline.originalLandingPage[`${viewport.width}x${viewport.height}`]
      expect(baseline).toBeTruthy()

      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto('/bim-vdc')

      const actual = await page.evaluate(() => {
        const navbar = document.querySelector('.header-box')
        const marquee = document.querySelector('.discipline-marquee')
        const navRect = navbar?.getBoundingClientRect()
        const marqueeRect = marquee?.getBoundingClientRect()
        return {
          navWidth: navRect ? Number(navRect.width.toFixed(2)) : null,
          marqueeWidth: marqueeRect ? Number(marqueeRect.width.toFixed(2)) : null,
          navLeft: navRect ? Number(navRect.left.toFixed(2)) : null,
          marqueeLeft: marqueeRect ? Number(marqueeRect.left.toFixed(2)) : null,
        }
      })

      expect(actual.navWidth).not.toBeNull()
      expect(actual.marqueeWidth).not.toBeNull()
      expect(Math.abs((actual.marqueeWidth ?? 0) - (actual.navWidth ?? 0))).toBeLessThanOrEqual(20)
      expect(Math.abs((actual.marqueeLeft ?? 0) - (actual.navLeft ?? 0))).toBeLessThanOrEqual(30)
    })

    test(`hero text does not overlap the marquee and keeps positive separation at ${viewport.label} (${viewport.width}×${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto('/bim-vdc')

      const metrics = await page.evaluate(() => {
        const hero = document.querySelector('.video-hero__content')
        const marquee = document.querySelector('.discipline-marquee')

        if (!hero || !marquee) {
          return {
            overlap: true,
            gap: null,
            heroBottom: null,
            marqueeTop: null,
          }
        }

        const heroRect = hero.getBoundingClientRect()
        const marqueeRect = marquee.getBoundingClientRect()
        const intersects = heroRect.left < marqueeRect.right && heroRect.right > marqueeRect.left && heroRect.top < marqueeRect.bottom && heroRect.bottom > marqueeRect.top

        return {
          overlap: intersects,
          gap: Number((marqueeRect.top - heroRect.bottom).toFixed(2)),
          heroBottom: Number(heroRect.bottom.toFixed(2)),
          marqueeTop: Number(marqueeRect.top.toFixed(2)),
        }
      })

      const requiredGap = viewport.width <= 390 ? 24 : 32
      expect(metrics.overlap).toBeFalsy()
      expect(metrics.gap).not.toBeNull()
      expect(metrics.gap).toBeGreaterThanOrEqual(requiredGap)
    })

    test(`marquee sits at the approved signed bottom spacing at ${viewport.label} (${viewport.width}×${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto('/bim-vdc')

      const metrics = await page.evaluate(() => {
        const marquee = document.querySelector('.discipline-marquee')
        const rect = marquee?.getBoundingClientRect()

        if (!rect) {
          return {
            distance: null,
            top: null,
            bottom: null,
            innerHeight: window.innerHeight,
            scrollHeight: document.documentElement.scrollHeight,
          }
        }

        return {
          distance: Number((window.innerHeight - rect.bottom).toFixed(2)),
          top: Number(rect.top.toFixed(2)),
          bottom: Number(rect.bottom.toFixed(2)),
          innerHeight: window.innerHeight,
          scrollHeight: document.documentElement.scrollHeight,
        }
      })

      expect(metrics.distance).not.toBeNull()
      expect(metrics.top).not.toBeNull()
      expect(metrics.bottom).not.toBeNull()
      expect(metrics.bottom).toBeLessThanOrEqual(metrics.innerHeight)
      expect(metrics.top).toBeGreaterThanOrEqual(0)

      const targetDistance = viewport.width <= 390 ? 20 : 30
      const minDistance = targetDistance - 5
      const maxDistance = targetDistance + 5
      expect(metrics.distance).toBeGreaterThanOrEqual(minDistance)
      expect(metrics.distance).toBeLessThanOrEqual(maxDistance)
      expect(metrics.distance).toBeGreaterThan(0)
      expect(metrics.scrollHeight).toBeGreaterThanOrEqual(metrics.innerHeight)
    })
  }
})

test.describe('interactions', () => {
  test('mobile menu toggles open / close', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/bim-vdc')
    const menu = page.locator('.menu')
    await page.locator('.menu-toggle').click()
    await expect(menu).toHaveClass(/active/)
    await page.locator('.menu-toggle').click()
    await expect(menu).not.toHaveClass(/active/)
  })

  test('contact toggle opens social links', async ({ page }) => {
    await page.goto('/bim-vdc')
    await page.locator('#contact-trigger').click()
    await expect(page.locator('.socials')).toBeVisible()
  })
})

import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const artifactsDir = path.join(__dirname, 'artifacts')
const screenshotsDir = path.join(artifactsDir, 'screenshots')
const reportPath = path.join(artifactsDir, 'layout-measurements.json')

const appUrl = 'http://127.0.0.1:4173'
const originalLandingPagePath = 'E:/ARM - Documents/Ariah/SE Portfolio Projects/Portfolio Site/Personal Landing Page/index.html'
const viewports = [
  { width: 1680, height: 900, label: 'desktop' },
  { width: 1440, height: 900, label: 'laptop' },
  { width: 1024, height: 768, label: 'tablet-landscape' },
  { width: 820, height: 1180, label: 'tablet-portrait' },
  { width: 390, height: 844, label: 'phone-portrait' },
  { width: 1440, height: 700, label: 'short-desktop' },
]
const routes = [
  { path: '/', key: 'home' },
  { path: '/bim-vdc', key: 'bim-vdc' },
]

const getRect = (element) => {
  if (!element) return null
  const rect = element.getBoundingClientRect()
  return {
    x: Number(rect.x.toFixed(2)),
    y: Number(rect.y.toFixed(2)),
    width: Number(rect.width.toFixed(2)),
    height: Number(rect.height.toFixed(2)),
    top: Number(rect.top.toFixed(2)),
    left: Number(rect.left.toFixed(2)),
    right: Number(rect.right.toFixed(2)),
    bottom: Number(rect.bottom.toFixed(2)),
  }
}

const getOverlap = (a, b) => {
  if (!a || !b) return false
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
}

async function getCurrentRouteMetrics(page, routePath) {
  await page.goto(`${appUrl}${routePath}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(400)

  return page.evaluate(({ routePath }) => {
    const getRect = (element) => {
      if (!element) return null
      const rect = element.getBoundingClientRect()
      return {
        x: Number(rect.x.toFixed(2)),
        y: Number(rect.y.toFixed(2)),
        width: Number(rect.width.toFixed(2)),
        height: Number(rect.height.toFixed(2)),
        top: Number(rect.top.toFixed(2)),
        left: Number(rect.left.toFixed(2)),
        right: Number(rect.right.toFixed(2)),
        bottom: Number(rect.bottom.toFixed(2)),
      }
    }
    const getOverlap = (a, b) => {
      if (!a || !b) return false
      return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
    }

    const navbar = document.querySelector('.header-box')
    const marquee = document.querySelector('.discipline-marquee')
    const heroText = document.querySelector('.video-hero__content') || document.querySelector('.content h1')
    const video = document.querySelector('.video-hero__video') || document.querySelector('video')
    const projectGrid = document.querySelector('.project-grid')
    const routeText = routePath === '/' ? document.querySelector('.content h1') : document.querySelector('.video-hero__content h2')
    const navbarRect = getRect(navbar)
    const marqueeRect = getRect(marquee)
    const heroTextRect = getRect(heroText)
    const videoRect = getRect(video)
    const projectGridRect = getRect(projectGrid)
    const textRect = getRect(routeText)
    const doc = {
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
      bodyScrollWidth: document.body.scrollWidth,
      bodyScrollHeight: document.body.scrollHeight,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    }
    const marqueeFromBottom = window.innerHeight - (marqueeRect?.bottom ?? 0)
    const textOverlapsMarquee = getOverlap(heroTextRect, marqueeRect) || getOverlap(textRect, marqueeRect)

    return {
      routePath,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      document: doc,
      navbar: navbarRect,
      marquee: marqueeRect,
      marqueeDistanceFromViewportBottom: Number(marqueeFromBottom.toFixed(2)),
      heroText: heroTextRect,
      video: videoRect,
      projectGrid: projectGridRect,
      textOverlapsMarquee,
      projectsAnchorTopRelativeToViewport: projectGridRect ? Number((projectGridRect.top - window.innerHeight * 0).toFixed(2)) : null,
      navBottom: navbarRect ? Number((navbarRect.bottom).toFixed(2)) : null,
    }
  }, { routePath })
}

async function getOriginalBaselineMetrics(page) {
  const fileUrl = pathToFileURL(originalLandingPagePath).href
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(600)

  return page.evaluate(() => {
    const getRect = (element) => {
      if (!element) return null
      const rect = element.getBoundingClientRect()
      return {
        x: Number(rect.x.toFixed(2)),
        y: Number(rect.y.toFixed(2)),
        width: Number(rect.width.toFixed(2)),
        height: Number(rect.height.toFixed(2)),
        top: Number(rect.top.toFixed(2)),
        left: Number(rect.left.toFixed(2)),
        right: Number(rect.right.toFixed(2)),
        bottom: Number(rect.bottom.toFixed(2)),
      }
    }

    const navbar = document.querySelector('.header-box')
    const marquee = document.querySelector('.worked-with')
    const heroText = document.querySelector('.content h1') || document.querySelector('.content h3')
    const doc = {
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
      bodyScrollWidth: document.body.scrollWidth,
      bodyScrollHeight: document.body.scrollHeight,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    }
    const navbarRect = getRect(navbar)
    const marqueeRect = getRect(marquee)

    return {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      document: doc,
      navbar: navbarRect,
      marquee: marqueeRect,
      heroText: getRect(heroText),
      marqueeDistanceFromViewportBottom: Number((window.innerHeight - (marqueeRect?.bottom ?? 0)).toFixed(2)),
    }
  })
}

async function getVideoDiagnostics(page, sequenceLabel) {
  const diagnostics = await page.evaluate(({ sequenceLabel }) => {
    const video = document.querySelector('.video-hero__video') || document.querySelector('video')
    if (!video) {
      return {
        sequenceLabel,
        videoExists: false,
        visible: false,
        readyState: null,
        networkState: null,
        currentSrc: null,
        videoWidth: null,
        videoHeight: null,
        error: null,
        failedNetworkRequests: [],
      }
    }

    const rect = video.getBoundingClientRect()
    const videoEntries = performance.getEntriesByType('resource').filter((entry) => /\.(webm|mp4|mov|m4v)/i.test(entry.name))
    const failedNetworkRequests = videoEntries
      .filter((entry) => 'responseStatus' in entry && Number(entry.responseStatus) >= 400)
      .map((entry) => ({ name: entry.name, responseStatus: entry.responseStatus }))

    return {
      sequenceLabel,
      videoExists: true,
      visible: rect.width > 0 && rect.height > 0 && !!(video.offsetWidth || video.getClientRects().length),
      readyState: video.readyState,
      networkState: video.networkState,
      currentSrc: video.currentSrc,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
      error: video.error ? { code: video.error.code, message: video.error.message } : null,
      failedNetworkRequests,
    }
  }, { sequenceLabel })

  return diagnostics
}

async function collectProjectAnchorMetrics(page) {
  const projectLink = page.locator('a[href="/bim-vdc#projects"]')
  await projectLink.first().click()
  await page.waitForTimeout(600)

  return page.evaluate(() => {
    const projectGrid = document.querySelector('#projects')
    const navbar = document.querySelector('.header-box')
    const rect = projectGrid ? projectGrid.getBoundingClientRect() : null
    const navbarRect = navbar ? navbar.getBoundingClientRect() : null
    return {
      projectSectionTopRelativeToViewport: rect ? Number(rect.top.toFixed(2)) : null,
      navbarBottom: navbarRect ? Number(navbarRect.bottom.toFixed(2)) : null,
      scrollY: window.scrollY,
      maxScrollY: document.documentElement.scrollHeight - window.innerHeight,
      canReachTarget: rect ? rect.top >= (navbarRect?.bottom ?? 0) : null,
    }
  })
}

async function main() {
  await fs.mkdir(screenshotsDir, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const report = {
    generatedAt: new Date().toISOString(),
    browser: {
      engine: 'Chromium via Playwright',
      headless: true,
      platform: process.platform,
      os: process.platform === 'win32' ? 'Windows' : process.platform,
      nodeVersion: process.version,
    },
    baseline: {
      originalLandingPage: {
        status: 'attempted',
      },
    },
    currentApp: {},
    mobileVideoDiagnostics: {},
    projectAnchorScroll: {},
  }

  const baselinePage = await browser.newPage()
  for (const viewport of viewports) {
    await baselinePage.setViewportSize({ width: viewport.width, height: viewport.height })
    const baseline = await getOriginalBaselineMetrics(baselinePage, viewport)
    report.baseline.originalLandingPage[`${viewport.width}x${viewport.height}`] = baseline
  }
  await baselinePage.close()

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } })
    for (const route of routes) {
      const metrics = await getCurrentRouteMetrics(page, route.path)
      report.currentApp[route.key] ??= {}
      report.currentApp[route.key][`${viewport.width}x${viewport.height}`] = metrics

      const fileName = `${route.key}-${viewport.width}x${viewport.height}.png`
      await page.screenshot({ path: path.join(screenshotsDir, fileName), fullPage: false })
    }
    await page.close()
  }

  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } })
  const mobileSequences = [
    {
      label: 'direct-navigation',
      run: async () => {
        await mobilePage.goto(`${appUrl}/bim-vdc`, { waitUntil: 'domcontentloaded' })
        await mobilePage.waitForTimeout(800)
      },
    },
    {
      label: 'home-to-bim-vdc-no-resize',
      run: async () => {
        await mobilePage.goto(`${appUrl}/`, { waitUntil: 'domcontentloaded' })
        await mobilePage.locator('.menu-toggle').click()
        await mobilePage.locator('a[href="/bim-vdc"]').filter({ hasText: 'BIM/VDC' }).click()
        await mobilePage.waitForLoadState('domcontentloaded')
      },
    },
    {
      label: 'desktop-to-mobile-resize',
      run: async () => {
        await mobilePage.setViewportSize({ width: 1680, height: 900 })
        await mobilePage.goto(`${appUrl}/bim-vdc`, { waitUntil: 'domcontentloaded' })
        await mobilePage.setViewportSize({ width: 390, height: 844 })
        await mobilePage.waitForTimeout(800)
      },
    },
    {
      label: 'desktop-resize-then-home-to-bim-vdc',
      run: async () => {
        await mobilePage.setViewportSize({ width: 1680, height: 900 })
        await mobilePage.goto(`${appUrl}/bim-vdc`, { waitUntil: 'domcontentloaded' })
        await mobilePage.setViewportSize({ width: 390, height: 844 })
        await mobilePage.goto(`${appUrl}/`, { waitUntil: 'domcontentloaded' })
        await mobilePage.locator('.menu-toggle').click()
        await mobilePage.locator('a[href="/bim-vdc"]').filter({ hasText: 'BIM/VDC' }).click()
        await mobilePage.waitForLoadState('domcontentloaded')
      },
    },
  ]

  for (const sequence of mobileSequences) {
    await sequence.run()
    report.mobileVideoDiagnostics[sequence.label] = await getVideoDiagnostics(mobilePage, sequence.label)
    await mobilePage.waitForTimeout(200)
  }

  const anchorPage = await browser.newPage({ viewport: { width: 1680, height: 900 } })
  await anchorPage.goto(`${appUrl}/bim-vdc`, { waitUntil: 'domcontentloaded' })
  await anchorPage.waitForTimeout(400)
  report.projectAnchorScroll = await collectProjectAnchorMetrics(anchorPage)
  await anchorPage.close()
  await mobilePage.close()
  await browser.close()

  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf8')
  console.log(JSON.stringify({ reportPath, screenshotsDir }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

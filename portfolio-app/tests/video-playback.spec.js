import { expect, test } from '@playwright/test'

async function waitForPlayableVideo(page, timeout = 20000) {
  await page.waitForFunction(() => {
    const video = document.querySelector('video')
    if (!video) return false
    return video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0 && Boolean(video.currentSrc)
  }, { timeout })
}

test.describe('video playback', () => {
  test('direct mobile navigation loads and advances the BIM/VDC video', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/bim-vdc', { waitUntil: 'domcontentloaded' })

    await waitForPlayableVideo(page)

    const before = await page.evaluate(() => document.querySelector('video')?.currentTime ?? 0)
    await page.waitForTimeout(1500)
    const after = await page.evaluate(() => document.querySelector('video')?.currentTime ?? 0)

    const state = await page.evaluate(() => {
      const video = document.querySelector('video')
      if (!video) return null

      const rect = video.getBoundingClientRect()
      return {
        exists: true,
        visible: rect.width > 0 && rect.height > 0,
        currentSrc: video.currentSrc,
        readyState: video.readyState,
        networkState: video.networkState,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
        paused: video.paused,
        currentTime: video.currentTime,
        error: video.error ? { code: video.error.code, message: video.error.message } : null,
      }
    })

    expect(state).not.toBeNull()
    expect(state.exists).toBeTruthy()
    expect(state.visible).toBeTruthy()
    expect(state.currentSrc).toContain('/videos/BIMtools_Hero_mobile.webm')
    expect(state.videoWidth).toBeGreaterThan(0)
    expect(state.videoHeight).toBeGreaterThan(0)
    expect(state.error).toBeNull()
    expect(after).toBeGreaterThan(before)
  })

  test('home to BIM/VDC navigation keeps the video playable', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.locator('.menu-toggle').click()
    await page.locator('a', { hasText: 'BIM/VDC' }).click()

    await waitForPlayableVideo(page)

    const state = await page.evaluate(() => {
      const video = document.querySelector('video')
      if (!video) return null
      return {
        currentSrc: video.currentSrc,
        readyState: video.readyState,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
        paused: video.paused,
      }
    })

    expect(state).not.toBeNull()
    expect(state.currentSrc).toContain('/videos/BIMtools_Hero_mobile.webm')
    expect(state.readyState).toBeGreaterThanOrEqual(2)
    expect(state.videoWidth).toBeGreaterThan(0)
    expect(state.videoHeight).toBeGreaterThan(0)
    expect(state.paused).toBeFalsy()
  })

  test('desktop to mobile resize retains a valid selected source', async ({ page }) => {
    await page.setViewportSize({ width: 1680, height: 900 })
    await page.goto('/bim-vdc', { waitUntil: 'domcontentloaded' })
    await waitForPlayableVideo(page)

    await page.setViewportSize({ width: 390, height: 844 })
    await page.waitForTimeout(1000)
    await waitForPlayableVideo(page)

    const state = await page.evaluate(() => {
      const video = document.querySelector('video')
      if (!video) return null
      return {
        currentSrc: video.currentSrc,
        readyState: video.readyState,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
      }
    })

    expect(state).not.toBeNull()
    expect(state.currentSrc).toContain('/videos/BIMtools_Hero_mobile.webm')
    expect(state.readyState).toBeGreaterThanOrEqual(2)
    expect(state.videoWidth).toBeGreaterThan(0)
    expect(state.videoHeight).toBeGreaterThan(0)
  })
})

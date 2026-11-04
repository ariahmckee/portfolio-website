import process from 'node:process'
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  outputDir: './tests/artifacts/results',
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: './tests/artifacts/playwright-report' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    viewport: { width: 390, height: 844 },
    launchOptions: process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : undefined
  },
  webServer: {
    command: `"${process.execPath}" scripts/serve-public.mjs`,
    url: 'http://127.0.0.1:4173/es/',
    reuseExistingServer: true
  }
});

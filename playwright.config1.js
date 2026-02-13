// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { permission } from 'node:process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries: 1,
  timeout: 40000,
  expect: {
    timeout: 10000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        // other settings
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true,
        permissions: ['geolocation', 'notifications'],
        video: 'retain-on-failure',
      }
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        // other settings 
      }
    },
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        // other settings
        ...devices['iPhone 12 Pro'],
      }
    }
  ],
});

module.exports = config

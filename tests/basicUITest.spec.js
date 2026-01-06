const { test } = require('@playwright/test');

test('First Test Script in Playwright', async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto("https://playwright.dev/");
})

test('Test Script in Playwright without browser fixture and page function', async ({ page }) => {
	await page.goto("https://google.com");
})
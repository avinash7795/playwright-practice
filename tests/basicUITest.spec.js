const { test, expect } = require('@playwright/test');

test('First Test Script in Playwright', async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto("https://playwright.dev/");
	console.log(await page.title());
})

test('Test Script in Playwright without browser fixture and page function', async ({ page }) => {
	await page.goto("https://google.com");
	console.log(await page.title());
	await expect(page).toHaveTitle("Google");
})
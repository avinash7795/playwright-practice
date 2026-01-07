const { test, expect } = require('@playwright/test');

test('First Test Script in Playwright', async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto("https://playwright.dev/");
	console.log(await page.title());
})

test('Test Script in Playwright without browser and page fixtures', async ({ page }) => {
	await page.goto("https://google.com");
	console.log(await page.title());
	await expect(page).toHaveTitle("Google");
})

test('Extracting error message and validating from web page', async ({ page }) => {
	await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
	console.log(await page.title());
	//used regular expression to match partial page title
	await expect(page).toHaveTitle(/LoginPage/);
	await page.locator("input#username").fill("avinash");
	await page.locator("[type='password']").fill("learning");
	await page.locator("input#signInBtn").click();
	//extracting error message when given wrong login credentials and printing in console
	console.log(await page.locator("[style*='block']").textContent());
	//adding assertion to validate the partial text of error message
	await expect(page.locator("[style*='block']")).toContainText("Incorrect");
})

test('Accessing first product of ecommerce application after sucessful Login', async ({ page }) => {
	const userName = page.locator("input#username");
	const signIn = page.locator("input#signInBtn");

	await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
	console.log(await page.title());
	//used regular expression to match partial page title
	await expect(page).toHaveTitle(/LoginPage/);
	await userName.fill("avinash");
	await page.locator("[type='password']").fill("learning");
	await signIn.click();
	//extracting error message when given wrong login credentials and printing in console
	console.log(await page.locator("[style*='block']").textContent());
	//adding assertion to validate the partial text of error message
	await expect(page.locator("[style*='block']")).toContainText("Incorrect");
	//clearing the existing text in username field by passing empty string
	await userName.fill("");
	//entering correct username
	await userName.fill("rahulshettyacademy");
	await signIn.click();
	//printing first element in console from the list of web elements
	console.log(await page.locator(".card-body a").first().textContent());
})
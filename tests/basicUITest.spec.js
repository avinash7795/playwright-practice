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
	const cardTitles = page.locator(".card-body a");

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
	console.log(await cardTitles.first().textContent());
	//storing the text of all webelements in array
	const allTitles = await cardTitles.allTextContents();
	console.log(allTitles);
})

test.only('UI controls of login page', async ({ page }) => {
	await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

	const userName = page.locator("input#username");
	const signIn = page.locator("input#signInBtn");
	//locator of blinking Text
	const blinkingText = page.locator("[href*='documents-request']");
	//selects "User" radio button
	await page.locator(".radiotextsty").last().click();
	//returns and prints the boolean value based on selection
	console.log(page.locator(".radiotextsty").last().isChecked());
	//validates the radio button is selected or not
	await expect(page.locator(".radiotextsty").last()).toBeChecked();
	//selects okay button over the pop-up
	await page.locator("#okayBtn").click();
	const dropdown = page.locator("select.form-control");
	await dropdown.selectOption("consult");
	//clicks on the checkbox
	await page.locator("#terms").click();
	//validates whether checkbox is selected or not
	await expect(page.locator("#terms")).toBeChecked();
	//unchecks the already selected check-box
	await page.locator("#terms").uncheck();
	//checks whether the checkbox is unselected or not
	expect(await page.locator("#terms").isChecked()).toBeFalsy();
	//assertion to validate the attribute of blinkingText
	await expect(blinkingText).toHaveAttribute("class", "blinkingText");
})
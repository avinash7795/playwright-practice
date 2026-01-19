const { test, expect } = require('@playwright/test');
const { link } = require('node:fs');

test('Playwright special locators using angular app', async ({ page }) => {
	//navigating to a website
	await page.goto("https://rahulshettyacademy.com/angularpractice/");
	//locating check-box using getbylabel locator and using check method instead of click
	await page.getByLabel("Check me out if you Love IceCreams!").check();
	//locating radio button and selecting
	await page.getByLabel("Employed").check();
	//locating static dropdown and selecting option
	await page.getByLabel("Gender").selectOption("Male");
	//locating password textbox and typing
	await page.getByPlaceholder('Password').fill("abc123");
	//locating Submit button using getByRole locator and clicking
	await page.getByRole("button", { name: 'Submit' }).click();
	//grabbing success message text using getByText locator and checking the visibility
	const successMsgFlag = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
	//asserting the success message visibility is true
	expect(successMsgFlag).toBeTruthy();
	//locating Shop hyper-link using getByRole and clicking
	await page.getByRole("link", { name: 'Shop' }).click();
	//locator chaining using filter and getByRole to select a product and add to cart
	await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();










})
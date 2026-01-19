const { test, expect } = require('@playwright/test');

test('Playwright special locators using angular app', async ({ page }) => {
	//navigating to a website
	await page.goto("https://rahulshettyacademy.com/angularpractice/");
	//locating check-box using getbylabel locator and using check method instead of click
	await page.getByLabel("Check me out if you Love IceCreams!").check();
	//locating radio button and selecting
	await page.getByLabel("Employed").check();
	//locating static dropdown and selecting option
	await page.getByLabel("Gender").selectOption("Male");





})
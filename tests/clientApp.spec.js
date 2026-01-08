const { test, expect } = require('@playwright/test');

test('Printing the titles of all products using additonal wait', async ({ page }) => {
	const userName = page.locator("input#userEmail");
	const password = page.locator("input#userPassword");
	const loginBtn = page.locator("input#login");
	const cardTitles = page.locator(".card-body b");

	await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
	await userName.fill("kunapareddy.avi@gmail.com");
	await password.fill("Avinash@123");
	await loginBtn.click();

	//await page.waitForLoadState('networkidle'); //-- not working
	//will wait until the last element is present
	await cardTitles.last().waitFor();
	//storing the text of all webelements in array
	const allTitles = await cardTitles.allTextContents();
	console.log(allTitles);
})
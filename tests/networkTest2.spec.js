const { test, expect } = require('@playwright/test');

test('Intercepting API request to validate forbidden text message in view orders page', async ({ page }) => {

	const email = "kunapareddy.avi@gmail.com";
	const userName = page.locator("input#userEmail");
	const password = page.locator("input#userPassword");
	const loginBtn = page.locator("input#login");
	const cardTitles = page.locator(".card-body b");


	await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
	await userName.fill(email);
	await password.fill("Avinash@123");
	await loginBtn.click();

	//will wait until the last element is present
	await cardTitles.first().waitFor();
	//clicking on "ORDERS" button
	await page.locator("button[routerlink*='myorders']").click();
	//this route method will wait or listen till the same pattern of API request call is invoked in network tab
	//It should be written before clicking of "View" button
	await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
		//intercept/alter the request by using continue method and providing required URL to invoke instead of actual URL
		async route => {
			await route.continue(
				{
					url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69818f3cc941646b7acf7aac"

				}
			)
		}
	);
	//clicking on "View" button in orders page
	await page.getByRole("button", { name: 'View' }).first().click();
	//validating the forbidden/unauthorized text in View orders page
	await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

});
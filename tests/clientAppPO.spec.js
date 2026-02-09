const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test('End to end work flow of ecommerce app', async ({ page }) => {
	const userName = "kunapareddy.avi@gmail.com";
	const password = "Avinash@123";
	const productName = 'ZARA COAT 3';

	const dropdown = page.locator(".ta-results");

	//creating object of page object manager class to access the objects of page classes and their methods in test files
	const poManager = new POManager(page);
	//getting the login page object from page object manager class
	const loginPage = poManager.getLoginPage();
	//using login page object to navigate to login page
	await loginPage.goTo();
	//using login page object to perform login action by passing username and password
	await loginPage.validLogin(userName, password);
	//getting the dashboard page object from page object manager class
	const dashboardPage = poManager.getDashboardPage();
	//calling method of dashboard page to fetch required product name and clicking on cart button
	await dashboardPage.fetchProductAndAddToCart(productName);
	//clicking on cart button
	await dashboardPage.navigateToCart();
	//wait mechanism to make sure all products in the cart are loaded because isVisible don't have auto-wait mechanism
	await page.locator(".cart li").first().waitFor();
	/*verifying the product 'ZARA COAT 3' is visible in the cart page
	by using pseudo-class in the locator and isVisible method*/
	const isPresent = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
	//verifying the presence of product in cart page to be True
	expect(isPresent).toBeTruthy();
	//clicking on Checkout button
	await page.locator("text=Checkout").click();
	//typing "ind" word charecter by charecter in the auto suggestive dropdown
	await page.locator("[placeholder*='Country']").pressSequentially("ind");
	//waiting till the dropdown elements are loaded
	await dropdown.waitFor();
	//fetching the count of suggestive options from the dropdown
	const optionsCount = await dropdown.locator("button").count();
	//locating and clicking on dropwdown text "India"
	for (let i = 0; i < optionsCount; i++) {
		//fetching the text content from the nth element from auto suggestive options
		const suggestedText = await dropdown.locator("button").nth(i).textContent();
		if (suggestedText === " India") {
			//clicking on "India" text
			await dropdown.locator("button").nth(i).click();
			break;
		}
	}
	//validating the email used for login is present on the place order page
	await expect(page.locator(".user__name label")).toHaveText(userName);
	//clicking on the Place Order button
	await page.locator(".action__submit").click();
	//validating the text "Thankyou for the order." is present in the thank you page
	await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
	//grabing the order id from thank you page
	const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
	//printing order id in the console
	console.log(orderId);
	//clicking on "ORDERS" button
	await page.locator("button[routerlink*='myorders']").click();
	//waiting for order-details table to be loaded using external wait mechaninsm
	await page.locator("tbody").waitFor();
	//collecting rows count from the table
	const rows = page.locator("tbody tr");
	//logic to get order-id from the first column of the table and to match with existing orderId
	for (let i = 0; i < await rows.count(); i++) {
		const orderIdtext = await rows.nth(i).locator("th").textContent();
		if (orderId.includes(orderIdtext)) {
			//clicking on "view" button of matching order id row
			await rows.nth(i).locator("button").first().click();
			break;
		}
	}
	//grabing the text of order id from the order details page
	const orderIdDetails = await page.locator(".col-text").textContent();
	//validating whether the order id from oder details page is matching with the original order id
	expect(orderId.includes(orderIdDetails)).toBeTruthy();
})
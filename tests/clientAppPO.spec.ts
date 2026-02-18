import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects_ts/POManager';
import { customtest } from '../utils_ts/test-base';

//importing test data from json file and parsing it to use in test file
const testData = JSON.parse(JSON.stringify(require('../utils_ts/placeorderTestData.json')));

//iterating through the test data to run the same test with different sets of data
for (const data of testData) {
	test(`End to end work flow of ecommerce app with ${data.productName}`, async ({ page }) => {

		//creating object of page object manager class to access the objects of page classes and their methods in test files
		const poManager = new POManager(page);
		//getting the login page object from page object manager class
		const loginPage = poManager.getLoginPage();
		//using login page object to navigate to login page
		await loginPage.goTo();
		//using login page object to perform login action by passing username and password from test data file
		await loginPage.validLogin(data.username, data.password);
		//getting the dashboard page object from page object manager class
		const dashboardPage = poManager.getDashboardPage();
		//calling method of dashboard page to fetch required product name and clicking on cart button
		await dashboardPage.fetchProductAndAddToCart(data.productName);
		//navigating to cart page by using method of dashboard page
		await dashboardPage.navigateToCart();
		//getting the cart page object from page object manager class
		const cartPage = poManager.getCartPage();
		//checking the presence of product in cart page by passing product name from test data file
		const isPresent = await cartPage.isProductInCart(data.productName);
		//verifying the presence of product in cart page to be "True"
		expect(isPresent).toBeTruthy();
		//navigating to Checkout page by using method of cart page
		await cartPage.clickCheckout();
		//getting the orders review page object from page object manager class
		const ordersReviewPage = poManager.getOrdersReviewPage();
		//selecting country from the auto suggestive dropdown by passing country code and country name from test data file
		await ordersReviewPage.selectCountry(data.contryCode, data.country);
		//validating the email used for login is present on the place order page
		await expect(await ordersReviewPage.getEmail()).toHaveText(data.username);
		//getting orderId and thank you text by calling submit method of orders review page
		const { orderId, thankYouText } = await ordersReviewPage.submitAndGetOrderDetails();
		//validating the text "Thankyou for the order." is present in the thank you page
		await expect(thankYouText).toHaveText(" Thankyou for the order. ");
		//printing order id in the console
		console.log(orderId);
		//navigating to "ORDERS" page by using method of dashboard page
		await dashboardPage.navigateToMyOrders();
		//getting the order history page object from page object manager class
		const orderHistoryPage = poManager.getOrderHistoryPage();
		//searching for the order id in the order history page
		await orderHistoryPage.searchOrderAndSelect(orderId);
		//grabing the text of order id from the order details page
		const orderIdDetails = await orderHistoryPage.getOrderIdFromTable();

		//validating whether the order id from oder details page is matching with the original order id
		expect(orderId.includes(orderIdDetails)).toBeTruthy();
	});
}

//using custom test to fetch test data from test base file as fixture
customtest("End to end work flow of ecommerce app by fetching test data from fixture", async ({ page, testDataForOrder }) => {

	//creating object of page object manager class to access the objects of page classes and their methods in test files
	const poManager = new POManager(page);
	//getting the login page object from page object manager class
	const loginPage = poManager.getLoginPage();
	//using login page object to navigate to login page
	await loginPage.goTo();
	//using login page object to perform login action by passing username and password from fixture
	await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
	//getting the dashboard page object from page object manager class
	const dashboardPage = poManager.getDashboardPage();
	//calling method of dashboard page to match required product name and clicking on cart button
	await dashboardPage.fetchProductAndAddToCart(testDataForOrder.productName);
	//navigating to cart page by using method of dashboard page
	await dashboardPage.navigateToCart();
	//getting the cart page object from page object manager class
	const cartPage = poManager.getCartPage();
	//checking the presence of product in cart page by passing product name from fixture
	const isPresent = await cartPage.isProductInCart(testDataForOrder.productName);
	//verifying the presence of product in cart page to be "True"
	expect(isPresent).toBeTruthy();
	//navigating to Checkout page by using method of cart page
	await cartPage.clickCheckout();
	//getting the orders review page object from page object manager class
	const ordersReviewPage = poManager.getOrdersReviewPage();
	//selecting country from the auto suggestive dropdown by passing country code and country name from fixture
	await ordersReviewPage.selectCountry(testDataForOrder.contryCode, testDataForOrder.country);
	//validating the email used for login is present on the place order page
	await expect(await ordersReviewPage.getEmail()).toHaveText(testDataForOrder.username);
	//getting orderId and thank you text by calling submit method of orders review page
	const { orderId, thankYouText } = await ordersReviewPage.submitAndGetOrderDetails();
	//validating the text "Thankyou for the order." is present in the thank you page
	await expect(thankYouText).toHaveText(" Thankyou for the order. ");
	//printing order id in the console
	console.log(orderId);
	//navigating to "ORDERS" page by using method of dashboard page
	await dashboardPage.navigateToMyOrders();
	//getting the order history page object from page object manager class
	const orderHistoryPage = poManager.getOrderHistoryPage();
	//searching for the order id in the order history page
	await orderHistoryPage.searchOrderAndSelect(orderId);
	//grabing the text of order id from the order details page
	const orderIdDetails = await orderHistoryPage.getOrderIdFromTable();
	//validating whether the order id from oder details page is matching with the original order id
	expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
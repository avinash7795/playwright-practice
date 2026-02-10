const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test('End to end work flow of ecommerce app', async ({ page }) => {
	const userName = "kunapareddy.avi@gmail.com";
	const password = "Avinash@123";
	const productName = 'ZARA COAT 3';

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
	//navigating to cart page by using method of dashboard page
	await dashboardPage.navigateToCart();
	//getting the cart page object from page object manager class
	const cartPage = poManager.getCartPage();
	//checking the presence of product in cart page by passing product name
	const isPresent = await cartPage.isProductInCart(productName);
	//verifying the presence of product in cart page to be "True"
	expect(isPresent).toBeTruthy();
	//navigating to Checkout page by using method of cart page
	await cartPage.clickCheckout();
	//getting the orders review page object from page object manager class
	const ordersReviewPage = poManager.getOrdersReviewPage();
	//selecting country from the auto suggestive dropdown by passing country code and country name
	await ordersReviewPage.selectCountry("ind", "India");
	//validating the email used for login is present on the place order page
	await expect(await ordersReviewPage.getEmail()).toHaveText(userName);
	//getting orderId and thank you text by calling submit method of orders review page
	const { orderId, thankYouText } = await ordersReviewPage.submitAndGetOrderID();
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
})
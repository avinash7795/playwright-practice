//importing the required modules and classes
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
//importing the playwright keyword from playwright test module to launch the browser and create page object


//defining the step definitions for the steps mentioned in feature file
Given('A login to the ecommerce website with valid {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    //storing the username in a variable using World constructor principle to use it in later steps for validation
    this.data_username = username;
    //getting the login page object from page object manager class
    const loginPage = this.poManager.getLoginPage();
    //using login page object to navigate to login page
    await loginPage.goTo();
    //using login page object to perform login action by passing username and password from feature file
    await loginPage.validLogin(this.data_username, password);
});

When('Add a product {string} to the cart', async function (productName) {
    //getting the dashboard page object from page object manager class
    this.dashboardPage = this.poManager.getDashboardPage();
    //calling method of dashboard page to fetch required product name and clicking on cart button
    await this.dashboardPage.fetchProductAndAddToCart(productName);
    //navigating to cart page by using method of dashboard page
    await this.dashboardPage.navigateToCart();
});

Then('Verify the product {string} is visible in the cart', { timeout: 100 * 1000 }, async function (productName) {
    //getting the cart page object from page object manager class
    const cartPage = this.poManager.getCartPage();
    //checking the presence of product in cart page by passing product name from feature file
    const isPresent = await cartPage.isProductInCart(productName);
    //verifying the presence of product in cart page to be "True"
    expect(isPresent).toBeTruthy();
    //navigating to Checkout page by using method of cart page
    await cartPage.clickCheckout();
});

When('Proceed to checkout and submit the order', { timeout: 100 * 1000 }, async function () {
    //getting the orders review page object from page object manager class
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    //selecting country from the auto suggestive dropdown by passing country code and country name
    await ordersReviewPage.selectCountry("ind", "India");
    //validating the email used for login is present on the place order page
    await expect(await ordersReviewPage.getEmail()).toHaveText(this.data_username);
    //getting orderId and thank you text by calling submit method of orders review page
    const { orderId, thankYouText } = await ordersReviewPage.submitAndGetOrderID();
    //storing the order id in a variable using World constructor principle to use it in later steps for validation
    this.data_orderId = orderId;
    //printing the order id in the console
    console.log("Order ID is: " + this.data_orderId);
    //validating the text "Thankyou for the order." is present in the thank you page
    await expect(thankYouText).toHaveText(" Thankyou for the order. ");
});

Then('Verify the order is present in the order history page', async function () {
    //navigating to "ORDERS" page by using method of dashboard page
    await this.dashboardPage.navigateToMyOrders();
    //getting the order history page object from page object manager class
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    //searching for the order id in the order history page
    await orderHistoryPage.searchOrderAndSelect(this.data_orderId);
    //grabing the text of order id from the order details page
    const orderIdDetails = await orderHistoryPage.getOrderIdFromTable();
    //validating whether the order id from oder details page is matching with the original order id
    expect(this.data_orderId.includes(orderIdDetails)).toBeTruthy();
});

Given('A login to the ecommerce website with invalid {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    //used regular expression to match partial page title
    await expect(this.page).toHaveTitle(/LoginPage/);
    await this.page.locator("input#username").fill(username);
    await this.page.locator("[type='password']").fill(password);
    await this.page.locator("input#signInBtn").click();
});

Then('Verify the error message is displayed', async function () {
    //extracting error message when given wrong login credentials and printing in console
    console.log(await this.page.locator("[style*='block']").textContent());
    //adding assertion to validate the partial text of error message
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});
const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('./utils/ApiUtils');

//storing request payload in a variable
const loginData = { userEmail: "kunapareddy.avi@gmail.com", userPassword: "Avinash@123" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6964a1cbc941646b7a91786b" }] };

//declaring "response" as global variable
let response;

//beforeAll annotation will execute the code written in it before executing all test cases
test.beforeAll(async () => {
    //providing new context without any previous state to the api call
    const apiContext = await request.newContext();
    //creating object for ApiUtils class
    const apiUtils = new ApiUtils(apiContext, loginData);
    //storing method returnvalue in global variable 'response'
    response = await apiUtils.getOrderId(orderPayload);

});

test('Validate order Id from orders page', async ({ page }) => {
    const email = "kunapareddy.avi@gmail.com";
    const userName = page.locator("input#userEmail");
    const password = page.locator("input#userPassword");
    const loginBtn = page.locator("input#login");
    const cardTitles = page.locator(".card-body b");
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    const cartBtn = page.locator("[routerlink*='cart']");
    const dropdown = page.locator(".ta-results");

    //javascript code to insert token value into browser local storage
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);

    //navigating to ecommerce webpage
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    //clicking on "ORDERS" button
    await page.locator("button[routerlink*='myorders']").click();
    //waiting for order-details table to be loaded using external wait mechaninsm
    await page.locator("tbody").waitFor();
    //collecting rows count from the table
    const rows = page.locator("tbody tr");
    //logic to get order-id from the first column of the table and to match with existing orderId
    for (let i = 0; i < await rows.count(); i++) {
        const orderIdtext = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(orderIdtext)) {
            //clicking on "view" button of matching order id row
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    //grabing the text of order id from the order details page
    const orderIdDetails = await page.locator(".col-text").textContent();
    //validating whether the order id from oder details page is matching with the original order id which was created through API
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
})
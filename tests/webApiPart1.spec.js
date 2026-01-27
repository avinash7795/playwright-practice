const { test, expect, request } = require('@playwright/test');
//storing request payload in a variable
const loginData = { userEmail: "kunapareddy.avi@gmail.com", userPassword: "Avinash@123" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6964a1cbc941646b7a91786b" }] };

//declaring "token" as global variable
let token;
//declaring orderId as global variable
let orderId;

//beforeAll annotation will execute the code written in it before executing all test cases
test.beforeAll(async () => {
    //providing new context without any previous state to the api call
    const apiContext = await request.newContext();
    //calling POST method with required URL and passing the payload in data, storing the API response
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            //passing the payload into the data param
            data: loginData
        }
    )
    //validating the API response is success using "ok" method
    expect((loginResponse).ok()).toBeTruthy;
    //converting javascript object to json object using .json() method
    const loginResponseJson = await loginResponse.json();
    //parsing and fetching the required json object called token and storing in global variable
    token = loginResponseJson.token;

    //API call to create order
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            //passing payload
            data: orderPayload,
            //passing request headers like token and content type
            headers: {
                'Authorization': token,
                'Contnet-Type': 'application/json'
            },
        }
    )
    //converting javascript object to json object
    const orderResponseJson = await orderResponse.json();
    //fetching orderid from json object
    orderId = orderResponseJson.orders[0];
    //printing orderid in console
    console.log(orderId);

});

test('End to end work flow of ecommerce app ', async ({ page }) => {
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
    }, token);

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
        if (orderId.includes(orderIdtext)) {
            //clicking on "view" button of matching order id row
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    //grabing the text of order id from the order details page
    const orderIdDetails = await page.locator(".col-text").textContent();
    //validating whether the order id from oder details page is matching with the original order id which was created through API
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
})
const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('./utils/ApiUtils');

//storing API data in a global variables
const loginData = { userEmail: "kunapareddy.avi@gmail.com", userPassword: "Avinash@123" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6964a1cbc941646b7a91786b" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };

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

test('Validate order Id from orders page using util methods', async ({ page }) => {
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

    //this method is used to intercept/alter the API response, it need to be included before navigating to desired page
    //the URL is appended with wild card character '*' to accept any user account id
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            //converting 'fakePayloadOrders' javascript object to json object
            let body = JSON.stringify(fakePayloadOrders);
            //getting real response from API
            const actualResponse = await page.request.fetch(route.request());
            //intercepting response using fulfill- API response->{playwright fake response}->browser -> render data on frontend
            await route.fulfill({
                actualResponse,
                //sending fake api response in the fulfill method to render the same in the browser
                fakePayloadOrders,
            })

        });

    //clicking on "ORDERS" button
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    //printing orders page text that contains 'No Orders'
    console.log(await page.locator(".mt-4").textContent());
})
const { test, expect, request } = require('@playwright/test');
//storing request payload in a variable
const loginData = { userEmail: "kunapareddy.avi@gmail.com", userPassword: "Avinash@123" }
//declaring a variable "token" as global one
let token;

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
    /*   await userName.fill(email);
       await password.fill("Avinash@123");
       await loginBtn.click(); */

    //await page.waitForLoadState('networkidle'); //-- not working
    //will wait until the last element is present
    await cardTitles.first().waitFor();
    //storing the text of all webelements in array
    const allTitles = await cardTitles.allTextContents();
    //printing all the product titles in console
    console.log(allTitles);
    //logic to fetch required product name from list of products
    const count = await products.count();
    console.log("products count: " + count);
    for (let i = 0; i < count; i++) {
        //used locator chaining concept to minimize the scope of search
        if (await products.nth(i).locator("b").textContent() === productName) {
            //used new locator concept 'text=text value in DOM' and added product to card
            await products.nth(i).locator("text=  Add To Cart").click();
            break;
        }
    }
    //clicking on cart button
    await cartBtn.click();
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
    await expect(page.locator(".user__name label")).toHaveText(email);
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
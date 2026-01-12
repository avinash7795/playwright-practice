const { test, expect } = require('@playwright/test');

test('Printing the titles of all products using additonal wait', async ({ page }) => {
	const userName = page.locator("input#userEmail");
	const password = page.locator("input#userPassword");
	const loginBtn = page.locator("input#login");
	const cardTitles = page.locator(".card-body b");
	const products = page.locator(".card-body");
	const productName = 'ZARA COAT 3';
	const cartBtn = page.locator("[routerlink*='cart']");
	const dropdown = page.locator(".ta-results");

	await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
	await userName.fill("kunapareddy.avi@gmail.com");
	await password.fill("Avinash@123");
	await loginBtn.click();

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
})
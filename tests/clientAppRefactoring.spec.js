const { test, expect } = require('@playwright/test');

test('Refactoring code for end-to-end work flow of ecommerce app', async ({ page }) => {

	const email = "kunapareddy.avi@gmail.com";
	const userName = page.getByPlaceholder("email@example.com");
	const password = page.getByPlaceholder("enter your passsword");
	const loginBtn = page.getByRole("button", { name: 'Login' });
	const cardTitles = page.locator(".card-body b");
	const products = page.locator(".card-body");

	const dropdown = page.locator(".ta-results");

	await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
	await userName.fill(email);
	await password.fill("Avinash@123");
	await loginBtn.click();
	//will wait until the last element is present
	await cardTitles.first().waitFor();
	//logic to fetch required product name from list of products and clicking on cart button
	await products.filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: 'Add To Cart' }).click();
	//clicking on cart button by taking help from parent tag "li"
	await page.getByRole("listitem").getByRole("button", { name: 'Cart' }).click();
	//wait mechanism to make sure all products in the cart are loaded because isVisible don't have auto-wait mechanism
	await page.locator(".cart li").first().waitFor();
	//verifying the product 'ZARA COAT 3' is visible in the cart page
	await expect(page.getByText("ZARA COAT 3")).toBeVisible();
	//clicking on Checkout button
	await page.getByRole("button", { name: 'Checkout' }).click();
	//typing "ind" word charecter by charecter in the auto suggestive dropdown
	await page.getByPlaceholder("Select Country").pressSequentially("ind");
	//waiting till the dropdown elements are loaded
	await dropdown.waitFor();
	//clicking on "India" text from dropdown list
	await page.getByRole("button", { name: 'India' }).nth(1).click();
	//validating the email used for login is present on the place order page
	await expect(page.locator(".user__name label")).toHaveText(email);
	//clicking on the Place Order button using getbytext locator
	await page.getByText("PLACE ORDER").click();
	//validating the text "Thankyou for the order." is present in the thank you page using getbytext locator
	await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})

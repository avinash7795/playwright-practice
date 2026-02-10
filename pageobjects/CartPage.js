//this is the page object for the cart page, it contains methods to interact with the cart page elements
class CartPage {
    //constructor to initialize page object and locators
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart li');
        this.checkoutButton = page.locator("text=Checkout");

    }

    //method to check if the product is present in the cart page
    async isProductInCart(productName) {
        //wait mechanism to make sure all products in the cart are loaded because isVisible don't have auto-wait mechanism
        await this.cartItems.first().waitFor();
        //verifying the product is visible in the cart page by using pseudo-class in the locator and isVisible method
        const isPresent = await this.page.locator("h3:has-text('" + productName + "')").isVisible();
        //returning the presence of product in cart page
        return isPresent;
    }

    //method to click on checkout button
    async clickCheckout() {
        await this.checkoutButton.click();
    }

}
//exporting the CartPage class to be used in POManager class
module.exports = { CartPage };
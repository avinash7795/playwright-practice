//this is page object class for dashboard page of ecommerce application
class DashboardPage {
    //creating constructor to initialize the 'page' and locators of dashboard page
    constructor(page) {
        this.products = page.locator(".card-body");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.cartBtn = page.locator("[routerlink*='cart']");
        this.myOrdersButton = page.locator("button[routerlink*='myorders']");
    }

    //method to fetch required product name from list of products and clicking on cart button
    async fetchProductAndAddToCart(productName) {
        //logic to fetch required product name from list of products
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            //used locator chaining concept to minimize the scope of search
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //used new locator concept 'text=text value in DOM' and added product to card
                await this.products.nth(i).locator("text=  Add To Cart").click();
                break;
            }
        }

    }

    //method to navigate to cart page
    async navigateToCart() {
        await this.cartBtn.click();
    }

    async navigateToMyOrders() {
        await this.myOrdersButton.click();
    }
}
//exporting the DashboardPage class to be used in test files
module.exports = { DashboardPage };

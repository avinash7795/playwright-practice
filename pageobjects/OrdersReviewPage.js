//this is page class for orders review page of ecommerce application
class OrdersReviewPage {
    //creating constructor to initialize the 'page' and locators of orders review page
    constructor(page) {
        this.page = page;
        this.countryInput = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.submitButton = page.locator(".action__submit");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.table = page.locator("tbody");
        this.thankYouTextLocator = page.locator(".hero-primary");
    }
    //method to select country from auto suggestive dropdown
    async selectCountry(countryCode, countryName) {
        await this.countryInput.pressSequentially(countryCode);
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        //locating and clicking on dropwdown text "India"
        for (let i = 0; i < optionsCount; i++) {
            //fetching the text content from the nth element from auto suggestive options
            const suggestedText = await this.dropdown.locator("button").nth(i).textContent();
            if (suggestedText.trim() === countryName) {
                //clicking on "India" text
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    //method to return email locator from orders review page
    async getEmail() {
        return await this.page.locator(".user__name label");
    }

    //method to return order id and thank you text locator by clicking on place order button
    async submitAndGetOrderID() {
        await this.submitButton.click();
        return {
            orderId: await this.orderId.textContent(),
            thankYouText: this.thankYouTextLocator
        };
    }


}

//exporting the OrdersReviewPage class to be used in test files
module.exports = { OrdersReviewPage };
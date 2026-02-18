import { Page, Locator } from '@playwright/test';
//this is page class for order history page of ecommerce application
export class OrderHistoryPage {
    page: Page;
    rows: Locator;
    ordersTable: Locator;
    orderIdDetails: Locator;
    //creating constructor to initialize the 'page' and locators of order history page
    constructor(page: Page) {
        this.page = page;
        this.rows = page.locator("tbody tr");
        this.ordersTable = page.locator("tbody");
        this.orderIdDetails = page.locator(".col-text")
    }

    //method to search order id in the order history table and to click on "view" button
    async searchOrderAndSelect(orderId: any) {
        //wait mechanism to make sure order history table is loaded because count don't have auto-wait mechanism
        await this.ordersTable.waitFor();
        //collecting rows count from the table
        const rows = this.rows;
        //logic to get order-id from the first column of the table and to match with existing orderId
        for (let i = 0; i < await rows.count(); i++) {
            //fetching the text content of order id from the first column of the table
            const orderIdtext = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(orderIdtext)) {
                //clicking on "view" button of matching order id row
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    //method to grab order id from the order details page
    async getOrderIdFromTable() {
        return await this.orderIdDetails.textContent();
    }
}
module.exports = { OrderHistoryPage };
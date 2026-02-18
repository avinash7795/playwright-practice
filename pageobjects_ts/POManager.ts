import { DashboardPage } from './DashboardPage';
import { LoginPage } from './LoginPage';
import { CartPage } from './CartPage';
import { OrdersReviewPage } from './OrdersReviewPage';
import { OrderHistoryPage } from './OrderHistoryPage';
//importing Page class from Playwright to use it in constructor of POManager class
import { Page } from '@playwright/test';

//this is page object manager class to manage all page objects in one place using typescript features
export class POManager {
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    ordersReviewPage: OrdersReviewPage;
    orderHistoryPage: OrderHistoryPage;
    //creating constructor to initialize the 'page' and creating objects of all page classes
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page);
    }

    //creating getter methods to access the objects of page classes in test files
    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }
    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }
    getOrderHistoryPage() {
        return this.orderHistoryPage;
    }
}
//exporting the POManager class to be used in test files
module.exports = { POManager };
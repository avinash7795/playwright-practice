const { DashboardPage } = require('./DashboardPage');
const { LoginPage } = require('./LoginPage');
const { CartPage } = require('./CartPage');
const { OrdersReviewPage } = require('./OrdersReviewPage');
const { OrderHistoryPage } = require('./OrderHistoryPage');

//this is page object manager class to manage all page objects in one place
class POManager {
    //creating constructor to initialize the 'page' and creating objects of all page classes
    constructor(page) {
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
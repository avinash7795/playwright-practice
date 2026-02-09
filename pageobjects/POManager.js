const { DashboardPage } = require('./DashboardPage');
const { LoginPage } = require('./LoginPage');

//this is page object manager class to manage all page objects in one place
class POManager {
    //creating constructor to initialize the 'page' and creating objects of all page classes
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
    }

    //creating getter methods to access the objects of page classes in test files
    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
}
//exporting the POManager class to be used in test files
module.exports = { POManager };
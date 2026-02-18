import { Page, Locator } from '@playwright/test';

//this is page object class for login page
export class LoginPage {
    page: Page;
    loginBtn: Locator;
    userName: Locator;
    password: Locator;
    cardTitles: Locator;
    //this constructor is used to initialize the 'page' and locators of login page
    constructor(page: Page) {
        this.page = page;
        this.loginBtn = page.locator("input#login");
        this.userName = page.locator("input#userEmail");
        this.password = page.locator("input#userPassword");
        this.cardTitles = page.locator(".card-body b");
    }
    //method to navigate to login page
    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    }

    //method to perform login action by taking username and password as parameters
    async validLogin(userName: string, password: string) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginBtn.click();
        //will wait until the first element is present
        await this.cardTitles.first().waitFor();
    }
}
//exporting the LoginPage class to be used in test files
module.exports = { LoginPage };
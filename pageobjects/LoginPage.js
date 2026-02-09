class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginBtn = page.locator("input#login");
        this.userName = page.locator("input#userEmail");
        this.password = page.locator("input#userPassword");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    }

    async validLogin(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}
module.exports = { LoginPage };
const { After, Before, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');

Before(async function () {
    //launching the browser and creating page object using playwright keyword
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    //creating object of page object manager class to access the objects of page classes and their methods in test files
    this.poManager = new POManager(this.page);
});

After(function () {
    console.log("I am last to execute");
});

BeforeStep(function () {
    console.log("I am executing before each step");
});

AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: "screenshots/failed-step.png" });
    }
});
//importing the required modules and classes
const { After, Before, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');


//defining the hooks to perform certain actions before and after the execution of test scenarios and steps
Before(async function () {
    //launching the browser and creating page object using playwright keyword
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    //storing "page" object in World constructor to use it in step definition files and later hooks
    this.page = await context.newPage();
    //creating object of page object manager class to access the objects of page classes and their methods in test files
    this.poManager = new POManager(this.page);
});

After(function () {
    console.log("I am last to execute");
});

// This hook will be executed before each step
BeforeStep(function () {
    console.log("I am executing before each step");
});

//this hook will be executed after each step, and take a screenshot on step failure
AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: "screenshots/failed-step.png" });
    }
});
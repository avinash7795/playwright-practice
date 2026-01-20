const { test, expect } = require('@playwright/test');

test('Date selection in Calendar', async ({ page }) => {

    const year = "2027";
    const monthNumber = 6;
    const date = "15";

    //navigating to selenium practise url
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    //clicking on datepicker
    await page.locator(".react-date-picker__inputGroup").click();
    //clicking on Month, Year header in datepicker
    await page.locator(".react-calendar__navigation__label").click();
    //clicking on Year number in datepicker
    await page.locator(".react-calendar__navigation__label__labelText").click();
    //clicking on required Year in datepicker using existing test data
    await page.getByText(year).click();
    //clicking on required Month in datepicker using existing test data
    await page.locator(".react-calendar__year-view__months__month").nth(monthNumber - 1).click();
    //clicking on required date in datepicker using xpath and existing test data
    await page.locator("//abbr[text()='" + date + "']").click();
})
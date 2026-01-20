const { test, expect } = require('@playwright/test');

test('Date selection in Calendar', async ({ page }) => {

    const year = "2027";
    const monthNumber = "6";
    const date = "15";
    //storing month, date and year in the array to use in the assertion
    const expectedList = [monthNumber, date, year];

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
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber - 1)).click();
    //clicking on required date in datepicker using xpath and existing test data
    await page.locator("//abbr[text()='" + date + "']").click();

    //fetching the count of matching elements for date, which is available in separate tags
    const inputs = page.locator(".react-date-picker__inputGroup__input");
    //asserting and matching each date value separately
    for (let i = 0; i < expectedList.length; i++) {
        //fetching selected date value by month, date and year separately
        const value = await inputs.nth(i).inputValue();
        //asserting the separate date value with the existing test data
        expect(value).toEqual(expectedList[i]);
    }

})
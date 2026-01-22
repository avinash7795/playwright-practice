const { test, expect } = require('@playwright/test');

test('Hidden element functionality', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    /* logic to check the backward and forward navigation feature
    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();
    */
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator('#displayed-text')).toBeHidden();
})
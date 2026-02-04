const { test, expect } = require('@playwright/test');

test('Screenshot and Partial Screenshot functionality', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //assertion to make sure the text is visible before hiding
    await expect(page.locator('#displayed-text')).toBeVisible();
    //this will take the partial or web element level screenshot
    await page.locator('#displayed-text').screenshot({ path: 'partialScreenshot.png' });
    //clicking on hide button to hide the text
    await page.locator("#hide-textbox").click();
    //this will take full page screenshot and stores the file on project level
    await page.screenshot({ path: 'screenshot.png' });
    //assertion to make sure the text is hidden
    await expect(page.locator('#displayed-text')).toBeHidden();
});

test.only('Visual Testing with Screenshots', async ({ page }) => {
    //navigating to google.com
    await page.goto("https://google.com");
    //code to compare actual screenshot with expected screenshot as part of visual testing
    expect(await page.screenshot()).toMatchSnapshot('landingPage.png');
});
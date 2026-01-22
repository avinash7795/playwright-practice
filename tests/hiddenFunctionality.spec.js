const { test, expect } = require('@playwright/test');

test('Hidden element functionality', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    /* logic to check the backward and forward navigation feature
    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();
    */

    //assertion to make sure the text is visible before hiding
    await expect(page.locator('#displayed-text')).toBeVisible();
    //clicking on hide button to hide the text
    await page.locator("#hide-textbox").click();
    //assertion to make sure the text is hidden
    await expect(page.locator('#displayed-text')).toBeHidden();
    //code to enable debugging
    //await page.pause();
    //listener to wait for alert to appear and clicking on ok
    page.on('dialog', dialog => dialog.accept());
    //clicking on "Confirm" button to display the alert
    await page.locator("#confirmbtn").click();
    //method to mouse hover on a particular web element
    await page.locator("#mousehover").hover();
    //switching to iframe from main page and storing the refrence in a variable
    const framePage = page.frameLocator("#courses-iframe");
    //locating the required element using visible feature in locator if rest of the elements are invisible
    await framePage.locator("li a[href='lifetime-access']:visible").click();
    //fetching the required text from the iframe web page
    const textContent = await framePage.locator("div[class='text'] h2").textContent();
    //separating the required text from the sentence
    console.log(textContent.split(" ")[1]);
})
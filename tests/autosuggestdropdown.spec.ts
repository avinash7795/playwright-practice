import { test, Locator } from "@playwright/test";

test("Auto-suggest dropdown values printing", async ({ page }) => {
    await page.goto("https://www.google.com");
    await page.locator("textarea[name='q']").fill("smart");
    await page.waitForTimeout(5000);
    const options: Locator = page.locator("ul>li");
    const count = await options.count();
    console.log("Number of suggested options: " + count);
    console.log("5th option ", await options.nth(5).innerText());
    console.log("Printing all options");
    for (let i = 0; i < count; i++) {
        console.log(await options.nth(i).innerText());
    }

})
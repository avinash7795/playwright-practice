import { test, Locator } from "@playwright/test";

test("Auto-suggest dropdown values printing", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("input[name='username']").fill("Admin");
    await page.locator("input[name='password']").fill("admin123");
    await page.locator("button[type='submit']").click();
    await page.getByText("PIM").click();
    await page.locator('form i').nth(2).click();
    const options: Locator = page.locator("div[role='listbox'] span");
    await page.waitForTimeout(3000);
    const count: number = await options.count();
    console.log("Number of options in a dropdown: ", count);
    for (let i = 0; i < count; i++) {
        console.log(await options.nth(i).innerText());
    }

    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).innerText();
        if (text === 'Automation Tester') {
            await options.nth(i).click();
            break;
        }
    }

})
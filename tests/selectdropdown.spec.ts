import { test, expect, Locator } from "@playwright/test";

test("select dropdown options", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    const dropdownOptions: Locator = page.locator("#country option");
    await expect(dropdownOptions).toHaveCount(10);
    const optionsText: string[] = (await dropdownOptions.allTextContents()).map((ele) => ele.trim());
    expect(optionsText).toContain("Japan");

    const multiselectdropdown: Locator = page.locator("#colors");
    await multiselectdropdown.selectOption(['Red', 'Green']);




})
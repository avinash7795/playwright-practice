import { test, expect, Locator } from "@playwright/test";

test("select dropdown options", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    const dropdownOptions: Locator = page.locator("#animals option");
    const dropdownTextContent: string[] = await dropdownOptions.allTextContents();
    const trimmedText = dropdownTextContent.map(text => text.trim());
    const orginalList: string[] = [...trimmedText];
    const sortedTrimmedText: string[] = [...trimmedText].sort();
    expect(orginalList).toEqual(sortedTrimmedText);




})
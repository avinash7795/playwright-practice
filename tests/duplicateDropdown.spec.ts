import { test, expect, Locator } from "@playwright/test";

test("select dropdown options", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    const dropdownOptions: Locator = page.locator("#colors option");
    const optionsText: string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());
    const myset = new Set<string>();
    const duplicates: string[] = [];
    for (const text of optionsText) {
        if (myset.has(text)) {
            duplicates.push(text);
        }
        else {
            myset.add(text);
        }
    }
    console.log("duplicate values: " + duplicates);
    if (duplicates.length > 0) {
        console.log("Duplicate options found");
    }
    else {
        console.log("Duplicates options not found");
    }

    expect(duplicates.length).toBe(0);
})
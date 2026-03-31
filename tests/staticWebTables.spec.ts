import { test, expect, Locator } from "@playwright/test";

test("Static Web Table", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table: Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();
    const rows: Locator = page.locator("table[name='BookTable'] tbody tr");
    await expect(rows).toHaveCount(7);
    const rowCount: number = await rows.count();
    console.log("Number of rows in a table: ", rowCount);
    expect(rowCount).toBe(7);
    const columns: Locator = table.locator("tr th");
    await expect(columns).toHaveCount(4);
})

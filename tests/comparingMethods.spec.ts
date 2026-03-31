import { test, expect, Locator } from "@playwright/test";

test("Comparing Methods", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const products: Locator = page.locator(".product-title");
    console.log(await products.nth(1).innerText());
    console.log(await products.nth(1).textContent());
    const productsCount: number = await products.count();
    for (let i = 0; i < productsCount; i++) {
        const productName: any = await products.nth(1).innerText();
        console.log(productName);
    }


})

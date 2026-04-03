import { test, expect, Locator, Page } from "@playwright/test";

async function selectDate(targetYear: string, targetMonth: string, targetDay: string, page: Page, isFuture: boolean) {

    while (true) {
        const currentMonth: any = await page.locator(".ui-datepicker-month").textContent();
        const currentYear: any = await page.locator(".ui-datepicker-year").textContent();
        if (currentMonth === targetMonth && currentYear === targetYear) {
            break;
        }
        if (isFuture) {
            //future date
            await page.locator(".ui-datepicker-next").click();
        }
        else {
            await page.locator(".ui-datepicker-prev").click();
        }
    }

    const allDates: Locator[] = await page.locator(".ui-datepicker-calendar td").all();
    for (let dt of allDates) {
        const dateText = await dt.innerText();
        if (dateText === targetDay) {
            await dt.click();
            break;
        }
    }

}

test("Jquery date picker validations", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const dateInput: Locator = page.locator("#datepicker");
    expect(dateInput).toBeVisible();
    //Approach 1: using fill method
    //dateInput.fill("04/03/2026");

    //Approach 2: using date picker
    await dateInput.click();

    const year = '2026';
    const month = 'June';
    const date = '3';

    await selectDate(year, month, date, page, true);

    const expectedDate = "06/03/2026";
    await expect(dateInput).toHaveValue(expectedDate);
})
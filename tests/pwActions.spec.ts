import { test, expect, Locator } from "@playwright/test";

//input box actions
test("Text Input Actions", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    const textBox: Locator = page.locator("#name");
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();
    const maxlength: any = await textBox.getAttribute("maxlength");
    expect(maxlength).toBe("15");
    await textBox.fill("John Kennedy");
    const enteredValue = await textBox.inputValue();
    expect(enteredValue).toBe("John Kennedy");
});

//radio button actions
test("Radio Button Actions", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    const maleRadioBtn: Locator = page.locator("#male");
    await expect(maleRadioBtn).toBeVisible();
    await expect(maleRadioBtn).toBeEnabled();
    expect(await maleRadioBtn.isChecked()).toBeFalsy();
    await maleRadioBtn.check();
    await expect(maleRadioBtn).toBeChecked();
});


test("Check Box Actions", async ({ page }) => {

    //select specific checkbox
    await page.goto("https://testautomationpractice.blogspot.com/");
    const sundayCheckBox: Locator = page.getByLabel("Sunday");
    await sundayCheckBox.check();
    await expect(sundayCheckBox).toBeChecked();


    const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const checkboxes: Locator[] = days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);
    //select all checkboxes
    for (const checkbox of checkboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    //unselect last 3 checkboxes
    for (const checkbox of checkboxes.slice(-3)) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }
    //unselect already selected checkboxes and select already unselected checkboxes
    for (const checkbox of checkboxes) {
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        }
        else {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }
});



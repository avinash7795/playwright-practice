import { test, expect } from '@playwright/test';

test('test to-do app', async ({ page }) => {

    await test.step("Navigating to 'To Do Mvc' website", async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
    });
    await test.step("Typing 'wake up' task in todo list", async () => {
        await page.getByTestId('text-input').click();
        await page.getByTestId('text-input').fill('Wake up');
        await page.getByTestId('text-input').press('Enter');
    });
    await test.step("Typing 'Have Tea' task in todo list", async () => {
        await page.getByTestId('text-input').fill('Have Tea');
        await page.getByTestId('text-input').press('Enter');
    });

    await test.step("Typing 'Walk' task in todo list", async () => {
        await page.getByTestId('text-input').fill('Walk');
        await page.getByTestId('text-input').press('Enter');
    });

    await test.step("Typing 'Ypie' task in todo list", async () => {
        await page.getByTestId('text-input').fill('Ypie');
        await page.getByTestId('text-input').press('Enter');
    });

    await test.step("Typing 'Office' task in todo list", async () => {
        await page.getByTestId('text-input').fill('Office');
        await page.getByTestId('text-input').press('Enter');
    });

    await test.step("Typing 'Rest' task in todo list", async () => {
        await page.getByTestId('text-input').fill('Rest');
        await page.getByTestId('text-input').press('Enter');
    });

    await test.step("Typing 'Sleep' task in todo list", async () => {
        await page.getByTestId('text-input').fill('Sleep');
        await page.getByTestId('text-input').press('Enter');
    });

    await test.step("Selecting radio buttons of 'Walk and Office' tasks in todo list", async () => {
        await page.getByRole('listitem').filter({ hasText: 'Walk' }).getByTestId('todo-item-toggle').check();
        await page.getByRole('listitem').filter({ hasText: 'Office' }).getByTestId('todo-item-toggle').check();
    });

    await test.step("Navigating to 'Active' tab", async () => {
        await page.getByRole('link', { name: 'Active' }).click();
    });

    await test.step("Validating the task 'Wake up' is present in the todo list", async () => {
        await expect.soft(page.getByText('Wake up')).toBeVisible();
    });

    await test.step("Validating the count in to-do list", async () => {
        await expect.soft(page.locator('.todo-list li')).toHaveCount(5);
    });

});
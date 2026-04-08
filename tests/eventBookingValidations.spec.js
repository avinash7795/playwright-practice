import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com'
const USER_EMAIL = 'kunapareddy.avi@gmail.com';
const USER_PASSWORD = 'Logic2@event';

//login function
async function login(page) {
    await page.goto(`${BASE_URL}/login`);

    // Locate by placeholder
    await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);

    // Locate by label
    await page.getByLabel('Password').fill(USER_PASSWORD);

    // Locate 'sign-in' button by id
    await page.locator('#login-btn').click();

    //validating the 'Browse Events' link is visible
    await expect(page.getByText('Browse Events →')).toBeVisible();
}


// ── Test ───────────────────────────────────────────────────────────────────────
test('create event through UI, book it, and verify seat reduction', async ({ page }) => {

    // Step 1: Log in
    await login(page);

    // Step 2: Create a new event via the admin form
    // navigating to 'Manage Events' page from Admin tab
    await page.goto(`${BASE_URL}/admin/events`);

    // Generating unique title to find this exact card later
    const eventTitle = `QA Summit ${Date.now()}`;

    // typing event title in Title text box
    await page.locator('#event-title-input').fill(eventTitle);

    // textarea in the form (Description)
    await page.locator('#admin-event-form textarea').fill('Sample test event');

    // Located by label (Select auto-generates id from label text)
    await page.getByLabel('City').fill('Chennai');
    await page.getByLabel('Venue').fill('Test Venue');

    // datetime-local input — located by label
    await page.getByLabel('Event Date & Time').fill('2026-05-31T10:00');

    await page.getByLabel('Price ($)').fill('110');
    await page.getByLabel('Total Seats').fill('75');

    //Click on 'Add Event' button
    await page.locator('#add-event-btn').click();

    // Wait for success toast and validate
    await expect(page.getByText('Event created!')).toBeVisible();

    console.log(`Created event: "${eventTitle}"`);

    // Step 3: Go to Events page and find the newly created card
    await page.goto(`${BASE_URL}/events`);

    // Located by data-testid
    const eventCards = page.getByTestId('event-card');
    await expect(eventCards.first()).toBeVisible();

    // Scan all visible event cards for the one matching our created title
    const targetCard = eventCards.filter({ hasText: eventTitle }).first();
    await expect(targetCard).toBeVisible({ timeout: 5000 });

    // Capture seat count before booking
    const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
    console.log(`Seats before booking: ${seatsBeforeBooking}`);

    // Located by data-testid inside the matched card
    await targetCard.getByTestId('book-now-btn').click();

    // ── Step 4: Fill the booking form ────────────────────────────────────────

    // Quantity defaults to 1 — verify via id
    const ticketCount = page.locator('#ticket-count');
    await expect(ticketCount).toHaveText('1');

    // Located by label
    await page.getByLabel('Full Name').fill('Avinash');

    // Located by id
    await page.locator('#customer-email').fill('kunapareddy.avi@gmail.com');

    // Located by placeholder
    await page.getByPlaceholder('+91 98765 43210').fill('9876543210');

    // clicking on 'Confirm Booking' button
    await page.locator('.confirm-booking-btn').click();

    // Step 5: Verify booking confirmation

    // Located by CSS class
    const bookingRefEl = page.locator('.booking-ref').first();
    await expect(bookingRefEl).toBeVisible();

    const bookingRef = (await bookingRefEl.innerText()).trim();
    expect(bookingRef.charAt(0)).toBe(eventTitle.trim().charAt(0).toUpperCase());

    console.log(`Booking confirmed. Ref: ${bookingRef}`);

    // ── Step 6: Verify booking appears in My Bookings ────────────────────────
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

    // Located by id
    const bookingCards = page.locator('#booking-card');
    await expect(bookingCards.first()).toBeVisible();

    // Find the card that contains our booking ref (via CSS class inside the card)
    const matchingCard = bookingCards.filter({ has: page.locator('.booking-ref', { hasText: bookingRef }) });
    await expect(matchingCard).toBeVisible();

    // Verify event title also appears in the same card
    await expect(matchingCard).toContainText(eventTitle);

    console.log(`Booking card found in My Bookings for ref: ${bookingRef}`);

    // ── Step 7: Verify seat count reduced on Events page ─────────────────────
    await page.goto(`${BASE_URL}/events`);
    await expect(eventCards.first()).toBeVisible();

    // Find the same event by title
    const updatedCard = eventCards.filter({ hasText: eventTitle }).first();
    await expect(updatedCard).toBeVisible();

    const seatsAfterBooking = parseInt(await updatedCard.getByText('seat').first().innerText());
    console.log(`Seats after booking: ${seatsAfterBooking}`);

    // Booked 1 ticket — count must drop by exactly 1
    expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
});

// Import the necessary modules from the Playwright library
const { test, expect } = require('@playwright/test');

// Define a test suite for 'Authentication'
test.describe('Authentication', () => {

  // Increase the timeout for the entire test to 90 seconds to be very safe
  test.setTimeout(90000);
  
  test('should allow a super admin to log in successfully', async ({ page }) => {
    
    // Step 1: Navigate to the application's base URL
    await page.goto('https://qa-getdal-3a.getdal.sa/');

    // Step 2: **THE MOST IMPORTANT STEP**
    // Explicitly wait for the email input field to be visible on the page.
    // We will wait for up to 60 seconds just for this element to appear.
    const emailInput = page.locator('input[type="email"]');
    await emailInput.waitFor({ state: 'visible', timeout: 60000 });

    // Step 3: Now that we KNOW the email field is visible, fill it.
    await emailInput.fill('admin@getdal.com');

    // Step 4: Fill the password input field. It should already be visible too.
    await page.locator('input[type="password"]').fill('MKVXZ(%*@!23r');

    // Step 5: Click the "Sign In" button.
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Step 6: For the dashboard, we will do the same - wait for a key element.
    const dashboardHeading = page.getByRole('heading', { name: 'Welcome, Super Admin' });
    await dashboardHeading.waitFor({ state: 'visible', timeout: 60000 });

    // Step 7: Now we can safely assert that it is visible.
    await expect(dashboardHeading).toBeVisible();
    await expect(page).toHaveURL('https://qa-getdal-3a.getdal.sa/');
  });
});
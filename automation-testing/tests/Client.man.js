// Import the necessary modules from the Playwright library
const { test, expect } = require('@playwright/test');

// We can group all Client Management tests in this suite
test.describe('Client Data Management', () => {

    // Before each test in this file, we will first log in.
    // This is a "hook" that runs before each 'test' block.
    test.beforeEach(async ({ page }) => {
        // We are reusing our robust login code. If this fails, the test will stop.
        await page.goto('https://qa-getdal-3a.getdal.sa/', { timeout: 60000 });
        const emailInput = page.locator('input[type="email"]');
        await emailInput.waitFor({ state: 'visible', timeout: 60000 });
        await emailInput.fill('admin@getdal.com');
        await page.locator('input[type="password"]').fill('MKVXZ(%*@!23r');
        await page.getByRole('button', { name: 'Sign In' }).click();
        const dashboardHeading = page.getByRole('heading', { name: 'Welcome, Super Admin' });
        await dashboardHeading.waitFor({ state: 'visible', timeout: 60000 });
    });


    // TEST CASE 1: Verify the client list page is accessible.
    test('should allow navigation to the client list page', async ({ page }) => {
        // Step 1: Click on the "Clients" link in the navigation menu.
        await page.getByRole('link', { name: 'Clients' }).click();

        // Step 2: Verify we have landed on the correct page by checking for a unique element.
        // The "Import File" button is a good, stable element to check for.
        await expect(page.getByRole('button', { name: 'Import File' })).toBeVisible();
        
        // Step 3: We can also check that the URL is correct.
        await expect(page).toHaveURL('https://qa-getdal-3a.getdal.sa/clients');
    });


    // TEST CASE 2: Automate the "Add Client" happy path.
    test('should allow creating a new client with all mandatory fields', async ({ page }) => {
        // Step 1: Navigate to the clients page.
        await page.getByRole('link', { name: 'Clients' }).click();

        // Step 2: Click the "Add Client" button.
        await page.getByRole('button', { name: 'Add Client' }).click();

        // Step 3: Fill in all the mandatory fields we discovered during manual testing.
        const idNumber = `15${Math.floor(10000000 + Math.random() * 90000000)}`; // Generate a unique ID number

        await page.getByText('ID Type').click(); // This is an example, the selector might need to be more specific
        await page.getByRole('option', { name: 'National Identity' }).click();

        await page.getByPlaceholder('ID Number').fill(idNumber);
        await page.getByPlaceholder('First Name').fill('Automated');
        await page.getByPlaceholder('Last Name').fill('Client');
        await page.getByPlaceholder('First Name Arabic').fill('عميل');
        await page.getByPlaceholder('Last Name Arabic').fill('آلي');
        await page.getByText('Nationality').click(); // Example selector
        await page.getByRole('option', { name: 'Saudi Arabia' }).click();
        
        // Step 4: Click the button to create the client.
        // NOTE: The button text needs to be confirmed from the UI (e.g., "Save", "Create Client")
        await page.getByRole('button', { name: 'Create Client' }).click();

        // Step 5: Assert that the client was created.
        // We expect to see a success toast/pop-up message.
        await expect(page.getByText('Client has been created successfully')).toBeVisible();

        // Bonus: We could also verify the new client appears in the client list.
        await expect(page.getByText(idNumber)).toBeVisible();
    });

});
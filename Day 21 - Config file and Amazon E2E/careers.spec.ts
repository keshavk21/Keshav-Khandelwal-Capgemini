import { test, expect } from '@playwright/test';

import CareersPage from './careers.page';
test('Careers', async ({ page }) => {
    const careersPage = new CareersPage(page);
    await page.goto('https://www.amazon.in/');
    careersPage.getCareers();
    careersPage.filter();
    careersPage.JobPage();
    careersPage.Apply();
});

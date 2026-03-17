import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '../../testdata/amazon-addcart-data.json');

test('Amazon Add to cart using data-driven JSON', async ({ page }) => {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(raw);

  await page.goto(data.url, { waitUntil: 'domcontentloaded' });

  await page.locator('#twotabsearchtextbox').fill(data.searchTerm);
  await page.locator('#nav-search-submit-button').click();
  await page.waitForLoadState('domcontentloaded');

  const ramLabel = page.locator(`text=${data.ramFilterLabel}`);
  await expect(ramLabel).toBeVisible({ timeout: 10000 });
  await ramLabel.click();

  const results = page.locator('//div[@class="a-section aok-relative s-image-fixed-height"]').nth(3);
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    results.click(),
  ]);

  await popup.waitForLoadState('domcontentloaded');

  const quantitySelect = popup.locator('select#quantity, select[name="quantity"]');
  if (await quantitySelect.count()) {
    await quantitySelect.selectOption(data.quantity);
  }

  await popup.locator('#add-to-cart-button').nth(1).click();
  await popup.close();
});

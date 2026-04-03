import { test, expect } from "@playwright/test";

test("Combined Xpath", async ({ page }) => {
    await page.goto("https://www.prokabaddi.com/schedule-fixtures-results?tab=recent");

    const elements = page.locator(
        '(//div[@class="team team-a"]/div/p)[1] | (//div[@class="team team-a"]/div/p)[2] | (//div[@class="team team-b"]/div/p)[1] | (//div[@class="team team-b"]/div/p)[2] | (//p[@class="match-place"])[1] | (//p[@class="match-count"])[1]'
    );

    const count = await elements.count();

    for (let i = 0; i < count; i++) {
        const text = await elements.nth(i).innerText();
        console.log(text);
    }
});
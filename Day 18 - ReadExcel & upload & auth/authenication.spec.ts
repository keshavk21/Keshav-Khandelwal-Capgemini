import { test, expect } from '@playwright/test';

test('authentication', async ({ browser }) => {
    let context = await browser.newContext({httpCredentials:{username:"admin",password:"admin"}})
    const page = await context.newPage()
    await page.goto("https://basic-auth-git-main-shashis-projects-4fa03ca5.vercel.app/")
    await page.waitForTimeout(7000)
});

test.only('auth2', async ({ browser }) => {
    let context = await browser.newContext({httpCredentials:{username:"admin",password:"admin"}})
    const page = await context.newPage()
    await page.goto("https://the-internet.herokuapp.com/basic_auth")
    const p=await page.locator('//div[@id="content"]//p')
    await expect(p).toHaveText("Congratulations! You must have the proper credentials.")
});

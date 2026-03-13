import {test} from '@playwright/test';

test('notification', async ({browser}) => {
    const page = await browser.newPage();
    await page.goto("https://demoapps.qspiders.com/ui/browserNot?sublist=0")
    await page.locator('#browNotButton').click();
    await page.evaluate(() => {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('This is a notification!');
            }
        })
    })
})
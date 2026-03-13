import {test} from '@playwright/test'
//! Handling all Dialog at once

test('test name', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    page.on("dialog",dialog=>{
        dialog.accept("Sarthak");
    })
    await page.getByRole("button",{name:"Simple Alert"}).click();
    await page.getByRole("button",{name:"Confirmation Alert"}).click();
    await page.getByRole("button",{name:"Prompt Alert"}).click();
    await page.pause();
});


//! Handling each Dialog seperately
test.only("Alerts",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    page.once('dialog',async dialog=>{
        await dialog.accept();
    })
    await page.getByRole("button",{name:"Simple Alert"}).click();
    page.once('dialog',async dialog=>{
        await dialog.accept();
    })
    await page.getByRole("button",{name:"Confirmation Alert"}).click();
    page.once('dialog',async dialog=>{
        await dialog.accept("Sarthak");
    })
    await page.getByRole("button",{name:"Prompt Alert"}).click();
    await page.pause();
    await page.waitForTimeout(12000);
    

})
import {test} from '@playwright/test';

test ("frames", async({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");
    const frames = await page.frames();
    console.log(frames);
    for(let i of frames){
        console.log(await i.title());
    }
    await page.title();

    let frame1 = await page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1.html"});
    let frame3 = await page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3.html"});
    await frame1?.locator('//input[@name="mytext1"]').fill("welcome");
    await frame3?.frameLocator('(//div[@class="AB7Lab Id5V1"])[2]');
})

test.only("Nested frame",async({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");
    const frame3=await page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3.html"});
    const iframe=await frame3?.frameLocator('//iframe')
    await iframe?.locator('//div[@class="AB7Lab Id5V1"]').first().click();
})
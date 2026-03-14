import { test, expect } from '@playwright/test'; 

import path from 'path'

test('waitforeventdownload',async({browser})=>{
    const page = await browser.newPage()
    await page.goto("https://demoapps.qspiders.com/ui/download?sublist=0")
    await page.getByPlaceholder("Enter text here").fill("Hello World")
    await page.getByPlaceholder("Filename").fill("hello.txt")
    const path1="C://Users//OMEN//Desktop//CapG//tests//date_13_03_26//downloads"
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('#downloadButton').click()
    ])
    let filename=await download.suggestedFilename()
    console.log(filename);
    await download.saveAs(path.join(path1, filename))
})
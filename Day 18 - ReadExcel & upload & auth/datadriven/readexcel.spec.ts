import { test, expect } from '@playwright/test';
import { table } from 'console';
import excel from 'exceljs'
import path from 'path'
test('Read Excel', async ({ page }) => {
    const workbook = new excel.Workbook();
    await workbook.xlsx.readFile(path.join(__dirname, '../../../testdata/excel2.xlsx'));
    const sheet = workbook.getWorksheet('Sheet1');
    const value = sheet?.getRow(1).getCell(1).toString()
    const val2= sheet?.getRow(1).getCell(1).value
    console.log(value);
    console.log(typeof value);
    for (let i = 1; i <= sheet?.rowCount!; i++) {
        for (let j = 1; j <= sheet?.columnCount!; j++) {
            const cellValue = sheet?.getRow(i).getCell(j).toString();
            console.log(cellValue);
        }
    }
});

test.only('Itrate', async ({ page }) => {
    let url = "https://demoapps.qspiders.com/ui?scenario=1"
    await page.goto(url)
    const name=await page.locator("#name")
    const email=await page.locator("#email")
    const password=await page.locator("#password")
    const workbook = new excel.Workbook();
    await workbook.xlsx.readFile(path.join(__dirname, '../../../testdata/iterate_task.xlsx'));
    const sheet = workbook.getWorksheet('Sheet1');
    for (let i = 1; i <= sheet?.rowCount!; i++) {
        const nameValue = sheet?.getRow(i).getCell(1).toString();
        const emailValue = sheet?.getRow(i).getCell(2).toString();
        const passwordValue = sheet?.getRow(i).getCell(3).toString();
        await name.fill(nameValue!)
        await email.fill(emailValue!)
        await password.fill(passwordValue!)
            
        }
    });

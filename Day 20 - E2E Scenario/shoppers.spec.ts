import { test } from "@playwright/test";
import { ShoppersPage } from "./../../POM/login.page.ts";
import data from "./../../testdata/shopperstack.json";

test("ShoppersStack Flow", async ({ page }) => {

    const shop = new ShoppersPage(page);

    await page.goto(data.url);

    await shop.openLogin();
    await shop.login(data.username, data.password);

    await shop.addProduct();

    await shop.openCart();

    await shop.removeProduct();

    await shop.logout();

});
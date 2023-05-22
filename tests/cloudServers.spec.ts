import { test, expect } from "@playwright/test";
import { Users } from "../data/Users";
import { loginPageURL, cloudServersPageURL, paymentMethodsPageURL } from "../data/GeneralData";
import { LoginPage } from "../page_objects/LoginPage";
import { CloudServersPage } from "../page_objects/CloudServersPage";

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(loginPageURL);
    const loginPage = new LoginPage(page);
    await loginPage.doLogin(Users.User01);
    await page.goto(cloudServersPageURL);
});

test('Order cloud server', async ({ page }) => {
    //Actions
    const cloudServersPage = new CloudServersPage(page);
    const createCloudServerPage = await cloudServersPage.clickCreateServerButton();
    await createCloudServerPage.pickServerOption('Dallas');
    await createCloudServerPage.pickServerOption('Almalinux 8 (64 bit)');
    await createCloudServerPage.pickServerOption('SSD.301 vCPU, 1024 MB RAM, 30 GB SSD2048 GB free traffic, €0.01* / / GB overuse€4.53 / MonthUSD ⇒ EUR');
    await createCloudServerPage.pickServerOption('key_2023-05-21_14-15-09 (a5:8e:7b:57:94:b6:8b:1c:cc:c4:87:de:3d:8d:ef:4f)');
    await createCloudServerPage.inputServerName('TestServerName');
    const paymentMethodsPage = await createCloudServerPage.clickCreateServerButton();

    //Validation
    await expect(page).toHaveURL(paymentMethodsPageURL);
    await paymentMethodsPage.isPaymentMethodsPageLoaded();
});
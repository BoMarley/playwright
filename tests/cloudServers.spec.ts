import { test, expect } from "@playwright/test";
import { Users } from "../data/Users";
import { loginPageURL, cloudServersPageURL, paymentMethodsPageURL } from "../data/GeneralData";
import { CloudServersData } from "../data/CloudServersData";
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
    await createCloudServerPage.pickServerOption(CloudServersData.Location.Dallas);
    await createCloudServerPage.pickServerOption(CloudServersData.Image.Almalinux8);
    await createCloudServerPage.pickServerOption(CloudServersData.Config.SSD30);
    await createCloudServerPage.pickServerOption(CloudServersData.SSH.ssh01);
    await createCloudServerPage.inputServerName('TestServerName');
    const paymentMethodsPage = await createCloudServerPage.clickCreateServerButton();

    //Validation
    await paymentMethodsPage.isPaymentMethodsPageLoaded();
});
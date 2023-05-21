import { test, expect } from "@playwright/test";
import { Users } from "../data/Users";
import {contactsPageURL, loginPageURL, mainDashboardURL} from "../data/GeneralData";
import { LoginPage } from "../page_objects/LoginPage";

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(loginPageURL);
});

test('Login', async ({ page }) => {
    // Actions
    const loginPage = new LoginPage(page);
    await loginPage.doLogin(page, Users.User01);

    // Validation
    await expect(page).toHaveURL(mainDashboardURL);
});

test('Logout', async ({ page }) => {
    // Actions
    const loginPage = new LoginPage(page);
    const topBar = await loginPage.doLogin(page, Users.User01);
    await topBar.doLogout(page);

    // Validation
    await expect(page).toHaveURL(loginPageURL);
});

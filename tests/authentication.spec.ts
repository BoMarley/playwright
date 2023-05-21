import { test, expect } from "@playwright/test";
import { Users } from "../data/Users";
import { loginPageURL, mainDashboardURL } from "../data/GeneralData";
import { LoginPage } from "../page_objects/LoginPage";

test('Login', async ({ page }) => {
    // Actions
    await page.goto(loginPageURL);
    const loginPage = new LoginPage(page);
    await loginPage.doLogin(page, Users.User01);

    // Validation
    await expect(page).toHaveURL(mainDashboardURL);
});

test('Logout', async ({ page }) => {
    // Actions
    await page.goto(loginPageURL);
    const loginPage = new LoginPage(page);
    const topBar = await loginPage.doLogin(page, Users.User01);
    await topBar.doLogout();

    // Validation
    await expect(page).toHaveURL(loginPageURL);
});

import { test, expect } from "@playwright/test";
import { Users } from "../data/Users";
import { loginPageURL, mainDashboardURL} from "../data/GeneralData";
import { LoginPage } from "../page_objects/LoginPage";

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(loginPageURL);
});

test('Login', async ({ page }) => {
    // Actions
    const loginPage = new LoginPage(page);
    const topBar = await loginPage.doLogin(Users.User01);

    // Validation
    await topBar.isMainDashboardPageLoaded();
});

test('Logout', async ({ page }) => {
    // Actions
    const loginPage = new LoginPage(page);
    const topBar = await loginPage.doLogin(Users.User01);
    await topBar.doLogout();

    // Validation
    await loginPage.isLoginPageLoaded();
});

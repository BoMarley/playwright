import {expect, Locator, Page} from "@playwright/test";
import {LoginPage} from "./LoginPage";
import {mainDashboardURL} from "../data/GeneralData";

export class TopBar {
    readonly page: Page;
    readonly userProfileMenu: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userProfileMenu = page.locator('div[class="c1asuurm"]');
        this.logoutButton = page.getByRole('button', { name: 'Logout' });

    }

    async isMainDashboardPageLoaded() {
        await expect(this.page).toHaveURL(mainDashboardURL);
        await this.userProfileMenu.waitFor();
    }

    async doLogout() {
        await this.userProfileMenu.click();
        await this.logoutButton.click();
        return new LoginPage(this.page);
    }
}
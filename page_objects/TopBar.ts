import { Locator, Page } from "@playwright/test";

export class TopBar {
    readonly page: Page;
    readonly userProfileMenu: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userProfileMenu = page.locator('div[class="c1asuurm"]');
        this.logoutButton = page.getByRole('button', { name: 'Logout' });

    }

    async doLogout() {
        await this.userProfileMenu.click();
        await this.logoutButton.click();
    }
}
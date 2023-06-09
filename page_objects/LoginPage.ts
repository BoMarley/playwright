import {expect, Locator, Page} from '@playwright/test';
import { TopBar } from "./TopBar";
import {loginPageURL} from "../data/GeneralData";

export class LoginPage {
    readonly page: Page;
    readonly emailInputField: Locator;
    readonly passwordInputField: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInputField = page.locator('#email');
        this.passwordInputField = page.locator('#password');
        this.signInButton = page.getByText('Sign in');
    }

    async doLogin (User: { password: string; email: string }) {
        await this.emailInputField.fill(User.email)
        await this.passwordInputField.fill(User.password);
        await this.signInButton.click();
        await this.page.locator('nav').waitFor();
        return new TopBar(this.page);
    }

    async isLoginPageLoaded() {
        await expect(this.page).toHaveURL(loginPageURL);
        await this.emailInputField.waitFor();
        await this.passwordInputField.waitFor();
    }
}


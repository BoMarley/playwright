import { Locator, Page } from "@playwright/test";
import {PaymentMethodsPage} from "./PaymentMethodsPage";

export class CreateCloudServerPage {
    readonly page: Page;
    readonly createCloudServerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createCloudServerButton = page.getByRole('button', {name: 'Create Cloud Server'})

    }

    async pickServerOption(location) {
        await this.page.getByLabel(location).click();
    }

    async inputServerName(serverName) {
        await this.page.locator('input[name="name"]').fill(serverName);
    }

    async clickCreateServerButton() {
        await this.createCloudServerButton.click();
        return new PaymentMethodsPage(this.page);
    }
}
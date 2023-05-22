import { Locator, Page } from "@playwright/test";
import { CreateCloudServerPage } from "./CreateCloudServerPage";

export class CloudServersPage {
    readonly page: Page;
    readonly createServerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createServerButton = page.getByRole('button', {name: 'Create server'})

    }

    async clickCreateServerButton() {
        await this.createServerButton.click();
        await this.page.getByRole('heading', { name: 'Location' }).getByText('Location').waitFor();
        return new CreateCloudServerPage(this.page);
    }
}
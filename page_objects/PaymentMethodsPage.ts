import { Locator, Page } from "@playwright/test";

export class PaymentMethodsPage {
    readonly page: Page;
    readonly addNewCardButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addNewCardButton = page.getByRole('button', {name: 'Add new card'})

    }

    async isPaymentMethodsPageLoaded() {
        await this.addNewCardButton.waitFor();
    }
}
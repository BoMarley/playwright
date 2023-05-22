import {expect, Locator, Page} from "@playwright/test";
import {paymentMethodsPageURL} from "../data/GeneralData";

export class PaymentMethodsPage {
    readonly page: Page;
    readonly addNewCardButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addNewCardButton = page.getByRole('button', {name: 'Add new card'})

    }

    async isPaymentMethodsPageLoaded() {
        await expect(this.page).toHaveURL(paymentMethodsPageURL);
        await this.addNewCardButton.waitFor();
    }
}
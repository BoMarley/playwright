import { expect, Locator, Page } from '@playwright/test';
import { NewContactForm } from "../page_objects/NewContactForm";
import {ContactInfo} from "./ContactInfo";

export class ContactsPage {
    readonly page: Page;
    readonly createContactButton: Locator;
    readonly contactsTableLines: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createContactButton = page.getByRole('button', { name: 'Create' })
        this.contactsTableLines = page.locator('tr');
    }

    async countExistingContacts() {
        await this.page.waitForSelector('button i.fa.fa-trash');
        let numberOfContacts = await this.contactsTableLines.count();
        return (numberOfContacts - 1);
    }

    async clickCreateContactButton(page) {
        await this.createContactButton.click();
        return new NewContactForm(page);
    }

    async deleteContact(page) {
        await this.page.locator('button i.fa.fa-trash').first().click();
        await this.page.getByTitle('Delete').click();
        await this.page.getByTitle('Refresh').click();
        return ContactsPage;
    }

    async openTopContact(page): Promise<ContactInfo> {
        await this.contactsTableLines.nth(1).click();
        await this.page.locator('div[role="region"]').nth(5).waitFor();
        return new ContactInfo(page);
    }
}

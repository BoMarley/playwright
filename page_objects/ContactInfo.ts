import { expect, Locator, Page } from "@playwright/test";
import { ContactData } from "../data/ContactData";
import { NewContactForm } from "./NewContactForm";

export class ContactInfo {
    readonly page: Page;
    readonly firstName: Locator;
    readonly editButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.editButton = page.getByText('Edit');
    }

    async validateContactInfoPageContent() {
        await expect(this.page.getByText(ContactData.ValidContactDataForCreation.firstName)).toBeVisible();
        await expect(this.page.getByText(ContactData.ValidContactDataForCreation.lastName)).toBeVisible();
        await expect(this.page.getByText(ContactData.ValidContactDataForCreation.middleName)).toBeVisible();
        await expect(this.page.getByText(ContactData.ValidContactDataForCreation.email)).toBeVisible();
        await expect(this.page.getByText(ContactData.ValidContactDataForCreation.secondaryEmail)).toBeVisible();
        await expect(this.page.getByText(ContactData.ValidContactDataForCreation.phoneNumber)).toBeVisible();
        await expect(this.page.getByText(ContactData.ValidContactDataForCreation.company)).toBeVisible();
        await expect(this.page.getByText(ContactData.ValidContactDataForCreation.jobTitle)).toBeVisible();
        await expect(this.page.getByText(ContactData.ValidContactDataForCreation.jobRole)).toBeVisible();
        await expect(this.page.getByText(ContactData.ValidContactDataForCreation.nickName)).toBeVisible();
        await expect(this.page.getByText(ContactData.ValidContactDataForCreation.comments)).toBeVisible();
        await expect(this.page.getByText(ContactData.ValidContactDataForCreation.moreDetails)).toBeVisible();
        //TODO need to add checkbox'ed role validation!
    }

    async getContactName () {
        //TODO dom tree in contact info page is extremely inconvenient. Why not table? Need to discuss with devs
        const contactNameElement = await this.page.waitForSelector('//*[@id="app"]/div/div/div[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div[1]/div[2]/span/span');
        const contactName = await this.page.evaluate(element => element.textContent, contactNameElement);
        return contactName;
    }

    async clickEditButton(page) {
        await this.editButton.click();
        return new NewContactForm(page);
    }
}
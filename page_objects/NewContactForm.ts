import { Locator, Page } from "@playwright/test";
import { ContactInfo } from "./ContactInfo";

export class NewContactForm {
    readonly page: Page;
    readonly firstNameInputField: Locator;
    readonly lastNameInputField: Locator;
    readonly middleNameInputField: Locator;
    readonly emailInputField: Locator;
    readonly secondaryEmailInputField: Locator;
    readonly phoneNumber: Locator;
    readonly technicalCheckbox: Locator;
    readonly companyInputField: Locator;
    readonly jobTitleInputField: Locator;
    readonly jobRoleInputField: Locator;
    readonly nickNameInputField: Locator;
    readonly commentsInputField: Locator;
    readonly addMoreDetailsButton: Locator;
    readonly moreDetailsInputField: Locator;
    readonly createButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInputField = page.locator('div#fname input');
        this.lastNameInputField = page.locator('div#lname input');
        this.middleNameInputField = page.locator('div#tokens\\.middlename input');
        this.emailInputField = page.locator('div#email input');
        this.secondaryEmailInputField = page.locator('div#email2 input');
        this.phoneNumber = page.locator('div#phone_number input');
        this.technicalCheckbox = page.getByRole('checkbox', { name: 'Technical' });
        this.companyInputField = page.locator('div#tokens\\.company input');
        this.jobTitleInputField = page.locator('div#tokens\\.title input');
        this.jobRoleInputField = page.locator('div#tokens\\.role input');
        this.nickNameInputField = page.locator('div#nickname input');
        this.commentsInputField = page.locator('div#tokens\\.note textarea');
        this.addMoreDetailsButton = page.getByTitle('Add more details');
        this.moreDetailsInputField = page.locator('input[name="contacts[0].value"]');
        this.createButton = page.getByTitle('Create');
    }

    async createNewContact(page, dataForContactCreation) {
        await this.fillAllFieldsWithData(dataForContactCreation);
        await this.createButton.click();
        return new ContactInfo(this.page);
    }

    async fillAllFieldsWithData(dataForContactCreation) {
        await this.firstNameInputField.fill(dataForContactCreation.firstName);
        await this.lastNameInputField.fill(dataForContactCreation.lastName);
        await this.middleNameInputField.fill(dataForContactCreation.middleName);
        await this.emailInputField.fill(dataForContactCreation.email);
        await this.secondaryEmailInputField.fill(dataForContactCreation.secondaryEmail);
        await this.phoneNumber.fill(dataForContactCreation.phoneNumber);
        await this.technicalCheckbox.check();
        await this.companyInputField.fill(dataForContactCreation.company);
        await this.jobTitleInputField .fill(dataForContactCreation.jobTitle);
        await this.jobRoleInputField.fill(dataForContactCreation.jobRole);
        await this.nickNameInputField.fill(dataForContactCreation.nickName);
        await this.commentsInputField.fill(dataForContactCreation.comments);
        await this.addMoreDetailsButton.click();
        await this.moreDetailsInputField.fill(dataForContactCreation.moreDetails);
    }

    async changeNameToUnique(contactName, uniquePart) {
        let newName = contactName + uniquePart;
        await this.firstNameInputField.fill(newName);
        await this.page.getByText('Save').click();
        return new ContactInfo(this.page);
    }
}
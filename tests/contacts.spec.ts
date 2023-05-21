import { test, expect } from "@playwright/test";
import { LoginPage } from "../page_objects/LoginPage";
import { ContactsPage } from "../page_objects/ContactsPage";
import { Users } from "../data/Users";
import { contactsPageURL, loginPageURL } from "../data/GeneralData";
import { ContactData } from "../data/ContactData";

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(loginPageURL);
    const loginPage = new LoginPage(page);
    await loginPage.doLogin(page, Users.User01);
    await page.goto(contactsPageURL);
});

test('Add contact', async ({ page }) => {
    //Actions
    const contactsPage = new ContactsPage(page);
    const contactsCountBefore = await contactsPage.countExistingContacts();
    const newContactForm = await contactsPage.clickCreateContactButton(page);
    const contactInfo = await newContactForm.createNewContact(page, ContactData.ValidContactDataForCreation);

    //Validation
    await contactInfo.validateContactInfoPageContent();
    await page.goto(contactsPageURL);
    const contactsCountAfter = await contactsPage.countExistingContacts();
    expect(contactsCountBefore + 1).toEqual(contactsCountAfter);
});

test('Edit contact', async ({ page }) => {
    //Prepare
    const contactsPage = new ContactsPage(page);
    let contactsCount = await contactsPage.countExistingContacts();
    if (contactsCount < 2) {
        const newContactForm = await contactsPage.clickCreateContactButton(page);
        const contactInfo = await newContactForm.createNewContact(page, ContactData.ValidContactDataForCreation);
        await page.goto(contactsPageURL);
    }

    //Actions
    const contactInfo = await contactsPage.openTopContact(page);
    let contactNameBefore = await contactInfo.getContactName();
    const newContactForm = await contactInfo.clickEditButton(page);
    await newContactForm.changeNameToUnique(contactNameBefore, ' Changed');

    //Validation
    let contactNameAfter = await contactInfo.getContactName();
    expect(contactNameBefore + ' Changed').toEqual(contactNameAfter);
});

test('Delete contact', async ({ page }) => {
    //Prepare
    const contactsPage = new ContactsPage(page);
    let contactsCount = await contactsPage.countExistingContacts();
    if (contactsCount < 2) {
        const newContactForm = await contactsPage.clickCreateContactButton(page);
        const contactInfo = await newContactForm.createNewContact(page, ContactData.ValidContactDataForCreation);
        await page.goto(contactsPageURL);
    }

    //Actions
    const contactsCountBefore = await contactsPage.countExistingContacts();
    await contactsPage.deleteContact(page);
    const contactsCountAfter = await contactsPage.countExistingContacts();

    //Validation
    expect(contactsCountBefore - 1).toEqual(contactsCountAfter);
});

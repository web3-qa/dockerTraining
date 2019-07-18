import {AppPage} from '../pageobjects/appPage';
import {describe, it} from 'selenium-webdriver/testing';
import {HomePage} from '../pageobjects/homePage';
import {browser} from 'protractor';


describe('app Page Login Test', function () {

    const appPage = new AppPage();
    const homePage = new HomePage();

    beforeEach(async function () {
        await appPage.navigateTo(URL);
        const value = await browser.getTitle();
        await expect(value).toContain('iShield');
    });

    it('I input username and password', async function () {
        await appPage.inputUserInfo();
    });

    it('I click login', async function () {
        await appPage.clickLoginButton();
    });

    it('I can get homepage', async function () {
        await homePage.getDataSourceText();
    });
});

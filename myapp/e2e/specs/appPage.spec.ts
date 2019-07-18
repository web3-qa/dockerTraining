import {AppPage} from '../pageobjects/appPage';
import {describe, it} from 'selenium-webdriver/testing';
import {browser} from 'protractor';


describe('app Page Test', function () {

    const appPage = new AppPage();

    beforeEach(async function () {
        await appPage.navigateTo(URL);
        const value = await browser.getTitle();
        // await expect(value).toContain('iShield');
    });

    it('I can find expect context', async function () {
        await appPage.getiShiledLogo();
    });
});

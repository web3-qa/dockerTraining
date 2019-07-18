import {ElementFinder} from 'protractor';
import {BasePage} from '../common/basePage';

export class AppPage extends BasePage {
    // page elements
    private iShiledLogo: ElementFinder;
    private usrName: ElementFinder;
    private userPassword: ElementFinder;
    private loginButton: ElementFinder;

    constructor() {
        super();
        this.iShiledLogo = this.getElementByXPath('//img[contains(@src, "iShield_Logo")]');
        this.usrName = this.getElementByXPath('//input[contains(@name, "email")]');
        this.userPassword = this.getElementByXPath('//input[contains(@name, "password")]');
        this.loginButton = this.getElementByXPath('//button[contains(@class, "btn-success btn-full-width")]');
    }

    // page functions
    async getiShiledLogo() {
        await this.waitForElementDisplay(this.iShiledLogo);
        const value = await this.iShiledLogo.getAttribute('src');
        await expect(value).toContain('iShield_Logo');
    }

    async inputUserInfo() {
        await this.waitForElementDisplay(this.usrName);
        await this.fillInput(this.usrName, 'e654099');
        await this.waitForElementDisplay(this.userPassword);
        await this.fillInput(this.userPassword, '3edc&UJM');
    }

    async clickLoginButton() {
        await this.waitForElementDisplay(this.loginButton);
        await this.clickElement(this.loginButton);
    }

}

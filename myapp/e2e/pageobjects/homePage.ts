import {browser, ElementFinder, error} from 'protractor';
import {BasePage} from '../common/basePage';

export class HomePage extends BasePage {
    // page elements
    private nbDialog: ElementFinder;
    private nbDialogConfirm: ElementFinder;
    private dataSourceText: ElementFinder;
    private navigator: ElementFinder;

    constructor() {
        super();
        this.nbDialog = this.getElementByXPath('//nb-dialog-container');
        this.nbDialogConfirm = this.getElementByXPath('//nb-dialog-container//button/span[contains(text(), "Agree")]');
        this.dataSourceText = this.getElementByXPath('//nb-card-header[contains(text(), "Data Sources")]');
        this.navigator = this.getElementByXPath('//aaaaaa');
    }

    // page functions
    async getDataSourceText() {
        await browser.sleep(20000);
        await this.waitForElementDisplay(this.nbDialog);
        const value = await this.checkIfExists(this.nbDialog);
        await this.waitForElementDisplay(this.nbDialogConfirm);
        await this.clickElement(this.nbDialogConfirm);
        await this.waitForElementDisplay(this.navigator);
    }
}

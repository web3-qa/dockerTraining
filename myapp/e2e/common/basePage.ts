import {browser, by, element, ElementArrayFinder, ElementFinder, Locator, protractor} from 'protractor'; // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
// TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
import {ILocation, promise, WebElement} from 'selenium-webdriver';
import * as fs from 'fs';

export abstract class BasePage {
    /**
     * You need to set this in capabilities.chromeOptions.args.
     * Hides Google Cloud printer notificationa and "Chrome is being controlled by automated software" alert
     */
    readonly chromeDriverHideMessages = [
        '--disable-infobars',
        '--disable-device-discovery-notifications'
    ];
    /**
     * You need to set this in capabilities.chromeOptions.args.
     * Disable GPU as it sometimes can lead to unexpected behavior
     */
    readonly chromeDriverDisableGpu = '--disable-gpu';
    /**
     * Options for Chrome to be able to run in CI
     */
    readonly chromeDriverCiOptions = [
        '--headless',
        '--disable-gpu',
        '--no-sandbox'
    ];

    async navigateTo(url: string) {
        return browser.get(url);
    }

    async navigateBack() {
        return browser.navigate().back();
    }

    async navigateForward() {
        return browser.navigate().forward();
    }

    /**
     * Get an element by its DOM id
     * @param elementId {string}
     */
    getElementById(elementId: string) {
        return element(by.id(elementId));
    }

    /**
     * Get an element by its DOM tag
     * @param elementTag {string}
     */
    getElementByTag(elementTag: string) {
        return element(by.tagName(elementTag));
    }

    /**
     * Get an element by its XPath
     * @param xpath {string}
     */
    getElementByXPath(xpath: string) {
        return element(by.xpath(xpath));
    }

    /**
     * Get an element by CSS query
     * @param selector {string}
     */
    getElementByCss(selector: string) {
        return element(by.css(selector));
    }

    /**
     * Get an element by binding, ng-bind
     * @param selector {string}
     */
    getElementByBinding(selector: string) {
        return element(by.binding(selector));
    }

    /**
     * Get an element by exactBinding, ng-bind
     * @param selector {string}
     */
    getElementByExactBinding(selector: string) {
        return element(by.exactBinding(selector));
    }

    /**
     * Get an element by model, ng-model
     * @param selector {string}
     */
    getElementByModel(selector: string) {
        return element(by.model(selector));
    }

    /**
     * Get an element by button text
     * @param selector {string}
     */
    getElementByButtonText(selector: string) {
        return element(by.buttonText(selector));
    }

    /**
     * Get an element by partial button text
     * @param selector {string}
     */
    getElementByPartialButtonText(selector: string) {
        return element(by.partialButtonText(selector));
    }

    /**
     * Get an element by repeat, ng-repeat
     * @param selector {string}
     */
    getElementByRepeat(selector: string) {
        return element(by.repeater(selector));
    }

    /**
     * Get an element by exactRepeat, ng-repeat
     * @param selector {string}
     */
    getElementByExactRepeat(selector: string) {
        return element(by.exactRepeater(selector));
    }

    /**
     * Get an element by cssContainingText
     * @param selector {string}
     */
    getElementBycssContainingText(classSelector: string, textSelector: string) {
        return element(by.cssContainingText(classSelector, textSelector));
    }

    /**
     * Get an element by options, ng-options
     * @param selector {string}
     */
    getElementByOptions(selector: string) {
        return element(by.options(selector));
    }

    /**
     * @param testElementArray {ElementArrayFinder}
     * @param index {number}
     */
    getElementByIndex(testElementArray: ElementArrayFinder, index: number) {
        return testElementArray.get(index);
    }

    /**
     * Get an element
     * @param testElement
     */
    async getElementAsWebElement(testElement: ElementFinder) {
        return await testElement.getWebElement();
    }

    /**
     *
     * @param testElement
     */
    waitForElementPresent(testElement: ElementFinder) {
        const EC = protractor.ExpectedConditions;
        return browser.wait(EC.presenceOf(testElement), 5000 * 10, 'unable to find element present');
    }

    /**
     *
     * @param testElement
     */
    waitForElementDisplay(testElement: ElementFinder) {
        const EC = protractor.ExpectedConditions;
        return browser.wait(EC.visibilityOf(testElement), 5000 * 10, 'Unable to find element displayed');
    }

    /**
     * Fill a <input> or <textarea> with content
     * @param testElement {ElementFinder}
     * @param input
     */
    async fillInput(testElement: ElementFinder, input) {
        return testElement.sendKeys(input);
    }

    /**
     * Submit the form containing the element
     * @param testElement {ElementFinder}
     */
    async submitForm(testElement: ElementFinder) {
        return testElement.submit();
    }

    /**
     * Click a element
     * @param testElement {ElementFinder}
     */
    async clickElement(testElement: ElementFinder) {
        return testElement.click();
    }

    /**
     * Click a element by CSS
     * @param css {string}
     */
    clickElementByCss(css: string) {
        return this.clickElement(this.getElementByCss(css));
    }

    /**
     * Click a element by ID
     * @param elementId {string}
     */
    clickElementById(elementId: string) {
        return this.clickElement(this.getElementById(elementId));
    }

    /**
     * Click a element with an tag
     * @param elementTag {string}
     */
    clickElementByTag(elementTag: string) {
        return this.clickElement(this.getElementByTag(elementTag));
    }

    /**
     * Click a element by XPath
     * @param xpath {string}
     */
    clickElementByXPath(xpath: string) {
        return this.clickElement(this.getElementByXPath(xpath));
    }

    /**
     * Click element by link text
     * @param text {string}
     */
    clickElementByLinkText(text) {
        return this.clickElement(element(by.linkText(text)));
    }

    /**
     * Switch to Frame
     * @param testElement {ElementFinder}
     */
    async switchToFrame(testElement: ElementFinder) {
        return browser.switchTo().frame(testElement.getWebElement());
    }

    /**
     * Switch to Window
     * @param windowHandle {string}
     */
    async switchToWindow(windowHandle: string) {
        return browser.switchTo().window(windowHandle);
    }

    /**
     * Get window handles
     */
    async getWindowHandles() {
        return browser.getAllWindowHandles();
    }

    /**
     * Switch to Alert
     */
    async switchToAlert() {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.alertIsPresent(), 5000, 'Alert is not getting present :(');
        return browser.switchTo().alert();
    }

    /**
     * Switch to Alert and accept
     */
    async switchToAlertAndAccept() {
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.alertIsPresent(), 5000, 'Alert is not getting present :(');
        return browser.switchTo().alert().accept();
    }

    /**
     * Switch to Default
     */
    async switchToDefault() {
        return browser.switchTo().defaultContent();
    }

    /**
     * Real click a web element. Try this if clickElement() is not working
     * @param testElement {ElementFinder}
     */
    async realClickWebElement(testElement: ElementFinder) {
        return browser.actions().mouseMove(testElement).click().perform();
    }

    /**
     * Hover over an element by CSS
     * @param css {string}
     */
    async hoverElementByCss(css: string) {
        return browser.actions()
            .mouseMove((this.getElementByCss(css)))
            .perform();
    }

    /**
     * Hover over an element
     * @param testElement {ElementFinder}
     */
    async hoverElement(testElement: ElementFinder) {
        return browser.actions().mouseMove(testElement).perform();
    }

    /**
     * Press key on keyboard (e.g. TAB or ENTER)
     * @param key {string}
     */
    async pressKey(key: string) {
        return browser.actions().sendKeys(key).perform();
    }

    /**
     * Press a mouse button
     * @param action {string}
     */
    async pressMouseButton(action: string) {
        return browser.actions().click(action).perform();
    }

    /**
     * Don't let Protractor close the browser after execution
     * @return {Promise<*>}
     */
    async pauseBrowser() {
        return browser.pause();
    }

    /**
     * Don't let Protractor close the browser after execution for a specific time.
     * You can use this as an alternative in case pauseBrowser() does not work.
     * Use this to wait for things to initialize (e.g. animated items).
     * @param time {number} in milliseconds
     * @returns {Promise <*>}
     */
    async pauseBrowserTemporarily(time: number) {
        return browser.sleep(time);
    }

    /**
     * Wait for Angular to be initialized
     * @return {promise.Promise<*>}
     */
    async waitForBrowser() {
        return browser.waitForAngular();
    }

    /**
     * Get the current browser URL
     * @param useDriver {boolean}
     */
    getUrl(useDriver: boolean = false) {
        const usedBrowser = useDriver ? browser.driver : browser;
        return usedBrowser.getCurrentUrl()
            .then(
                (url) => {
                    return url;
                }
            );
    }

    /**
     * Check if a element is visible and if it can be selected
     * @param testElement {ElementFinder}
     */
    async checkIfExists(testElement: ElementFinder) {
        return testElement.isPresent();
    }

    /**
     * Check if a element is visible
     * @param testElement {ElementFinder}
     */
    async checkIfVisible(testElement: ElementFinder) {
        return testElement.isDisplayed();
    }

    /**
     * Get an attribute from a DOM element (e.g. class)
     * @param testElement {ElementFinder}
     * @param attribute {string} e.g. 'value' (to get input value) or 'class'
     */
    async getAttributeFromDomElement(testElement: ElementFinder, attribute: string): promise.Promise<string> {
        return testElement.getAttribute(attribute);
    }

    /**
     * Clear an input
     * @param testElement {ElementFinder}
     */
    async clearInput(testElement: ElementFinder) {
        return testElement.clear();
    }

    /**
     * Get height and width of browser window
     */
    getWindowSize() {
        return browser.driver.manage().window().getSize().then((size) => {
            return size;
        });
    }

    /**
     * Use this method to maximize the browser window.
     * If this method crashes the browser, then you need to update with "webdriver-manager update".
     */
    maximizeWindow() {
        return browser.driver.manage().window().maximize();
    }

    /**
     * Get browser cookies
     */
    getCookies() {
        return browser.manage().getCookies().then((cookies) => {
            return cookies;
        });
    }

    /**
     * Get a style property of an element (e.g. 'color')
     * @param testElement
     * @param property {string}
     */
    async getStyleValue(testElement: ElementFinder, property: string) {
        return testElement.getCssValue(property);
    }

    /**
     * Get localStorage item. If none is found, then null is returned.
     * @param {string} item key in localStorage
     * @return {!promise.Promise<string>|promise.Promise<string>}
     */
    async getLocalStorageItem(item: string) {
        return this.executeScript('return localStorage.getItem("' + item + '");');
    }

    /**
     * Get sessionStorage item. If none is found, then null is returned.
     * @param {string} item key in sessionStorage
     * @return {!promise.Promise<string>|promise.Promise<string>}
     */
    async getSessionStorageItem(item: string) {
        return this.executeScript('return sessionStorage.getItem("' + item + '");');
    }

    /**
     * Smooth scroll to a DOM element
     * @param selector {string} CSS query
     */
    async scrollToElement(selector: string) {
        return this.executeScript(`document.querySelector(${selector}).scrollIntoView({behavior: "smooth"})`);
    }

    /**
     * Get the number of DOM elements by CSS query
     * @param {string} selector CSS query
     */
    async getDomElementsCount(selector: string) {
        return element.all(by.css(selector)).count();
    }

    /**
     * Get the current web page title.
     * @returns {Promise<string>}
     */
    async getBrowserTitle() {
        return browser.getTitle();
    }

    /**
     * Close the current window.
     * @returns {Promise<void>}
     */
    async closeWindow() {
        return browser.close();
    }

    /**
     * Get the size of an element in px.
     * @param selector {string} CSS query
     */
    async getElementSize(selector: string) {
        return this.getElementByCss(selector).getSize();
    }

    /**
     * Represents a library of canned expected conditions that are useful for protractor, especially when dealing with non-angular apps.
     */
    getProtractorExpectedConditions() {
        return protractor.ExpectedConditions;
    }

    /**
     * Take a screenshot and save it in the specified directory.
     * @param {string} filename if not provided, then the browser title + current date will be used
     * @param {string} directory if not provided, then a directory called better-protractor-screenshots will be created and used for all screenshots
     */
    async screenshot(filename?: string, directory: string = './better-protractor-screenshots') {
        const fileExtension: string [] = ['.png', '.jpg', '.jpeg', '.tiff'];
        if (!filename) {
            filename = (await this.getBrowserTitle()) + '_' + new Date().getDate().toString();
        }
        // delete forbidden characters if present in file name
        const forbiddenChars: string[] = ['<', '>', ':', '"', '/', '\\', '|', '?', '*', ',', ' '];
        for (const char of filename) {
            if (forbiddenChars.indexOf(char) > -1) {
                filename = filename.replace(char, '');
            }
        }
        // append default extension if none is set yet
        if (!filename.endsWith(fileExtension[0]) && !filename.endsWith(fileExtension[1]) && !filename.endsWith(fileExtension[2]) && !filename.endsWith(fileExtension[3])) {
            filename += fileExtension[0];
        }
        return browser.takeScreenshot().then((screenshot: string) => {
            // create directory if it does not exist and store screenshot there
            try {
                if (!fs.existsSync(directory)) {
                    fs.mkdirSync(directory);
                }
                const stream = fs.createWriteStream(directory + '/' + filename);
                stream.write(new Buffer(screenshot, 'base64'));
                stream.end();
            } catch (e) {
                console.error(e);
            }
        });
    }

    /**
     * Check if a page is served using the secure HTTPS
     * @param {string} url if no URL is provided, then the current URL will be used
     */
    async isHttps(url?: string): Promise<boolean> {
        return (url ? url : (await this.getUrl())).indexOf('https://') !== -1;
    }

    /**
     * Execute a script in the browser
     * @param {string | Function} script
     * @return {Promise<*>}
     */
    executeScript(script: string | Function) {
        return browser.executeScript(script);
    }

    /**
     * Restart the browser. Beware that you need to call disableAngular() again if your web page is running not Angular.
     */
    async restartBrowser() {
        return browser.restart();
    }

    /**
     * Refresh current tab
     * @param {number} timeout
     */
    async refresh(timeout?: number) {
        return browser.refresh(timeout);
    }

    /**
     * Disable Angular (for non-Angular pages or if you encounter problems with Angular lifecycle)
     */
    async disableAngular() {
        return browser.waitForAngularEnabled(false);
    }

    /**
     * Hide mouse pointer displayed with @link {showMouse()}
     */
    async hideMouse() {
        return this.executeScript(() => {
            document.getElementById('protractor-mouse-tracker').remove();
        });
    }

    /**
     * Drag an element to a specified location or element.
     * If you provide a WebElement, then the location will be used to calculate the offset.
     */
    async dragElement(testElement: ElementFinder, target: ElementFinder | ILocation, waitTime: number = 0) {
        const targetCoordinates = this.isILocation(target) ? target : await this.getOffset(testElement, target);
        await this.hoverElement(testElement);
        // focus element
        await browser.driver.actions()
            .mouseDown()
            .perform();
        await this.pauseBrowserTemporarily(waitTime);
        // drag element
        await browser.driver.actions()
            .mouseMove(targetCoordinates)
            .perform();
        // let go of mouse
        await browser.driver.actions()
            .mouseUp()
            .perform();
    }

    /**
     * @param element {ElementFinder} should contain the text to be selected
     */
    async selectText(testElement: ElementFinder) {
        const webElem = await testElement.getWebElement();
        return browser.executeScript(function (args) {
            if (!args) {
                return null;
            }
            const range = document.createRange();
            range.selectNode(args.firstChild);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }, webElem);
    }

    /**
     * @returns {Promise<string>} the selected text
     */
    getSelectedText() {
        return this.executeScript(function () {
            const selection = window.getSelection();
            const node = selection.focusNode;
            if (!node) {
                return null;
            }
            return node.nodeValue ?
                node.nodeValue.substring(selection.baseOffset, selection.focusOffset) : node['innerText'];
        }) as any as Promise<string>;
    }

    /**
     * Get the underlying ProtractorBrowser if you need to access the Protractor API directly.
     * @return {ProtractorBrowser}
     */
    getProtractorBrowser() {
        return browser;
    }

    /**
     * Get the underlying ElementArrayFinder if you need to access the Protractor API directly.
     */
    getProtractorElementArrayFinder(byAarray: Locator) {
        return element.all(byAarray);
    }

    private isILocation(testElement: ILocation | WebElement): testElement is ILocation {
        return (testElement as ILocation).x !== undefined && (testElement as ILocation).y !== undefined;
    }

    private async getOffset(source: WebElement, target: WebElement) {
        const sourceCoordinates = await source.getLocation();
        const targetCoordinates = await target.getLocation();
        const sourceDimensions = await source.getSize();
        const targetDimensions = await target.getSize();
        return {
            x: Math.round(targetCoordinates.x - sourceCoordinates.x + 0.5 * (targetDimensions.width - sourceDimensions.width)),
            y: Math.round(targetCoordinates.y - sourceCoordinates.y + 0.5 * (targetDimensions.height - sourceDimensions.height))
        };
    }
}

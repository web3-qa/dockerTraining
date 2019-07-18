import {browser} from 'protractor';

const {AfterAll} = require('cucumber');


AfterAll({timeout: 100 * 1000}, async () => {
    await browser.quit();
});

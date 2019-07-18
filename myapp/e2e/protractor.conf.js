// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
var HtmlReporter = require('protractor-beautiful-reporter');
var path = require('path');

exports.config = {
    // zephyr const
    // const ZephyrReporter = require('protractor-zephyr-reporter');
    // let onPrepareDefer;
    // let onCompleteDefer;
    allScriptsTimeout: 60000,
    getPageTimeout: 60000,
    specs: [
        './specs/*ts'
    ],
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {'args': ['--disable-web-security', '--disable-infobars', '--disable-device-discovery-notifications', '--disable-gpu']}
    },
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine2',
    useAllAngular2AppRoots: true,
    SELENIUM_PROMISE_MANAGER: false,

    onPrepare() {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = true;
        require('ts-node').register({
            project: require('path').join(__dirname, './tsconfig.e2e.json')
        });
        jasmine.getEnv().addReporter(new HtmlReporter({
            preserveDirectory: false,
            takeScreenShotsOnlyForFailedSpecs: true,
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            baseDirectory: 'reports',

            pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
                // Return '<30-12-2016>/<browser>/<specname>' as path for screenshots:
                // Example: '30-12-2016/firefox/list-should work'.
                var currentDate = new Date(),
                    day = currentDate.getDate(),
                    month = currentDate.getMonth() + 1,
                    year = currentDate.getFullYear();

                var validDescriptions = descriptions.map(function (description) {
                    return description.replace('/', '@');
                });

                return path.join(
                    day + "-" + month + "-" + year,
                    // capabilities.get('browserName'),
                    validDescriptions.join('-'));
            }
        }).getJasmine2Reporter());
    },

    jasmineNodeOpts: {
        // If true, print colors to the terminal.
        showColors: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 60000,
    }

    // zapi for zephry config
    // 'onPrepare': function() {
    //
    //   require('ts-node').register({
    //     project: require('path').join(__dirname, './tsconfig.e2e.json')
    //   });
    //
    //   // first promise is to make sure the cycle is created before the tests start.
    //   onPrepareDefer = protractor.promise.defer();
    //   // second promise is to make sure everything is done before protractor
    //   // quits
    //   onCompleteDefer = protractor.promise.defer();
    //
    //   const options = {
    //     'disabled': false,
    //     'screenshot': 'fail',
    //     'version': '1.0',
    //     'projectId': 'XXX',
    //     'boardId': 'XXX',
    //     'jiraUser': 'XXX',
    //     'jiraPassword': 'XXX',
    //     'zapiUrl': 'https://jira.com/rest/zapi/latest',
    //     'jiraUrl': 'https://jira.com/rest/agile/latest'
    //   };
    //
    //   // add the reporter
    //   jasmine.getEnv().addReporter(ZephyrReporter(options, onPrepareDefer, onCompleteDefer, browser));
    //
    //   // return the promises for onPrepare..
    //   return onPrepareDefer.promise;
    // },
    // 'onComplete': function() {
    //   // ..and onComplete
    //   return onCompleteDefer.promise;
    // }
};

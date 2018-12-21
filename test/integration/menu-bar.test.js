import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickXpath,
    findByXpath,
    getDriver,
    loadUri
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

let driver;

describe('Menu bar settings', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('File->New should be enabled', async () => {
        await loadUri(uri);
        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
            'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
        );
        await findByXpath('//*[li[span[text()="New"]] and not(@data-tip="tooltip")]');
    });

    test('File->Load should be enabled', async () => {
        await loadUri(uri);
        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
            'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
        );
        await findByXpath('//*[li[span[text()="Load from your computer"]] and not(@data-tip="tooltip")]');
    });

    test('File->Save should be enabled', async () => {
        await loadUri(uri);
        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
            'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
        );
        await findByXpath('//*[li[span[text()="Save to your computer"]] and not(@data-tip="tooltip")]');
    });

    xtest('Share button should NOT be enabled', async () => {
        await loadUri(uri);
        await findByXpath('//div[span[div[span[text()="Share"]]] and @data-tip="tooltip"]');
    });
});
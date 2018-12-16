import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    getDriver,
    getLogs,
    loadUri
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

let driver;

describe('Working with the how-to library', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    xtest('Backpack is "Coming Soon" without backpack host param', async () => {
        await loadUri(uri);
        // Check that the backpack header is visible and wrapped in a coming soon tooltip
        await clickText('Backpack', '*[@data-for="backpack-tooltip"]');
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    xtest('Backpack can be expanded with backpack host param', async () => {
        await loadUri(`${uri}?backpack_host=some-value`);

        // Try activating the backpack from the costumes tab to make sure it isn't pushed off
        await clickText('Costumes');

        // Check that the backpack header is visible and wrapped in a coming soon tooltip
        await clickText('Backpack'); // Not wrapped in tooltip
        await clickText('Backpack is empty'); // Make sure it can expand, is empty
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });
});

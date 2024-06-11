// TODO allow running these tests with and without the authorization header
// TODO these seem like really good tests for the server and normal fetch too
// TODO consider how we'll do the axios tests as well

import { getCanisterOrigin } from 'azle/dfx';
import { expect, it, please, Test, wait } from 'azle/test/jest';
import puppeteer, { Browser, Page } from 'puppeteer';

export function getTests(canisterName: string): Test {
    const origin = getCanisterOrigin(canisterName);

    let browser: Browser;
    let page: Page;
    let mainPage: Page;

    return () => {
        please(
            'prepare browser and pages',
            async () => {
                browser = await puppeteer.launch({
                    headless:
                        process.env.GITHUB_RUN_ID === undefined ? false : true
                });
                page = await browser.newPage();

                page.on('console', (message) => {
                    for (const arg of message.args()) {
                        console.info(`Puppetteer log: ${arg}`);
                    }
                });

                await page.goto(origin);

                await iiLogin(page);

                const pages = await browser.pages();

                mainPage = pages[1];
            },
            10_000
        );

        wait('for identity to be set', 5_000);

        it('Headers Array', async () => {
            await mainPage.click('>>> #headersArrayButton');

            await mainPage.waitForNetworkIdle();

            const success = await page.evaluate(
                () => (window as any).headersArraySuccess
            );

            expect(success).toBe(true);
        });

        it('Headers Object', async () => {
            await mainPage.click('>>> #headersObjectButton');

            await mainPage.waitForNetworkIdle();

            const success = await page.evaluate(
                () => (window as any).headersObjectSuccess
            );

            expect(success).toBe(true);
        });

        it('Body Uint8Array', async () => {
            await mainPage.click('>>> #bodyUint8ArrayButton');

            // I believe that await mainPage.waitForNetworkIdle();
            // does not work because of the way that agent
            // engages in polling
            await new Promise((resolve) => setTimeout(resolve, 5_000));

            const success = await page.evaluate(
                () => (window as any).bodyUint8ArraySuccess
            );

            expect(success).toBe(true);
        }, 10_000);

        it('Body String', async () => {
            await mainPage.click('>>> #bodyStringButton');

            // I believe that await mainPage.waitForNetworkIdle();
            // does not work because of the way that agent
            // engages in polling
            await new Promise((resolve) => setTimeout(resolve, 5_000));

            const success = await page.evaluate(
                () => (window as any).bodyStringSuccess
            );

            expect(success).toBe(true);
        }, 10_000);

        it('Body ArrayBuffer', async () => {
            await mainPage.click('>>> #bodyArrayBufferButton');

            // I believe that await mainPage.waitForNetworkIdle();
            // does not work because of the way that agent
            // engages in polling
            await new Promise((resolve) => setTimeout(resolve, 5_000));

            const success = await page.evaluate(
                () => (window as any).bodyArrayBufferSuccess
            );

            expect(success).toBe(true);
        }, 10_000);

        it('Body Blob', async () => {
            await mainPage.click('>>> #bodyBlobButton');

            // I believe that await mainPage.waitForNetworkIdle();
            // does not work because of the way that agent
            // engages in polling
            await new Promise((resolve) => setTimeout(resolve, 5_000));

            const success = await page.evaluate(
                () => (window as any).bodyBlobSuccess
            );

            expect(success).toBe(true);
        }, 10_000);

        it('Body DataView', async () => {
            await mainPage.click('>>> #bodyDataViewButton');

            // I believe that await mainPage.waitForNetworkIdle();
            // does not work because of the way that agent
            // engages in polling
            await new Promise((resolve) => setTimeout(resolve, 5_000));

            const success = await page.evaluate(
                () => (window as any).bodyDataViewSuccess
            );

            expect(success).toBe(true);
        }, 10_000);

        it('Url Query Params GET', async () => {
            await mainPage.click('>>> #urlQueryParamsGetButton');

            await mainPage.waitForNetworkIdle();

            const success = await page.evaluate(
                () => (window as any).urlQueryParamsGetSuccess
            );

            expect(success).toBe(true);
        }, 10_000);

        it('Url Query Params POST', async () => {
            await mainPage.click('>>> #urlQueryParamsPostButton');

            // I believe that await mainPage.waitForNetworkIdle();
            // does not work because of the way that agent
            // engages in polling
            await new Promise((resolve) => setTimeout(resolve, 5_000));

            const success = await page.evaluate(
                () => (window as any).urlQueryParamsPostSuccess
            );

            expect(success).toBe(true);
        }, 10_000);

        it('Not Authorized GET', async () => {
            await mainPage.click('>>> #notAuthorizedGetButton');

            await mainPage.waitForNetworkIdle();

            const success = await page.evaluate(
                () => (window as any).notAuthorizedGetSuccess
            );

            expect(success).toBe(true);
        }, 10_000);

        it('Not Authorized POST', async () => {
            await mainPage.click('>>> #notAuthorizedPostButton');

            // I believe that await mainPage.waitForNetworkIdle();
            // does not work because of the way that agent
            // engages in polling
            await new Promise((resolve) => setTimeout(resolve, 5_000));

            const success = await page.evaluate(
                () => (window as any).notAuthorizedPostSuccess
            );

            expect(success).toBe(true);
        }, 10_000);

        it('HEAD', async () => {
            await mainPage.click('>>> #headButton');

            await mainPage.waitForNetworkIdle();

            const success = await page.evaluate(
                () => (window as any).headSuccess
            );

            expect(success).toBe(true);
        });

        it('OPTIONS', async () => {
            await mainPage.click('>>> #optionsButton');

            await mainPage.waitForNetworkIdle();

            const success = await page.evaluate(
                () => (window as any).optionsSuccess
            );

            expect(success).toBe(true);
        });

        please('Close browser', async () => {
            await browser.close();
        });
    };
}

function iiLogin(page: Page): Promise<void> {
    return new Promise<void>((resolve) => {
        page.once('popup', async (iiPage) => {
            if (iiPage === null) {
                return;
            }

            await iiPage.waitForSelector('#registerButton');

            await iiPage.click('#registerButton');

            await iiPage.waitForSelector('[data-action="construct-identity"]');

            await iiPage.click('[data-action="construct-identity"]');

            await iiPage.waitForSelector('#captchaInput');

            await iiPage.type('#captchaInput', 'a');

            await iiPage.waitForSelector(
                'button#confirmRegisterButton:not([disabled])'
            );

            await iiPage.click('#confirmRegisterButton');

            await iiPage.waitForSelector('#displayUserContinue');

            await iiPage.click('#displayUserContinue');

            resolve();
        });
    });
}

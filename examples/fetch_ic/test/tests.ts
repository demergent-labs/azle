// TODO allow running these tests with and without the authorization header
// TODO these seem like really good tests for the server and normal fetch too
// TODO consider how we'll do the axios tests as well

import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';
import { getCanisterOrigin } from 'azle/dfx';
import puppeteer, { Browser, Page } from 'puppeteer';

export function getTests(canisterName: string): Test[] {
    const origin = getCanisterOrigin(canisterName);

    let browser: Browser;
    let page: Page;
    let mainPage: Page;

    return [
        {
            name: 'Prepare browser and pages',
            prep: async () => {
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
            }
        },
        {
            name: 'Waiting for identity to be set',
            wait: 5_000
        },
        {
            name: 'Headers Array',
            test: async () => {
                await mainPage.click('>>> #headersArrayButton');

                await mainPage.waitForNetworkIdle();

                const success = await page.evaluate(
                    () => (window as any).headersArraySuccess
                );

                return {
                    Ok: success
                };
            }
        },
        {
            name: 'Headers Object',
            test: async () => {
                await mainPage.click('>>> #headersObjectButton');

                await mainPage.waitForNetworkIdle();

                const success = await page.evaluate(
                    () => (window as any).headersObjectSuccess
                );

                return {
                    Ok: success
                };
            }
        },
        {
            name: 'Body Uint8Array',
            test: async () => {
                await mainPage.click('>>> #bodyUint8ArrayButton');

                // I believe that await mainPage.waitForNetworkIdle();
                // does not work because of the way that agent
                // engages in polling
                await new Promise((resolve) => setTimeout(resolve, 5_000));

                const success = await page.evaluate(
                    () => (window as any).bodyUint8ArraySuccess
                );

                return {
                    Ok: success
                };
            }
        },
        {
            name: 'Body String',
            test: async () => {
                await mainPage.click('>>> #bodyStringButton');

                // I believe that await mainPage.waitForNetworkIdle();
                // does not work because of the way that agent
                // engages in polling
                await new Promise((resolve) => setTimeout(resolve, 5_000));

                const success = await page.evaluate(
                    () => (window as any).bodyStringSuccess
                );

                return {
                    Ok: success
                };
            }
        },
        {
            name: 'Body ArrayBuffer',
            test: async () => {
                await mainPage.click('>>> #bodyArrayBufferButton');

                // I believe that await mainPage.waitForNetworkIdle();
                // does not work because of the way that agent
                // engages in polling
                await new Promise((resolve) => setTimeout(resolve, 5_000));

                const success = await page.evaluate(
                    () => (window as any).bodyArrayBufferSuccess
                );

                return {
                    Ok: success
                };
            }
        },
        {
            name: 'Body Blob',
            test: async () => {
                await mainPage.click('>>> #bodyBlobButton');

                // I believe that await mainPage.waitForNetworkIdle();
                // does not work because of the way that agent
                // engages in polling
                await new Promise((resolve) => setTimeout(resolve, 5_000));

                const success = await page.evaluate(
                    () => (window as any).bodyBlobSuccess
                );

                return {
                    Ok: success
                };
            }
        },
        {
            name: 'Body DataView',
            test: async () => {
                await mainPage.click('>>> #bodyDataViewButton');

                // I believe that await mainPage.waitForNetworkIdle();
                // does not work because of the way that agent
                // engages in polling
                await new Promise((resolve) => setTimeout(resolve, 5_000));

                const success = await page.evaluate(
                    () => (window as any).bodyDataViewSuccess
                );

                return {
                    Ok: success
                };
            }
        },
        {
            name: 'Url Query Params GET',
            test: async () => {
                await mainPage.click('>>> #urlQueryParamsGetButton');

                await mainPage.waitForNetworkIdle();

                const success = await page.evaluate(
                    () => (window as any).urlQueryParamsGetSuccess
                );

                return {
                    Ok: success
                };
            }
        },
        {
            name: 'Url Query Params POST',
            test: async () => {
                await mainPage.click('>>> #urlQueryParamsPostButton');

                // I believe that await mainPage.waitForNetworkIdle();
                // does not work because of the way that agent
                // engages in polling
                await new Promise((resolve) => setTimeout(resolve, 5_000));

                const success = await page.evaluate(
                    () => (window as any).urlQueryParamsPostSuccess
                );

                return {
                    Ok: success
                };
            }
        },
        {
            name: 'Not Authorized GET',
            test: async () => {
                await mainPage.click('>>> #notAuthorizedGetButton');

                await mainPage.waitForNetworkIdle();

                const success = await page.evaluate(
                    () => (window as any).notAuthorizedGetSuccess
                );

                return {
                    Ok: success
                };
            }
        },
        {
            name: 'Not Authorized POST',
            test: async () => {
                await mainPage.click('>>> #notAuthorizedPostButton');

                // I believe that await mainPage.waitForNetworkIdle();
                // does not work because of the way that agent
                // engages in polling
                await new Promise((resolve) => setTimeout(resolve, 5_000));

                const success = await page.evaluate(
                    () => (window as any).notAuthorizedPostSuccess
                );

                return {
                    Ok: success
                };
            }
        },
        {
            name: 'HEAD',
            test: async () => {
                await mainPage.click('>>> #headButton');

                await mainPage.waitForNetworkIdle();

                const success = await page.evaluate(
                    () => (window as any).headSuccess
                );

                return {
                    Ok: success
                };
            }
        },
        {
            name: 'OPTIONS',
            test: async () => {
                await mainPage.click('>>> #optionsButton');

                await mainPage.waitForNetworkIdle();

                const success = await page.evaluate(
                    () => (window as any).optionsSuccess
                );

                return {
                    Ok: success
                };
            }
        },
        {
            name: 'Close browser',
            prep: async () => {
                await browser.close();
            }
        }
    ];
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

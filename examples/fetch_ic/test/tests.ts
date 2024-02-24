import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Principal } from '@dfinity/principal';
import { Test, getCanisterOrigin } from 'azle/test';
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
                        console.log(`Puppetteer log: ${arg}`);
                    }
                });

                await page.goto(origin);

                await iiLogin(page);

                const pages = await browser.pages();

                mainPage = pages[1];
            }
        },
        {
            name: 'Whoami Unauthenticated',
            test: async () => {
                await mainPage.click('>>> #whoamiUnauthenticated');

                await mainPage.waitForNetworkIdle();

                const whoamiPrincipal = await mainPage.$(
                    '>>> #whoamiPrincipal'
                );

                if (whoamiPrincipal === null) {
                    return {
                        Ok: false
                    };
                }

                const whoamiPrincipalText = await mainPage.evaluate(
                    (x) => x.textContent,
                    whoamiPrincipal
                );

                return {
                    Ok:
                        whoamiPrincipalText !== null &&
                        Principal.fromText(
                            whoamiPrincipalText
                        ).isAnonymous() === true
                };
            }
        },
        {
            name: 'Waiting for unknown reason',
            wait: 5_000
        },
        {
            name: 'Whoami Authenticated',
            test: async () => {
                await mainPage.click('>>> #whoamiAuthenticated');

                await mainPage.waitForNetworkIdle();

                const whoamiPrincipal = await mainPage.$(
                    '>>> #whoamiPrincipal'
                );

                if (whoamiPrincipal === null) {
                    return {
                        Ok: false
                    };
                }

                const whoamiPrincipalText = await mainPage.evaluate(
                    (x) => x.textContent,
                    whoamiPrincipal
                );

                return {
                    Ok:
                        whoamiPrincipalText !== null &&
                        Principal.fromText(
                            whoamiPrincipalText
                        ).isAnonymous() === false
                };
            }
        },
        {
            name: 'Headers Array',
            test: async () => {
                await mainPage.click('>>> #headersArrayButton');

                await mainPage.waitForNetworkIdle();

                const headersArrayInput = await mainPage.$(
                    '>>> #headersArrayInput'
                );

                if (headersArrayInput === null) {
                    return {
                        Ok: false
                    };
                }

                const headersArrayInputText = await mainPage.evaluate(
                    (x: any) => x.value,
                    headersArrayInput
                );

                return {
                    Ok:
                        headersArrayInputText ===
                        JSON.stringify({
                            'x-azle-0': 'x-azle-0',
                            'x-azle-1': 'x-azle-1',
                            'x-azle-2': 'x-azle-2'
                        })
                };
            }
        },
        {
            name: 'Headers Object',
            test: async () => {
                await mainPage.click('>>> #headersObjectButton');

                await mainPage.waitForNetworkIdle();

                const headersObjectInput = await mainPage.$(
                    '>>> #headersObjectInput'
                );

                if (headersObjectInput === null) {
                    return {
                        Ok: false
                    };
                }

                const headersObjectInputText = await mainPage.evaluate(
                    (x: any) => x.value,
                    headersObjectInput
                );

                return {
                    Ok:
                        headersObjectInputText ===
                        JSON.stringify({
                            'x-azle-0': 'x-azle-0',
                            'x-azle-1': 'x-azle-1',
                            'x-azle-2': 'x-azle-2'
                        })
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

function iiLogin(page: Page) {
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

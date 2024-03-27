import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Principal } from '@dfinity/principal';
import { Test } from 'azle/test';
import { getCanisterOrigin } from 'azle/dfx';
import puppeteer from 'puppeteer';

export function getTests(canisterName: string): Test[] {
    const origin = getCanisterOrigin(canisterName);

    return [
        {
            name: 'Test',
            test: async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();

                page.on('console', (message) => {
                    for (const arg of message.args()) {
                        console.log(`Puppetteer log: ${arg}`);
                    }
                });

                await page.goto(origin);

                await new Promise<void>((resolve) => {
                    page.once('popup', async (iiPage) => {
                        if (iiPage === null) {
                            return;
                        }

                        await iiPage.waitForSelector('#registerButton');

                        await iiPage.click('#registerButton');

                        await iiPage.waitForSelector(
                            '[data-action="construct-identity"]'
                        );

                        await iiPage.click(
                            '[data-action="construct-identity"]'
                        );

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

                const pages = await browser.pages();

                const mainPage = pages[1];

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

                const whoamiPrincipalTextBefore = await mainPage.evaluate(
                    (x) => x.textContent,
                    whoamiPrincipal
                );

                if (
                    whoamiPrincipalTextBefore === null ||
                    Principal.fromText(
                        whoamiPrincipalTextBefore
                    ).isAnonymous() === false
                ) {
                    return {
                        Ok: false
                    };
                }

                // TODO I do not know why this wait is required
                await new Promise((resolve) => setTimeout(resolve, 5_000));

                await mainPage.click('>>> #whoamiAuthenticated');

                await mainPage.waitForNetworkIdle();

                const whoamiPrincipalTextAfter = await mainPage.evaluate(
                    (x) => x.textContent,
                    whoamiPrincipal
                );

                if (
                    whoamiPrincipalTextAfter === null ||
                    Principal.fromText(
                        whoamiPrincipalTextAfter
                    ).isAnonymous() === true
                ) {
                    return {
                        Ok: false
                    };
                }

                await browser.close();

                return {
                    Ok: true
                };
            }
        }
    ];
}

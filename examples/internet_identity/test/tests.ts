import { Principal } from '@dfinity/principal';
import { getCanisterOrigin } from 'azle/dfx';
import { expect, it, Test } from 'azle/test/jest';
import puppeteer, { ElementHandle } from 'puppeteer';

export function getTests(canisterName: string): Test {
    const origin = getCanisterOrigin(canisterName);

    return () => {
        it('supports internet identity authentication', async () => {
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

            const pages = await browser.pages();

            const mainPage = pages[1];

            await mainPage.click('>>> #whoamiUnauthenticated');

            await mainPage.waitForNetworkIdle();

            const whoamiPrincipal = await mainPage.$('>>> #whoamiPrincipal');

            expect(whoamiPrincipal).not.toBeNull();

            const whoamiPrincipalTextBefore = await mainPage.evaluate(
                (x) => x.textContent,
                whoamiPrincipal as ElementHandle<Element>
            );

            expect(whoamiPrincipalTextBefore).not.toBeNull();
            expect(
                Principal.fromText(
                    whoamiPrincipalTextBefore as string
                ).isAnonymous()
            ).toBe(false);

            // TODO I do not know why this wait is required
            await new Promise((resolve) => setTimeout(resolve, 5_000));

            await mainPage.click('>>> #whoamiAuthenticated');

            await mainPage.waitForNetworkIdle();

            const whoamiPrincipalTextAfter = await mainPage.evaluate(
                (x) => x.textContent,
                whoamiPrincipal as ElementHandle<Element>
            );

            expect(whoamiPrincipalTextAfter).not.toBeNull();
            expect(
                Principal.fromText(
                    whoamiPrincipalTextAfter as string
                ).isAnonymous()
            ).toBe(true);

            await browser.close();
        });
    };
}

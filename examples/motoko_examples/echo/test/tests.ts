import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

// @ts-ignore
import { _SERVICE } from './dfx_generated/echo/echo.did';

export function getTests(echoCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('echoes a simple phrase', async () => {
            const phrase = 'This is a test.';
            const result = await echoCanister.say(phrase);

            expect(result).toBe(phrase);
        });
        it('echoes nothing', async () => {
            const phrase = '';
            const result = await echoCanister.say(phrase);

            expect(result).toBe(phrase);
        });
        it('echoes a lot', async () => {
            const phrase = `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            `;
            const result = await echoCanister.say(phrase);

            expect(result).toBe(phrase);
        });
    };
}

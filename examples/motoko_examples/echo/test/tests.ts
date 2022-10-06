import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(echo_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'say',
            test: async () => {
                const phrase = 'This is a test.';
                const result = await echo_canister.say(phrase);

                return {
                    ok: result === phrase
                };
            }
        },
        {
            name: 'say nothing',
            test: async () => {
                const phrase = '';
                const result = await echo_canister.say(phrase);

                return {
                    ok: result === phrase
                };
            }
        },
        {
            name: 'say a lot',
            test: async () => {
                const phrase = `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            `;
                const result = await echo_canister.say(phrase);

                return {
                    ok: result === phrase
                };
            }
        }
    ];
}

import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(hello_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'greet',
            test: async () => {
                const result = await hello_canister.greet('everyone');

                return {
                    ok: result === 'Hello, everyone!'
                };
            }
        },
        {
            name: 'greet nobody',
            test: async () => {
                const result = await hello_canister.greet('');

                return {
                    ok: result === 'Hello, !'
                };
            }
        }
    ];
}

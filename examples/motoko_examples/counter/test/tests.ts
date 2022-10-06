import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(counter_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'get',
            test: async () => {
                const result = await counter_canister.get();

                return {
                    ok: result === 0n
                };
            }
        },
        {
            name: 'set',
            test: async () => {
                const result = await counter_canister.set(10n);

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'inc',
            test: async () => {
                const result = await counter_canister.inc();

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'inc',
            test: async () => {
                const result = await counter_canister.inc();

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'get',
            test: async () => {
                const result = await counter_canister.get();

                return {
                    ok: result === 12n
                };
            }
        }
    ];
}

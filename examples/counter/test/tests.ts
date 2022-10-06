import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/counter/counter.did';

export function get_tests(counter_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'readCount',
            test: async () => {
                const result = await counter_canister.readCount();

                return {
                    ok: result === 0n
                };
            }
        },
        {
            name: 'readCount',
            test: async () => {
                const result = await counter_canister.incrementCount();

                return {
                    ok: result === 1n
                };
            }
        },
        {
            name: 'readCount',
            test: async () => {
                const result = await counter_canister.incrementCount();

                return {
                    ok: result === 2n
                };
            }
        },
        {
            name: 'readCount',
            test: async () => {
                const result = await counter_canister.incrementCount();

                return {
                    ok: result === 3n
                };
            }
        },
        {
            name: 'readCount',
            test: async () => {
                const result = await counter_canister.readCount();

                return {
                    ok: result === 3n
                };
            }
        }
    ];
}

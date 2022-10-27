import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/counter/counter.did';

export function get_tests(counter_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'read_count',
            test: async () => {
                const result = await counter_canister.read_count();

                return {
                    ok: result === 0n
                };
            }
        },
        {
            name: 'increment_count',
            test: async () => {
                const result = await counter_canister.increment_count();

                return {
                    ok: result === 1n
                };
            }
        },
        {
            name: 'increment_count',
            test: async () => {
                const result = await counter_canister.increment_count();

                return {
                    ok: result === 2n
                };
            }
        },
        {
            name: 'increment_count',
            test: async () => {
                const result = await counter_canister.increment_count();

                return {
                    ok: result === 3n
                };
            }
        },
        {
            name: 'read_count',
            test: async () => {
                const result = await counter_canister.read_count();

                return {
                    ok: result === 3n
                };
            }
        }
    ];
}

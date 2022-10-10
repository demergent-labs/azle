import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(counter_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'init get count',
            test: async () => {
                const result = await counter_canister.get_count();

                return {
                    ok: result === 0n
                };
            }
        },
        {
            name: 'first increment',
            test: async () => {
                const result = await counter_canister.count();

                return {
                    ok: result === 1n
                };
            }
        },
        {
            name: 'second increment',
            test: async () => {
                const result = await counter_canister.count();

                return {
                    ok: result === 2n
                };
            }
        },
        {
            name: 'get count',
            test: async () => {
                const result = await counter_canister.get_count();

                return {
                    ok: result === 2n
                };
            }
        },
        {
            name: 'reset',
            test: async () => {
                const result = await counter_canister.reset();

                return {
                    ok: result === 0n
                };
            }
        },
        {
            name: 'get count after reset',
            test: async () => {
                const result = await counter_canister.get_count();

                return {
                    ok: result === 0n
                };
            }
        },
        {
            name: 'increment after reset',
            test: async () => {
                const result = await counter_canister.count();

                return {
                    ok: result === 1n
                };
            }
        },
        {
            name: 'get count after first increment after reset',
            test: async () => {
                const result = await counter_canister.get_count();

                return {
                    ok: result === 1n
                };
            }
        }
    ];
}

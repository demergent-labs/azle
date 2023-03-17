import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/counter/counter.did';

export function get_tests(counter_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'read_count',
            test: async () => {
                const result = await counter_canister.readCount();

                return {
                    Ok: result === 0n
                };
            }
        },
        {
            name: 'increment_count',
            test: async () => {
                const result = await counter_canister.incrementCount();

                return {
                    Ok: result === 1n
                };
            }
        },
        {
            name: 'increment_count',
            test: async () => {
                const result = await counter_canister.incrementCount();

                return {
                    Ok: result === 2n
                };
            }
        },
        {
            name: 'increment_count',
            test: async () => {
                const result = await counter_canister.incrementCount();

                return {
                    Ok: result === 3n
                };
            }
        },
        {
            name: 'read_count',
            test: async () => {
                const result = await counter_canister.readCount();

                return {
                    Ok: result === 3n
                };
            }
        }
    ];
}

import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/stable_structures/stable_structures.did';

export function get_tests(
    stable_structures_canister: ActorSubclass<_SERVICE>
): Test[] {
    const tests: Test[] = [
        {
            name: 'contains key',
            test: async () => {
                const result = await stable_structures_canister.contains_key(
                    'some_key'
                );

                return {
                    ok: result === false
                };
            }
        },
        {
            name: 'get',
            test: async () => {
                const result = await stable_structures_canister.get('some_key');

                return {
                    ok: result === 'test_value'
                };
            }
        },
        {
            name: 'insert',
            test: async () => {
                const result = await stable_structures_canister.insert(
                    'some_key',
                    'some_value'
                );

                return {
                    ok: result === 'test_value'
                };
            }
        },
        {
            name: 'is_empty',
            test: async () => {
                const result = await stable_structures_canister.is_empty();

                return {
                    ok: result === true
                };
            }
        },
        {
            name: 'len',
            test: async () => {
                const result = await stable_structures_canister.len();

                return {
                    ok: result === 0n
                };
            }
        },
        {
            name: 'remove',
            test: async () => {
                const result = await stable_structures_canister.remove(
                    'some_key'
                );

                return {
                    ok: result.length === 0
                };
            }
        }
    ];

    return tests;
}

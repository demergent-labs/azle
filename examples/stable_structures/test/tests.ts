import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/stable_structures/stable_structures.did';

export function get_tests(
    stable_structures_canister: ActorSubclass<_SERVICE>
): Test[] {
    const tests: Test[] = [
        {
            name: 'initial read of read_stable_int',
            test: async () => {
                const result = await stable_structures_canister.get('some_key');

                return {
                    ok: result === 'test_value'
                };
            }
        }
    ];

    return tests;
}

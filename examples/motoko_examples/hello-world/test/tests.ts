import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    hello_world_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'main',
            test: async () => {
                const result = await hello_world_canister.main();

                return {
                    ok: result === undefined
                };
            }
        }
    ];
}

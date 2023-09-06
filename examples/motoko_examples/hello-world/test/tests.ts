import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/hello_world/hello_world.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(
    hello_world_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'main',
            test: async () => {
                const result = await hello_world_canister.main();

                return {
                    Ok: result === undefined
                };
            }
        }
    ];
}

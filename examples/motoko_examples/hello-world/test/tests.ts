import { ActorSubclass } from '@dfinity/agent';
import { Test, testEquality } from 'azle/test';

// @ts-ignore
import { _SERVICE } from './dfx_generated/hello_world/hello_world.did';

export function getTests(
    hello_world_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'main',
            test: async () => {
                const result = await hello_world_canister.main();

                return testEquality(result, undefined);
            }
        }
    ];
}

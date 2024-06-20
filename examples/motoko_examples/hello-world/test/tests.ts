import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

// @ts-ignore
import { _SERVICE } from './dfx_generated/hello_world/hello_world.did';

export function getTests(hello_world_canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('runs a simple hello world method', async () => {
            const result = await hello_world_canister.main();

            expect(result).toBeUndefined();
        });
    };
}

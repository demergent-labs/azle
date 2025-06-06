import { ActorSubclass } from '@dfinity/agent';
import { expect, it, please, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';

import { _SERVICE } from './dfx_generated/persistent_storage/persistent_storage.did';

export function getTests(
    persistentStorageCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('increments the counter once', async () => {
            const result = await persistentStorageCanister.increment();

            expect(result).toBe(1n);
        });

        it('resets the counter', async () => {
            const result = await persistentStorageCanister.reset();

            expect(result).toBe(0n);
        });

        it('increments the counter after reset', async () => {
            const result = await persistentStorageCanister.increment();

            expect(result).toBe(1n);
        });

        please('redeploy the canister', async () => {
            execSync(`dfx deploy --upgrade-unchanged`, {
                stdio: 'inherit'
            });
        });

        it('verifies that postUpgrade was called', async () => {
            const result = await persistentStorageCanister.getRedeployed();

            expect(result).toBe(true);
        });

        it('gets the value of the counter after the canister was redeployed', async () => {
            const result = await persistentStorageCanister.get();

            expect(result).toBe(1n);
        });
    };
}

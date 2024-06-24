import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/threshold_ecdsa/threshold_ecdsa.did';

export function getTests(tEcdsaCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it("gets the canister's public key", async () => {
            const result = await tEcdsaCanister.publicKey();

            expect(result.publicKey.length).toBe(33);
        });

        it("signs a message using the canister's threshold private key", async () => {
            const messageHash = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
                1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1
            ];
            const result = await tEcdsaCanister.sign(messageHash as any);

            expect(result.signature.length).toBe(64);
        });
    };
}

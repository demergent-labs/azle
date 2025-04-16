// TODO I would also like to create property tests for crypto.getRandomValues and randSeed
// TODO for the crypto.getRandomValues, we should exhaustly test the different typed arrays
// TODO with byte lengths that are arbitrary. We should generate 5 or 10 values for each
// TODO similar to this test, then do deploys and seeding similar to this test
// TODO I have not yet decided what the randSeed test should look like...actually,
// TODO we should do an arbitrary seed, and just make sure that every time we call it,
// TODO that the values or the same afterwards, like 5 or 10 values...maybe after a deploy and uninstall as well?
// TODO we should probably test max and min values as well

import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/_internal/test';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('should return Uint8Array of requested length with values in [0,255]', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(fc.nat(200), async (length) => {
                    const result = await actor.cryptoGetRandomValues(length);

                    expect(result.length).toBe(length);

                    for (const byte of result) {
                        expect(byte).toBeGreaterThanOrEqual(0);
                        expect(byte).toBeLessThanOrEqual(255);
                    }
                }),
                defaultPropTestParams()
            );
        });

        it('should produce differing arrays for successive calls when length > 0', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.integer({ min: 1, max: 200 }),
                    async (length) => {
                        const first = await actor.cryptoGetRandomValues(length);
                        const second =
                            await actor.cryptoGetRandomValues(length);

                        const allEqual = first.every((v, i) => v === second[i]);

                        expect(allEqual).toBe(false);
                    }
                ),
                defaultPropTestParams()
            );
        });
    };
}

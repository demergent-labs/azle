import 'azle/experimental/_internal/test/set_experimental';

import { IDL } from 'azle';
import { DidVisitor, getDefaultVisitorData } from 'azle/_internal';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    please,
    Test
} from 'azle/_internal/test';
import { candidDefinitionArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_definition_arb';
import { DefinitionConstraints } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_definition_arb/types';
import { execSync } from 'child_process';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        please('install didc', async () => {
            execSync(
                `cargo install --git https://github.com/dfinity/candid --rev 5d3c7c35da652d145171bc071ac11c63d73bf803 --force didc`,
                { stdio: 'inherit' }
            );
        });

        it('should encode and decode candid values correctly', async () => {
            /* TODO: We aren't able to test the full range of candid values yet
             * because we are limited by the random values that didc generates.
             * As shown in the constraints below, several types need to be
             * disabled for these tests to work.
             *
             * We could potentially extend our arbitraries to support these
             * candid string formats, which would be straightforward but
             * time-consuming to implement. This would also reduce our
             * dependency on didc for testing.
             */
            /* TODO: once we get the arbs more robust, as per
             * https://github.com/demergent-labs/azle/issues/2276, it would be
             * good to do things in the reverse as well, that is to say, generate
             * an arb and use it's bytes to decode, then encode that result, and
             * make sure we get the bytes back.
             */
            const constraints: DefinitionConstraints = {
                recursiveWeights: true,
                weights: {
                    func: 0, // random func is not supported for didc
                    null: 0, // null comes out of didc random as (null) and out of candidDecode as (null: null)
                    opt: 0, // None comes out of didc random as (null) and out of candidDecode as (null: null)
                    record: 0, // record property names don't get decoded as actual names
                    variant: 0, // variant property names don't get decoded as actual names
                    float32: 0, // float32 without a decimal point aren't accepted by candidEncodeQuery
                    float64: 0, // float64 with a decimal point is accepted by candidEncodeQuery
                    blob: 0, // blobs are different from didc random and candidDecode, but in a way that seems broken
                    nat8: 0 // nat8 if paired with vec will make a blob, so we have to filter it out too
                }
            };
            await fc.assert(
                fc.asyncProperty(
                    candidDefinitionArb({ api: 'class', constraints }, {}),
                    async (candid) => {
                        // TODO IDL.Empty is a placeholder for void...not quite correct
                        const didVisitorResult = (
                            candid.definition.candidMeta.runtimeTypeObject ??
                            IDL.Empty
                        ).accept(new DidVisitor(), getDefaultVisitorData());
                        const candidString = didVisitorResult[0];
                        const command = `didc random -t '(${candidString})'`;
                        const candidValueString = execSync(command)
                            .toString()
                            .trim();
                        console.info(candidValueString);

                        const canister =
                            await getCanisterActor<Actor>('canister');

                        const encodedBytes =
                            await canister.candidEncodeQuery(candidValueString);

                        const decodedString =
                            await canister.candidDecodeQuery(encodedBytes);

                        expect(encodedBytes instanceof Uint8Array).toBe(true);
                        expect(decodedString).toBe(candidValueString);
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('asserts candidDecode static and runtime types', async () => {
            const actor = await getCanisterActor<Actor>('canister');
            expect(
                await actor.assertCandidDecodeTypes(
                    new Uint8Array([68, 73, 68, 76, 0, 1, 113, 0])
                )
            ).toBe(true);
        });

        it('asserts candidEncode static and runtime types', async () => {
            const actor = await getCanisterActor<Actor>('canister');
            expect(await actor.assertCandidEncodeTypes('("")')).toBe(true);
        });
    };
}

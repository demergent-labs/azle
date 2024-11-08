globalThis._azleExperimental = true;
import { DidVisitor, getDefaultVisitorData } from 'azle/src/lib/stable';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    please,
    Test
} from 'azle/test';
import { candidDefinitionArb } from 'azle/test/property/arbitraries/candid/candid_definition_arb';
import { execSync } from 'child_process';
import fc from 'fast-check';

import { execSyncPretty } from '../../../../../src/build/stable/utils/exec_sync_pretty';
import { DefinitionConstraints } from '../../../../../test/property/arbitraries/candid/candid_definition_arb/types';
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
                        const didVisitorResult =
                            candid.definition.candidMeta.runtimeTypeObject
                                .getIdlType([])
                                .accept(
                                    new DidVisitor(),
                                    getDefaultVisitorData()
                                );
                        const candidString = didVisitorResult[0];
                        const command = `didc random -t '(${candidString})'`;
                        const candidValueString = execSyncPretty(command)
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
                defaultPropTestParams
            );
        });
    };
}

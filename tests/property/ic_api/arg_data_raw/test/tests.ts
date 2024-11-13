import { ActorSubclass } from '@dfinity/agent';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    please,
    Test
} from 'azle/test';
import { DefinitionConstraints } from 'azle/test/property/arbitraries/candid/candid_definition_arb/types';
import { execSync } from 'child_process';
import fc from 'fast-check';
import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';
import { generateCanister } from './generate_canister';
import { pretest } from './pretest';

export function getTests(): Test {
    return () => {
        please('install didc', async () => {
            execSync(
                `cargo install --git https://github.com/dfinity/candid --rev 5d3c7c35da652d145171bc071ac11c63d73bf803 --force didc`,
                { stdio: 'inherit' }
            );
        });

        it('gets the init arg data raw from the canister', async () => {
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
            console.log('constraints', constraints);
            await fc.assert(
                fc.asyncProperty(
                    // TODO once we figure out how to escape single quotes in candid strings
                    // we can use fc.string() instead of fc.string().filter((s) => !s.includes("'"))
                    fc.string().filter((s) => !s.includes("'")),
                    fc.string().filter((s) => !s.includes("'")),
                    fc.string().filter((s) => !s.includes("'")),
                    fc.string().filter((s) => !s.includes("'")),
                    async (
                        initArgData,
                        postUpgradeArgData,
                        queryArgData,
                        updateArgData
                    ) => {
                        const initIdlType = 'IDL.Text';
                        const initTsType = 'string';
                        const queryIdlType = 'IDL.Text';
                        const queryTsType = 'string';
                        const updateIdlType = 'IDL.Text';
                        const updateTsType = 'string';
                        const imports: string[] = ['IDL'];
                        const variableAliasDeclarations: string[] = [];

                        const actor = await setupCanisters(
                            initIdlType,
                            initTsType,
                            queryIdlType,
                            queryTsType,
                            updateIdlType,
                            updateTsType,
                            imports,
                            variableAliasDeclarations
                        );
                        execSync(
                            `dfx canister uninstall-code canister || true`,
                            {
                                stdio: 'inherit'
                            }
                        );

                        const initArgDataCandidString = `("${escapeArgData(
                            initArgData
                        )}")`;

                        execSync(
                            `dfx deploy canister --argument '${initArgDataCandidString}'`,
                            {
                                stdio: 'inherit'
                            }
                        );

                        const initArgDataRaw = await actor.getInitArgDataRaw();
                        const expectedInitArgDataRaw = await actor.candidEncode(
                            initArgDataCandidString
                        );
                        expect(initArgDataRaw).toEqual([
                            expectedInitArgDataRaw
                        ]);

                        const queryArgDataCandidString = `("${escapeArgData(
                            queryArgData
                        )}")`;
                        const queryArgDataRaw =
                            await actor.getQueryArgDataRaw(queryArgData);
                        const expectedQueryArgDataRaw =
                            await actor.candidEncode(queryArgDataCandidString);
                        expect(queryArgDataRaw).toEqual(
                            expectedQueryArgDataRaw
                        );

                        const updateArgDataCandidString = `("${escapeArgData(
                            updateArgData
                        )}")`;
                        const updateArgDataRaw =
                            await actor.getUpdateArgDataRaw(updateArgData);
                        const expectedUpdateArgDataRaw =
                            await actor.candidEncode(updateArgDataCandidString);
                        expect(updateArgDataRaw).toEqual(
                            expectedUpdateArgDataRaw
                        );

                        const postUpgradeArgDataCandidString = `("${escapeArgData(
                            postUpgradeArgData
                        )}")`;

                        execSync(
                            `dfx deploy canister --argument '${postUpgradeArgDataCandidString}' --upgrade-unchanged`,
                            {
                                stdio: 'inherit'
                            }
                        );

                        const postUpgradeArgDataRaw =
                            await actor.getPostUpgradeArgDataRaw();
                        const expectedPostUpgradeArgDataRaw =
                            await actor.candidEncode(
                                postUpgradeArgDataCandidString
                            );
                        expect(postUpgradeArgDataRaw).toEqual([
                            expectedPostUpgradeArgDataRaw
                        ]);
                    }
                ),
                defaultPropTestParams
            );
        });
    };
}

function escapeArgData(data: string): string {
    return data.replace(/[\\"]/g, '\\$&');
}

async function setupCanisters(
    initIdlType: string,
    initTsType: string,
    queryIdlType: string,
    queryTsType: string,
    updateIdlType: string,
    updateTsType: string,
    imports: string[],
    variableAliasDeclarations: string[]
): Promise<ActorSubclass<Actor>> {
    console.log('setupCanisters');
    // Ensure directories exist
    await mkdir(dirname('src/index.ts'), { recursive: true });

    const canisterCode = generateCanister(
        initIdlType,
        initTsType,
        queryIdlType,
        queryTsType,
        updateIdlType,
        updateTsType,
        imports,
        variableAliasDeclarations
    );
    console.log('canisterCode', canisterCode);
    await writeFile('src/index.ts', canisterCode);
    console.log('wrote canisterCode to src/index.ts');

    pretest();

    return await getCanisterActor<Actor>('canister');
}

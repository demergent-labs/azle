globalThis._azleExperimental = true;

import { ActorSubclass } from '@dfinity/agent';
import {
    DidVisitor,
    getDefaultVisitorData
} from 'azle/src/lib/stable/did_file/visitor';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    please,
    Test
} from 'azle/test';
import { candidDefinitionArb } from 'azle/test/property/arbitraries/candid/candid_definition_arb';
import {
    CandidDefinition,
    DefinitionConstraints,
    WithShapes
} from 'azle/test/property/arbitraries/candid/candid_definition_arb/types';
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
                    vec: 0 // if given an empty vec, candidEncode will give a byte array representing a vec of empty regardless of the original type of the vec, additionally if given a vec of nat8 that is the same as blob which is broken
                }
            };
            await fc.assert(
                fc.asyncProperty(
                    candidDefinitionArb({ api: 'class', constraints }, {}),
                    candidDefinitionArb({ api: 'class', constraints }, {}),
                    candidDefinitionArb({ api: 'class', constraints }, {}),
                    async (deployArgDef, queryArgDef, updateArgDef) => {
                        const actor = await setupCanisters(
                            deployArgDef,
                            queryArgDef,
                            updateArgDef
                        );

                        await testDeploy(actor, deployArgDef, 'init');

                        await testDeploy(actor, deployArgDef, 'postUpgrade');

                        for (let i = 0; i < 100; i++) {
                            console.info('Query method iteration:', i);
                            await testCanisterMethod(queryArgDef, 'Query');
                        }
                        for (let i = 0; i < 10; i++) {
                            console.info('Update method iteration:', i);
                            await testCanisterMethod(updateArgDef, 'Update');
                        }
                    }
                ),
                defaultPropTestParams()
            );
        });
    };
}

async function testDeploy(
    actor: ActorSubclass<Actor>,
    argData: WithShapes<CandidDefinition>,
    mode: 'init' | 'postUpgrade'
): Promise<Promise<void>> {
    if (mode === 'init') {
        execSync(`dfx canister uninstall-code canister || true`, {
            stdio: 'inherit'
        });
    }

    const argString = generateRandomCandidString(argData);

    const deployCommand = `dfx deploy canister --argument '${escapeSingleQuotes(
        argString
    )}' ${mode === 'postUpgrade' ? '--upgrade-unchanged' : ''}`;
    execSync(deployCommand, { stdio: 'pipe' });

    const argDataRaw =
        mode === 'init'
            ? await actor.getInitArgDataRaw()
            : await actor.getPostUpgradeArgDataRaw();
    const expectedArgDataRaw = await actor.candidEncode(argString);
    expect(argDataRaw).toEqual([expectedArgDataRaw]);
}

async function testCanisterMethod(
    argData: WithShapes<CandidDefinition>,
    mode: 'Query' | 'Update'
): Promise<Promise<void>> {
    const argString = generateRandomCandidString(argData);
    const command = `dfx canister call canister get${mode}ArgDataRaw '${argString}'`;
    console.info(`command: ${command}`);
    const result = execSync(command, {
        stdio: 'pipe'
    });
    const candidEncodeCommand = `dfx canister call canister candidEncode '("${escapeArgData(
        argString
    )}")'`;
    console.info(`candidEncodeCommand: ${candidEncodeCommand}`);
    const candidEncodeResult = execSync(candidEncodeCommand, {
        stdio: 'pipe'
    });
    expect(result).toEqual(candidEncodeResult);
}

function escapeArgData(data: string): string {
    return data.replace(/[\\"]/g, '\\$&');
}

function escapeSingleQuotes(data: string): string {
    return data.replace(/'/g, "'\\''");
}

function getIdlType(candidDefinition: WithShapes<CandidDefinition>): string {
    return candidDefinition.definition.candidMeta.typeObject;
}

function getTsType(candidDefinition: WithShapes<CandidDefinition>): string {
    return candidDefinition.definition.candidMeta.typeAnnotation;
}

async function setupCanisters(
    deployArgDefinition: WithShapes<CandidDefinition>,
    queryArgDefinition: WithShapes<CandidDefinition>,
    updateArgDefinition: WithShapes<CandidDefinition>
): Promise<ActorSubclass<Actor>> {
    const initIdlType = getIdlType(deployArgDefinition);
    const initTsType = getTsType(deployArgDefinition);
    const queryIdlType = getIdlType(queryArgDefinition);
    const queryTsType = getTsType(queryArgDefinition);
    const updateIdlType = getIdlType(updateArgDefinition);
    const updateTsType = getTsType(updateArgDefinition);
    const imports = Array.from(
        new Set([
            ...deployArgDefinition.definition.candidMeta.imports,
            ...queryArgDefinition.definition.candidMeta.imports,
            ...updateArgDefinition.definition.candidMeta.imports
        ])
    ).sort();
    const variableAliasDeclarations = [
        ...deployArgDefinition.definition.candidMeta.variableAliasDeclarations,
        ...queryArgDefinition.definition.candidMeta.variableAliasDeclarations,
        ...updateArgDefinition.definition.candidMeta.variableAliasDeclarations
    ];
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
    await writeFile('src/index.ts', canisterCode);

    const initArgString = generateRandomCandidString(deployArgDefinition);
    pretest(escapeSingleQuotes(initArgString));

    return await getCanisterActor<Actor>('canister');
}

function generateRandomCandidString(
    candidDefinition: WithShapes<CandidDefinition>
): string {
    const didVisitorResult =
        candidDefinition.definition.candidMeta.runtimeTypeObject
            .getIdlType([])
            .accept(new DidVisitor(), getDefaultVisitorData());
    const candidString = didVisitorResult[0];
    const command = `didc random -t '(${candidString})'`;
    console.info(`command: ${command}`);
    const candidValueString = execSync(command)
        .toString()
        .replace(/\s/g, '')
        .trim();
    console.info(`candidValueString: ${candidValueString}`);
    return candidValueString;
}

import 'azle/experimental/_internal/test/set_experimental';

import { ActorSubclass, HttpAgent } from '@dfinity/agent';
import { getCanisterId } from 'azle/_internal/dfx';
import { defaultPropTestParams, expect, it, Test } from 'azle/_internal/test';
import { candidDefinitionArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_definition_arb';
import { CandidValueAndMetaArbGenerator } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb_generator';
import {
    CandidValueArb,
    CandidValueConstraints
} from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_values_arb';
import { Context } from 'azle/experimental/_internal/test/property/arbitraries/types';
import fc from 'fast-check';
import { cp, mkdir, rm, writeFile } from 'fs/promises';
import { dirname, join } from 'path';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';
import { generateCanister } from './generate_canister';
import { pretest } from './pretest';

export function getTests(): Test {
    return () => {
        it('should always reply with the input in alwaysReplyQuery and alwaysReplyUpdate', async () => {
            const context: Context<CandidValueConstraints> = {
                constraints: {}
            };
            await fc.assert(
                fc.asyncProperty(
                    CandidValueAndMetaArbGenerator(
                        context,
                        candidDefinitionArb(context, {}),
                        CandidValueArb
                    ),
                    fc.uuid(),
                    async (input, uuid) => {
                        const {
                            src: {
                                typeAnnotation: tsType,
                                imports,
                                typeObject: idlType,
                                variableAliasDeclarations
                            },
                            value: { agentArgumentValue }
                        } = input;
                        const canister = await setupCanister(
                            uuid,
                            idlType,
                            tsType,
                            Array.from(imports.add('msgArgData')),
                            variableAliasDeclarations
                        );

                        const queryResult =
                            await canister.alwaysReplyQuery(agentArgumentValue);
                        expect(queryResult).toEqual(agentArgumentValue);

                        const updateResult =
                            await canister.alwaysReplyUpdate(
                                agentArgumentValue
                            );
                        expect(updateResult).toEqual(agentArgumentValue);

                        cleanUpCanister(uuid);
                    }
                ),
                defaultPropTestParams()
            );
        });
    };
}

async function cleanUpCanister(uuid: string): Promise<void> {
    await rm(`test/dfx_generated/canister${uuid}`, {
        recursive: true,
        force: true
    });
}

async function setupCanister(
    uuid: string,
    idlType: string,
    tsType: string,
    imports: string[],
    variableAliasDeclarations: string[]
): Promise<ActorSubclass<Actor>> {
    // Ensure directories exist
    await mkdir(dirname('src/index.ts'), { recursive: true });

    const canisterCode = generateCanister(
        idlType,
        tsType,
        imports,
        variableAliasDeclarations
    );
    await writeFile('src/index.ts', canisterCode);

    pretest();

    await mkdir(`test/dfx_generated/canister${uuid}`, { recursive: true });
    await cp(
        'test/dfx_generated/canister',
        `test/dfx_generated/canister${uuid}`,
        { recursive: true }
    );

    return await getCanisterActor<Actor>('canister', uuid);
}

// Each iteration of the canister needs a unique import path to avoid caching.
// Note: Query parameter cache busting is preferred but doesn't work with Jest.
// TODO Once we can do cache busting we should remove this function and use getCanisterActor from azle/_internal/test.
export async function getCanisterActor<T>(
    canisterName: string,
    uuid: string = ''
): Promise<ActorSubclass<T>> {
    const importPath = join(
        process.cwd(),
        'test',
        'dfx_generated',
        `${canisterName}${uuid}`
    );

    const { createActor } = await import(importPath);

    const agent = await HttpAgent.create({
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    });

    const actor = createActor(getCanisterId(canisterName), {
        agent
    });

    return actor;
}

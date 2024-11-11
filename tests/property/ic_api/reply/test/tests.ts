globalThis._azleExperimental = true;
import { ActorSubclass } from '@dfinity/agent';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/test';
import { CandidValueAndMetaArbGenerator } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb_generator';
import fc from 'fast-check';
import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';

import { candidDefinitionArb } from '../../../../../test/property/arbitraries/candid/candid_definition_arb';
import {
    CandidValueArb,
    CandidValueConstraints
} from '../../../../../test/property/arbitraries/candid/candid_values_arb';
import { Context } from '../../../../../test/property/arbitraries/types';
import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';
import { generateCanister } from './generate_canister';
import { pretest } from './pretest';

async function setupCanisters(
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

    return await getCanisterActor<Actor>('canister');
}

export function getTests(): Test {
    return () => {
        it('should always reply with the input in alwaysReplyQuery', async () => {
            const context: Context<CandidValueConstraints> = {
                constraints: {},
                api: 'class'
            };
            await fc.assert(
                fc.asyncProperty(
                    CandidValueAndMetaArbGenerator(
                        context,
                        candidDefinitionArb(context, {}),
                        CandidValueArb
                    ),
                    async (input) => {
                        const {
                            src: {
                                typeAnnotation: tsType,
                                imports,
                                typeObject: idlType,
                                variableAliasDeclarations
                            },
                            value: { agentArgumentValue }
                        } = input;
                        const canister = await setupCanisters(
                            idlType,
                            tsType,
                            Array.from(imports),
                            variableAliasDeclarations
                        );
                        const result =
                            await canister.alwaysReplyQuery(agentArgumentValue);
                        expect(result).toEqual(agentArgumentValue);
                    }
                ),
                defaultPropTestParams
            );
        });
    };
}

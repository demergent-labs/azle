import fc from 'fast-check';

import { CandidType } from '../../candid_type';
import { CandidDefinition } from '../../candid_definition_arb/types';
import { VoidDefinitionArb } from '../../primitive/void';
import { JsFunctionNameArb } from '../../../js_function_name_arb';
import {
    query,
    update
} from '../../../../../src/lib/canister_methods/methods/';
import { CanisterMethodInfo } from '../../../../../src/lib/canister_methods/types/canister_method_info';

type Mode = 'query' | 'update';

export type ServiceMethodDefinition = {
    name: string;
    azleCandidTypeObject: CanisterMethodInfo<CandidType[], CandidType>;
    imports: Set<string>;
    variableAliasDeclarations: string[];
    src: string;
};

export function ServiceMethodArb(
    candidDefArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<ServiceMethodDefinition> {
    return fc
        .tuple(
            JsFunctionNameArb,
            fc.constantFrom('query', 'update') as fc.Arbitrary<Mode>,
            fc.array(candidDefArb),
            fc.oneof(candidDefArb, VoidDefinitionArb())
        )
        .map(([name, mode, params, returnType]): ServiceMethodDefinition => {
            const paramCandidTypeObjects = params.map(
                (param) => param.candidMeta.candidTypeObject
            );

            const variableAliasDeclarations = params.reduce(
                (
                    acc,
                    { candidMeta: { variableAliasDeclarations } }
                ): string[] => {
                    return [...acc, ...variableAliasDeclarations];
                },
                returnType.candidMeta.variableAliasDeclarations
            );

            const src = `${name}: ${mode}([${paramCandidTypeObjects}], ${returnType.candidMeta.candidTypeObject})`;

            const imports = params.reduce(
                (acc, param) => {
                    return new Set([...acc, ...param.candidMeta.imports]);
                },
                new Set([mode, ...returnType.candidMeta.imports])
            );

            const azleCandidTypeObject = generateAzleCandidTypeObject(
                mode,
                params,
                returnType
            );

            return {
                name,
                azleCandidTypeObject: azleCandidTypeObject,
                imports,
                variableAliasDeclarations: variableAliasDeclarations,
                src
            };
        });
}

function generateAzleCandidTypeObject(
    mode: Mode,
    params: CandidDefinition[],
    returnType: CandidDefinition
) {
    const modeFunction = mode === 'query' ? query : update;
    const paramCandidTypeObjects = params.map(
        (param) => param.candidMeta.azleCandidTypeObject
    );
    const returnCandidTypeObject = returnType.candidMeta.azleCandidTypeObject;

    return modeFunction(paramCandidTypeObjects, returnCandidTypeObject);
}

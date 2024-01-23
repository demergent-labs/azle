import fc from 'fast-check';

import { CandidType } from '../../candid_type';
import {
    CandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
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
    runtimeCandidTypeObject: CanisterMethodInfo<CandidType[], CandidType>;
    imports: Set<string>;
    variableAliasDeclarations: string[];
    src: string;
};

export function ServiceMethodArb(
    candidDefArb: WithShapesArb<CandidDefinition>
): WithShapesArb<ServiceMethodDefinition> {
    return fc
        .tuple(
            JsFunctionNameArb,
            fc.constantFrom<Mode>('query', 'update'),
            fc.array(candidDefArb),
            fc.oneof(candidDefArb, VoidDefinitionArb())
        )
        .map(
            ([
                name,
                mode,
                paramsAndShapes,
                returnTypeAndShapes
            ]): WithShapes<ServiceMethodDefinition> => {
                const params = paramsAndShapes.map((thing) => thing.definition);
                const returnType = returnTypeAndShapes.definition;
                const recursiveShapes = paramsAndShapes.reduce((acc, thing) => {
                    return { ...acc, ...thing.recursiveShapes };
                }, returnTypeAndShapes.recursiveShapes);
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

                const runtimeCandidTypeObject = generateRuntimeCandidTypeObject(
                    mode,
                    params,
                    returnType
                );

                return {
                    definition: {
                        name,
                        runtimeCandidTypeObject,
                        imports,
                        variableAliasDeclarations,
                        src
                    },
                    recursiveShapes
                };
            }
        );
}

function generateRuntimeCandidTypeObject(
    mode: Mode,
    params: CandidDefinition[],
    returnType: CandidDefinition
) {
    const queryOrUpdate = mode === 'query' ? query : update;
    const paramCandidTypeObjects = params.map(
        (param) => param.candidMeta.runtimeCandidTypeObject
    );
    const returnCandidTypeObject =
        returnType.candidMeta.runtimeCandidTypeObject;

    return queryOrUpdate(paramCandidTypeObjects, returnCandidTypeObject);
}

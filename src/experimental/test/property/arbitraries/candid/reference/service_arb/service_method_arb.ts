import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import {
    query,
    update
} from '#experimental/lib/canister_methods/methods/index';
import { CanisterMethodInfo } from '#experimental/lib/canister_methods/types/canister_method_info';

import { JsPropertyNameArb } from '../../../js_name_arb';
import { Context } from '../../../types';
import {
    CandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidType } from '../../candid_type';
import { VoidDefinitionArb } from '../../primitive/void_arb';

type Mode = 'query' | 'update';

export type ServiceMethodDefinition = {
    name: string;
    runtimeTypeObject: CanisterMethodInfo<CandidType[], CandidType>;
    imports: Set<string>;
    variableAliasDeclarations: string[];
    src: string;
    idl: string;
};

export function ServiceMethodArb(
    context: Context,
    candidDefArb: WithShapesArb<CandidDefinition>
): WithShapesArb<ServiceMethodDefinition> {
    return fc
        .tuple(
            JsPropertyNameArb,
            fc.constantFrom<Mode>('query', 'update'),
            fc.array(candidDefArb),
            fc.oneof(candidDefArb, VoidDefinitionArb(context))
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
                const paramTypeObjects = params.map(
                    (param) => param.candidMeta.typeObject
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

                const src = `${name.startsWith('"') ? `"${name.slice(1, -1).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"` : name}: ${mode}([${paramTypeObjects}], ${returnType.candidMeta.typeObject})`;
                const idl = `${name.startsWith('"') ? `"${name.slice(1, -1).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"` : name}: IDL.Func([${paramTypeObjects}], [${
                    returnType.candidMeta.typeObject
                }], ${mode === 'query' ? '["query"]' : 'undefined'})`;

                const imports = params.reduce(
                    (acc, param) => {
                        return new Set([...acc, ...param.candidMeta.imports]);
                    },
                    new Set([mode, ...returnType.candidMeta.imports])
                );

                const runtimeTypeObject = generateRuntimeTypeObject(
                    mode,
                    params,
                    returnType
                );

                return {
                    definition: {
                        name,
                        runtimeTypeObject,
                        imports,
                        variableAliasDeclarations,
                        src,
                        idl
                    },
                    recursiveShapes
                };
            }
        );
}

function generateRuntimeTypeObject(
    mode: Mode,
    params: CandidDefinition[],
    returnType: CandidDefinition
): CanisterMethodInfo<CandidType[], CandidType> {
    const queryOrUpdate = mode === 'query' ? query : update;
    const paramTypeObjects = params.map(
        (param) => param.candidMeta.runtimeTypeObject
    );
    const returnTypeObject = returnType.candidMeta.runtimeTypeObject;

    return queryOrUpdate(paramTypeObjects, returnTypeObject);
}

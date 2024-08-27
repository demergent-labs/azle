import fc from 'fast-check';

import { CandidType } from '../../../../../../src/lib/experimental/candid/candid_type';
import { Func } from '../../../../../../src/lib/experimental/candid/types/reference/func';
import { Api, Context } from '../../../types';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    FuncCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { VoidDefinitionArb } from '../../primitive/void';

type Mode = 'query' | 'update' | 'oneway';

export function FuncDefinitionArb(
    context: Context,
    candidDefArb: WithShapesArb<CandidDefinition>
): WithShapesArb<FuncCandidDefinition> {
    return fc
        .constantFrom<Mode>('query', 'update', 'oneway')
        .chain((mode) => {
            const returnType =
                mode === 'oneway' ? VoidDefinitionArb(context) : candidDefArb;

            return fc.tuple(
                UniqueIdentifierArb('globalNames'),
                fc.array(candidDefArb),
                returnType,
                fc.constant(mode),
                fc.boolean()
            );
        })
        .map(
            ([
                name,
                paramsAndShapes,
                returnFuncAndShapes,
                mode,
                useTypeDeclaration
            ]): WithShapes<FuncCandidDefinition> => {
                const api = context.api;
                const params = paramsAndShapes.map(
                    (paramAndShapes) => paramAndShapes.definition
                );
                const returnFunc = returnFuncAndShapes.definition;
                const recursiveShapes = paramsAndShapes.reduce(
                    (acc, paramAndShapes) => {
                        return { ...acc, ...paramAndShapes.recursiveShapes };
                    },
                    returnFuncAndShapes.recursiveShapes
                );
                const typeAnnotation = generateCandidTypeAnnotation(
                    useTypeDeclaration,
                    name,
                    api
                );

                const typeObject = generateTypeObject(
                    useTypeDeclaration,
                    name,
                    params,
                    returnFunc,
                    mode,
                    api
                );

                const runtimeTypeObject = generateRuntimeTypeObject(
                    params,
                    returnFunc,
                    mode
                );

                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        useTypeDeclaration,
                        name,
                        params,
                        returnFunc,
                        mode,
                        api
                    );

                const imports = generateImports(params, returnFunc, api);

                return {
                    definition: {
                        candidMeta: {
                            typeAnnotation,
                            typeObject,
                            runtimeTypeObject,
                            variableAliasDeclarations,
                            imports,
                            candidType: 'Func'
                        },
                        paramCandidMeta: params,
                        returnCandidMeta: returnFunc
                    },
                    recursiveShapes
                };
            }
        );
}

function generateImports(
    params: CandidDefinition[],
    returnFunc: CandidDefinition,
    api: Api
): Set<string> {
    const funcImports = api === 'functional' ? ['Func'] : ['IDL'];

    return new Set([
        ...params.flatMap((param) => [...param.candidMeta.imports]),
        ...returnFunc.candidMeta.imports,
        ...funcImports,
        'Principal'
    ]);
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    paramCandids: CandidDefinition[],
    returnCandid: CandidDefinition,
    mode: Mode,
    api: Api
): string[] {
    const paramTypeDeclarations = paramCandids.flatMap(
        (param) => param.candidMeta.variableAliasDeclarations
    );
    const returnTypeDeclaration =
        returnCandid.candidMeta.variableAliasDeclarations;

    if (useTypeDeclaration === true) {
        const type =
            api === 'functional'
                ? []
                : [
                      `type ${name} = ${generateCandidTypeAnnotation(
                          false,
                          name,
                          api
                      )}`
                  ];
        return [
            ...paramTypeDeclarations,
            ...returnTypeDeclaration,
            `const ${name} = ${generateTypeObject(
                false,
                name,
                paramCandids,
                returnCandid,
                mode,
                api
            )}`,
            ...type
        ];
    }

    return [...paramTypeDeclarations, ...returnTypeDeclaration];
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    api: Api
): string {
    if (useTypeDeclaration === true) {
        if (api === 'class') {
            return name;
        }
        return `typeof ${name}.tsType`;
    }

    return `[Principal, string]`;
}

function generateTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    paramCandids: CandidDefinition[],
    returnCandid: CandidDefinition,
    mode: Mode,
    api: Api
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    const params = paramCandids
        .map((param) => param.candidMeta.typeObject)
        .join(', ');

    const returnType = returnCandid.candidMeta.typeObject;

    if (api === 'class') {
        return `IDL.Func([${params}], [${returnType}], ${
            mode === 'update' ? '' : `['${mode}']`
        })`;
    }

    return `Func([${params}], ${returnType}, '${mode}')`;
}

function generateRuntimeTypeObject(
    paramCandids: CandidDefinition[],
    returnCandid: CandidDefinition,
    mode: Mode
): CandidType {
    const params = paramCandids.map(
        (param) => param.candidMeta.runtimeTypeObject
    );

    return Func(params, returnCandid.candidMeta.runtimeTypeObject, mode);
}

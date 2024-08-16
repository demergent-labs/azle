import fc from 'fast-check';

import { CandidType } from '../../../../../src/lib/experimental/candid/candid_type';
import { Func } from '../../../../../src/lib/experimental/candid/types/reference/func';
import { Syntax } from '../../../types';
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
    candidDefArb: WithShapesArb<CandidDefinition>,
    syntax: Syntax
): WithShapesArb<FuncCandidDefinition> {
    return fc
        .constantFrom<Mode>('query', 'update', 'oneway')
        .chain((mode) => {
            const returnType =
                mode === 'oneway' ? VoidDefinitionArb(syntax) : candidDefArb;

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
                const candidTypeAnnotation = generateCandidTypeAnnotation(
                    useTypeDeclaration,
                    name,
                    syntax
                );

                const candidTypeObject = generateCandidTypeObject(
                    useTypeDeclaration,
                    name,
                    params,
                    returnFunc,
                    mode,
                    syntax
                );

                const runtimeCandidTypeObject = generateRuntimeCandidTypeObject(
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
                        syntax
                    );

                const imports = generateImports(params, returnFunc, syntax);

                return {
                    definition: {
                        candidMeta: {
                            candidTypeAnnotation,
                            candidTypeObject,
                            runtimeCandidTypeObject,
                            variableAliasDeclarations,
                            imports,
                            candidType: 'Func',
                            idl: generateIdl(params, returnFunc, mode)
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
    syntax: Syntax
): Set<string> {
    const funcImports = syntax === 'functional' ? ['Func'] : ['IDL'];

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
    syntax: Syntax
): string[] {
    const paramTypeDeclarations = paramCandids.flatMap(
        (param) => param.candidMeta.variableAliasDeclarations
    );
    const returnTypeDeclaration =
        returnCandid.candidMeta.variableAliasDeclarations;

    if (useTypeDeclaration === true) {
        const type =
            syntax === 'functional'
                ? []
                : [
                      `type ${name} = ${generateCandidTypeAnnotation(
                          false,
                          name,
                          syntax
                      )}`
                  ];
        return [
            ...paramTypeDeclarations,
            ...returnTypeDeclaration,
            `const ${name} = ${generateCandidTypeObject(
                false,
                name,
                paramCandids,
                returnCandid,
                mode,
                syntax
            )}`,
            ...type
        ];
    }

    return [...paramTypeDeclarations, ...returnTypeDeclaration];
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    syntax: Syntax
): string {
    if (useTypeDeclaration === true) {
        if (syntax === 'class') {
            return name;
        }
        return `typeof ${name}.tsType`;
    }

    return `[Principal, string]`;
}

function generateIdl(
    _paramCandids: CandidDefinition[],
    _returnCandid: CandidDefinition,
    _mode: Mode
): string {
    return '';
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    paramCandids: CandidDefinition[],
    returnCandid: CandidDefinition,
    mode: Mode,
    syntax: Syntax
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    const params = paramCandids
        .map((param) => param.candidMeta.candidTypeObject)
        .join(', ');

    const returnType = returnCandid.candidMeta.candidTypeObject;

    if (syntax === 'class') {
        return `IDL.Func([${params}], [${returnType}], ${
            mode === 'update' ? '' : `['${mode}']`
        })`;
    }

    return `Func([${params}], ${returnType}, '${mode}')`;
}

function generateRuntimeCandidTypeObject(
    paramCandids: CandidDefinition[],
    returnCandid: CandidDefinition,
    mode: Mode
): CandidType {
    const params = paramCandids.map(
        (param) => param.candidMeta.runtimeCandidTypeObject
    );

    return Func(params, returnCandid.candidMeta.runtimeCandidTypeObject, mode);
}

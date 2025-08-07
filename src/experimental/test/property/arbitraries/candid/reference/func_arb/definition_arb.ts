import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { toArgsTuple } from '#lib/func';
import { IDL } from '#lib/index';

import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    FuncCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { VoidDefinitionArb } from '../../primitive/void_arb';

type Mode = 'query' | 'update' | 'oneway';

export function FuncDefinitionArb(
    candidDefArb: WithShapesArb<CandidDefinition>
): WithShapesArb<FuncCandidDefinition> {
    return fc
        .constantFrom<Mode>('query', 'update', 'oneway')
        .chain((mode) => {
            const returnType =
                mode === 'oneway' ? VoidDefinitionArb() : candidDefArb;

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
                const typeAnnotation = generateCandidTypeAnnotation(
                    useTypeDeclaration,
                    name
                );

                const typeObject = generateTypeObject(
                    useTypeDeclaration,
                    name,
                    params,
                    returnFunc,
                    mode
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
                        mode
                    );

                const imports = generateImports(params, returnFunc);

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
    returnFunc: CandidDefinition
): Set<string> {
    return new Set([
        ...params.flatMap((param) => [...param.candidMeta.imports]),
        ...returnFunc.candidMeta.imports,
        'IDL',
        'Principal'
    ]);
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    paramCandids: CandidDefinition[],
    returnCandid: CandidDefinition,
    mode: Mode
): string[] {
    const paramTypeDeclarations = paramCandids.flatMap(
        (param) => param.candidMeta.variableAliasDeclarations
    );
    const returnTypeDeclaration =
        returnCandid.candidMeta.variableAliasDeclarations;

    if (useTypeDeclaration === true) {
        const type = [
            `type ${name} = ${generateCandidTypeAnnotation(false, name)};`
        ];
        return [
            ...paramTypeDeclarations,
            ...returnTypeDeclaration,
            `const ${name} = ${generateTypeObject(
                false,
                name,
                paramCandids,
                returnCandid,
                mode
            )}`,
            ...type
        ];
    }

    return [...paramTypeDeclarations, ...returnTypeDeclaration];
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    return `[Principal, string]`;
}

function generateTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    paramCandids: CandidDefinition[],
    returnCandid: CandidDefinition,
    mode: Mode
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    const params = paramCandids
        .map((param) => param.candidMeta.typeObject)
        .join(', ');

    const returnType = returnCandid.candidMeta.typeObject;

    return `IDL.Func([${params}], [${returnType}], ${
        mode === 'update' ? '' : `['${mode}']`
    })`;
}

function generateRuntimeTypeObject(
    paramCandids: CandidDefinition[],
    returnCandid: CandidDefinition,
    mode: Mode
): IDL.Type {
    // TODO IDL.Empty is a placeholder for void...not quite correct
    const params = paramCandids.map(
        (param) => param.candidMeta.runtimeTypeObject ?? IDL.Empty
    );

    // TODO IDL.Empty is a placeholder for void...not quite correct
    return IDL.Func(
        toArgsTuple(params),
        [returnCandid.candidMeta.runtimeTypeObject ?? IDL.Empty],
        [mode]
    );
}

import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    FuncCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { VoidDefinitionArb } from '../../primitive/void';
import { CandidType, Func } from '../../../../../src/lib';
import { RecursiveShapes } from '../../recursive';

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
                UniqueIdentifierArb('typeDeclaration'),
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
                    name
                );

                const candidTypeObject = generateCandidTypeObject(
                    useTypeDeclaration,
                    name,
                    params,
                    returnFunc,
                    mode
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
                        mode
                    );

                const imports = new Set([
                    ...params.flatMap((param) => [...param.candidMeta.imports]),
                    ...returnFunc.candidMeta.imports,
                    'Func',
                    'Principal'
                ]);

                return {
                    definition: {
                        candidMeta: {
                            candidTypeAnnotation,
                            candidTypeObject,
                            runtimeCandidTypeObject,
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

    if (useTypeDeclaration) {
        return [
            ...paramTypeDeclarations,
            ...returnTypeDeclaration,
            `const ${name} = ${generateCandidTypeObject(
                false,
                name,
                paramCandids,
                returnCandid,
                mode
            )}`
        ];
    }

    return [...paramTypeDeclarations, ...returnTypeDeclaration];
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string
): string {
    if (useTypeDeclaration === true) {
        return `typeof ${name}.tsType`;
    }

    return `[Principal, string]`;
}

function generateCandidTypeObject(
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
        .map((param) => param.candidMeta.candidTypeObject)
        .join(', ');

    return `Func([${params}], ${returnCandid.candidMeta.candidTypeObject}, '${mode}')`;
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

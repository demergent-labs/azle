import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    FuncCandidDefinition
} from '../../candid_definition_arb/types';
import { VoidDefinitionArb } from '../../primitive/void';

type Mode = 'query' | 'update' | 'oneway';

export function FuncDefinitionArb(
    candidDefArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<FuncCandidDefinition> {
    return (fc.constantFrom('query', 'update', 'oneway') as fc.Arbitrary<Mode>)
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
                params,
                returnFunc,
                mode,
                useTypeDeclaration
            ]): FuncCandidDefinition => {
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
                    candidMeta: {
                        candidTypeAnnotation,
                        candidTypeObject,
                        variableAliasDeclarations,
                        imports,
                        candidType: 'Func'
                    },
                    paramCandidMeta: params,
                    returnCandidMeta: returnFunc
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

import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    RecCandidDefMemo,
    RecursiveCandidDefinition,
    VecCandidDefinition
} from '../../candid_definition_arb/types';
import { CandidType, Vec } from '../../../../../src/lib';

function possiblyRecursiveArb(
    candidArb: RecCandidDefMemo,
    parents: RecursiveCandidDefinition[],
    n: number
): fc.Arbitrary<CandidDefinition> {
    return fc.nat(Math.max(parents.length - 1, 0)).chain((randomIndex) => {
        if (parents.length === 0) {
            // If there are no recursive parents or this is the first variant field just do a regular arb field
            return candidArb(parents)(n);
        }
        return fc.oneof(
            { arbitrary: fc.constant(parents[randomIndex]), weight: 1 },
            { arbitrary: candidArb(parents)(n), weight: 1 }
        );
    });
}

export function VecDefinitionArb(
    candidTypeArb: RecCandidDefMemo,
    parents: RecursiveCandidDefinition[],
    n: number
): fc.Arbitrary<VecCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            possiblyRecursiveArb(candidTypeArb, parents, n),
            fc.boolean()
        )
        .map(([name, innerType, useTypeDeclaration]): VecCandidDefinition => {
            const candidTypeAnnotation = generateCandidTypeAnnotation(
                useTypeDeclaration,
                name,
                innerType
            );

            const candidTypeObject = generateCandidTypeObject(
                useTypeDeclaration,
                name,
                innerType
            );

            const runtimeCandidTypeObject =
                generateRuntimeCandidTypeObject(innerType);

            const variableAliasDeclarations = generateVariableAliasDeclarations(
                useTypeDeclaration,
                name,
                innerType
            );

            const imports = generateImports(innerType);

            return {
                candidMeta: {
                    candidTypeAnnotation,
                    candidTypeObject,
                    runtimeCandidTypeObject,
                    variableAliasDeclarations,
                    imports,
                    candidType: 'Vec'
                },
                innerType: innerType
            };
        });
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string[] {
    if (useTypeDeclaration) {
        return [
            ...innerType.candidMeta.variableAliasDeclarations,
            `const ${name} = ${generateCandidTypeObject(
                false,
                name,
                innerType
            )};`
        ];
    }
    return innerType.candidMeta.variableAliasDeclarations;
}

function generateImports(innerType: CandidDefinition): Set<string> {
    return new Set([...innerType.candidMeta.imports, 'Vec']);
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string {
    if (useTypeDeclaration === true) {
        return `typeof ${name}.tsType`;
    }

    return `Vec<${innerType.candidMeta.candidTypeAnnotation}>`;
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    return `Vec(${innerType.candidMeta.candidTypeObject})`;
}

function generateRuntimeCandidTypeObject(
    innerType: CandidDefinition
): CandidType {
    return Vec(innerType.candidMeta.runtimeCandidTypeObject);
}

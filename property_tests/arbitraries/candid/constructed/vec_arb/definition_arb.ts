import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    VecCandidDefinition
} from '../../candid_definition_arb/types';

export function VecDefinitionArb(
    candidTypeArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<VecCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            candidTypeArb,
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

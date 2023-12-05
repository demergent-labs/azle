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
            const typeAnnotation = useTypeDeclaration
                ? name
                : generateTypeAnnotation(innerType);

            const typeAliasDeclarations = generateTypeAliasDeclarations(
                name,
                innerType,
                useTypeDeclaration
            );

            const imports = generateImports(innerType);

            return {
                candidMeta: {
                    typeAnnotation,
                    typeAliasDeclarations,
                    imports,
                    candidType: 'Vec'
                },
                innerType: innerType
            };
        });
}

function generateTypeAliasDeclarations(
    name: string,
    innerType: CandidDefinition,
    useTypeDeclaration: boolean
): string[] {
    if (useTypeDeclaration) {
        return [
            ...innerType.candidMeta.typeAliasDeclarations,
            `const ${name} = ${generateTypeAnnotation(innerType)};`
        ];
    }
    return innerType.candidMeta.typeAliasDeclarations;
}

function generateImports(innerType: CandidDefinition): Set<string> {
    return new Set([...innerType.candidMeta.imports, 'Vec']);
}

function generateTypeAnnotation(innerType: CandidDefinition): string {
    return `Vec(${innerType.candidMeta.typeAnnotation})`;
}

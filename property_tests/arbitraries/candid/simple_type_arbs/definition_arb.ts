import fc from 'fast-check';
import { PrimitiveDefinition } from '../candid_definition_arb/types';
import { SimpleCandidType } from '../candid_type';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';

export function SimpleCandidDefinitionArb(
    candidType: SimpleCandidType
): fc.Arbitrary<PrimitiveDefinition> {
    return fc
        .tuple(UniqueIdentifierArb('typeDeclaration'), fc.boolean())
        .map(([name, useTypeDeclaration]) => {
            const typeAnnotation = useTypeDeclaration ? name : candidType;
            const imports = new Set([candidType]);
            const typeAliasDeclarations = generateTypeAliasDeclarations(
                name,
                candidType,
                useTypeDeclaration
            );
            return {
                candidMeta: {
                    candidType,
                    typeAnnotation,
                    imports,
                    typeAliasDeclarations
                }
            };
        });
}

function generateTypeAliasDeclarations(
    name: string,
    candidType: string,
    useTypeDeclaration: boolean
): string[] {
    if (useTypeDeclaration) {
        return [`const ${name} = ${candidType};`];
    }
    return [];
}

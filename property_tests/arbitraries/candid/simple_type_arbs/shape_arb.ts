import fc from 'fast-check';
import { PrimitiveDefinition } from '../candid_meta_arb';
import {
    CandidType,
    primitiveCandidClassToImports,
    primitiveCandidTypeToString as primitiveCandidTypeToTypeAnnotation
} from '../candid_type';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';

export function SimpleCandidShapeArb(
    candidType: CandidType
): fc.Arbitrary<PrimitiveDefinition> {
    return fc
        .tuple(UniqueIdentifierArb('typeDeclaration'), fc.boolean())
        .map(([name, useTypeDeclaration]) => {
            const typeAnnotation = useTypeDeclaration
                ? name
                : primitiveCandidTypeToTypeAnnotation(candidType);
            const imports = primitiveCandidClassToImports(candidType);
            const typeAliasDeclarations = generateTypeAliasDeclarations(
                name,
                primitiveCandidTypeToTypeAnnotation(candidType),
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

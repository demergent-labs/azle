import fc from 'fast-check';
import { PrimitiveDefinition } from '../candid_definition_arb/types';
import { SimpleCandidType } from '../candid_type';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import { candidTypeToRuntimeCandidType } from './candid_type_to_azle_candid_type';

export function SimpleCandidDefinitionArb(
    candidType: SimpleCandidType
): fc.Arbitrary<PrimitiveDefinition> {
    return fc
        .tuple(UniqueIdentifierArb('typeDeclaration'), fc.boolean())
        .map(([name, useTypeDeclaration]) => {
            const candidTypeAnnotation = candidType;
            const candidTypeObject = useTypeDeclaration ? name : candidType;
            const runtimeCandidTypeObject =
                candidTypeToRuntimeCandidType(candidType);
            const imports = new Set([candidType]);
            const variableAliasDeclarations = generateVariableAliasDeclarations(
                name,
                candidType,
                useTypeDeclaration
            );
            return {
                candidMeta: {
                    candidTypeAnnotation,
                    candidTypeObject,
                    candidType,
                    runtimeCandidTypeObject,
                    imports,
                    variableAliasDeclarations
                }
            };
        });
}

function generateVariableAliasDeclarations(
    name: string,
    candidType: string,
    useTypeDeclaration: boolean
): string[] {
    if (useTypeDeclaration) {
        return [`const ${name} = ${candidType};`];
    }
    return [];
}

import fc from 'fast-check';
import {
    PrimitiveDefinition,
    WithShapes,
    WithShapesArb
} from '../candid_definition_arb/types';
import { SimpleCandidType } from '../candid_type';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import { candidTypeToRuntimeCandidTypeObject } from './candid_type_to_azle_candid_type';

export function SimpleCandidDefinitionArb(
    candidType: SimpleCandidType,
    useVariableAliasDeclaration?: boolean
): WithShapesArb<PrimitiveDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            useVariableAliasDeclarationArb(useVariableAliasDeclaration)
        )
        .map(([name, useTypeDeclaration]): WithShapes<PrimitiveDefinition> => {
            const candidTypeAnnotation = candidType;
            const candidTypeObject = useTypeDeclaration ? name : candidType;
            const runtimeCandidTypeObject =
                candidTypeToRuntimeCandidTypeObject(candidType);
            const imports = new Set([candidType]);
            const variableAliasDeclarations = generateVariableAliasDeclarations(
                name,
                candidType,
                useTypeDeclaration
            );
            return {
                definition: {
                    candidMeta: {
                        candidTypeAnnotation,
                        candidTypeObject,
                        candidType,
                        runtimeCandidTypeObject,
                        imports,
                        variableAliasDeclarations
                    }
                },
                recursiveShapes: {}
            };
        });
}

function useVariableAliasDeclarationArb(
    useVariableAliasDeclaration: boolean | undefined
): fc.Arbitrary<boolean> {
    return useVariableAliasDeclaration === undefined
        ? fc.boolean()
        : fc.constant(useVariableAliasDeclaration);
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

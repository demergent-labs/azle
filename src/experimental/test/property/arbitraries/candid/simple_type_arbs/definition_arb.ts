import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import {
    PrimitiveDefinition,
    WithShapes,
    WithShapesArb
} from '../candid_definition_arb/types';
import { SimpleCandidType, simpleCandidTypeToTsType } from '../candid_type';
import { candidTypeToRuntimeTypeObject } from './candid_type_to_azle_candid_type';

export function SimpleCandidDefinitionArb(
    candidType: SimpleCandidType,
    useVariableAliasDeclaration?: boolean
): WithShapesArb<PrimitiveDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('globalNames'),
            useVariableAliasDeclarationArb(useVariableAliasDeclaration)
        )
        .map(
            ([
                name,
                useTypeDeclarationChance
            ]): WithShapes<PrimitiveDefinition> => {
                const useTypeDeclaration =
                    useTypeDeclarationChance && candidType !== 'Void';
                const typeAnnotation = simpleCandidTypeToTsType(candidType);
                const idl = toIDL(candidType);
                const typeObject = useTypeDeclaration ? name : idl;
                const runtimeTypeObject =
                    candidTypeToRuntimeTypeObject(candidType);
                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        name,
                        candidType,
                        useTypeDeclaration
                    );
                return {
                    definition: {
                        candidMeta: {
                            typeAnnotation,
                            typeObject,
                            candidType,
                            runtimeTypeObject,
                            imports: generateImports(candidType),
                            variableAliasDeclarations
                        }
                    },
                    recursiveShapes: {}
                };
            }
        );
}

function generateImports(candidType: SimpleCandidType): Set<string> {
    if (candidType === 'Principal') {
        return new Set(['IDL', 'Principal']);
    }
    return new Set(['IDL']);
}

function toIDL(candidType: SimpleCandidType): string {
    if (candidType === 'Void') {
        return '';
    }
    if (candidType === 'blob') {
        return 'IDL.Vec(IDL.Nat8)';
    }
    return `IDL.${candidType.charAt(0).toUpperCase()}${candidType.slice(1)}`;
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
    candidType: SimpleCandidType,
    useTypeDeclaration: boolean
): string[] {
    if (useTypeDeclaration === true) {
        return [
            `const ${name} = ${toIDL(candidType)};`,
            `type ${name} = ${simpleCandidTypeToTsType(candidType)};`
        ];
    }
    return [];
}

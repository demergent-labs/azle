import fc from 'fast-check';

import { Syntax } from '../../types';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import {
    PrimitiveDefinition,
    WithShapes,
    WithShapesArb
} from '../candid_definition_arb/types';
import { SimpleCandidType, simpleCandidTypeToTsType } from '../candid_type';
import { candidTypeToRuntimeCandidTypeObject } from './candid_type_to_azle_candid_type';

export function SimpleCandidDefinitionArb(
    candidType: SimpleCandidType,
    syntax: Syntax,
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
                const candidTypeAnnotation =
                    syntax === 'functional'
                        ? candidType
                        : simpleCandidTypeToTsType(candidType);
                const idl = toIDL(candidType);
                const candidTypeObject = useTypeDeclaration
                    ? name
                    : syntax === 'functional'
                    ? candidType
                    : idl;
                const runtimeCandidTypeObject =
                    candidTypeToRuntimeCandidTypeObject(candidType);
                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        name,
                        candidType,
                        useTypeDeclaration,
                        syntax
                    );
                return {
                    definition: {
                        candidMeta: {
                            candidTypeAnnotation,
                            candidTypeObject,
                            candidType,
                            runtimeCandidTypeObject,
                            imports: generateImports(candidType, syntax),
                            variableAliasDeclarations
                        }
                    },
                    recursiveShapes: {}
                };
            }
        );
}

function generateImports(
    candidType: SimpleCandidType,
    syntax: Syntax
): Set<string> {
    if (syntax === 'class') {
        if (candidType === 'Principal') {
            return new Set(['IDL', 'Principal']);
        }
        return new Set(['IDL']);
    }
    return new Set([candidType]);
}

function toIDL(candidType: SimpleCandidType): string {
    if (candidType === 'Void') {
        return '';
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
    useTypeDeclaration: boolean,
    syntax: Syntax
): string[] {
    if (useTypeDeclaration) {
        if (syntax === 'class') {
            return [
                `type ${name} = ${simpleCandidTypeToTsType(candidType)}`,
                `const ${name} = ${toIDL(candidType)};`
            ];
        }
        return [`const ${name} = ${candidType};`];
    }
    return [];
}

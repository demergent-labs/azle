import fc from 'fast-check';

import { Api, Context } from '../../types';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import {
    PrimitiveDefinition,
    WithShapes,
    WithShapesArb
} from '../candid_definition_arb/types';
import { SimpleCandidType, simpleCandidTypeToTsType } from '../candid_type';
import { candidTypeToRuntimeTypeObject } from './candid_type_to_azle_candid_type';

export function SimpleCandidDefinitionArb(
    context: Context,
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
                const typeAnnotation =
                    context.api === 'functional'
                        ? candidType
                        : simpleCandidTypeToTsType(candidType);
                const idl = toIDL(candidType);
                const typeObject = useTypeDeclaration
                    ? name
                    : context.api === 'functional'
                    ? candidType
                    : idl;
                const runtimeTypeObject =
                    candidTypeToRuntimeTypeObject(candidType);
                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        name,
                        candidType,
                        useTypeDeclaration,
                        context.api
                    );
                return {
                    definition: {
                        candidMeta: {
                            typeAnnotation,
                            typeObject,
                            candidType,
                            runtimeTypeObject,
                            imports: generateImports(candidType, context.api),
                            variableAliasDeclarations
                        }
                    },
                    recursiveShapes: {}
                };
            }
        );
}

function generateImports(candidType: SimpleCandidType, api: Api): Set<string> {
    if (api === 'class') {
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
    api: Api
): string[] {
    if (useTypeDeclaration) {
        if (api === 'class') {
            return [
                `const ${name} = ${toIDL(candidType)};`,
                `type ${name} = ${simpleCandidTypeToTsType(candidType)}`
            ];
        }
        return [`const ${name} = ${candidType};`];
    }
    return [];
}

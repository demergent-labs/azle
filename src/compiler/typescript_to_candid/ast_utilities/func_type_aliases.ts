import * as tsc from 'typescript';
import { CandidTypeClass } from '../../../types';
import {
    getCandidRecordNamesFromTupleTypeNode,
    getCandidRecordNamesFromTypeLiteralNode
} from '../generators/record';
import { generateCandidTypeInfo } from '../generators/type_info';
import {
    getCandidVariantNamesFromTupleTypeNode,
    getCandidVariantNamesFromTypeLiteralNode
} from '../generators/variant';

export function getFuncTypeAliasRecordNames(
    sourceFiles: readonly tsc.SourceFile[],
    funcTypeAliasDeclarations: tsc.TypeAliasDeclaration[]
): string[] {
    return getFuncTypeAliasNames(
        sourceFiles,
        funcTypeAliasDeclarations,
        'record'
    );   
}

export function getFuncTypeAliasVariantNames(
    sourceFiles: readonly tsc.SourceFile[],
    funcTypeAliasDeclarations: tsc.TypeAliasDeclaration[]
): string[] {
    return getFuncTypeAliasNames(
        sourceFiles,
        funcTypeAliasDeclarations,
        'variant'
    );
}

function getFuncTypeAliasNames(
    sourceFiles: readonly tsc.SourceFile[],
    funcTypeAliasDeclarations: tsc.TypeAliasDeclaration[],
    candidTypeClass: CandidTypeClass
): string[] {
    return funcTypeAliasDeclarations.reduce((result: string[], typeAliasDeclaration) => {
        const parameterRecordNames = getFuncTypeAliasParameterNames(
            sourceFiles,
            typeAliasDeclaration,
            candidTypeClass
        );
        const returnTypeRecordNames = getFuncTypeAliasReturnTypeNames(
            sourceFiles,
            typeAliasDeclaration,
            candidTypeClass
        );

        return [
            ...result,
            ...parameterRecordNames,
            ...returnTypeRecordNames
        ];
    }, []);
}

// TODO there is a lot of repeated code now in canister_methods.ts and canister_type_aliases.ts
function getFuncTypeAliasParameterNames(
    sourceFiles: readonly tsc.SourceFile[],
    typeAliasDeclaration: tsc.TypeAliasDeclaration,
    candidTypeClass: CandidTypeClass
): string[] {
    if (typeAliasDeclaration.type.kind !== tsc.SyntaxKind.TypeReference) {
        throw new Error(`Func type must be a type reference`);
    }

    const typeReferenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

    if (typeReferenceNode.typeArguments === undefined) {
        throw new Error(`Func type must have type arguments`);
    }

    const firstTypeArgument = typeReferenceNode.typeArguments[0];

    if (firstTypeArgument.kind !== tsc.SyntaxKind.FunctionType) {
        throw new Error('Must be a FunctionType');
    }

    const function_type_node = firstTypeArgument as tsc.FunctionTypeNode;

    const function_type_record_names = function_type_node.parameters.reduce((result: string[], parameter) => {
        if (parameter.type === undefined) {
            throw new Error('parameter must have a type');
        }

        const candidTypeInfo = generateCandidTypeInfo(
            sourceFiles,
            parameter.type
        );

        if (candidTypeClass === 'record') {
            if (candidTypeInfo.typeClass === 'record') {
                return [
                    ...result,
                    candidTypeInfo.typeName
                ];
            }
    
            if (candidTypeInfo.typeClass === 'inline_record') {
                const recordNames = getCandidRecordNamesFromTypeLiteralNode(
                    sourceFiles,
                    parameter.type as tsc.TypeLiteralNode,
                    []
                );

                return [
                    ...result,
                    ...recordNames
                ];
            }

            if (candidTypeInfo.typeClass === 'inline_tuple_record') {
                const recordNames = getCandidRecordNamesFromTupleTypeNode(
                    sourceFiles,
                    parameter.type as tsc.TupleTypeNode,
                    []
                );

                return [
                    ...result,
                    ...recordNames
                ];
            }
    
            if (candidTypeInfo.typeClass === 'inline_variant') {
                const typeArguments = (parameter.type as tsc.TypeReferenceNode).typeArguments;

                if (typeArguments === undefined) {
                    throw new Error('This cannot happen');
                }

                const recordNames = getCandidRecordNamesFromTypeLiteralNode(
                    sourceFiles,
                    typeArguments[0] as tsc.TypeLiteralNode,
                    []
                );

                return [
                    ...result,
                    ...recordNames
                ];
            }
        }

        if (candidTypeClass === 'variant') {
            if (candidTypeInfo.typeClass === 'variant') {
                return [
                    ...result,
                    candidTypeInfo.typeName
                ];
            }
    
            if (candidTypeInfo.typeClass === 'inline_variant') {
                const typeArguments = (parameter.type as tsc.TypeReferenceNode).typeArguments;

                if (typeArguments === undefined) {
                    throw new Error('This cannot happen');
                }

                const variantNames = getCandidVariantNamesFromTypeLiteralNode(
                    sourceFiles,
                    typeArguments[0] as tsc.TypeLiteralNode,
                    []
                );

                return [
                    ...result,
                    ...variantNames
                ];
            }
    
            if (candidTypeInfo.typeClass === 'inline_record') {
                const variantNames = getCandidVariantNamesFromTypeLiteralNode(
                    sourceFiles,
                    parameter.type as tsc.TypeLiteralNode,
                    []
                );

                return [
                    ...result,
                    ...variantNames
                ];
            }

            if (candidTypeInfo.typeClass === 'inline_tuple_record') {
                const variantNames = getCandidVariantNamesFromTupleTypeNode(
                    sourceFiles,
                    parameter.type as tsc.TupleTypeNode,
                    []
                );

                return [
                    ...result,
                    ...variantNames
                ];
            }
        }

        return result;
    }, []);

    return function_type_record_names;
}

function getFuncTypeAliasReturnTypeNames(
    sourceFiles: readonly tsc.SourceFile[],
    typeAliasDeclaration: tsc.TypeAliasDeclaration,
    candidTypeClass: CandidTypeClass
): string[] {
    if (typeAliasDeclaration.type.kind !== tsc.SyntaxKind.TypeReference) {
        throw new Error(`Func type must be a type reference`);
    }

    const typeReferenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

    if (typeReferenceNode.typeArguments === undefined) {
        throw new Error(`Func type must have type arguments`);
    }

    const firstTypeArgument = typeReferenceNode.typeArguments[0];

    if (firstTypeArgument.kind !== tsc.SyntaxKind.FunctionType) {
        throw new Error(`Func type must be a FunctionType`);
    }

    const function_type_node = firstTypeArgument as tsc.FunctionTypeNode;

    const candidTypeInfo = generateCandidTypeInfo(
        sourceFiles,
        getFunctionTypeReturnTypeNode(function_type_node)
    );

    if (candidTypeClass === 'record') {
        if (candidTypeInfo.typeClass === 'record') {
            return [candidTypeInfo.typeName];
        }

        if (candidTypeInfo.typeClass === 'inline_record') {
            const typeArguments = (function_type_node.type as tsc.TypeReferenceNode).typeArguments;

            if (typeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            const recordNames = getCandidRecordNamesFromTypeLiteralNode(
                sourceFiles,
                typeArguments[0] as tsc.TypeLiteralNode,
                []
            );

            return recordNames;
        }

        if (candidTypeInfo.typeClass === 'inline_tuple_record') {
            const typeArguments = (function_type_node.type as tsc.TypeReferenceNode).typeArguments;

            if (typeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            const recordNames = getCandidRecordNamesFromTupleTypeNode(
                sourceFiles,
                typeArguments[0] as tsc.TupleTypeNode,
                []
            );

            return recordNames;
        }

        if (candidTypeInfo.typeClass === 'inline_variant') {
            const outerTypeArguments = (function_type_node.type as tsc.TypeReferenceNode).typeArguments;

            if (outerTypeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            const innerTypeArguments = (outerTypeArguments[0] as tsc.TypeReferenceNode).typeArguments;

            if (innerTypeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            const recordNames = getCandidRecordNamesFromTypeLiteralNode(
                sourceFiles,
                innerTypeArguments[0] as tsc.TypeLiteralNode,
                []
            );

            return recordNames;
        }
    }

    if (candidTypeClass === 'variant') {
        if (candidTypeInfo.typeClass === 'variant') {
            return [candidTypeInfo.typeName];
        }

        if (candidTypeInfo.typeClass === 'inline_variant') {
            const outerTypeArguments = (function_type_node.type as tsc.TypeReferenceNode).typeArguments;

            if (outerTypeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            const innerTypeArguments = (outerTypeArguments[0] as tsc.TypeReferenceNode).typeArguments;

            if (innerTypeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            const variantNames = getCandidVariantNamesFromTypeLiteralNode(
                sourceFiles,
                innerTypeArguments[0] as tsc.TypeLiteralNode,
                []
            );

            return variantNames;
        }

        if (candidTypeInfo.typeClass === 'inline_record') {
            const typeArguments = (function_type_node.type as tsc.TypeReferenceNode).typeArguments;

            if (typeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            const variantNames = getCandidVariantNamesFromTypeLiteralNode(
                sourceFiles,
                typeArguments[0] as tsc.TypeLiteralNode,
                []
            );

            return variantNames;
        }

        if (candidTypeInfo.typeClass === 'inline_tuple_record') {
            const typeArguments = (function_type_node.type as tsc.TypeReferenceNode).typeArguments;

            if (typeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            const variantNames = getCandidVariantNamesFromTupleTypeNode(
                sourceFiles,
                typeArguments[0] as tsc.TupleTypeNode,
                []
            );

            return variantNames;
        }
    }

    return [];
}

function getFunctionTypeReturnTypeNode(methodSignature: tsc.FunctionTypeNode): tsc.TypeNode {
    if (methodSignature.type === undefined) {
        throw new Error('Method signature must have a return type');
    }

    if (methodSignature.type.kind === tsc.SyntaxKind.TypeReference) {
        const typeReferenceNode = methodSignature.type as tsc.TypeReferenceNode;

        if (typeReferenceNode.typeArguments === undefined) {
            throw new Error('Method signature must have a return type');
        }

        return typeReferenceNode.typeArguments[0];
    }

    throw new Error('Method signature must have a return type');
}
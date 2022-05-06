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

export function getCanisterTypeAliasRecordNames(
    sourceFiles: readonly tsc.SourceFile[],
    canisterTypeAliasDeclarations: tsc.TypeAliasDeclaration[]
): string[] {
    return getCanisterTypeAliasNames(
        sourceFiles,
        canisterTypeAliasDeclarations,
        'record'
    );   
}

export function getCanisterTypeAliasVariantNames(
    sourceFiles: readonly tsc.SourceFile[],
    canisterTypeAliasDeclarations: tsc.TypeAliasDeclaration[]
): string[] {
    return getCanisterTypeAliasNames(
        sourceFiles,
        canisterTypeAliasDeclarations,
        'variant'
    );
}

function getCanisterTypeAliasNames(
    sourceFiles: readonly tsc.SourceFile[],
    canisterTypeAliasDeclarations: tsc.TypeAliasDeclaration[],
    candidTypeClass: CandidTypeClass
): string[] {
    return canisterTypeAliasDeclarations.reduce((result: string[], typeAliasDeclaration) => {
        const parameterRecordNames = getCanisterTypeAliasParameterNames(
            sourceFiles,
            typeAliasDeclaration,
            candidTypeClass
        );
        const returnTypeRecordNames = getCanisterTypeAliasReturnTypeNames(
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
function getCanisterTypeAliasParameterNames(
    sourceFiles: readonly tsc.SourceFile[],
    typeAliasDeclaration: tsc.TypeAliasDeclaration,
    candidTypeClass: CandidTypeClass
): string[] {
    if (typeAliasDeclaration.type.kind !== tsc.SyntaxKind.TypeReference) {
        throw new Error(`Canister type must be a type reference`);
    }

    const typeReferenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

    if (typeReferenceNode.typeArguments === undefined) {
        throw new Error(`Canister type must have type arguments`);
    }

    const firstTypeArgument = typeReferenceNode.typeArguments[0];

    if (firstTypeArgument.kind !== tsc.SyntaxKind.TypeLiteral) {
        throw new Error(`Canister type must be a type literal`);
    }

    const typeLiteralNode = firstTypeArgument as tsc.TypeLiteralNode;

    return typeLiteralNode.members.reduce((result: string[], member) => {
        if (member.kind !== tsc.SyntaxKind.MethodSignature) {
            throw new Error('Must be a method signature');
        }

        const methodSignature = member as tsc.MethodSignature;

        const methodSignatureRecordNames = methodSignature.parameters.reduce((result: string[], parameter) => {
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

        return [
            ...result,
            ...methodSignatureRecordNames
        ];
    }, []);
}

function getCanisterTypeAliasReturnTypeNames(
    sourceFiles: readonly tsc.SourceFile[],
    typeAliasDeclaration: tsc.TypeAliasDeclaration,
    candidTypeClass: CandidTypeClass
): string[] {
    if (typeAliasDeclaration.type.kind !== tsc.SyntaxKind.TypeReference) {
        throw new Error(`Canister type must be a type reference`);
    }

    const typeReferenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

    if (typeReferenceNode.typeArguments === undefined) {
        throw new Error(`Canister type must have type arguments`);
    }

    const firstTypeArgument = typeReferenceNode.typeArguments[0];

    if (firstTypeArgument.kind !== tsc.SyntaxKind.TypeLiteral) {
        throw new Error(`Canister type must be a type literal`);
    }

    const typeLiteralNode = firstTypeArgument as tsc.TypeLiteralNode;

    return typeLiteralNode.members.reduce((result: string[], member) => {
        if (member.kind !== tsc.SyntaxKind.MethodSignature) {
            throw new Error('Must be a method signature');
        }

        const methodSignature = member as tsc.MethodSignature;

        const candidTypeInfo = generateCandidTypeInfo(
            sourceFiles,
            getMethodSignatureReturnTypeNode(methodSignature)
        );
    
        if (candidTypeClass === 'record') {
            if (candidTypeInfo.typeClass === 'record') {
                return [
                    ...result,
                    candidTypeInfo.typeName
                ];
            }
    
            if (candidTypeInfo.typeClass === 'inline_record') {
                const typeArguments = (methodSignature.type as tsc.TypeReferenceNode).typeArguments;
    
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

            if (candidTypeInfo.typeClass === 'inline_tuple_record') {
                const typeArguments = (methodSignature.type as tsc.TypeReferenceNode).typeArguments;
    
                if (typeArguments === undefined) {
                    throw new Error('This cannot happen');
                }
    
                const recordNames = getCandidRecordNamesFromTupleTypeNode(
                    sourceFiles,
                    typeArguments[0] as tsc.TupleTypeNode,
                    []
                );

                return [
                    ...result,
                    ...recordNames
                ];
            }
    
            if (candidTypeInfo.typeClass === 'inline_variant') {
                const outerTypeArguments = (methodSignature.type as tsc.TypeReferenceNode).typeArguments;
    
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
                const outerTypeArguments = (methodSignature.type as tsc.TypeReferenceNode).typeArguments;
    
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

                return [
                    ...result,
                    ...variantNames
                ];
            }
    
            if (candidTypeInfo.typeClass === 'inline_record') {
                const typeArguments = (methodSignature.type as tsc.TypeReferenceNode).typeArguments;
    
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

            if (candidTypeInfo.typeClass === 'inline_tuple_record') {
                const typeArguments = (methodSignature.type as tsc.TypeReferenceNode).typeArguments;
    
                if (typeArguments === undefined) {
                    throw new Error('This cannot happen');
                }
    
                const variantNames = getCandidVariantNamesFromTupleTypeNode(
                    sourceFiles,
                    typeArguments[0] as tsc.TupleTypeNode,
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
}

function getMethodSignatureReturnTypeNode(methodSignature: tsc.MethodSignature): tsc.TypeNode {
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
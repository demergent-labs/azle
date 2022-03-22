import { generateCandidTypeInfo } from '../generators/type_info';
import {
    CandidTypeClass,
    CanisterMethodTypeName
} from '../../../types';
import * as tsc from 'typescript';
import { getCandidRecordNamesFromTypeLiteralNode } from '../generators/record';
import { getCandidVariantNamesFromTypeLiteralNode } from '../generators/variant';

export function getCanisterMethodFunctionDeclarationsFromSourceFiles(
    sourceFiles: readonly tsc.SourceFile[],
    canisterMethodTypeName: CanisterMethodTypeName
): tsc.FunctionDeclaration[] {
    return sourceFiles.reduce((result: tsc.FunctionDeclaration[], sourceFile) => {
        return [
            ...result,
            ...getCanisterMethodFunctionDeclarationsFromNodes(
                sourceFile,
                sourceFile.getChildren(),
                canisterMethodTypeName
            )
        ];
    }, []);
}

function getCanisterMethodFunctionDeclarationsFromNodes(
    sourceFile: tsc.SourceFile,
    nodes: tsc.Node[],
    canisterMethodTypeName: CanisterMethodTypeName
): tsc.FunctionDeclaration[] {
    return nodes.reduce((result: tsc.FunctionDeclaration[], node) => {
        const canisterMethodFunctionDeclarations = getCanisterMethodFunctionDeclarationsFromNode(
            node,
            canisterMethodTypeName
        );

        return [
            ...result,
            ...canisterMethodFunctionDeclarations,
            ...getCanisterMethodFunctionDeclarationsFromNodes(
                sourceFile,
                node.getChildren(sourceFile),
                canisterMethodTypeName
            )
        ];
    }, []);
}

function getCanisterMethodFunctionDeclarationsFromNode(
    node: tsc.Node,
    canisterMethodTypeName: CanisterMethodTypeName
): tsc.FunctionDeclaration[] {
    if (nodeIsCanisterMethodFunctionDeclaration(
        node,
        canisterMethodTypeName
    ) === true) {
        const functionDeclaration = node as tsc.FunctionDeclaration;
        return [functionDeclaration];
    }
    else {
        return [];
    }
}

// TODO it would be nice to get rid of all the type casting and have the types guarded/inferred
export function nodeIsCanisterMethodFunctionDeclaration(
    node: tsc.Node,
    icFunctionTypeName: CanisterMethodTypeName
): boolean {
    if (tsc.isFunctionDeclaration(node) === false) {
        return false;
    }

    const functionDeclaration = node as tsc.FunctionDeclaration;

    if (functionDeclaration.type === undefined) {
        return false;
    }

    if (tsc.isTypeReferenceNode(functionDeclaration.type) === false) {
        return false;
    }

    const typeReferenceNode = functionDeclaration.type as tsc.TypeReferenceNode;

    if (tsc.isIdentifier(typeReferenceNode.typeName) === false) {
        return false;
    }

    const identifier = typeReferenceNode.typeName as tsc.Identifier;

    return identifier.escapedText === icFunctionTypeName;
}

export function getCanisterMethodRecordNames(
    sourceFiles: readonly tsc.SourceFile[],
    canisterMethodFunctionDeclarations: tsc.FunctionDeclaration[]
): string[] {
    return getCanisterMethodNames(
        sourceFiles,
        canisterMethodFunctionDeclarations,
        'record'
    );
}

export function getCanisterMethodVariantNames(
    sourceFiles: readonly tsc.SourceFile[],
    canisterMethodFunctionDeclarations: tsc.FunctionDeclaration[]
): string[] {
    return getCanisterMethodNames(
        sourceFiles,
        canisterMethodFunctionDeclarations,
        'variant'
    );
}

function getCanisterMethodNames(
    sourceFiles: readonly tsc.SourceFile[],
    canisterMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    candidTypeClass: CandidTypeClass
): string[] {
    return canisterMethodFunctionDeclarations.reduce((result: string[], functionDeclaration) => {
        const parameterRecordNames = getCanisterMethodParameterNames(
            sourceFiles,
            functionDeclaration,
            candidTypeClass
        );
        const returnTypeRecordNames = getCanisterMethodReturnTypeNames(
            sourceFiles,
            functionDeclaration,
            candidTypeClass
        );

        return [
            ...result,
            ...parameterRecordNames,
            ...returnTypeRecordNames
        ];
    }, []);
}

function getCanisterMethodParameterNames(
    sourceFiles: readonly tsc.SourceFile[],
    functionDeclaration: tsc.FunctionDeclaration,
    candidTypeClass: CandidTypeClass
): string[] {
    return functionDeclaration.parameters.reduce((result: string[], parameter) => {
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
        }

        return result;
    }, []);
}

function getCanisterMethodReturnTypeNames(
    sourceFiles: readonly tsc.SourceFile[],
    functionDeclaration: tsc.FunctionDeclaration,
    candidTypeClass: CandidTypeClass
): string[] {
    const candidTypeInfo = generateCandidTypeInfo(
        sourceFiles,
        getCanisterMethodReturnTypeNode(functionDeclaration)
    );

    if (candidTypeClass === 'record') {
        if (candidTypeInfo.typeClass === 'record') {
            return [candidTypeInfo.typeName];
        }

        if (candidTypeInfo.typeClass === 'inline_record') {
            const typeArguments = (functionDeclaration.type as tsc.TypeReferenceNode).typeArguments;

            if (typeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            return getCandidRecordNamesFromTypeLiteralNode(
                sourceFiles,
                typeArguments[0] as tsc.TypeLiteralNode,
                []
            );
        }

        if (candidTypeInfo.typeClass === 'inline_variant') {
            const outerTypeArguments = (functionDeclaration.type as tsc.TypeReferenceNode).typeArguments;

            if (outerTypeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            const innerTypeArguments = (outerTypeArguments[0] as tsc.TypeReferenceNode).typeArguments;

            if (innerTypeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            return getCandidRecordNamesFromTypeLiteralNode(
                sourceFiles,
                innerTypeArguments[0] as tsc.TypeLiteralNode,
                []
            );
        }
    }

    if (candidTypeClass === 'variant') {
        if (candidTypeInfo.typeClass === 'variant') {
            return [candidTypeInfo.typeName];
        }

        if (candidTypeInfo.typeClass === 'inline_variant') {
            const outerTypeArguments = (functionDeclaration.type as tsc.TypeReferenceNode).typeArguments;

            if (outerTypeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            const innerTypeArguments = (outerTypeArguments[0] as tsc.TypeReferenceNode).typeArguments;

            if (innerTypeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            return getCandidVariantNamesFromTypeLiteralNode(
                sourceFiles,
                innerTypeArguments[0] as tsc.TypeLiteralNode,
                []
            );
        }

        if (candidTypeInfo.typeClass === 'inline_record') {
            const typeArguments = (functionDeclaration.type as tsc.TypeReferenceNode).typeArguments;

            if (typeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            return getCandidVariantNamesFromTypeLiteralNode(
                sourceFiles,
                typeArguments[0] as tsc.TypeLiteralNode,
                []
            );
        }
    }

    return [];
}

function getCanisterMethodReturnTypeNode(functionDeclaration: tsc.FunctionDeclaration): tsc.TypeNode {
    if (functionDeclaration.type === undefined) {
        throw new Error('Function must have a return type');
    }

    if (functionDeclaration.type.kind === tsc.SyntaxKind.TypeReference) {
        const typeReferenceNode = functionDeclaration.type as tsc.TypeReferenceNode;

        if (typeReferenceNode.typeArguments === undefined) {
            throw new Error('Function must have a return type');
        }

        return typeReferenceNode.typeArguments[0];
    }

    throw new Error('Function must have a return type');
}
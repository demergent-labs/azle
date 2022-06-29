import { generateCandidTypeInfo } from '../generators/type_info';
import { CandidTypeClass, CanisterMethodTypeName } from '../../../types';
import * as tsc from 'typescript';
import {
    getCandidRecordNamesFromTupleTypeNode,
    getCandidRecordNamesFromTypeLiteralNode
} from '../generators/record';
import {
    getCandidVariantNamesFromTupleTypeNode,
    getCandidVariantNamesFromTypeLiteralNode
} from '../generators/variant';

export function getCanisterMethodFunctionDeclarationsFromSourceFiles(
    sourceFiles: readonly tsc.SourceFile[],
    canisterMethodTypeNames: CanisterMethodTypeName[]
): tsc.FunctionDeclaration[] {
    return sourceFiles.reduce(
        (result: tsc.FunctionDeclaration[], sourceFile) => {
            return [
                ...result,
                ...getCanisterMethodFunctionDeclarationsFromNodes(
                    sourceFile,
                    sourceFile.getChildren(),
                    canisterMethodTypeNames
                )
            ];
        },
        []
    );
}

function getCanisterMethodFunctionDeclarationsFromNodes(
    sourceFile: tsc.SourceFile,
    nodes: tsc.Node[],
    canisterMethodTypeNames: CanisterMethodTypeName[]
): tsc.FunctionDeclaration[] {
    return nodes.reduce((result: tsc.FunctionDeclaration[], node) => {
        const canisterMethodFunctionDeclarations =
            getCanisterMethodFunctionDeclarationsFromNode(
                node,
                canisterMethodTypeNames
            );

        return [
            ...result,
            ...canisterMethodFunctionDeclarations,
            ...getCanisterMethodFunctionDeclarationsFromNodes(
                sourceFile,
                node.getChildren(sourceFile),
                canisterMethodTypeNames
            )
        ];
    }, []);
}

function getCanisterMethodFunctionDeclarationsFromNode(
    node: tsc.Node,
    canisterMethodTypeNames: CanisterMethodTypeName[]
): tsc.FunctionDeclaration[] {
    if (
        nodeIsCanisterMethodFunctionDeclaration(
            node,
            canisterMethodTypeNames
        ) === true
    ) {
        const functionDeclaration = node as tsc.FunctionDeclaration;
        return [functionDeclaration];
    } else {
        return [];
    }
}

// TODO it would be nice to get rid of all the type casting and have the types guarded/inferred
export function nodeIsCanisterMethodFunctionDeclaration(
    node: tsc.Node,
    canisterMethodTypeNames: CanisterMethodTypeName[]
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

    return canisterMethodTypeNames.includes(
        identifier.escapedText.toString() as CanisterMethodTypeName
    );
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
    return canisterMethodFunctionDeclarations.reduce(
        (result: string[], functionDeclaration) => {
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
        },
        []
    );
}

function getCanisterMethodParameterNames(
    sourceFiles: readonly tsc.SourceFile[],
    functionDeclaration: tsc.FunctionDeclaration,
    candidTypeClass: CandidTypeClass
): string[] {
    return functionDeclaration.parameters.reduce(
        (result: string[], parameter) => {
            if (parameter.type === undefined) {
                throw new Error('parameter must have a type');
            }

            const candidTypeInfo = generateCandidTypeInfo(
                sourceFiles,
                parameter.type
            );

            if (candidTypeClass === 'record') {
                if (candidTypeInfo.typeClass === 'record') {
                    return [...result, candidTypeInfo.typeName];
                }

                if (candidTypeInfo.typeClass === 'inline_record') {
                    const recordNames = getCandidRecordNamesFromTypeLiteralNode(
                        sourceFiles,
                        parameter.type as tsc.TypeLiteralNode,
                        []
                    );

                    return [...result, ...recordNames];
                }

                if (candidTypeInfo.typeClass === 'inline_tuple_record') {
                    const recordNames = getCandidRecordNamesFromTupleTypeNode(
                        sourceFiles,
                        parameter.type as tsc.TupleTypeNode,
                        []
                    );

                    return [...result, ...recordNames];
                }

                if (candidTypeInfo.typeClass === 'inline_variant') {
                    const typeArguments = (
                        parameter.type as tsc.TypeReferenceNode
                    ).typeArguments;

                    if (typeArguments === undefined) {
                        throw new Error('This cannot happen');
                    }

                    const recordNames = getCandidRecordNamesFromTypeLiteralNode(
                        sourceFiles,
                        typeArguments[0] as tsc.TypeLiteralNode,
                        []
                    );

                    return [...result, ...recordNames];
                }
            }

            if (candidTypeClass === 'variant') {
                if (candidTypeInfo.typeClass === 'variant') {
                    return [...result, candidTypeInfo.typeName];
                }

                if (candidTypeInfo.typeClass === 'inline_variant') {
                    const typeArguments = (
                        parameter.type as tsc.TypeReferenceNode
                    ).typeArguments;

                    if (typeArguments === undefined) {
                        throw new Error('This cannot happen');
                    }

                    const variantNames =
                        getCandidVariantNamesFromTypeLiteralNode(
                            sourceFiles,
                            typeArguments[0] as tsc.TypeLiteralNode,
                            []
                        );

                    return [...result, ...variantNames];
                }

                if (candidTypeInfo.typeClass === 'inline_record') {
                    const variantNames =
                        getCandidVariantNamesFromTypeLiteralNode(
                            sourceFiles,
                            parameter.type as tsc.TypeLiteralNode,
                            []
                        );

                    return [...result, ...variantNames];
                }

                if (candidTypeInfo.typeClass === 'inline_tuple_record') {
                    const variantNames = getCandidVariantNamesFromTupleTypeNode(
                        sourceFiles,
                        parameter.type as tsc.TupleTypeNode,
                        []
                    );

                    return [...result, ...variantNames];
                }
            }

            return result;
        },
        []
    );
}

function getCanisterMethodReturnTypeNames(
    sourceFiles: readonly tsc.SourceFile[],
    functionDeclaration: tsc.FunctionDeclaration,
    candidTypeClass: CandidTypeClass
): string[] {
    const canisterMethodReturnTypeNode =
        getCanisterMethodReturnTypeNode(functionDeclaration);

    if (canisterMethodReturnTypeNode === undefined) {
        return [];
    }

    const candidTypeInfo = generateCandidTypeInfo(
        sourceFiles,
        canisterMethodReturnTypeNode
    );

    if (candidTypeClass === 'record') {
        if (candidTypeInfo.typeClass === 'record') {
            return [candidTypeInfo.typeName];
        }

        if (candidTypeInfo.typeClass === 'inline_record') {
            const typeArguments = (
                functionDeclaration.type as tsc.TypeReferenceNode
            ).typeArguments;

            if (typeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            return getCandidRecordNamesFromTypeLiteralNode(
                sourceFiles,
                typeArguments[0] as tsc.TypeLiteralNode,
                []
            );
        }

        if (candidTypeInfo.typeClass === 'inline_tuple_record') {
            const typeArguments = (
                functionDeclaration.type as tsc.TypeReferenceNode
            ).typeArguments;

            if (typeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            return getCandidRecordNamesFromTupleTypeNode(
                sourceFiles,
                typeArguments[0] as tsc.TupleTypeNode,
                []
            );
        }

        if (candidTypeInfo.typeClass === 'inline_variant') {
            const outerTypeArguments = (
                functionDeclaration.type as tsc.TypeReferenceNode
            ).typeArguments;

            if (outerTypeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            const innerTypeArguments = (
                outerTypeArguments[0] as tsc.TypeReferenceNode
            ).typeArguments;

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
            const outerTypeArguments = (
                functionDeclaration.type as tsc.TypeReferenceNode
            ).typeArguments;

            if (outerTypeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            const innerTypeArguments = (
                outerTypeArguments[0] as tsc.TypeReferenceNode
            ).typeArguments;

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
            const typeArguments = (
                functionDeclaration.type as tsc.TypeReferenceNode
            ).typeArguments;

            if (typeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            return getCandidVariantNamesFromTypeLiteralNode(
                sourceFiles,
                typeArguments[0] as tsc.TypeLiteralNode,
                []
            );
        }

        if (candidTypeInfo.typeClass === 'inline_tuple_record') {
            const typeArguments = (
                functionDeclaration.type as tsc.TypeReferenceNode
            ).typeArguments;

            if (typeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            return getCandidVariantNamesFromTupleTypeNode(
                sourceFiles,
                typeArguments[0] as tsc.TupleTypeNode,
                []
            );
        }
    }

    return [];
}

function getCanisterMethodReturnTypeNode(
    functionDeclaration: tsc.FunctionDeclaration
): tsc.TypeNode | undefined {
    if (functionDeclaration.type === undefined) {
        return undefined;
    }

    if (functionDeclaration.type.kind === tsc.SyntaxKind.TypeReference) {
        const typeReferenceNode =
            functionDeclaration.type as tsc.TypeReferenceNode;

        if (typeReferenceNode.typeArguments === undefined) {
            return undefined;
        }

        return typeReferenceNode.typeArguments[0];
    }
}

export function getCanisterMethodTypeName(
    functionDeclaration: tsc.FunctionDeclaration
): string {
    if (functionDeclaration.type === undefined) {
        throw new Error(`Canister method must have an Azle type`);
    }

    if (functionDeclaration.type.kind !== tsc.SyntaxKind.TypeReference) {
        throw new Error(`Canister method must have an Azle type`);
    }

    const typeReferenceNode = functionDeclaration.type as tsc.TypeReferenceNode;

    if (typeReferenceNode.typeName.kind !== tsc.SyntaxKind.Identifier) {
        throw new Error(`Canister method must have an Azle type`);
    }

    return typeReferenceNode.typeName.escapedText.toString();
}

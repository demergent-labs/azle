import { generateCandidTypeName } from '../generators/type_name';
import { RecordOrVariant } from '../../../types';
import * as tsc from 'typescript';

type CanisterMethodTypeName = 'Query' | 'Update'; // TODO we will also have Heartbeat, Init, PreUpgrade, PostUpgrade, Canister, etc

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
function nodeIsCanisterMethodFunctionDeclaration(
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

// TODO we also need to recursively search through the fields of records and variants
// TODO if those fields have records and variants then we must find them
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
    recordOrVariant: RecordOrVariant
): string[] {
    return canisterMethodFunctionDeclarations.reduce((result: string[], functionDeclaration) => {
        const parameterRecordNames = getCanisterMethodParameterNames(
            sourceFiles,
            functionDeclaration,
            recordOrVariant
        );
        const returnTypeRecordNames = getCanisterMethodReturnTypeNames(
            sourceFiles,
            functionDeclaration,
            recordOrVariant
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
    recordOrVariant: RecordOrVariant
): string[] {
    return functionDeclaration.parameters.reduce((result: string[], parameter) => {
        if (parameter.type === undefined) {
            throw new Error('parameter must have a type');
        }

        const candidTypeName = generateCandidTypeName(
            sourceFiles,
            parameter.type
        );

        if (candidTypeName.typeClass === recordOrVariant) {
            return [
                ...result,
                candidTypeName.typeName
            ];
        }
        else {
            return result;
        }
    }, []);
}

function getCanisterMethodReturnTypeNames(
    sourceFiles: readonly tsc.SourceFile[],
    functionDeclaration: tsc.FunctionDeclaration,
    recordOrVariant: RecordOrVariant
): string[] {
    const candidTypeName = generateCandidTypeName(
        sourceFiles,
        getCanisterMethodReturnTypeNode(functionDeclaration)
    );

    if (candidTypeName.typeClass === recordOrVariant) {
        return [candidTypeName.typeName];
    }
    else {
        return [];
    }
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
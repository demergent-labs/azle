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

export function getFunctionName(functionDeclaration: tsc.FunctionDeclaration): string {
    if (
        functionDeclaration.name === undefined ||
        functionDeclaration.name === null
    ) {
        throw new Error(`Could not determine name for function declaration: ${functionDeclaration}`);
    }

    return functionDeclaration.name.escapedText.toString();
}
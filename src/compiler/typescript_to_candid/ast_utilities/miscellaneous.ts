import { getTypeAliasDeclaration } from './type_aliases';
import * as tsc from 'typescript';

export function isTypeReferenceNodeAVariant(
    sourceFiles: readonly tsc.SourceFile[],
    typeReferenceNode: tsc.TypeReferenceNode
): boolean {
    const typeAliasDeclaration = getTypeAliasDeclaration(
        sourceFiles,
        getTypeReferenceNodeTypeName(typeReferenceNode)
    );

    if (typeAliasDeclaration === undefined) {
        return false;
    }

    if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.TypeReference) {
        const typeReferenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

        if (getTypeReferenceNodeTypeName(typeReferenceNode) === 'Variant') {
            return true;
        }
        else {
            return isTypeReferenceNodeAVariant(
                sourceFiles,
                typeReferenceNode
            );
        }
    }

    return false;
}

export function isTypeReferenceNodeARecord(
    sourceFiles: readonly tsc.SourceFile[],
    typeReferenceNode: tsc.TypeReferenceNode
): boolean {
    const typeAliasDeclaration = getTypeAliasDeclaration(
        sourceFiles,
        getTypeReferenceNodeTypeName(typeReferenceNode)
    );

    if (typeAliasDeclaration === undefined) {
        return false;
    }

    if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.TypeLiteral) {
        return true;
    }

    if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.TupleType) {
        return true;
    }

    if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.TypeReference) {
        const typeReferenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

        if (
            (
                typeReferenceNode.typeName.kind === tsc.SyntaxKind.Identifier &&
                typeReferenceNode.typeName.escapedText.toString() === 'Func'
            ) ||
            (
                typeReferenceNode.typeName.kind === tsc.SyntaxKind.Identifier &&
                typeReferenceNode.typeName.escapedText.toString() === 'Canister'
            )
        ) {
            return false;
        }

        return isTypeReferenceNodeARecord(
            sourceFiles,
            typeReferenceNode
        );
    }

    return false;
}

export function isTypeReferenceNodeAFunc(
    sourceFiles: readonly tsc.SourceFile[],
    typeReferenceNode: tsc.TypeReferenceNode
): boolean {
    const typeAliasDeclaration = getTypeAliasDeclaration(
        sourceFiles,
        getTypeReferenceNodeTypeName(typeReferenceNode)
    );

    if (typeAliasDeclaration === undefined) {
        return false;
    }

    if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.TypeReference) {
        const typeReferenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

        if (getTypeReferenceNodeTypeName(typeReferenceNode) === 'Func') {
            return true;
        }
        else {
            return isTypeReferenceNodeAFunc(
                sourceFiles,
                typeReferenceNode
            );
        }
    }

    return false;
}

export function getPropertyNameText(propertyName: tsc.PropertyName): string {
    if (propertyName.kind === tsc.SyntaxKind.Identifier) {
        return propertyName.escapedText.toString();
    }

    throw new Error(`Cannot get name for property name: ${JSON.stringify(propertyName, null, 2)}`);
}

export function getTypeReferenceNodeTypeName(typeReferenceNode: tsc.TypeReferenceNode): string {
    if (typeReferenceNode.typeName.kind === tsc.SyntaxKind.Identifier) {
        return typeReferenceNode.typeName.escapedText.toString();
    }

    throw new Error('not implemented');
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
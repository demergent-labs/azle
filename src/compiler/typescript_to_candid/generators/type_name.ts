import * as tsc from 'typescript';
import { Candid } from '../../../types';

export function generateCandidTypeName(typeNode: tsc.TypeNode): Candid {
    if (typeNode.kind === tsc.SyntaxKind.StringKeyword) {
        return 'text';
    }

    if (typeNode.kind === tsc.SyntaxKind.BooleanKeyword) {
        return 'bool';
    }

    if (typeNode.kind === tsc.SyntaxKind.UndefinedKeyword) {
        return 'null'
    }

    if (
        typeNode.kind === tsc.SyntaxKind.LiteralType &&
        (typeNode as tsc.LiteralTypeNode).literal.kind === tsc.SyntaxKind.NullKeyword
    ) {
        return 'null';
    }

    if (typeNode.kind === tsc.SyntaxKind.ArrayType) {
        const arrayTypeNode = typeNode as tsc.ArrayTypeNode;
        const candidElementTypeName = generateCandidTypeName(arrayTypeNode.elementType);

        return `vec ${candidElementTypeName}`;
    }

    if (typeNode.kind === tsc.SyntaxKind.TypeReference) {
        const typeReferenceNode = typeNode as tsc.TypeReferenceNode;

        if (typeReferenceNode.typeName.kind === tsc.SyntaxKind.Identifier) {
            const typeName = typeReferenceNode.typeName.escapedText.toString();

            if (typeName === 'int') {
                return 'int';
            }

            if (typeName === 'int64') {
                return 'int64';
            }

            if (typeName === 'int32') {
                return 'int32';
            }

            if (typeName === 'int16') {
                return 'int16';
            }

            if (typeName === 'int8') {
                return 'int8';
            }

            if (typeName === 'nat') {
                return 'nat';
            }

            if (typeName === 'nat64') {
                return 'nat64';
            }

            if (typeName === 'nat32') {
                return 'nat32';
            }

            if (typeName === 'nat16') {
                return 'nat16';
            }

            if (typeName === 'nat8') {
                return 'nat8';
            }

            if (typeName === 'principal') {
                return 'principal';
            }

            if (typeName === 'opt') {
                if (typeReferenceNode.typeArguments !== undefined) {
                    const candidArgumentTypeName = generateCandidTypeName(typeReferenceNode.typeArguments[0]);
                    return `opt ${candidArgumentTypeName}`;
                }
            }

            return typeName;
        }
    }

    throw new Error(`Could not generate Candid type name for TypeScript typeNode: ${JSON.stringify(typeNode, null, 2)}`);
}
// TODO make this code much more declarative, give each type its own file if necessary

import * as tsc from 'typescript';
import { CandidTypeName } from '../../../types';
import { isTypeReferenceNodeAVariant } from '../ast_utilities/miscellaneous';

export function generateCandidTypeName(
    sourceFiles: readonly tsc.SourceFile[],
    typeNode: tsc.TypeNode
): CandidTypeName {
    if (typeNode.kind === tsc.SyntaxKind.StringKeyword) {
        return generateCandidTypeNameForStringKeyword();
    }

    if (typeNode.kind === tsc.SyntaxKind.BooleanKeyword) {
        return generateCandidTypeNameForBooleanKeyword();
    }

    if (typeNode.kind === tsc.SyntaxKind.UndefinedKeyword) {
        return generateCandidTypeNameForUndefinedKeyword();
    }

    if (
        typeNode.kind === tsc.SyntaxKind.LiteralType &&
        (typeNode as tsc.LiteralTypeNode).literal.kind === tsc.SyntaxKind.NullKeyword
    ) {
        return generateCandidTypeNameForNullKeyword();
    }

    if (typeNode.kind === tsc.SyntaxKind.ArrayType) {
        return generateCandidTypeNameForArrayType(
            sourceFiles,
            typeNode as tsc.ArrayTypeNode
        );
    }

    if (typeNode.kind === tsc.SyntaxKind.TypeReference) {
        return generateCandidTypeNameForTypeReference(
            sourceFiles,
            typeNode as tsc.TypeReferenceNode
        );
    }

    throw new Error(`Could not generate Candid type name for TypeScript typeNode: ${JSON.stringify(typeNode, null, 2)}`);
}

function generateCandidTypeNameForStringKeyword(): CandidTypeName {
    return {
        text: 'text',
        typeName: 'text',
        typeClass: 'primitive'
    };
}

function generateCandidTypeNameForBooleanKeyword(): CandidTypeName {
    return {
        text: 'bool',
        typeName: 'bool',
        typeClass: 'primitive'
    };
}

function generateCandidTypeNameForUndefinedKeyword(): CandidTypeName {
    return {
        text: 'null',
        typeName: 'null',
        typeClass: 'primitive'
    };
}

function generateCandidTypeNameForNullKeyword(): CandidTypeName {
    return {
        text: 'null',
        typeName: 'null',
        typeClass: 'primitive'
    };
}

function generateCandidTypeNameForArrayType(
    sourceFiles: readonly tsc.SourceFile[],
    arrayTypeNode: tsc.ArrayTypeNode
): CandidTypeName {
    const candidElementTypeName = generateCandidTypeName(
        sourceFiles,
        arrayTypeNode.elementType
    );

    return {
        text: `vec ${candidElementTypeName.text}`,
        typeName: candidElementTypeName.typeName,
        typeClass: candidElementTypeName.typeClass
    };
}

function generateCandidTypeNameForTypeReference(
    sourceFiles: readonly tsc.SourceFile[],
    typeReferenceNode: tsc.TypeReferenceNode
): CandidTypeName {
    if (typeReferenceNode.typeName.kind === tsc.SyntaxKind.Identifier) {
        const typeName = typeReferenceNode.typeName.escapedText.toString();

        if (typeName === 'int') {
            return {
                text: 'int',
                typeName: 'int',
                typeClass: 'primitive'
            };
        }

        if (typeName === 'int64') {
            return {
                text: 'int64',
                typeName: 'int64',
                typeClass: 'primitive'
            };
        }

        if (typeName === 'int32') {
            return {
                text: 'int32',
                typeName: 'int32',
                typeClass: 'primitive'
            };
        }

        if (typeName === 'int16') {
            return {
                text: 'int16',
                typeName: 'int16',
                typeClass: 'primitive'
            };
        }

        if (typeName === 'int8') {
            return {
                text: 'int8',
                typeName: 'int8',
                typeClass: 'primitive'
            };
        }

        if (typeName === 'nat') {
            return {
                text: 'nat',
                typeName: 'nat',
                typeClass: 'primitive'
            };
        }

        if (typeName === 'nat64') {
            return {
                text: 'nat64',
                typeName: 'nat64',
                typeClass: 'primitive'
            };
        }

        if (typeName === 'nat32') {
            return {
                text: 'nat32',
                typeName: 'nat32',
                typeClass: 'primitive'
            };
        }

        if (typeName === 'nat16') {
            return {
                text: 'nat16',
                typeName: 'nat16',
                typeClass: 'primitive'
            };
        }

        if (typeName === 'nat8') {
            return {
                text: 'nat8',
                typeName: 'nat8',
                typeClass: 'primitive'
            };
        }

        if (typeName === 'float32') {
            return {
                text: 'float32',
                typeName: 'float32',
                typeClass: 'primitive'
            };
        }

        if (typeName === 'float64') {
            return {
                text: 'float64',
                typeName: 'float64',
                typeClass: 'primitive'
            };
        }

        if (typeName === 'principal') {
            return {
                text: 'principal',
                typeName: 'principal',
                typeClass: 'primitive'
            };
        }

        if (typeName === 'opt') {
            if (typeReferenceNode.typeArguments !== undefined) {
                const candidArgumentTypeName = generateCandidTypeName(
                    sourceFiles,
                    typeReferenceNode.typeArguments[0]
                );

                return {
                    text: `opt ${candidArgumentTypeName.text}`,
                    typeName: candidArgumentTypeName.typeName,
                    typeClass: candidArgumentTypeName.typeClass
                };
            }
        }

        // TODO right now you can't inline declare anonymous variants or records

        // TODO implement this
        // if (typeName === 'variant') {
        //     // TODO use the code from variant.ts

        //     return {
        //         text: `variant ${text}`,
        //         typeName: `variant ${text}`,
        //         typeClass: 'variant'
        //     };
        // }

        if (
            isTypeReferenceNodeAVariant(
                sourceFiles,
                typeReferenceNode
            ) == true
        ) {
            return {
                text: typeName,
                typeName,
                typeClass: 'variant'
            };
        }

        return {
            text: typeName,
            typeName,
            typeClass: 'record'
        };
    }

    throw new Error(`Could not generate Candid type name for TypeScript type reference node`);
}
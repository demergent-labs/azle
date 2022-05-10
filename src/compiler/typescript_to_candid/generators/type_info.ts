import {
    getTypeReferenceNodeTypeName,
    isTypeReferenceNodeAFunc,
    isTypeReferenceNodeARecord,
    isTypeReferenceNodeAVariant
} from '../ast_utilities/miscellaneous';
import { CandidTypeInfo } from '../../../types';
import * as tsc from 'typescript';
import {
    generateCandidRecordForTupleType,
    generateCandidRecordForTypeLiteral
} from './record';
import { generateCandidVariantForTypeLiteral } from './variant';
import { getTypeAliasDeclaration } from '../ast_utilities/type_aliases';

export function generateCandidTypeInfo(
    sourceFiles: readonly tsc.SourceFile[],
    typeNode: tsc.TypeNode
): CandidTypeInfo {
    if (typeNode.kind === tsc.SyntaxKind.StringKeyword) {
        return generateCandidTypeInfoForStringKeyword();
    }

    if (typeNode.kind === tsc.SyntaxKind.BooleanKeyword) {
        return generateCandidTypeInfoForBooleanKeyword();
    }

    if (typeNode.kind === tsc.SyntaxKind.UndefinedKeyword) {
        return generateCandidTypeInfoForUndefinedKeyword();
    }

    if (
        typeNode.kind === tsc.SyntaxKind.LiteralType &&
        (typeNode as tsc.LiteralTypeNode).literal.kind === tsc.SyntaxKind.NullKeyword
    ) {
        return generateCandidTypeInfoForNullKeyword();
    }

    if (typeNode.kind === tsc.SyntaxKind.VoidKeyword) {
        return generateCandidTypeInfoForVoidKeyword();
    }

    if (typeNode.kind === tsc.SyntaxKind.ArrayType) {
        return generateCandidTypeInfoForArrayType(
            sourceFiles,
            typeNode as tsc.ArrayTypeNode
        );
    }

    if (typeNode.kind === tsc.SyntaxKind.TypeReference) {
        return generateCandidTypeInfoForTypeReference(
            sourceFiles,
            typeNode as tsc.TypeReferenceNode
        );
    }

    if (typeNode.kind === tsc.SyntaxKind.TypeLiteral) {
        return generateCandidTypeInfoForRecordTypeLiteral(
            sourceFiles,
            typeNode as tsc.TypeLiteralNode
        );
    }

    if (typeNode.kind === tsc.SyntaxKind.TupleType) {
        return generateCandidTypeInfoForTupleType(
            sourceFiles,
            typeNode as tsc.TupleTypeNode
        );
    }

    throw new Error(`Could not generate Candid type name for TypeScript typeNode: ${typeNode.kind}`);
}

function generateCandidTypeInfoForStringKeyword(): CandidTypeInfo {
    return {
        text: 'text',
        typeName: 'text',
        typeClass: 'primitive'
    };
}

function generateCandidTypeInfoForBooleanKeyword(): CandidTypeInfo {
    return {
        text: 'bool',
        typeName: 'bool',
        typeClass: 'primitive'
    };
}

function generateCandidTypeInfoForUndefinedKeyword(): CandidTypeInfo {
    return {
        text: 'null',
        typeName: 'null',
        typeClass: 'primitive'
    };
}

function generateCandidTypeInfoForNullKeyword(): CandidTypeInfo {
    return {
        text: 'null',
        typeName: 'null',
        typeClass: 'primitive'
    };
}

function generateCandidTypeInfoForVoidKeyword(): CandidTypeInfo {
    return {
        text: '',
        typeName: 'void',
        typeClass: 'primitive'
    };
}

function generateCandidTypeInfoForArrayType(
    sourceFiles: readonly tsc.SourceFile[],
    arrayTypeNode: tsc.ArrayTypeNode
): CandidTypeInfo {
    const candidElementTypeName = generateCandidTypeInfo(
        sourceFiles,
        arrayTypeNode.elementType
    );

    return {
        text: `vec ${candidElementTypeName.text}`,
        typeName: candidElementTypeName.typeName,
        typeClass: candidElementTypeName.typeClass
    };
}

function generateCandidTypeInfoForTypeReference(
    sourceFiles: readonly tsc.SourceFile[],
    typeReferenceNode: tsc.TypeReferenceNode
): CandidTypeInfo {
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

        if (typeName === 'Principal') {
            return {
                text: 'principal',
                typeName: 'Principal',
                typeClass: 'primitive'
            };
        }

        if (typeName === 'Opt') {
            if (typeReferenceNode.typeArguments !== undefined) {
                const candidArgumentTypeInfo = generateCandidTypeInfo(
                    sourceFiles,
                    typeReferenceNode.typeArguments[0]
                );

                return {
                    text: `opt ${candidArgumentTypeInfo.text}`,
                    typeName: candidArgumentTypeInfo.typeName,
                    typeClass: candidArgumentTypeInfo.typeClass
                };
            }
        }

        if (typeName === 'Variant') {
            if (typeReferenceNode.typeArguments === undefined) {
                throw new Error('This cannot happen');
            }

            if (typeReferenceNode.typeArguments[0].kind !== tsc.SyntaxKind.TypeLiteral) {
                throw new Error('This is not supported');
            }
            
            // TODO Do we want to allow arrays on inline types? probably?? This might work automatically
            return generateCandidTypeInfoForVariantTypeLiteral(
                sourceFiles,
                typeReferenceNode.typeArguments[0] as tsc.TypeLiteralNode
            );
        }

        // TODO I do not think we need this here
        // if (typeName === 'CanisterResult') {
        //     if (typeReferenceNode.typeArguments === undefined) {
        //         throw new Error('This cannot happen');
        //     }

        //     return generateCandidTypeInfo(
        //         sourceFiles,
        //         typeReferenceNode.typeArguments[0] as tsc.TypeLiteralNode
        //     );
        // }

        // TODO do we need this one anymore if Variant is being found above?
        if (
            isTypeReferenceNodeAVariant(
                sourceFiles,
                typeReferenceNode
            ) === true
        ) {
            return {
                text: typeName,
                typeName,
                typeClass: 'variant'
            };
        }

        if (
            isTypeReferenceNodeARecord(
                sourceFiles,
                typeReferenceNode
            ) === true
        ) {
            return {
                text: typeName,
                typeName,
                typeClass: 'record'
            };
        }

        if (
            isTypeReferenceNodeAFunc(
                sourceFiles,
                typeReferenceNode
            ) === true
        ) {
            return {
                text: typeName,
                typeName,
                typeClass: 'func'
            };
        }

        const typeAliasDeclaration = getTypeAliasDeclaration(
            sourceFiles,
            getTypeReferenceNodeTypeName(typeReferenceNode)
        );

        if (typeAliasDeclaration === undefined) {
            throw new Error(`Could not generate Candid type name for TypeScript type reference node`);
        }

        const candidTypeInfo = generateCandidTypeInfo(
            sourceFiles,
            typeAliasDeclaration.type
        );

        return candidTypeInfo;
    }

    throw new Error(`Could not generate Candid type name for TypeScript type reference node`);
}

function generateCandidTypeInfoForRecordTypeLiteral(
    sourceFiles: readonly tsc.SourceFile[],
    typeLiteralNode: tsc.TypeLiteralNode
): CandidTypeInfo {
    return {
        text: generateCandidRecordForTypeLiteral(
            sourceFiles,
            null,
            typeLiteralNode
        ),
        typeName: '', // TODO what do we do with this?
        typeClass: 'inline_record'
    };
}

function generateCandidTypeInfoForVariantTypeLiteral(
    sourceFiles: readonly tsc.SourceFile[],
    typeLiteralNode: tsc.TypeLiteralNode
): CandidTypeInfo {
    return {
        text: generateCandidVariantForTypeLiteral(
            sourceFiles,
            null,
            typeLiteralNode
        ),
        typeName: '', // TODO what do we do with this?
        typeClass: 'inline_variant'
    };
}

function generateCandidTypeInfoForTupleType(
    sourceFiles: readonly tsc.SourceFile[],
    tupleTypeNode: tsc.TupleTypeNode
): CandidTypeInfo {
    return {
        text: generateCandidRecordForTupleType(
            sourceFiles,
            null,
            tupleTypeNode
        ),
        typeName: '', // TODO what do we do with this?
        typeClass: 'inline_tuple_record'
    };
}
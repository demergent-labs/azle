// TODO record and variant generator files have gotten a bit messy

import {
    getCanisterMethodRecordNames,
    getCanisterMethodVariantNames
} from '../ast_utilities/canister_methods';
import { getPropertyNameText } from '../ast_utilities/miscellaneous';
import { getTypeAliasDeclaration } from '../ast_utilities/type_aliases';
import { generateCandidTypeInfo } from './type_info';
import { Candid } from '../../../types';
import * as tsc from 'typescript';
import {
    getCanisterTypeAliasRecordNames,
    getCanisterTypeAliasVariantNames
} from '../ast_utilities/canister_type_aliases';

export function generateCandidRecords(
    sourceFiles: readonly tsc.SourceFile[],
    canisterMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    canisterTypeAliasDeclarations: tsc.TypeAliasDeclaration[]
): {
    candidRecords: Candid;
    candidRecordNames: string[]
} {
    const candidRecordNames = getCandidRecordNames(
        sourceFiles,
        canisterMethodFunctionDeclarations,
        canisterTypeAliasDeclarations
    );

    const candidRecords = candidRecordNames.map((candidRecordName) => {
        return generateCandidRecord(
            sourceFiles,
            candidRecordName
        );
    });

    return {
        candidRecords: candidRecords.join('\n\n'),
        candidRecordNames
    };
}

function getCandidRecordNames(
    sourceFiles: readonly tsc.SourceFile[],
    canisterMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    canisterTypeAliasDeclarations: tsc.TypeAliasDeclaration[]
): string[] {
    const canisterMethodRecordNames = Array.from(
        new Set(
            getCanisterMethodRecordNames(
                sourceFiles,
                canisterMethodFunctionDeclarations
            )
        )
    );

    const canisterTypeAliasRecordNames = Array.from(
        new Set(
            getCanisterTypeAliasRecordNames(
                sourceFiles,
                canisterTypeAliasDeclarations
            )
        )
    );

    const recordFieldsRecordNames = Array.from(
        new Set(
            [
                ...canisterMethodRecordNames,
                ...canisterTypeAliasRecordNames
            ].reduce((result: string[], recordName) => {
                return [
                    ...result,
                    ...getCandidRecordNamesFromRecordFields(
                        sourceFiles,
                        recordName,
                        []
                    )
                ];
            }, [])
        )
    );

    const canisterMethodVariantNames = Array.from(
        new Set(
            getCanisterMethodVariantNames(
                sourceFiles,
                canisterMethodFunctionDeclarations
            )
        )
    );

    const canisterTypeAliasVariantNames = Array.from(
        new Set(
            getCanisterTypeAliasVariantNames(
                sourceFiles,
                canisterTypeAliasDeclarations
            )
        )
    );

    const variantFieldsRecordNames = Array.from(
        new Set(
            [
                ...canisterMethodVariantNames,
                ...canisterTypeAliasVariantNames
            ].reduce((result: string[], variantName) => {
                return [
                    ...result,
                    ...getCandidRecordNamesFromVariantFields(
                        sourceFiles,
                        variantName,
                        []
                    )
                ];
            }, [])
        )
    );

    // TODO we probably do not need so many Array.form(new Set())
    return Array.from(new Set([
        ...canisterMethodRecordNames,
        ...canisterTypeAliasRecordNames,
        ...recordFieldsRecordNames,
        ...variantFieldsRecordNames
    ]));
}

// TODO getCandidRecordNamesFromRecordFields, getCandidRecordNamesFromVariantFields, getCandidVariantNamesFromVariantFields, getCandidVariantNamesFromRecordFields are nearly identical
function getCandidRecordNamesFromRecordFields(
    sourceFiles: readonly tsc.SourceFile[],
    recordName: string,
    recordNamesAlreadyFound: string[]
): string[] {
    const typeAliasDeclaration = getTypeAliasDeclaration(
        sourceFiles,
        recordName
    );

    if (typeAliasDeclaration === undefined) {
        throw new Error(`Could not generate Candid record for type alias declaration: ${typeAliasDeclaration}`);
    }

    if (typeAliasDeclaration.type.kind !== tsc.SyntaxKind.TypeLiteral) {
        return [];
    }

    const candidRecordNames = getCandidRecordNamesFromTypeLiteralNode(
        sourceFiles,
        typeAliasDeclaration.type as tsc.TypeLiteralNode,
        recordNamesAlreadyFound
    );

    return candidRecordNames;
}

// TODO getCandidRecordNamesFromRecordFields, getCandidRecordNamesFromVariantFields, getCandidVariantNamesFromVariantFields, getCandidVariantNamesFromRecordFields are nearly identical
function getCandidRecordNamesFromVariantFields(
    sourceFiles: readonly tsc.SourceFile[],
    variantName: string,
    recordNamesAlreadyFound: string[]
): string[] {
    const typeAliasDeclaration = getTypeAliasDeclaration(
        sourceFiles,
        variantName
    );

    if (typeAliasDeclaration === undefined) {
        throw new Error(`Could not generate Candid record for type alias declaration: ${JSON.stringify(typeAliasDeclaration, null, 2)}`);
    }

    if (typeAliasDeclaration.type.kind !== tsc.SyntaxKind.TypeReference) {
        return [];
    }

    const typeReferenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

    if (typeReferenceNode.typeArguments === undefined) {
        throw new Error('Variant must have type arguments');
    }

    const firstTypeArgument = typeReferenceNode.typeArguments[0];

    if (firstTypeArgument.kind !== tsc.SyntaxKind.TypeLiteral) {
        throw new Error(`Could not generate Candid record for type alias declaration: ${JSON.stringify(typeAliasDeclaration, null, 2)}`);
    }

    const candidRecordNames = getCandidRecordNamesFromTypeLiteralNode(
        sourceFiles,
        firstTypeArgument as tsc.TypeLiteralNode,
        recordNamesAlreadyFound
    );

    return candidRecordNames;
}

export function getCandidRecordNamesFromTypeLiteralNode(
    sourceFiles: readonly tsc.SourceFile[],
    typeLiteralNode: tsc.TypeLiteralNode,
    recordNamesAlreadyFound: string[]
): string[] {
    const candidRecordNames = typeLiteralNode.members.reduce((result: string[], member) => {
        if (member.kind === tsc.SyntaxKind.PropertySignature) {
            const propertySignature = member as tsc.PropertySignature;

            if (propertySignature.type === undefined) {
                throw new Error(`Could not generate Candid record for type literal node: ${typeLiteralNode}`);
            }

            const candidTypeInfo = generateCandidTypeInfo(
                sourceFiles,
                propertySignature.type
            );

            if (recordNamesAlreadyFound.includes(candidTypeInfo.typeName)) {
                return result;
            }

            if (candidTypeInfo.typeClass === 'record') {
                const recursedRecordNames = getCandidRecordNamesFromRecordFields(
                    sourceFiles,
                    candidTypeInfo.typeName,
                    [
                        ...recordNamesAlreadyFound,
                        candidTypeInfo.typeName
                    ]
                );

                return [
                    ...result,
                    candidTypeInfo.typeName,
                    ...recursedRecordNames
                ];
            }

            if (candidTypeInfo.typeClass === 'variant') {
                const recursedRecordNames = getCandidRecordNamesFromVariantFields(
                    sourceFiles,
                    candidTypeInfo.typeName,
                    recordNamesAlreadyFound
                );

                return [
                    ...result,
                    ...recursedRecordNames
                ];
            }

            return result;
        }
        else {
            return result;    
        }
    }, []);

    return candidRecordNames;
}

function generateCandidRecord(
    sourceFiles: readonly tsc.SourceFile[],
    candidRecordName: string
): Candid {
    const typeAliasDeclaration = getTypeAliasDeclaration(
        sourceFiles,
        candidRecordName
    );

    if (typeAliasDeclaration === undefined) {
        throw new Error(`Could not generate Candid record for type alias declaration: ${typeAliasDeclaration}`);
    }

    if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.TypeLiteral) {
        return generateCandidRecordForTypeLiteral(
            sourceFiles,
            candidRecordName,
            typeAliasDeclaration.type as tsc.TypeLiteralNode
        );
    }

    if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.ArrayType) {
        return generateCandidRecordForArrayType(
            sourceFiles,
            candidRecordName,
            typeAliasDeclaration
        );
    }

    throw new Error(`Could not generate Candid record for type alias declaration: ${typeAliasDeclaration}`);
}

export function generateCandidRecordForTypeLiteral(
    sourceFiles: readonly tsc.SourceFile[],
    candidRecordName: string | null,
    typeLiteralNode: tsc.TypeLiteralNode
): Candid {
    const candidRecordFields = typeLiteralNode.members.map((member) => {
        if (member.kind === tsc.SyntaxKind.PropertySignature) {
            const propertySignature = member as tsc.PropertySignature;

            const candidFieldName = getPropertyNameText(propertySignature.name);

            if (propertySignature.type === undefined) {
                throw new Error(`Could not generate Candid record for type literal node: ${typeLiteralNode}`);
            }

            const candidTypeInfo = generateCandidTypeInfo(
                sourceFiles,
                propertySignature.type
            );

            return `"${candidFieldName}": ${candidTypeInfo.text};`;
        }

        throw new Error(`Could not generate Candid record for type literal node: ${typeLiteralNode}`);
    });

    if (candidRecordName === null) {
        return `record { ${candidRecordFields.join(' ')} }`;
    }
    else {
        return `type ${candidRecordName} = record {\n    ${candidRecordFields.join('\n    ')}\n};`;
    }
}

function generateCandidRecordForArrayType(
    sourceFiles: readonly tsc.SourceFile[],
    candidRecordName: string,
    typeAliasDeclaration: tsc.TypeAliasDeclaration
) {
    const candidTypeName = generateCandidTypeInfo(
        sourceFiles,
        typeAliasDeclaration.type
    );

    return `type ${candidRecordName} = ${candidTypeName.text};`;
}
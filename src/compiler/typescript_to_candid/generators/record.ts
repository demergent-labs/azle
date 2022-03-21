// TODO record and variant generator files have gotten a bit messy

import { getCanisterMethodRecordNames, getCanisterMethodVariantNames } from '../ast_utilities/canister_methods';
import { getPropertyNameText } from '../ast_utilities/miscellaneous';
import { getTypeAliasDeclaration } from '../ast_utilities/type_aliases';
import { generateCandidTypeName } from './type_name';
import { Candid } from '../../../types';
import * as tsc from 'typescript';

export function generateCandidRecords(
    sourceFiles: readonly tsc.SourceFile[],
    queryMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    updateMethodFunctionDeclarations: tsc.FunctionDeclaration[]
): Candid {
    const candidRecordNames = getCandidRecordNames(
        sourceFiles,
        queryMethodFunctionDeclarations,
        updateMethodFunctionDeclarations
    );

    const candidRecords = candidRecordNames.map((candidRecordName) => {
        return generateCandidRecord(
            sourceFiles,
            candidRecordName
        );
    });

    return candidRecords.join('\n\n');
}

function getCandidRecordNames(
    sourceFiles: readonly tsc.SourceFile[],
    queryMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    updateMethodFunctionDeclarations: tsc.FunctionDeclaration[]
): string[] {
    const canisterMethodRecordNames = Array.from(
        new Set(
            getCanisterMethodRecordNames(sourceFiles, [
                ...queryMethodFunctionDeclarations,
                ...updateMethodFunctionDeclarations
            ])
        )
    );

    const recordFieldsRecordNames = Array.from(
        new Set(
            canisterMethodRecordNames.reduce((result: string[], recordName) => {
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
            getCanisterMethodVariantNames(sourceFiles, [
                ...queryMethodFunctionDeclarations,
                ...updateMethodFunctionDeclarations
            ])
        )
    );

    const variantFieldsRecordNames = Array.from(
        new Set(
            canisterMethodVariantNames.reduce((result: string[], variantName) => {
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
        throw new Error(`Could not generate Candid record for type alias declaration: ${JSON.stringify(typeAliasDeclaration, null, 2)}`);
    }

    if (typeAliasDeclaration.type.kind !== tsc.SyntaxKind.TypeLiteral) {
        return [];
    }

    const typeLiteralNode = typeAliasDeclaration.type as tsc.TypeLiteralNode;

    const candidRecordNames = typeLiteralNode.members.reduce((result: string[], member) => {
        if (member.kind === tsc.SyntaxKind.PropertySignature) {
            const propertySignature = member as tsc.PropertySignature;

            if (propertySignature.type === undefined) {
                throw new Error(`Could not generate Candid record for type alias declaration: ${JSON.stringify(typeAliasDeclaration, null, 2)}`);
            }

            // TODO change this to CandidTypeInfo
            const candidTypeInfo = generateCandidTypeName(
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

    const typeLiteralNode = firstTypeArgument as tsc.TypeLiteralNode;

    const candidRecordNames = typeLiteralNode.members.reduce((result: string[], member) => {
        if (member.kind === tsc.SyntaxKind.PropertySignature) {
            const propertySignature = member as tsc.PropertySignature;

            if (propertySignature.type === undefined) {
                throw new Error(`Could not generate Candid record for type alias declaration: ${JSON.stringify(typeAliasDeclaration, null, 2)}`);
            }

            // TODO change this to CandidTypeInfo
            const candidTypeInfo = generateCandidTypeName(
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
        throw new Error(`Could not generate Candid record for type alias declaration: ${JSON.stringify(typeAliasDeclaration, null, 2)}`);
    }

    if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.TypeLiteral) {
        return generateCandidRecordForTypeLiteral(
            sourceFiles,
            candidRecordName,
            typeAliasDeclaration
        );
    }

    if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.ArrayType) {
        return generateCandidRecordForArrayType(
            sourceFiles,
            candidRecordName,
            typeAliasDeclaration
        );
    }

    throw new Error(`Could not generate Candid record for type alias declaration: ${JSON.stringify(typeAliasDeclaration, null, 2)}`);
}

function generateCandidRecordForTypeLiteral(
    sourceFiles: readonly tsc.SourceFile[],
    candidRecordName: string,
    typeAliasDeclaration: tsc.TypeAliasDeclaration
): Candid {
    const typeLiteralNode = typeAliasDeclaration.type as tsc.TypeLiteralNode;

    const candidRecordFields = typeLiteralNode.members.map((member) => {
        if (member.kind === tsc.SyntaxKind.PropertySignature) {
            const propertySignature = member as tsc.PropertySignature;

            const candidFieldName = getPropertyNameText(propertySignature.name);

            if (propertySignature.type === undefined) {
                throw new Error(`Could not generate Candid record for type alias declaration: ${JSON.stringify(typeAliasDeclaration, null, 2)}`);
            }

            // TODO change this to CandidTypeInfo
            const candidTypeInfo = generateCandidTypeName(
                sourceFiles,
                propertySignature.type
            );

            return `\n    "${candidFieldName}": ${candidTypeInfo.text};`;
        }

        throw new Error(`Could not generate Candid record for type alias declaration: ${JSON.stringify(typeAliasDeclaration, null, 2)}`);
    });

    return `type ${candidRecordName} = record {${candidRecordFields.join('')}\n};`;
}

function generateCandidRecordForArrayType(
    sourceFiles: readonly tsc.SourceFile[],
    candidRecordName: string,
    typeAliasDeclaration: tsc.TypeAliasDeclaration
) {
    const candidTypeName = generateCandidTypeName(
        sourceFiles,
        typeAliasDeclaration.type
    );

    return `type ${candidRecordName} = ${candidTypeName.text};`;
}
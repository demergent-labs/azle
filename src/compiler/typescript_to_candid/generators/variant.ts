// TODO record and variant generator files have gotten a bit messy

import * as tsc from 'typescript';
import { Candid } from '../../../types';
import { getCanisterMethodRecordNames, getCanisterMethodVariantNames } from '../ast_utilities/canister_methods';
import { getTypeAliasDeclaration } from '../ast_utilities/type_aliases';
import { generateCandidTypeName } from './type_name';

export function generateCandidVariants(
    sourceFiles: readonly tsc.SourceFile[],
    queryMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    updateMethodFunctionDeclarations: tsc.FunctionDeclaration[]
): Candid {
    const candidVariantNames = getCandidVariantNames(
        sourceFiles,
        queryMethodFunctionDeclarations,
        updateMethodFunctionDeclarations
    );

    const candidVariants = candidVariantNames.map((candidVariantName) => {
        return generateCandidVariant(
            sourceFiles,
            candidVariantName
        );
    });

    return candidVariants.join('\n\n');
}

function getCandidVariantNames(
    sourceFiles: readonly tsc.SourceFile[],
    queryMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    updateMethodFunctionDeclarations: tsc.FunctionDeclaration[]
): string[] {
    const canisterMethodVariantNames = Array.from(
        new Set(
            getCanisterMethodVariantNames(sourceFiles, [
                ...queryMethodFunctionDeclarations,
                ...updateMethodFunctionDeclarations
            ])
        )
    );

    const variantFieldsVariantNames = Array.from(
        new Set(
            canisterMethodVariantNames.reduce((result: string[], variantName) => {
                return [
                    ...result,
                    ...getCandidVariantNamesFromVariantFields(
                        sourceFiles,
                        variantName,
                        []
                    )
                ];
            }, [])
        )
    );

    const canisterMethodRecordNames = Array.from(
        new Set(
            getCanisterMethodRecordNames(sourceFiles, [
                ...queryMethodFunctionDeclarations,
                ...updateMethodFunctionDeclarations
            ])
        )
    );

    const recordFieldsVariantNames = Array.from(
        new Set(
            canisterMethodRecordNames.reduce((result: string[], recordName) => {
                return [
                    ...result,
                    ...getCandidVariantNamesFromRecordFields(
                        sourceFiles,
                        recordName,
                        []
                    )
                ];
            }, [])
        )
    );

    // TODO we probably do not need so many Array.form(new Set())
    return Array.from(new Set([
        ...canisterMethodVariantNames,
        ...variantFieldsVariantNames,
        ...recordFieldsVariantNames
    ]));
}

// TODO getCandidRecordNamesFromRecordFields, getCandidRecordNamesFromVariantFields, getCandidVariantNamesFromVariantFields, getCandidVariantNamesFromRecordFields are nearly identical
function getCandidVariantNamesFromVariantFields(
    sourceFiles: readonly tsc.SourceFile[],
    variantName: string,
    variantNamesAlreadyFound: string[]
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

    const candidVariantNames = typeLiteralNode.members.reduce((result: string[], member) => {
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

            if (variantNamesAlreadyFound.includes(candidTypeInfo.typeName)) {
                return result;
            }

            if (candidTypeInfo.typeClass === 'variant') {
                const recursedVariantNames = getCandidVariantNamesFromVariantFields(
                    sourceFiles,
                    candidTypeInfo.typeName,
                    variantNamesAlreadyFound
                );

                return [
                    ...result,
                    candidTypeInfo.typeName,
                    ...recursedVariantNames
                ];
            }

            if (candidTypeInfo.typeClass === 'record') {
                const recursedVariantNames = getCandidVariantNamesFromRecordFields(
                    sourceFiles,
                    candidTypeInfo.typeName,
                    [
                        ...variantNamesAlreadyFound,
                        candidTypeInfo.typeName
                    ]
                );

                return [
                    ...result,
                    ...recursedVariantNames
                ];
            }

            return result;
        }
        else {
            return result;    
        }
    }, []);

    return candidVariantNames;
}

// TODO getCandidRecordNamesFromRecordFields, getCandidRecordNamesFromVariantFields, getCandidVariantNamesFromVariantFields, getCandidVariantNamesFromRecordFields are nearly identical
function getCandidVariantNamesFromRecordFields(
    sourceFiles: readonly tsc.SourceFile[],
    variantName: string,
    variantNamesAlreadyFound: string[]
): string[] {
    const typeAliasDeclaration = getTypeAliasDeclaration(
        sourceFiles,
        variantName
    );

    if (typeAliasDeclaration === undefined) {
        throw new Error(`Could not generate Candid record for type alias declaration: ${JSON.stringify(typeAliasDeclaration, null, 2)}`);
    }

    if (typeAliasDeclaration.type.kind !== tsc.SyntaxKind.TypeLiteral) {
        return [];
    }

    const typeLiteralNode = typeAliasDeclaration.type as tsc.TypeLiteralNode;

    const candidVariantNames = typeLiteralNode.members.reduce((result: string[], member) => {
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

            if (variantNamesAlreadyFound.includes(candidTypeInfo.typeName)) {
                return result;
            }

            if (candidTypeInfo.typeClass === 'variant') {
                const recursedRecordNames = getCandidVariantNamesFromVariantFields(
                    sourceFiles,
                    candidTypeInfo.typeName,
                    variantNamesAlreadyFound
                );

                return [
                    ...result,
                    candidTypeInfo.typeName,
                    ...recursedRecordNames
                ];
            }

            if (candidTypeInfo.typeClass === 'record') {
                const recursedRecordNames = getCandidVariantNamesFromRecordFields(
                    sourceFiles,
                    candidTypeInfo.typeName,
                    [
                        ...variantNamesAlreadyFound,
                        candidTypeInfo.typeName
                    ]
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

    return candidVariantNames;
}

// TODO there must be a better way than to use all of this nesting
// TODO perhaps the Rust Result/Option will help somehow
function generateCandidVariant(
    sourceFiles: readonly tsc.SourceFile[],
    candidVariantName: string
): Candid {
    const typeAliasDeclaration = getTypeAliasDeclaration(
        sourceFiles,
        candidVariantName
    );

    if (typeAliasDeclaration === undefined) {
        throw new Error('this should not happen');
    }

    if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.TypeReference) {
        const typeReferenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

        if (typeReferenceNode.typeArguments === undefined) {
            throw new Error('this cannot happen');
        }

        const typeNode = typeReferenceNode.typeArguments[0];
    
        if (typeNode.kind === tsc.SyntaxKind.TypeLiteral) {
            const typeLiteralNode = typeNode as tsc.TypeLiteralNode;

            const variantFields: {
                name: string;
                type: string;
            }[] = typeLiteralNode.members.map((member) => {
                if (member.kind === tsc.SyntaxKind.PropertySignature) {
                    const propertySignature = member as tsc.PropertySignature;

                    if (propertySignature.name.kind === tsc.SyntaxKind.Identifier) {
                        const name = propertySignature.name.escapedText.toString();

                        if (propertySignature.type === undefined) {
                            throw new Error('must not happen');
                        }

                        const candidTypeInfo = generateCandidTypeName(
                            sourceFiles,
                            propertySignature.type
                        );


                        return {
                            name,
                            type: candidTypeInfo.typeName
                        };
                    }
                }

                throw new Error('must not happen');
            });

            return `type ${candidVariantName} = variant { ${variantFields.map((variantField) => `${variantField.name}: ${variantField.type}`).join('; ')} };`;
        }
    }

    throw new Error('this should not happen');
}
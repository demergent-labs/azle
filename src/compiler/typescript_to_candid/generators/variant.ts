// TODO record and variant generator files have gotten a bit messy

import * as tsc from 'typescript';
import { Candid } from '../../../types';
import {
    getCanisterMethodRecordNames,
    getCanisterMethodVariantNames
} from '../ast_utilities/canister_methods';
import {
    getCanisterTypeAliasRecordNames,
    getCanisterTypeAliasVariantNames
} from '../ast_utilities/canister_type_aliases';
import {
    getFuncTypeAliasRecordNames,
    getFuncTypeAliasVariantNames
} from '../ast_utilities/func_type_aliases';
import {
    getStableTypeAliasRecordNames,
    getStableTypeAliasVariantNames
} from '../ast_utilities/stable_type_aliases';
import { getTypeAliasDeclaration } from '../ast_utilities/type_aliases';
import { generateCandidTypeInfo } from './type_info';

export function generateCandidVariants(
    sourceFiles: readonly tsc.SourceFile[],
    canisterMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    canisterTypeAliasDeclarations: tsc.TypeAliasDeclaration[],
    stableTypeAliasDeclarations: tsc.TypeAliasDeclaration[],
    funcTypeAliasDeclarations: tsc.TypeAliasDeclaration[]
): {
    candidVariants: Candid;
    candidVariantNames: string[]
} {
    const candidVariantNames = getCandidVariantNames(
        sourceFiles,
        canisterMethodFunctionDeclarations,
        canisterTypeAliasDeclarations,
        stableTypeAliasDeclarations,
        funcTypeAliasDeclarations
    );

    const candidVariants = candidVariantNames.map((candidVariantName) => {
        return generateCandidVariant(
            sourceFiles,
            candidVariantName
        );
    });

    return {
        candidVariants: candidVariants.join('\n\n'),
        candidVariantNames
    };
}

function getCandidVariantNames(
    sourceFiles: readonly tsc.SourceFile[],
    canisterMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    canisterTypeAliasDeclarations: tsc.TypeAliasDeclaration[],
    stableTypeAliasDeclarations: tsc.TypeAliasDeclaration[],
    funcTypeAliasDeclarations: tsc.TypeAliasDeclaration[]
): string[] {
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

    const stableTypeAliasVariantNames = Array.from(
        new Set(
            getStableTypeAliasVariantNames(
                sourceFiles,
                stableTypeAliasDeclarations
            )
        )
    );

    const funcTypeAliasVariantNames = Array.from(
        new Set(
            getFuncTypeAliasVariantNames(
                sourceFiles,
                funcTypeAliasDeclarations
            )
        )
    );

    const variantFieldsVariantNames = Array.from(
        new Set(
            [
                ...canisterMethodVariantNames,
                ...canisterTypeAliasVariantNames,
                ...stableTypeAliasVariantNames,
                ...funcTypeAliasVariantNames
            ].reduce((result: string[], variantName) => {
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

    const stableTypeAliasRecordNames = Array.from(
        new Set(
            getStableTypeAliasRecordNames(
                sourceFiles,
                stableTypeAliasDeclarations
            )
        )
    );

    const funcTypeAliasRecordNames = Array.from(
        new Set(
            getFuncTypeAliasRecordNames(
                sourceFiles,
                funcTypeAliasDeclarations
            )
        )
    );

    const recordFieldsVariantNames = Array.from(
        new Set(
            [
                ...canisterMethodRecordNames,
                ...canisterTypeAliasRecordNames,
                ...stableTypeAliasRecordNames,
                ...funcTypeAliasRecordNames
            ].reduce((result: string[], recordName) => {
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

    const tupleRecordFieldsVariantNames = Array.from(
        new Set(
            [
                ...canisterMethodRecordNames,
                ...canisterTypeAliasRecordNames,
                ...stableTypeAliasRecordNames,
                ...recordFieldsVariantNames
            ].reduce((result: string[], recordName) => {
                return [
                    ...result,
                    ...getCandidVariantNamesFromTupleRecordFields(
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
        ...canisterTypeAliasVariantNames,
        ...stableTypeAliasVariantNames,
        ...funcTypeAliasVariantNames,
        ...variantFieldsVariantNames,
        ...recordFieldsVariantNames,
        ...tupleRecordFieldsVariantNames
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

    if (firstTypeArgument.kind === tsc.SyntaxKind.FunctionType) {
        return [];
    }

    if (firstTypeArgument.kind !== tsc.SyntaxKind.TypeLiteral) {
        throw new Error(`Could not generate Candid record for type alias declaration: ${typeAliasDeclaration.name.escapedText.toString()}`);
    }

    const candidVariantNames = getCandidVariantNamesFromTypeLiteralNode(
        sourceFiles,
        firstTypeArgument as tsc.TypeLiteralNode,
        variantNamesAlreadyFound
    );

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
        throw new Error(`Could not generate Candid record for type alias declaration: ${typeAliasDeclaration}`);
    }

    if (typeAliasDeclaration.type.kind !== tsc.SyntaxKind.TypeLiteral) {
        return [];
    }

    const candidVariantNames = getCandidVariantNamesFromTypeLiteralNode(
        sourceFiles,
        typeAliasDeclaration.type as tsc.TypeLiteralNode,
        variantNamesAlreadyFound
    );

    return candidVariantNames;
}

function getCandidVariantNamesFromTupleRecordFields(
    sourceFiles: readonly tsc.SourceFile[],
    variantName: string,
    variantNamesAlreadyFound: string[]
): string[] {
    const typeAliasDeclaration = getTypeAliasDeclaration(
        sourceFiles,
        variantName
    );

    if (typeAliasDeclaration === undefined) {
        throw new Error(`Could not generate Candid record for type alias declaration: ${typeAliasDeclaration}`);
    }

    if (typeAliasDeclaration.type.kind !== tsc.SyntaxKind.TupleType) {
        return [];
    }

    const candidVariantNames = getCandidVariantNamesFromTupleTypeNode(
        sourceFiles,
        typeAliasDeclaration.type as tsc.TupleTypeNode,
        variantNamesAlreadyFound
    );

    return candidVariantNames;
}

export function getCandidVariantNamesFromTypeLiteralNode(
    sourceFiles: readonly tsc.SourceFile[],
    typeLiteralNode: tsc.TypeLiteralNode,
    variantNamesAlreadyFound: string[]
): string[] {
    const candidVariantNames = typeLiteralNode.members.reduce((result: string[], member) => {
        if (member.kind === tsc.SyntaxKind.PropertySignature) {
            const propertySignature = member as tsc.PropertySignature;

            if (propertySignature.type === undefined) {
                throw new Error(`Could not generate Candid record for type literal node: ${typeLiteralNode}`);
            }

            const candidTypeInfo = generateCandidTypeInfo(
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

export function getCandidVariantNamesFromTupleTypeNode(
    sourceFiles: readonly tsc.SourceFile[],
    tupleTypeNode: tsc.TupleTypeNode,
    variantNamesAlreadyFound: string[]
): string[] {
    return tupleTypeNode.elements.reduce((result: string[], element) => {
        const candidTypeInfo = generateCandidTypeInfo(
            sourceFiles,
            element
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
    }, []);
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
            return generateCandidVariantForTypeLiteral(
                sourceFiles,
                candidVariantName,
                typeNode as tsc.TypeLiteralNode
            );
        }
    }

    throw new Error('this should not happen');
}

export function generateCandidVariantForTypeLiteral(
    sourceFiles: readonly tsc.SourceFile[],
    candidVariantName: string | null,
    typeLiteralNode: tsc.TypeLiteralNode
): Candid {
    const variantFields: {
        name: string;
        text: string;
    }[] = typeLiteralNode.members.map((member) => {
        if (member.kind === tsc.SyntaxKind.PropertySignature) {
            const propertySignature = member as tsc.PropertySignature;

            if (propertySignature.name.kind === tsc.SyntaxKind.Identifier) {
                const name = propertySignature.name.escapedText.toString();

                if (propertySignature.type === undefined) {
                    throw new Error('must not happen');
                }

                const candidTypeInfo = generateCandidTypeInfo(
                    sourceFiles,
                    propertySignature.type
                );

                return {
                    name,
                    text: candidTypeInfo.text
                };
            }
        }

        throw new Error('must not happen');
    });

    if (candidVariantName === null) {
        return `variant { ${variantFields.map((variantField) => `"${variantField.name}": ${variantField.text}`).join('; ')} }`;
    }
    else {
        return `type ${candidVariantName} = variant { ${variantFields.map((variantField) => `"${variantField.name}": ${variantField.text}`).join('; ')} };`;
    }
}
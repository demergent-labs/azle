import { getCanisterMethodRecordNames } from '../ast_utilities/canister_methods';
import { getPropertyNameText } from '../ast_utilities/miscellaneous';
import { getTypeAliasDeclaration } from '../ast_utilities/type_aliases';
import { generateCandidTypeName } from './type_name';
import { Candid } from '../../../types';
import * as tsc from 'typescript';

// TODO variants and records need to be generated from the fields of the records
export function generateCandidRecords(
    sourceFiles: readonly tsc.SourceFile[],
    queryMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    updateMethodFunctionDeclarations: tsc.FunctionDeclaration[]
): Candid {
    const candidRecordNames = Array.from(
        new Set(
            getCanisterMethodRecordNames(sourceFiles, [
                ...queryMethodFunctionDeclarations,
                ...updateMethodFunctionDeclarations
            ]) // TODO perhaps it is here that we get the record names from existing records
        )
    );

    const candidRecords = candidRecordNames.map((candidRecordName) => {
        return generateCandidRecord(
            sourceFiles,
            candidRecordName
        );
    });

    return candidRecords.join('\n\n');
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
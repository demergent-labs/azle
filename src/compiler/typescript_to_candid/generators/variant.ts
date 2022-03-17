// TODO remember that the variant type can't have field types yet, just fields

import * as tsc from 'typescript';
import { Candid } from '../../../types';
import { getCanisterMethodVariantNames } from '../ast_utilities/canister_methods';
import { getTypeAliasDeclaration } from '../ast_utilities/type_aliases';

// TODO variants and records need to be generated from the fields of the variants
export function generateCandidVariants(
    sourceFiles: readonly tsc.SourceFile[],
    queryMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    updateMethodFunctionDeclarations: tsc.FunctionDeclaration[]
): Candid {
    const candidVariantNames = Array.from(
        new Set(
            getCanisterMethodVariantNames(sourceFiles, [
                ...queryMethodFunctionDeclarations,
                ...updateMethodFunctionDeclarations
            ]) // TODO perhaps it is here that we get the record names from existing records
        )
    );

    const candidVariants = candidVariantNames.map((candidVariantName) => {
        return generateCandidVariant(
            sourceFiles,
            candidVariantName
        );
    });

    return candidVariants.join('\n\n');
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

            const variantFields = typeLiteralNode.members.map((member) => {
                if (member.kind === tsc.SyntaxKind.PropertySignature) {
                    if (member.kind === tsc.SyntaxKind.PropertySignature) {
                        const propertySignature = member as tsc.PropertySignature;

                        if (propertySignature.name.kind === tsc.SyntaxKind.Identifier) {
                            const name = propertySignature.name.escapedText.toString();

                            return name;
                        }
                    }
                }

                throw new Error('must not happen');
            });

            return `type ${candidVariantName} = variant { ${variantFields.join('; ')} };`;
        }
    }

    throw new Error('this should not happen');
}
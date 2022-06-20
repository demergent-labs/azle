import * as tsc from 'typescript';
import { CandidTypeClass } from '../../../types';
import { generateCandidTypeInfo } from '../generators/type_info';

export function getStableTypeAliasRecordNames(
    sourceFiles: readonly tsc.SourceFile[],
    stableTypeAliasDeclarations: tsc.TypeAliasDeclaration[]
): string[] {
    return getStableTypeAliasNames(
        sourceFiles,
        stableTypeAliasDeclarations,
        'record'
    );
}

export function getStableTypeAliasVariantNames(
    sourceFiles: readonly tsc.SourceFile[],
    stableTypeAliasDeclarations: tsc.TypeAliasDeclaration[]
): string[] {
    return getStableTypeAliasNames(
        sourceFiles,
        stableTypeAliasDeclarations,
        'variant'
    );
}

function getStableTypeAliasNames(
    sourceFiles: readonly tsc.SourceFile[],
    stableTypeAliasDeclarations: tsc.TypeAliasDeclaration[],
    candidTypeClass: CandidTypeClass
): string[] {
    return stableTypeAliasDeclarations.reduce(
        (result: string[], typeAliasDeclaration) => {
            const stableTypeAliasName = getStableTypeAliasName(
                sourceFiles,
                typeAliasDeclaration,
                candidTypeClass
            );

            return [...result, ...stableTypeAliasName];
        },
        []
    );
}

function getStableTypeAliasName(
    sourceFiles: readonly tsc.SourceFile[],
    typeAliasDeclaration: tsc.TypeAliasDeclaration,
    candidTypeClass: CandidTypeClass
): string[] {
    if (typeAliasDeclaration.type.kind !== tsc.SyntaxKind.TypeReference) {
        throw new Error(`Stable type must be a type reference`);
    }

    const typeReferenceNode =
        typeAliasDeclaration.type as tsc.TypeReferenceNode;

    if (typeReferenceNode.typeArguments === undefined) {
        throw new Error(`Stable type must have type arguments`);
    }

    const firstTypeArgument = typeReferenceNode.typeArguments[0];

    if (firstTypeArgument.kind !== tsc.SyntaxKind.TypeLiteral) {
        throw new Error(`Stable type must be a type literal`);
    }

    const typeLiteralNode = firstTypeArgument as tsc.TypeLiteralNode;

    return typeLiteralNode.members.reduce((result: string[], member) => {
        if (member.kind !== tsc.SyntaxKind.PropertySignature) {
            throw new Error('Must be a property signature');
        }

        const propertySignature = member as tsc.PropertySignature;

        if (propertySignature.type === undefined) {
            throw new Error('Property type must not be undefined');
        }

        const candidTypeInfo = generateCandidTypeInfo(
            sourceFiles,
            propertySignature.type
        );

        if (candidTypeClass === 'record') {
            if (candidTypeInfo.typeClass === 'record') {
                return [...result, candidTypeInfo.typeName];
            }
        }

        if (candidTypeClass === 'variant') {
            if (candidTypeInfo.typeClass === 'variant') {
                return [...result, candidTypeInfo.typeName];
            }
        }

        // TODO there is no support for inline records or variants, but I also don't think we want to support that

        return result;
    }, []);
}

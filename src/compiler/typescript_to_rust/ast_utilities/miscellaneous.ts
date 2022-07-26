import { AST, Impl, ImplItem, ImplItemMethod } from './types';
import * as tsc from 'typescript';
import { Rust } from '../../../types';
import { getTypeAliasDeclaration } from '../../typescript_to_candid/ast_utilities/type_aliases';

export function getImpls(ast: AST): Impl[] {
    return ast.items
        .map((item) => item.impl)
        .filter((impl) => impl !== undefined) as Impl[];
}

export function getImplItemMethods(impl: Impl): ImplItemMethod[] {
    return impl.items
        .map((implItem) => implItem.method)
        .filter(
            (implItemMethod) =>
                implItemMethod !== undefined &&
                implItemMethod.ident !== '_azle_dummy_method'
        ) as ImplItemMethod[]; // TODO remove _azle_dummy_method check once https://github.com/dfinity/candid/issues/330
}

export function getParamName(
    parameterDeclaration: tsc.ParameterDeclaration
): string {
    if (parameterDeclaration.name.kind !== tsc.SyntaxKind.Identifier) {
        throw new Error('Parameter name must be an identifier');
    }

    return parameterDeclaration.name.escapedText.toString();
}

// TODO perhaps we just want to use the candid generation somehow?
// TODO or we will have to do this all ourselves...maybe that's fine for now
// TODO but perhaps in the future we could have candid generate this Rust info for us
// TODO should we support inline types? I don't think so since they are impossible to represent in Rust
// TODO basically we would need to create special types that represent those inline types, which we could consider
// TODO for now just document that you need to use explicit type names or array types, no inline types for cross-canister calls
// TODO I would hope most canisters do not actually use inline types, if they do we will run into problems (turns out they do, but you can just give the types a name)
export function getRustTypeNameFromTypeNode(
    sourceFiles: readonly tsc.SourceFile[],
    typeNode: tsc.TypeNode,
    parentTypeName?: string
): Rust {
    if (typeNode.kind === tsc.SyntaxKind.StringKeyword) {
        return `String`;
    }

    if (typeNode.kind === tsc.SyntaxKind.BooleanKeyword) {
        return `bool`;
    }

    if (typeNode.kind === tsc.SyntaxKind.VoidKeyword) {
        return `()`;
    }

    if (typeNode.kind === tsc.SyntaxKind.TypeLiteral) {
        if (parentTypeName === undefined) {
            throw new Error('The parentTypeName must be defined');
        }

        return parentTypeName;
    }

    if (typeNode.kind === tsc.SyntaxKind.LiteralType) {
        const literalTypeNode = typeNode as tsc.LiteralTypeNode;

        if (literalTypeNode.literal.kind === tsc.SyntaxKind.NullKeyword) {
            return `()`;
        }
        // TODO possibly other literal types?
    }

    if (typeNode.kind === tsc.SyntaxKind.ArrayType) {
        const arrayTypeNode = typeNode as tsc.ArrayTypeNode;
        const elementRustType = getRustTypeNameFromTypeNode(
            sourceFiles,
            arrayTypeNode.elementType
        );

        return `Vec<${elementRustType}>`;
    }

    if (typeNode.kind === tsc.SyntaxKind.TupleType) {
        if (parentTypeName === undefined) {
            throw new Error('The parentTypeName must be defined');
        }

        return parentTypeName;
    }

    if (typeNode.kind === tsc.SyntaxKind.TypeReference) {
        const typeReferenceNode = typeNode as tsc.TypeReferenceNode;

        if (typeReferenceNode.typeName.kind === tsc.SyntaxKind.Identifier) {
            const typeName = typeReferenceNode.typeName.escapedText.toString();

            if (typeName === 'int') {
                return 'i128';
            }

            if (typeName === 'int64') {
                return 'i64';
            }

            if (typeName === 'int32') {
                return 'i32';
            }

            if (typeName === 'int16') {
                return 'i16';
            }

            if (typeName === 'int8') {
                return 'i8';
            }

            if (typeName === 'nat') {
                return 'u128';
            }

            if (typeName === 'nat64') {
                return 'u64';
            }

            if (typeName === 'nat32') {
                return 'u32';
            }

            if (typeName === 'nat16') {
                return 'u16';
            }

            if (typeName === 'nat8') {
                return 'u8';
            }

            if (typeName === 'float64') {
                return 'f64';
            }

            if (typeName === 'float32') {
                return 'f32';
            }

            if (typeName === 'Principal') {
                return `ic_cdk::export::Principal`;
            }

            if (typeName === 'blob') {
                return 'Vec<u8>';
            }

            if (typeName === 'empty') {
                return 'ic_cdk::export::candid::Empty';
            }

            if (typeName === 'reserved') {
                return 'ic_cdk::export::candid::Reserved';
            }

            if (typeName === 'Opt') {
                if (typeReferenceNode.typeArguments === undefined) {
                    throw new Error('Opt must have an enclosed type');
                }

                const firstTypeArgument = typeReferenceNode.typeArguments[0];

                const typeName = getRustTypeNameFromTypeNode(
                    sourceFiles,
                    firstTypeArgument
                );

                return `Option<${typeName}>`;
            }

            if (typeName === 'Query' || typeName === 'QueryManual') {
                if (typeReferenceNode.typeArguments === undefined) {
                    throw new Error(
                        'Query/QueryManual must have an enclosed type'
                    );
                }

                const firstTypeArgument = typeReferenceNode.typeArguments[0];

                return getRustTypeNameFromTypeNode(
                    sourceFiles,
                    firstTypeArgument
                );
            }

            if (typeName === 'Update' || typeName === 'UpdateManual') {
                if (typeReferenceNode.typeArguments === undefined) {
                    throw new Error(
                        'Update/UpdateManual must have an enclosed type'
                    );
                }

                const firstTypeArgument = typeReferenceNode.typeArguments[0];

                return getRustTypeNameFromTypeNode(
                    sourceFiles,
                    firstTypeArgument
                );
            }

            if (typeName === 'CanisterResult') {
                if (typeReferenceNode.typeArguments === undefined) {
                    throw new Error(
                        'CanisterResult must have an enclosed type'
                    );
                }

                const firstTypeArgument = typeReferenceNode.typeArguments[0];

                return getRustTypeNameFromTypeNode(
                    sourceFiles,
                    firstTypeArgument
                );
            }

            if (typeName === 'Oneway') {
                return `()`;
            }

            if (typeName === 'Variant') {
                if (parentTypeName === undefined) {
                    throw new Error('The parentTypeName must be defined');
                }

                return parentTypeName;
            }

            if (typeName === 'Func') {
                if (parentTypeName === undefined) {
                    throw new Error('The parentTypeName must be defined');
                }
                return parentTypeName;
            }

            const typeAliasDeclaration = getTypeAliasDeclaration(
                sourceFiles,
                typeName
            );

            if (typeAliasDeclaration === undefined) {
                throw new Error(
                    `${typeName} must be defined in your TypeScript source file`
                );
            }

            return getRustTypeNameFromTypeNode(
                sourceFiles,
                typeAliasDeclaration.type,
                typeName
            );
        }
    }

    throw new Error('Canister function has an unsupported parameter type');
}

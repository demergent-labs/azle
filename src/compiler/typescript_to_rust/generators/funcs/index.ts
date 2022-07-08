// TODO add proper licensing since a lot of this code is from agent-rs DFINITY pull request

import * as tsc from 'typescript';
import { Rust } from '../../../../types';
import { getRustTypeNameFromTypeNode } from '../../ast_utilities/miscellaneous';
import { getFuncTypeAliasDeclarations } from '../call_functions';

export function generate_func_structs_and_impls(
    sourceFiles: readonly tsc.SourceFile[]
): {
    func_structs_and_impls: Rust;
    func_names: string[];
} {
    const func_type_alias_declarations =
        getFuncTypeAliasDeclarations(sourceFiles);
    const func_structs_and_impls =
        generate_func_structs_and_impls_from_type_alias_declarations(
            sourceFiles,
            func_type_alias_declarations
        );
    const func_names = func_type_alias_declarations.map(
        (type_alias_declaration) =>
            type_alias_declaration.name.escapedText.toString()
    );

    return {
        func_structs_and_impls: /* rust */ `
            // TODO I think it's debatable whether or not we even need ArgToken
            /// A marker type to match unconstrained callback arguments
            #[derive(Debug, Clone, Copy, PartialEq, Deserialize)]
            pub struct ArgToken;

            impl CandidType for ArgToken {
                fn _ty() -> candid::types::Type {
                    candid::types::Type::Empty
                }

                fn idl_serialize<S: candid::types::Serializer>(&self, _serializer: S) -> Result<(), S::Error> {
                    // We cannot implement serialize, since our type must be \`Empty\` in order to accept anything.
                    // Attempting to serialize this type is always an error and should be regarded as a compile time error.
                    unimplemented!("Token is not serializable")
                }
            }

            ${func_structs_and_impls.join('\n')}
        `,
        func_names
    };
}

function generate_func_structs_and_impls_from_type_alias_declarations(
    sourceFiles: readonly tsc.SourceFile[],
    typeAliasDeclarations: tsc.TypeAliasDeclaration[]
): Rust[] {
    return typeAliasDeclarations.map((typeAliasDeclaration) => {
        return generate_func_struct_and_impls_from_type_alias_declaration(
            sourceFiles,
            typeAliasDeclaration
        );
    }, []);
}

function generate_func_struct_and_impls_from_type_alias_declaration(
    sourceFiles: readonly tsc.SourceFile[],
    typeAliasDeclaration: tsc.TypeAliasDeclaration
): string {
    if (typeAliasDeclaration.type.kind !== tsc.SyntaxKind.TypeReference) {
        throw new Error('This cannot happen');
    }

    const typeRefenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

    if (typeRefenceNode.typeArguments === undefined) {
        throw new Error('This cannot happen');
    }

    const firstTypeArgument = typeRefenceNode.typeArguments[0];

    if (firstTypeArgument.kind !== tsc.SyntaxKind.FunctionType) {
        throw new Error('This cannot happen');
    }

    const function_type_node = firstTypeArgument as tsc.FunctionTypeNode;

    return generate_func_struct_and_impls_from_function_type_node(
        sourceFiles,
        function_type_node,
        typeAliasDeclaration.name.escapedText.toString()
    );
}

// TODO add proper licensing
function generate_func_struct_and_impls_from_function_type_node(
    sourceFiles: readonly tsc.SourceFile[],
    function_type_node: tsc.FunctionTypeNode,
    typeAliasName: string
): string {
    const func_param_types = get_func_param_types(
        sourceFiles,
        function_type_node
    );
    const return_type_name = getRustTypeNameFromTypeNode(
        sourceFiles,
        function_type_node.type
    );
    const func_mode = get_func_mode(function_type_node);

    return /* rust */ `
        #[derive(Debug, Clone)]
        struct ${typeAliasName}<ArgToken = self::ArgToken>(
            pub candid::Func,
            pub std::marker::PhantomData<ArgToken>,
        );

        impl AzleIntoJsValue for ${typeAliasName} {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.0.azle_into_js_value(context)
            }
        }

        impl AzleIntoJsValue for Vec<${typeAliasName}> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<${typeAliasName}> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<${typeAliasName}, AzleTryFromJsValueError> {
                let candid_func: candid::Func = self.azle_try_from_js_value(context).unwrap();
                Ok(candid_func.into())
            }
        }

        impl AzleTryFromJsValue<Vec<${typeAliasName}>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<${typeAliasName}>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl CandidType for ${typeAliasName} {
            fn _ty() -> candid::types::Type {
                candid::types::Type::Func(candid::types::Function {
                    modes: vec![${
                        func_mode === 'Query'
                            ? /* rust */ `candid::parser::types::FuncMode::Query`
                            : func_mode === 'Oneway'
                            ? /* rust */ `candid::parser::types::FuncMode::Oneway`
                            : ''
                    }],
                    args: vec![${func_param_types
                        .map(
                            (func_param_type) =>
                                /* rust */ `${func_param_type}::_ty()`
                        )
                        .join(', ')}],
                    rets: vec![${
                        return_type_name === '()'
                            ? ''
                            : /* rust */ `${return_type_name}::_ty()`
                    }]
                })
            }

            fn idl_serialize<S: candid::types::Serializer>(&self, serializer: S) -> Result<(), S::Error> {
                self.0.idl_serialize(serializer)
            }
        }

        impl<'de> Deserialize<'de> for ${typeAliasName} {
            fn deserialize<D: serde::de::Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
                candid::Func::deserialize(deserializer).map(Self::from)
            }
        }

        impl From<candid::Func> for ${typeAliasName} {
            fn from(f: candid::Func) -> Self {
                Self(f, std::marker::PhantomData)
            }
        }

        impl From<${typeAliasName}> for candid::Func {
            fn from(c: ${typeAliasName}) -> Self {
                c.0
            }
        }

        impl std::ops::Deref for ${typeAliasName} {
            type Target = candid::Func;
            fn deref(&self) -> &candid::Func {
                &self.0
            }
        }

        impl std::ops::DerefMut for ${typeAliasName} {
            fn deref_mut(&mut self) -> &mut candid::Func {
                &mut self.0
            }
        }
    `;
}

function get_func_param_types(
    sourceFiles: readonly tsc.SourceFile[],
    function_type_node: tsc.FunctionTypeNode
): string[] {
    return function_type_node.parameters.map((parameterDeclaration) => {
        if (parameterDeclaration.type === undefined) {
            throw new Error(`Parameter must have a type`);
        }

        const paramType = getRustTypeNameFromTypeNode(
            sourceFiles,
            parameterDeclaration.type
        );

        if (paramType.startsWith('Vec')) {
            // Rust requires the Vec::<>::_ty() syntax so we perform this transformation here
            return `Vec::<${paramType.replace('Vec<', '')}`;
        } else {
            return paramType;
        }
    });
}

function get_func_mode(
    function_type_node: tsc.FunctionTypeNode
): 'Query' | 'Update' | 'Oneway' {
    if (function_type_node.type.kind !== tsc.SyntaxKind.TypeReference) {
        throw new Error(`Func return type must be Query, Update, or Oneway`);
    }

    const type_reference_node =
        function_type_node.type as tsc.TypeReferenceNode;

    if (type_reference_node.typeName.kind !== tsc.SyntaxKind.Identifier) {
        throw new Error(`This cannot happen`);
    }

    const type_name = (
        type_reference_node.typeName as tsc.Identifier
    ).escapedText.toString();

    if (
        type_name !== 'Query' &&
        type_name !== 'Update' &&
        type_name !== 'Oneway'
    ) {
        throw new Error(`Func return type must be Query, Update, or Oneway`);
    }

    return type_name;
}

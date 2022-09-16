use crate::azle_act;
use crate::ts_ast::ts_types_to_act;
use proc_macro2::TokenStream;
use quote::quote;
use swc_ecma_ast::TsEntityName::{Ident, TsQualifiedName};
use swc_ecma_ast::TsFnType;
use swc_ecma_ast::TsType::TsTypeRef;

pub fn generate_func_arg_token() -> TokenStream {
    quote! {
        // TODO I think it's debatable whether or not we even need ArgToken
        /// A marker type to match unconstrained callback arguments
        #[derive(Debug, Clone, Copy, PartialEq, candid::Deserialize)]
        pub struct ArgToken;

        impl candid::CandidType for ArgToken {
            fn _ty() -> candid::types::Type {
                candid::types::Type::Empty
            }

            fn idl_serialize<S: candid::types::Serializer>(&self, _serializer: S) -> Result<(), S::Error> {
                // We cannot implement serialize, since our type must be \`Empty\` in order to accept anything.
                // Attempting to serialize this type is always an error and should be regarded as a compile time error.
                unimplemented!("Token is not serializable")
            }
        }
    }
}

pub fn generate_func_struct_and_impls(
    type_alias_name: proc_macro2::TokenStream,
    func_type: &TsFnType,
) -> TokenStream {
    let func_mode = get_func_mode(&func_type);
    let func_param_types = get_param_types(&func_type);
    let func_return_type = get_return_type(&func_type);

    quote! {
        #[derive(Debug, Clone)]
        struct #type_alias_name<ArgToken = self::ArgToken>(
            pub candid::Func,
            pub std::marker::PhantomData<ArgToken>,
        );

        impl AzleIntoJsValue for #type_alias_name {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.0.azle_into_js_value(context)
            }
        }

        impl AzleIntoJsValue for Vec<#type_alias_name> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<#type_alias_name> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<#type_alias_name, AzleTryFromJsValueError> {
                let candid_func: candid::Func = self.azle_try_from_js_value(context).unwrap();
                Ok(candid_func.into())
            }
        }

        impl AzleTryFromJsValue<Vec<#type_alias_name>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<#type_alias_name>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl candid::CandidType for #type_alias_name {
            fn _ty() -> candid::types::Type {
                candid::types::Type::Func(candid::types::Function {
                    modes: vec![#func_mode],
                    args: vec![#(#func_param_types),*],
                    rets: vec![#func_return_type]
                })
            }

            fn idl_serialize<S: candid::types::Serializer>(&self, serializer: S) -> Result<(), S::Error> {
                self.0.idl_serialize(serializer)
            }
        }

        impl<'de> candid::Deserialize<'de> for #type_alias_name {
            fn deserialize<D: serde::de::Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
                candid::Func::deserialize(deserializer).map(Self::from)
            }
        }

        impl From<candid::Func> for #type_alias_name {
            fn from(f: candid::Func) -> Self {
                Self(f, std::marker::PhantomData)
            }
        }

        impl From<#type_alias_name> for candid::Func {
            fn from(c: #type_alias_name) -> Self {
                c.0
            }
        }

        impl std::ops::Deref for #type_alias_name {
            type Target = candid::Func;
            fn deref(&self) -> &candid::Func {
                &self.0
            }
        }

        impl std::ops::DerefMut for #type_alias_name {
            fn deref_mut(&mut self) -> &mut candid::Func {
                &mut self.0
            }
        }
    }
}

fn get_func_mode(function_type: &swc_ecma_ast::TsFnType) -> TokenStream {
    match &*function_type.type_ann.type_ann {
        TsTypeRef(type_reference) => match &type_reference.type_name {
            TsQualifiedName(_) => panic!("Unsupported qualified name. Func return type must directly be Query, Update, or Oneway"),
            Ident(identifier) => {
                let mode = identifier.sym.chars().as_str();
                if mode != "Query" && mode != "Update" && mode != "Oneway" {
                    panic!("Func return type must be Query, Update, or Oneway")
                }

                if mode == "Query" {
                    quote! {candid::parser::types::FuncMode::Query }
                } else if mode == "Oneway" {
                    quote! {candid::parser::types::FuncMode::Oneway }
                } else {
                    quote! {}
                }
            }
        },
        _ => panic!("Func return type must be Query, Update, or Oneway"),
    }
}

fn get_param_types(function_type: &swc_ecma_ast::TsFnType) -> Vec<TokenStream> {
    function_type
        .params
        .iter()
        .map(|param| match param {
            swc_ecma_ast::TsFnParam::Ident(identifier) => match &identifier.type_ann {
                Some(param_type) => {
                    let rust_type =
                        ts_types_to_act::ts_type_to_act_node(&*param_type.type_ann, &None)
                            .get_type_ident()
                            .to_string();

                    let modified_rust_type = if rust_type.starts_with("Vec") {
                        rust_type
                            .chars()
                            .filter(|c| !c.is_whitespace())
                            .collect::<String>()
                            .replacen("Vec<", "Vec::<", 1)
                    } else {
                        rust_type
                    };

                    let modified_rust_type_token_stream: TokenStream =
                        modified_rust_type.parse().unwrap();

                    quote! {#modified_rust_type_token_stream::_ty()}
                }
                None => panic!("Function parameter must have a return type"),
            },
            _ => panic!("Func parameter must be an identifier"),
        })
        .collect()
}

fn get_return_type(function_type: &swc_ecma_ast::TsFnType) -> TokenStream {
    match &*function_type.type_ann.type_ann {
        TsTypeRef(type_reference) => match &type_reference.type_name {
            TsQualifiedName(_) => panic!("Unsupported qualified name. Func return type must directly be Query, Update, or Oneway"),
            Ident(identifier) => {
                let mode = identifier.sym.chars().as_str();
                if mode != "Query" && mode != "Update" && mode != "Oneway" {
                    panic!("Func return type must be Query, Update, or Oneway")
                }

                if mode == "Oneway" {
                    quote! {}
                } else {
                    match &type_reference.type_params {
                        Some(type_param_inst) => {
                            if type_param_inst.params.len() != 1 {
                                panic!("Func must specify exactly one return type")
                            }
                            match type_param_inst.params.get(0) {
                                Some(param) => {
                                    let return_type = ts_types_to_act::ts_type_to_act_node(&**param, &None).get_type_ident().to_string();
                                    if return_type == "()" {
                                        quote! {}
                                    } else {
                                        let return_type_token_stream: TokenStream = return_type.parse().unwrap();
                                        quote! { #return_type_token_stream::_ty()}
                                    }
                                },
                                None => panic!("Func must specify exactly one return type"),
                            }
                        },
                        None => panic!("Func must specify a return type"),
                    }
                }
            }
        },
        _ => panic!("Func return type must be Query, Update, or Oneway"),
    }
}

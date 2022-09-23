use super::{ActDataTypeNode, Literally, ToIdent, ToTokenStream};
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};

#[derive(Clone, Debug)]
pub enum ActFunc {
    Literal(Func),
    TypeAlias(Func),
}

#[derive(Clone, Debug)]
pub struct Func {
    pub name: String,
    pub params: Vec<ActDataTypeNode>,
    pub return_type: Box<ActDataTypeNode>,
    pub param_strings: Vec<String>,
    pub return_string: String,
    pub mode: String,
    pub is_inline: bool,
}

impl Literally<ActFunc> for ActFunc {
    fn is_literal(&self) -> bool {
        match self {
            ActFunc::Literal(_) => true,
            ActFunc::TypeAlias(_) => false,
        }
    }

    fn as_type_alias(&self) -> ActFunc {
        match self {
            ActFunc::Literal(literal) => ActFunc::TypeAlias(literal.clone()),
            ActFunc::TypeAlias(_) => self.clone(),
        }
    }

    fn get_literal_members(&self) -> Vec<ActDataTypeNode> {
        let act_func = match self {
            ActFunc::Literal(literal) => literal.clone(),
            ActFunc::TypeAlias(type_alias) => type_alias.clone(),
        };
        vec![act_func.params.clone(), vec![*act_func.return_type.clone()]]
            .concat()
            .iter()
            .filter(|elem| elem.is_inline_type())
            .cloned()
            .collect()
    }
}

impl ToTokenStream for ActFunc {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            ActFunc::Literal(literal) => literal.name.to_identifier().to_token_stream(),
            ActFunc::TypeAlias(type_alias) => generate_func_struct_and_impls(
                &type_alias.name.to_identifier(),
                &type_alias.mode,
                &type_alias.param_strings,
                &type_alias.return_string,
            ),
        }
    }
}

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
    type_alias_name: &proc_macro2::Ident,
    func_mode: &String,
    param_types: &Vec<String>,
    return_type: &String,
) -> TokenStream {
    let type_alias_name = type_alias_name.to_token_stream();
    let func_mode = if func_mode == "Query" {
        quote! {candid::parser::types::FuncMode::Query }
    } else if func_mode == "Oneway" {
        quote! {candid::parser::types::FuncMode::Oneway }
    } else {
        quote! {}
    };
    let func_param_types: Vec<TokenStream> = param_types
        .iter()
        .map(|rust_type| {
            let modified_rust_type = if rust_type.starts_with("Vec") {
                rust_type
                    .chars()
                    .filter(|c| !c.is_whitespace())
                    .collect::<String>()
                    .replacen("Vec<", "Vec::<", 1)
            } else {
                rust_type.clone()
            };

            let modified_rust_type_token_stream: TokenStream = modified_rust_type.parse().unwrap();

            quote! {#modified_rust_type_token_stream::_ty()}
        })
        .collect();
    let func_return_type = if return_type == "()" || return_type == "" {
        quote! {}
    } else {
        let return_type_token_stream: TokenStream = return_type.parse().unwrap();
        quote! { #return_type_token_stream::_ty()}
    };

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

use crate::cdk_act::{nodes::ActFnParam, ActDataType, ToTokenStream, ToTokenStreams};
use proc_macro2::TokenStream;
use quote::{format_ident, quote};

#[derive(Debug, Clone)]
pub enum ActCanisterMethod {
    QueryMethod(CanisterMethod),
    UpdateMethod(CanisterMethod),
}

/// Describes a Rust canister method function body
#[derive(Debug, Clone)]
pub struct CanisterMethod {
    pub body: TokenStream,
    pub params: Vec<ActFnParam>,
    pub is_manual: bool,
    pub name: String,
    pub return_type: ActDataType,
}

pub fn get_all_types_from_canister_method_acts(
    canister_methods: &Vec<ActCanisterMethod>,
) -> Vec<ActDataType> {
    canister_methods
        .iter()
        .fold(vec![], |acc, canister_method| {
            let inline_types = canister_method.get_all_types();
            vec![acc, inline_types].concat()
        })
}

impl ToTokenStream for ActCanisterMethod {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            ActCanisterMethod::QueryMethod(query_method) => {
                let function_signature = generate_function(query_method);

                let manual_reply_arg = if query_method.is_manual {
                    quote! {(manual_reply = true)}
                } else {
                    quote! {}
                };

                quote! {
                    #[ic_cdk_macros::query#manual_reply_arg]
                    #[candid::candid_method(query)]
                    #function_signature
                }
            }
            ActCanisterMethod::UpdateMethod(update_method) => {
                let function_signature = generate_function(update_method);

                let manual_reply_arg = if update_method.is_manual {
                    quote! {(manual_reply = true)}
                } else {
                    quote! {}
                };

                quote! {
                    #[ic_cdk_macros::update#manual_reply_arg]
                    #[candid::candid_method(update)]
                    #function_signature
                }
            }
        }
    }
}

impl ActCanisterMethod {
    pub fn get_all_types(&self) -> Vec<ActDataType> {
        vec![self.get_param_types(), vec![self.get_return_type()]].concat()
    }

    pub fn get_name(&self) -> String {
        match self {
            ActCanisterMethod::QueryMethod(canister_method) => &canister_method.name,
            ActCanisterMethod::UpdateMethod(canister_method) => &canister_method.name,
        }
        .clone()
    }

    pub fn get_return_type(&self) -> ActDataType {
        match self {
            ActCanisterMethod::QueryMethod(canister_method) => &canister_method.return_type,
            ActCanisterMethod::UpdateMethod(canister_method) => &canister_method.return_type,
        }
        .clone()
    }

    pub fn get_param_types(&self) -> Vec<ActDataType> {
        match self {
            ActCanisterMethod::QueryMethod(query) => &query.params,
            ActCanisterMethod::UpdateMethod(update) => &update.params,
        }
        .iter()
        .map(|param| param.data_type.clone())
        .collect()
    }

    pub fn is_manual(&self) -> bool {
        match self {
            ActCanisterMethod::QueryMethod(canister_method) => canister_method.is_manual,
            ActCanisterMethod::UpdateMethod(canister_method) => canister_method.is_manual,
        }
        .clone()
    }
}

fn generate_function(canister_method: &CanisterMethod) -> TokenStream {
    let function_name = format_ident!("{}", canister_method.name);
    let params = canister_method.params.to_token_streams();

    let function_body = &canister_method.body;

    let return_type_token = canister_method.return_type.to_token_stream();
    let wrapped_return_type = if canister_method.is_manual {
        quote! {
            ic_cdk::api::call::ManualReply<#return_type_token>
        }
    } else {
        return_type_token
    };

    quote! {
        async fn #function_name(#(#params),*) -> #wrapped_return_type {
            #function_body
        }
    }
}

use proc_macro2::TokenStream;
use quote::{format_ident, quote};

use super::Param;
use crate::cdk_act::{ActDataTypeNode, ToTokenStream};

#[derive(Clone)]
pub enum CanisterMethodActNode {
    QueryMethod(CanisterMethod),
    UpdateMethod(CanisterMethod),
}

/// Describes a Rust canister method function body
#[derive(Clone)]
pub struct CanisterMethod {
    pub body: TokenStream,
    pub params: Vec<Param>,
    pub is_manual: bool,
    pub name: String,
    pub return_type: ActDataTypeNode,
}

pub fn build_inline_types_from_canister_method_acts(
    canister_methods: &Vec<CanisterMethodActNode>,
) -> Vec<ActDataTypeNode> {
    canister_methods
        .iter()
        .fold(vec![], |acc, canister_method| {
            let inline_types = canister_method.build_inline_types();
            vec![acc, inline_types].concat()
        })
}

impl ToTokenStream for CanisterMethodActNode {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            CanisterMethodActNode::QueryMethod(query_method) => {
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
            CanisterMethodActNode::UpdateMethod(update_method) => {
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

impl CanisterMethodActNode {
    pub fn build_inline_types(&self) -> Vec<ActDataTypeNode> {
        self.get_inline_types()
            .iter()
            .fold(vec![], |acc, inline_type| {
                vec![acc, inline_type.collect_inline_types()].concat()
            })
    }

    pub fn get_inline_types(&self) -> Box<Vec<ActDataTypeNode>> {
        match self {
            CanisterMethodActNode::QueryMethod(canister_method) => {
                get_inline_types(canister_method)
            }
            CanisterMethodActNode::UpdateMethod(canister_method) => {
                get_inline_types(canister_method)
            }
        }
    }

    pub fn get_name(&self) -> String {
        match self {
            CanisterMethodActNode::QueryMethod(canister_method) => canister_method.name.clone(),
            CanisterMethodActNode::UpdateMethod(canister_method) => canister_method.name.clone(),
        }
    }

    pub fn get_return_type(&self) -> ActDataTypeNode {
        match self {
            CanisterMethodActNode::QueryMethod(canister_method) => {
                canister_method.return_type.clone()
            }
            CanisterMethodActNode::UpdateMethod(canister_method) => {
                canister_method.return_type.clone()
            }
        }
    }

    pub fn is_manual(&self) -> bool {
        match self {
            CanisterMethodActNode::QueryMethod(canister_method) => {
                canister_method.is_manual.clone()
            }
            CanisterMethodActNode::UpdateMethod(canister_method) => {
                canister_method.is_manual.clone()
            }
        }
    }
}

fn generate_function(canister_method: &CanisterMethod) -> TokenStream {
    let function_name = format_ident!("{}", canister_method.name);
    let params: Vec<TokenStream> = canister_method
        .params
        .iter()
        .map(|param| param.to_token_stream())
        .collect();

    let function_body = &canister_method.body;

    let return_type_token = canister_method.return_type.get_type_ident();
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

fn get_inline_types(canister_method: &CanisterMethod) -> Box<Vec<ActDataTypeNode>> {
    let inline_types = vec![
        canister_method
            .params
            .iter()
            .map(|param| param.data_type.clone())
            .collect(),
        vec![canister_method.return_type.clone()],
    ]
    .concat()
    .iter()
    .filter(|rust_type| rust_type.is_inline_rust_type())
    .fold(vec![], |acc, rust_type| {
        vec![acc, vec![rust_type.clone()]].concat()
    });
    Box::from(inline_types)
}

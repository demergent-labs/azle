use proc_macro2::TokenStream;
use quote::{format_ident, quote};

use crate::cdk_act::{nodes::ActFnParam, ActDataTypeNode, ToTokenStream, ToTokenStreams};

#[derive(Clone)]
pub enum ActCanisterMethodNode {
    QueryMethod(CanisterMethod),
    UpdateMethod(CanisterMethod),
}

/// Describes a Rust canister method function body
#[derive(Clone)]
pub struct CanisterMethod {
    pub body: TokenStream,
    pub params: Vec<ActFnParam>,
    pub is_manual: bool,
    pub name: String,
    pub return_type: ActDataTypeNode,
}

pub fn get_all_types_from_canister_method_acts(
    canister_methods: &Vec<ActCanisterMethodNode>,
) -> Vec<ActDataTypeNode> {
    canister_methods
        .iter()
        .fold(vec![], |acc, canister_method| {
            let inline_types = canister_method.get_all_types();
            vec![acc, inline_types].concat()
        })
}

impl ToTokenStream for ActCanisterMethodNode {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            ActCanisterMethodNode::QueryMethod(query_method) => {
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
            ActCanisterMethodNode::UpdateMethod(update_method) => {
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

impl ActCanisterMethodNode {
    pub fn get_all_types(&self) -> Vec<ActDataTypeNode> {
        vec![self.get_param_types(), vec![self.get_return_type()]].concat()
    }

    pub fn get_name(&self) -> String {
        match self {
            ActCanisterMethodNode::QueryMethod(canister_method) => &canister_method.name,
            ActCanisterMethodNode::UpdateMethod(canister_method) => &canister_method.name,
        }
        .clone()
    }

    pub fn get_return_type(&self) -> ActDataTypeNode {
        match self {
            ActCanisterMethodNode::QueryMethod(canister_method) => &canister_method.return_type,
            ActCanisterMethodNode::UpdateMethod(canister_method) => &canister_method.return_type,
        }
        .clone()
    }

    pub fn get_param_types(&self) -> Vec<ActDataTypeNode> {
        match self {
            ActCanisterMethodNode::QueryMethod(query) => &query.params,
            ActCanisterMethodNode::UpdateMethod(update) => &update.params,
        }
        .iter()
        .map(|param| param.data_type.clone())
        .collect()
    }

    pub fn is_manual(&self) -> bool {
        match self {
            ActCanisterMethodNode::QueryMethod(canister_method) => canister_method.is_manual,
            ActCanisterMethodNode::UpdateMethod(canister_method) => canister_method.is_manual,
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

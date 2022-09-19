use proc_macro2::TokenStream;

use crate::cdk_act::{ActDataTypeNode, ToTokenStream};

#[derive(Clone)]
pub enum CanisterMethodActNode {
    QueryMethod(CanisterMethod),
    UpdateMethod(CanisterMethod),
}

/// Describes a Rust canister method function body
#[derive(Clone)]
pub struct CanisterMethod {
    pub canister_method: TokenStream,
    pub inline_types: Box<Vec<ActDataTypeNode>>,
    pub is_manual: bool,
    pub name: String,
    pub rust_return_type: TokenStream,
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
                query_method.canister_method.clone()
            }
            CanisterMethodActNode::UpdateMethod(update_method) => {
                update_method.canister_method.clone()
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
                canister_method.inline_types.clone()
            }
            CanisterMethodActNode::UpdateMethod(canister_method) => {
                canister_method.inline_types.clone()
            }
        }
    }

    pub fn get_name(&self) -> String {
        match self {
            CanisterMethodActNode::QueryMethod(canister_method) => canister_method.name.clone(),
            CanisterMethodActNode::UpdateMethod(canister_method) => canister_method.name.clone(),
        }
    }

    pub fn get_rust_return_type(&self) -> TokenStream {
        match self {
            CanisterMethodActNode::QueryMethod(canister_method) => {
                canister_method.rust_return_type.clone()
            }
            CanisterMethodActNode::UpdateMethod(canister_method) => {
                canister_method.rust_return_type.clone()
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

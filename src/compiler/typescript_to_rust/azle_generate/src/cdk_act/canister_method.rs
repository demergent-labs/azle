use proc_macro2::TokenStream;

use super::ActDataTypeNode;

/// Describes a Rust canister method function body
#[derive(Clone)]
pub struct CanisterMethod {
    pub canister_method: TokenStream,
    pub inline_types: Box<Vec<ActDataTypeNode>>,
    pub is_manual: bool,
    pub name: String,
    pub rust_return_type: TokenStream,
}

// TODO update this when we switch out canister method inline_types for return and param types
impl CanisterMethod {
    pub fn build_inline_types(&self) -> Vec<ActDataTypeNode> {
        self.inline_types.iter().fold(vec![], |acc, inline_type| {
            vec![acc, inline_type.collect_inline_types()].concat()
        })
    }
}

pub fn build_inline_types_from_canister_method_acts(
    canister_methods: &Vec<CanisterMethod>,
) -> Vec<ActDataTypeNode> {
    canister_methods
        .iter()
        .fold(vec![], |acc, canister_method| {
            let inline_types = canister_method.build_inline_types();
            vec![acc, inline_types].concat()
        })
}

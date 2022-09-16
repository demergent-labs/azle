use proc_macro2::TokenStream;

use super::ActNode;

/// Describes a Rust canister method function body
#[derive(Clone)]
pub struct CanisterMethod {
    pub canister_method: TokenStream,
    pub inline_types: Box<Vec<ActNode>>,
    pub is_manual: bool,
    pub name: String,
    pub rust_return_type: TokenStream,
}

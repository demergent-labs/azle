use proc_macro2::TokenStream;

use super::rust_types::ActNode;

#[derive(Clone)]
pub struct CanisterMethod {
    pub canister_method: TokenStream,
    pub inline_types: Box<Vec<ActNode>>,
    pub is_manual: bool,
}

use proc_macro2::TokenStream;

use super::rust_types::RustType;

#[derive(Clone)]
pub struct FunctionInformation {
    pub function: TokenStream,
    pub inline_types: Box<Vec<RustType>>,
    pub manual: bool,
}

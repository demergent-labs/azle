use proc_macro2::TokenStream;
use quote::{format_ident, quote};

use crate::cdk_act::ToTokenStream;

#[derive(Clone)]
pub struct ActInspectMessageMethod {
    pub name: String,
    pub body: TokenStream,
}

impl ToTokenStream for ActInspectMessageMethod {
    fn to_token_stream(&self) -> TokenStream {
        let name = format_ident!("_azle_inspect_message_{}", &self.name);
        let body = &self.body;
        quote! {
            #[ic_cdk_macros::inspect_message]
            fn #name() {
                #body
            }
        }
    }
}

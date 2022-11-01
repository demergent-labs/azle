use proc_macro2::TokenStream;
use quote::quote;

use crate::cdk_act::{nodes::ActFnParam, ToTokenStream, ToTokenStreams};

#[derive(Clone)]
pub struct ActInitMethod {
    pub params: Vec<ActFnParam>,
    pub body: TokenStream,
}

impl ToTokenStream for ActInitMethod {
    fn to_token_stream(&self) -> TokenStream {
        let body = &self.body;
        let params = &self.params.to_token_streams();
        quote! {
            #[ic_cdk_macros::init]
            #[candid::candid_method(init)]
            fn _azle_init(#(#params),*) {
                #body
            }
        }
    }
}

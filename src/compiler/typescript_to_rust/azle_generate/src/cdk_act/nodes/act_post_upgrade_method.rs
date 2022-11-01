use proc_macro2::TokenStream;
use quote::quote;

use crate::cdk_act::{nodes::ActFnParam, ToTokenStream, ToTokenStreams};

#[derive(Clone)]
pub struct ActPostUpgradeMethod {
    pub params: Vec<ActFnParam>,
    pub body: TokenStream,
}

impl ToTokenStream for ActPostUpgradeMethod {
    fn to_token_stream(&self) -> TokenStream {
        let body = &self.body;
        let params = &self.params.to_token_streams();
        quote! {
            #[ic_cdk_macros::post_upgrade]
            fn _azle_post_upgrade(#(#params),*) {
                #body
            }
        }
    }
}

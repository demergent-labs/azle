use proc_macro2::TokenStream;

use crate::cdk_act::ToTokenStream;

#[derive(Clone)]
pub struct ActHeartbeatMethod {
    pub body: TokenStream,
}

impl ToTokenStream for ActHeartbeatMethod {
    fn to_token_stream(&self) -> TokenStream {
        let body = &self.body;
        quote::quote! {
            #[ic_cdk_macros::heartbeat]
            fn _azle_heartbeat() {
                #body
            }
        }
    }
}

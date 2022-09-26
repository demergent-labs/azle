use proc_macro2::TokenStream;

use crate::cdk_act::ToTokenStream;

pub struct ActHeartbeatMethodNode {
    pub body: TokenStream,
}

impl ToTokenStream for ActHeartbeatMethodNode {
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

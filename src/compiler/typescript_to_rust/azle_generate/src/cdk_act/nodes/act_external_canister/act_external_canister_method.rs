use proc_macro2::TokenStream;
use quote::quote;

use crate::{cdk_act::ActDataType, ToTokenStream};

pub struct ParamThingPleaseRename {
    // id: String,
    // data_type: ActDataType,
}

pub struct ActExternalCanisterMethod {
    pub name: String,
    pub params: Vec<ParamThingPleaseRename>,
    pub return_type: ActDataType,
}

impl ToTokenStream for ActExternalCanisterMethod {
    fn to_token_stream(&self) -> TokenStream {
        // self.generate_call_function()
        // self.generate_call_with_payment_function()
        // self.generate_call_with_payment128_function()
        // self.generate_notify_function()
        // self.generate_notify_with_payment_function()
        // self.generate_notify_with_payment128_function()

        // NOTE: These will need the names of the parent canister.
        // Somehow we need to get the canister name in here.

        // NOTE2: Some of these implementations are VM specific and we need
        // the CDK library author

        quote! {}
    }
}

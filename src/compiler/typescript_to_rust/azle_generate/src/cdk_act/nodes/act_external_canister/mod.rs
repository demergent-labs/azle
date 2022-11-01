use proc_macro2::TokenStream;
use quote::quote;

use crate::cdk_act::ToTokenStream;

pub use act_external_canister_method::ActExternalCanisterMethod;

pub mod act_external_canister_method;

pub struct ActExternalCanister {
    pub name: String,
    pub methods: Vec<ActExternalCanisterMethod>,
}

impl ActExternalCanister {}

impl ToTokenStream for ActExternalCanister {
    fn to_token_stream(&self) -> TokenStream {
        let cross_canister_call_functions: Vec<TokenStream> = self
            .methods
            .iter()
            .map(|method| method.to_token_stream(&self.name))
            .collect();
        quote! { #(#cross_canister_call_functions)*}
    }
}

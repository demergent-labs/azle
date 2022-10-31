use proc_macro2::TokenStream;
use quote::{format_ident, quote};

use crate::cdk_act::{nodes::ActFnParam, ActDataType, ToTokenStream, ToTokenStreams};

pub struct ActExternalCanisterMethod {
    pub name: String,
    pub params: Vec<ActFnParam>,
    pub return_type: ActDataType,
}

impl ActExternalCanisterMethod {
    pub fn to_token_stream(&self, canister_name: &String) -> TokenStream {
        // TODO

        let call_function = self.generate_call_function(canister_name);
        let call_with_payment_function = self.generate_call_with_payment_function(canister_name);
        let call_with_payment128_function =
            self.generate_call_with_payment128_function(canister_name);
        // self.generate_notify_function()
        // self.generate_notify_with_payment_function()
        // self.generate_notify_with_payment128_function()

        // NOTE: These will need the names of the parent canister.
        // Somehow we need to get the canister name in here.

        // NOTE2: Some of these implementations are VM specific and we need
        // the CDK library author

        quote! {
            #call_function
            #call_with_payment_function
            #call_with_payment128_function
        }
    }

    fn generate_call_function(&self, canister_name: &String) -> TokenStream {
        let function_name = format_ident!("_azle_call_{}_{}", canister_name, &self.name);

        let params = vec![
            vec![quote! { canister_id_principal: ic_cdk::export::Principal }],
            self.params.to_token_streams(),
        ]
        .concat();

        let function_return_type = self.return_type.to_token_stream();
        let method_name = &self.name;
        let args = self.params_as_args_list();

        quote! {
            async fn #function_name(#(#params),*) -> CallResult<(#function_return_type,)> {
                ic_cdk::api::call::call(
                    canister_id_principal,
                    #method_name,
                    (#args)
                ).await
            }
        }
    }

    fn generate_call_with_payment_function(&self, canister_name: &String) -> TokenStream {
        let function_name =
            format_ident!("_azle_call_with_payment_{}_{}", canister_name, &self.name);

        let params = vec![
            vec![quote! { canister_id_principal: ic_cdk::export::Principal }],
            self.params.to_token_streams(),
            vec![quote! { cycles: u64 }],
        ]
        .concat();

        let function_return_type = self.return_type.to_token_stream();
        let method_name = &self.name;
        let args = self.params_as_args_list();

        quote! {
            async fn #function_name(#(#params),*) -> CallResult<(#function_return_type,)> {
                ic_cdk::api::call::call_with_payment(
                    canister_id_principal,
                    #method_name,
                    (#args),
                    cycles
                ).await
            }
        }
    }

    fn generate_call_with_payment128_function(&self, canister_name: &String) -> TokenStream {
        let function_name = format_ident!(
            "_azle_call_with_payment128_{}_{}",
            canister_name,
            &self.name
        );

        let params = vec![
            vec![quote! { canister_id_principal: ic_cdk::export::Principal }],
            self.params.to_token_streams(),
            vec![quote! { cycles: u128 }],
        ]
        .concat();

        let function_return_type = self.return_type.to_token_stream();
        let method_name = &self.name;
        let args = self.params_as_args_list();

        quote! {
            async fn #function_name(#(#params),*) -> CallResult<(#function_return_type,)> {
                ic_cdk::api::call::call_with_payment128(
                    canister_id_principal,
                    #method_name,
                    (#args),
                    cycles
                ).await
            }
        }
    }

    fn params_as_args_list(&self) -> TokenStream {
        let param_names: Vec<TokenStream> = self
            .params
            .iter()
            .map(|param| {
                let param_ident = format_ident!("{}", param.name);
                quote! { #param_ident }
            })
            .collect();

        let comma = if param_names.len() == 1 {
            quote! { , }
        } else {
            quote! {}
        };
        return quote! { #(#param_names),*#comma };
    }
}

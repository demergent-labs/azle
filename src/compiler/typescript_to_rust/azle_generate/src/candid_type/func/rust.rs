use cdk_framework::traits::ToIdent;
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};

pub fn generate_into_vm_value_impl(function_name: String) -> TokenStream {
    let function_name = function_name.to_ident().to_token_stream();
    quote! {
        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for #function_name {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                self.0.try_into_vm_value(context)
            }
        }
    }
}

pub fn generate_list_into_vm_value_impl(function_name: String) -> TokenStream {
    let function_name = function_name.to_ident().to_token_stream();
    quote! {
        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for Vec<#function_name> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                try_into_vm_value_generic_array(self, context)
            }
        }
    }
}

pub fn generate_from_vm_value_impl(function_name: String) -> TokenStream {
    let function_name = function_name.to_ident().to_token_stream();
    quote! {
        impl CdkActTryFromVmValue<#function_name, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<#function_name, CdkActTryFromVmValueError> {
                let candid_func: ic_cdk::export::candid::Func = self.try_from_vm_value(context).unwrap();
                Ok(#function_name::new(candid_func.principal, candid_func.method))
            }
        }
    }
}

pub fn generate_list_from_vm_value_impl(function_name: String) -> TokenStream {
    let function_name = function_name.to_ident().to_token_stream();
    quote! {
        impl CdkActTryFromVmValue<Vec<#function_name>, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<#function_name>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }
    }
}

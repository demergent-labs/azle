use proc_macro2::TokenStream;
use quote::quote;

pub fn generate_into_vm_value_impl(type_alias_name: &TokenStream) -> TokenStream {
    quote! {
        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for #type_alias_name {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                self.0.try_into_vm_value(context)
            }
        }
    }
}

pub fn generate_list_into_vm_value_impl(type_alias_name: &TokenStream) -> TokenStream {
    quote! {
        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<#type_alias_name> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                try_into_vm_value_generic_array(self, context)
            }
        }
    }
}

pub fn generate_from_vm_value_impl(type_alias_name: &TokenStream) -> TokenStream {
    quote! {
        impl CdkActTryFromVmValue<#type_alias_name, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<#type_alias_name, CdkActTryFromVmValueError> {
                let candid_func: candid::Func = self.try_from_vm_value(context).unwrap();
                Ok(candid_func.into())
            }
        }
    }
}

pub fn generate_list_from_vm_value_impl(type_alias_name: &TokenStream) -> TokenStream {
    quote! {
        impl CdkActTryFromVmValue<Vec<#type_alias_name>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<#type_alias_name>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }
    }
}

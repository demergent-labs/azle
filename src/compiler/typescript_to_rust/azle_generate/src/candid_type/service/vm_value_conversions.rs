use cdk_framework::traits::ToIdent;
use proc_macro2::TokenStream;
use quote::quote;

pub fn to_vm_value(name: String) -> TokenStream {
    let service_name = name.to_ident();

    quote! {
        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for #service_name {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(context.eval(
                    format!(
                        "new {}(Principal.fromText(\"{}\"))",
                        stringify!(#service_name),
                        self.0.principal.to_string()
                    )
                ).or_trap(context))
            }
        }
    }
}

pub fn list_to_vm_value(name: String) -> TokenStream {
    let service_name = name.to_ident();

    quote! {
        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<#service_name> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                crate::vm_value_conversion::try_into_vm_value_generic_array(self, context)
            }
        }
    }
}

pub fn from_vm_value(name: String) -> TokenStream {
    let service_name = name.to_ident();

    quote! {
        impl CdkActTryFromVmValue<#service_name, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<#service_name, CdkActTryFromVmValueError> {
                let js_object = self.as_object().unwrap();
                let canister_id_js_value = js_object.get("canisterId", context).or_trap(context);
                let canister_id_js_object = canister_id_js_value.as_object().unwrap();
                let canister_id_to_string_js_value = canister_id_js_object.get("toText", context).or_trap(context);
                let canister_id_to_string_js_object = canister_id_to_string_js_value.as_object().unwrap();
                let canister_id_string_js_value = canister_id_to_string_js_object.call(
                    &canister_id_js_value,
                    &[],
                    context
                ).or_trap(context);
                let canister_id_js_string = canister_id_string_js_value.to_string(context).unwrap();
                let canister_id_string = canister_id_js_string.to_std_string_escaped();

                Ok(#service_name::new(ic_cdk::export::Principal::from_str(&canister_id_string).unwrap()))
            }
        }
    }
}

pub fn list_from_vm_value(name: String) -> TokenStream {
    let service_name = name.to_ident();

    quote! {
        impl CdkActTryFromVmValue<Vec<#service_name>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<#service_name>, CdkActTryFromVmValueError> {
                crate::vm_value_conversion::try_from_vm_value_generic_array(self, context)
            }
        }
    }
}

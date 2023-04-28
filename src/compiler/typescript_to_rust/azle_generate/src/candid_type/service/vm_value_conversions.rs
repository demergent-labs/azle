use cdk_framework::traits::ToIdent;
use proc_macro2::TokenStream;
use quote::quote;

pub fn to_vm_value(name: String) -> TokenStream {
    let service_name = name.to_ident();

    quote! {
        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for #service_name {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(unwrap_boa_result(context.eval_script(
                    boa_engine::Source::from_bytes(
                        &format!(
                            "new {}(Principal.fromText(\"{}\"))",
                            stringify!(#service_name),
                            self.0.principal.to_string()
                        )
                    )
                ), context))
            }
        }
    }
}

pub fn list_to_vm_value(name: String) -> TokenStream {
    let service_name = name.to_ident();

    quote! {
        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for Vec<#service_name> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                try_into_vm_value_generic_array(self, context)
            }
        }
    }
}

pub fn from_vm_value(name: String) -> TokenStream {
    let service_name = name.to_ident();

    quote! {
        impl CdkActTryFromVmValue<#service_name, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<#service_name, CdkActTryFromVmValueError> {
                let js_object = self.as_object().unwrap();
                let canister_id_js_value = unwrap_boa_result(js_object.get("canisterId", context), context);
                let canister_id_js_object = canister_id_js_value.as_object().unwrap();
                let canister_id_to_string_js_value = unwrap_boa_result(canister_id_js_object.get("toText", context), context);
                let canister_id_to_string_js_object = canister_id_to_string_js_value.as_object().unwrap();
                let canister_id_string_js_value = unwrap_boa_result(canister_id_to_string_js_object.call(
                    &canister_id_js_value,
                    &[],
                    context
                ), context);
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
        impl CdkActTryFromVmValue<Vec<#service_name>, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<#service_name>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }
    }
}

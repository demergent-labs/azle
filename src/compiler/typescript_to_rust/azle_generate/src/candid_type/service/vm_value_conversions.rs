use cdk_framework::traits::ToIdent;
use proc_macro2::TokenStream;
use quote::quote;

pub fn to_vm_value(name: String) -> TokenStream {
    let service_name = name.to_ident();

    quote! {
        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue>
            for #service_name
        {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(context
                    .eval(boa_engine::Source::from_bytes(&format!(
                        "new {}(Principal.fromText(\"{}\"))",
                        stringify!(#service_name),
                        self.0.principal.to_string()
                    )))?)
            }
        }
    }
}

pub fn list_to_vm_value(name: String) -> TokenStream {
    let service_name = name.to_ident();

    quote! {
        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue>
            for Vec<#service_name>
        {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                try_into_vm_value_generic_array(self, context)
            }
        }

    }
}

pub fn from_vm_value(name: String) -> TokenStream {
    let service_name = name.to_ident();
    let service_name_string = service_name.to_string();

    let value_is_not_of_service_type_error_message =
        format!("TypeError: Value is not of type '{}'", &service_name_string);

    quote! {
        impl CdkActTryFromVmValue<#service_name, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<#service_name, boa_engine::JsError> {
                let js_object = self.as_object().ok_or_else(|| {
                    let cause = "TypeError: Value is not an object".to_js_error(None);
                    #value_is_not_of_service_type_error_message.to_js_error(Some(cause))
                })?;

                let canister_id_js_value = js_object.get("canisterId", context)?;

                let principal =
                    canister_id_js_value
                        .try_from_vm_value(context)
                        .map_err(|principal_err| {
                            let cause =
                                "TypeError: Property 'canisterId' is not of type 'Principal'"
                                    .to_js_error(Some(principal_err));
                            #value_is_not_of_service_type_error_message.to_js_error(Some(cause))
                        })?;

                Ok(#service_name::new(principal))
            }
        }
    }
}

pub fn list_from_vm_value(name: String) -> TokenStream {
    let service_name = name.to_ident();

    quote! {
        impl
            CdkActTryFromVmValue<
                Vec<#service_name>,
                boa_engine::JsError,
                &mut boa_engine::Context<'_>,
            > for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<Vec<#service_name>, boa_engine::JsError> {
                try_from_vm_value_generic_array(self, context)
            }
        }
    }
}

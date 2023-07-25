use proc_macro2::{Ident, TokenStream};
use quote::quote;
use syn::Generics;

pub fn generate(name: &Ident, generics: &Generics) -> TokenStream {
    let (impl_generics, ty_generics, where_clause) = generics.split_for_impl();

    quote! {
        impl #impl_generics CdkActTryFromVmValue<
            Vec<#name #ty_generics>,
            boa_engine::JsError,
            &mut boa_engine::Context<'_>
        >
            for boa_engine::JsValue
            #where_clause
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context
            ) -> Result<Vec<#name #ty_generics>, boa_engine::JsError> {
                let error_message = "TypeError: Value is not of type 'Vec'";

                let js_object = self
                    .as_object()
                    .ok_or_else(|| error_message.to_js_error(None))?;

                if !js_object.is_array() {
                    return Err(error_message.to_js_error(None));
                }


                let mut index: usize = 0;
                let mut result = vec![];

                loop {
                    let js_value = js_object.get(index, context).map_err(|err| {
                        error_message.to_js_error(Some(err))
                    })?;

                    if js_value.is_undefined() {
                        break;
                    }

                    result.push(js_value
                        .try_from_vm_value(&mut *context)
                        .map_err(|variant_err| error_message.to_js_error(Some(variant_err)))?);
                    index += 1;
                }

                Ok(result)
            }
        }
    }
}

use proc_macro2::{Ident, TokenStream};
use quote::quote;
use syn::Generics;

pub fn generate(name: &Ident, generics: &Generics) -> TokenStream {
    let (impl_generics, ty_generics, where_clause) = generics.split_for_impl();

    quote! {
        impl #impl_generics CdkActTryFromVmValue<
            Vec<#name #ty_generics>,
            &mut boa_engine::Context<'_>
        >
            for boa_engine::JsValue
            #where_clause
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context
            ) -> Result<Vec<#name #ty_generics>, CdkActTryFromVmValueError> {
                let js_object = self
                    .as_object()
                    .ok_or_else(|| "TypeError: Value is not of type 'Vec'")?;

                if !js_object.is_array() {
                    return Err(CdkActTryFromVmValueError(
                        "TypeError: Value is not of type 'Vec'".to_string(),
                    ));
                }


                let mut index: usize = 0;
                let mut result = vec![];

                loop {
                    let js_value = js_object.get(index, context).map_err(|err| {
                        format!(
                            "[TypeError: Value is not of type 'Vec'] {{\n  [cause]: {}\n}}",
                            err.to_string()
                        )
                    })?;

                    if js_value.is_undefined() {
                        break;
                    }

                    result.push(js_value
                        .try_from_vm_value(&mut *context)
                        .map_err(|variant_err| {
                            format!(
                                "[TypeError: Value is not of type 'Vec'] {{\n  [cause]: {}\n}}",
                                variant_err.0
                            )
                        })?);
                    index += 1;
                }

                Ok(result)
            }
        }
    }
}

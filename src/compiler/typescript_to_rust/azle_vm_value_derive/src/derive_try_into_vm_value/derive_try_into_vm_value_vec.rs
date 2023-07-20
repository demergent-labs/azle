use proc_macro2::{Ident, TokenStream};
use quote::quote;
use syn::Generics;

pub fn generate(name: &Ident, generics: &Generics) -> TokenStream {
    let (impl_generics, ty_generics, where_clause) = generics.split_for_impl();

    quote! {
        impl #impl_generics CdkActTryIntoVmValue<
            &mut boa_engine::Context<'_>,
            boa_engine::JsValue
        >
            for Vec<#name #ty_generics>
            #where_clause
        {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                let js_values: Vec<_> = self
                    .into_iter()
                    .map(|item| item.try_into_vm_value(context))
                    .collect::<Result<_, _>>()?;

                Ok(boa_engine::object::builtins::JsArray::from_iter(js_values, context).into())
            }
        }
    }
}

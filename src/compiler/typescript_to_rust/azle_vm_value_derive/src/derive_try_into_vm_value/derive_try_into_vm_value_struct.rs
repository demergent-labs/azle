use proc_macro2::{Ident, Span, TokenStream};
use quote::{format_ident, quote};
use syn::{DataStruct, Error, Fields, Generics, Index};

use crate::{
    derive_try_into_vm_value::derive_try_into_vm_value_vec, traits::TryGetStructFieldIdent,
};

pub fn generate(
    struct_name: &Ident,
    data_struct: &DataStruct,
    generics: &Generics,
) -> Result<TokenStream, Error> {
    let variable_definitions = derive_struct_fields_variable_definitions(struct_name, data_struct)?;
    let property_definitions = derive_struct_fields_property_definitions(struct_name, data_struct)?;

    // Capture generic parameters and their bounds
    let (impl_generics, ty_generics, where_clause) = generics.split_for_impl();

    let try_into_vm_value_vec_impl = derive_try_into_vm_value_vec::generate(struct_name, generics);

    Ok(quote! {
        impl #impl_generics CdkActTryIntoVmValue<
            &mut boa_engine::Context<'_>,
            boa_engine::JsValue
        >
            for #struct_name #ty_generics
            #where_clause
        {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                #(#variable_definitions)*

                let object = boa_engine::object::ObjectInitializer::new(context)
                    #(#property_definitions)*
                    .build();

                Ok(object.into())
            }
        }

        #try_into_vm_value_vec_impl
    })
}

fn derive_struct_fields_variable_definitions(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Result<Vec<TokenStream>, Error> {
    match &data_struct.fields {
        Fields::Named(fields_named) => fields_named
            .named
            .iter()
            .enumerate()
            .map(|(index, field)| {
                let field_name = field.try_get_ident(struct_name, index)?;
                let variable_name = format_ident!("{}_js_value", field_name);

                Ok(quote! {
                    let #variable_name = self.#field_name.try_into_vm_value(context)?;
                })
            })
            .collect::<Result<Vec<_>, Error>>(),
        Fields::Unnamed(fields_unnamed) => Ok(fields_unnamed
            .unnamed
            .iter()
            .enumerate()
            .map(|(index, _)| {
                let variable_name = format_ident!("field_{}_js_value", index);
                let syn_index = Index::from(index);

                quote! {
                    let #variable_name = self.#syn_index.try_into_vm_value(context)?;
                }
            })
            .collect()),
        Fields::Unit => Err(Error::new(
            Span::call_site(),
            format!("CdkActTryIntoVmValue not supported for unit-like structs"),
        )),
    }
}

fn derive_struct_fields_property_definitions(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Result<Vec<TokenStream>, Error> {
    match &data_struct.fields {
        Fields::Named(fields_named) => fields_named
            .named
            .iter()
            .enumerate()
            .map(|(index, field)| {
                let field_name = field.try_get_ident(struct_name, index)?;
                let variable_name = format_ident!("{}_js_value", field_name);

                Ok(quote! {
                    .property(
                        stringify!(#field_name),
                        #variable_name,
                        boa_engine::property::Attribute::all()
                    )
                })
            })
            .collect::<Result<Vec<_>, Error>>(),
        Fields::Unnamed(fields_unnamed) => Ok(fields_unnamed
            .unnamed
            .iter()
            .enumerate()
            .map(|(index, _)| {
                let variable_name = format_ident!("field_{}_js_value", index);
                let syn_index = Index::from(index);

                quote! {
                    .property(
                        stringify!(#syn_index),
                        #variable_name,
                        boa_engine::property::Attribute::all()
                    )
                }
            })
            .collect()),
        Fields::Unit => Err(Error::new(
            Span::call_site(),
            format!("CdkActTryIntoVmValue not supported for unit-like structs"),
        )),
    }
}

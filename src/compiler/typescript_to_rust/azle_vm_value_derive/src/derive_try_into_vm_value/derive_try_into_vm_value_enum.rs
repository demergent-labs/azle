use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};
use syn::{DataEnum, Error, Field, Fields, Generics};

use crate::{derive_try_into_vm_value::derive_try_into_vm_value_vec, traits::TryGetEnumFieldIdent};

pub fn generate(
    enum_name: &Ident,
    data_enum: &DataEnum,
    generics: &Generics,
) -> Result<TokenStream, Error> {
    let variant_branches = derive_variant_branches(&enum_name, &data_enum)?;

    // Capture generic parameters and their bounds
    let (impl_generics, ty_generics, where_clause) = generics.split_for_impl();

    let try_into_vm_value_vec_impl = derive_try_into_vm_value_vec::generate(enum_name, generics);

    Ok(quote! {
        impl #impl_generics CdkActTryIntoVmValue<
            &mut boa_engine::Context<'_>,
            boa_engine::JsValue
        >
            for #enum_name #ty_generics
            #where_clause
        {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                match self {
                    #(#variant_branches)*,
                }
            }
        }

        #try_into_vm_value_vec_impl
    })
}

fn derive_variant_branches(
    enum_name: &Ident,
    data_enum: &DataEnum,
) -> Result<Vec<TokenStream>, Error> {
    data_enum
        .variants
        .iter()
        .map(|variant| {
            let variant_name = &variant.ident;

            match &variant.fields {
                Fields::Named(fields_named) => derive_variant_branches_named_fields(
                    enum_name,
                    variant_name,
                    fields_named.named.iter().collect(),
                ),
                Fields::Unnamed(fields_unnamed) => Ok(derive_variant_branches_unnamed_fields(
                    enum_name,
                    variant_name,
                    fields_unnamed.unnamed.iter().collect(),
                )),
                Fields::Unit => Ok(derive_variant_branches_unnamed_fields(
                    enum_name,
                    variant_name,
                    vec![],
                )),
            }
        })
        .collect::<Result<Vec<_>, _>>()
}

fn derive_variant_branches_named_fields(
    enum_name: &Ident,
    variant_name: &Ident,
    named_fields: Vec<&Field>,
) -> Result<TokenStream, Error> {
    let field_names = named_fields
        .iter()
        .enumerate()
        .map(|(field_index, named_field)| {
            let field_name = named_field.try_get_ident(enum_name, variant_name, field_index)?;

            Ok(quote! {
                #field_name
            })
        })
        .collect::<Result<Vec<_>, Error>>()?;

    let named_field_variable_declarations = named_fields
        .iter()
        .enumerate()
        .map(|(field_index, named_field)| {
            let field_name = named_field.try_get_ident(enum_name, variant_name, field_index)?;
            let variable_name = format_ident!("{}_js_value", field_name);

            Ok(quote! {
                let #variable_name = #field_name.try_into_vm_value(context)?;
            })
        })
        .collect::<Result<Vec<_>, Error>>()?;

    let named_field_property_definitions = named_fields
        .iter()
        .enumerate()
        .map(|(field_index, named_field)| {
            let field_name = named_field.try_get_ident(enum_name, variant_name, field_index)?;
            let variable_name = format_ident!("{}_js_value", field_name);

            Ok(quote! {
                .property(
                    stringify!(#field_name),
                    #variable_name,
                    boa_engine::property::Attribute::all()
                )
            })
        })
        .collect::<Result<Vec<_>, Error>>()?;

    let variant_object_variable_name = format_ident!("{}_js_object", variant_name);

    Ok(quote! {
        #enum_name::#variant_name { #(#field_names),* } => {
            #(#named_field_variable_declarations)*

            let #variant_object_variable_name = boa_engine::object::ObjectInitializer::new(context)
                #(#named_field_property_definitions)*
                .build();

            let object = boa_engine::object::ObjectInitializer::new(context)
                .property(
                    stringify!(#variant_name),
                    #variant_object_variable_name,
                    boa_engine::property::Attribute::all()
                )
                .build();

            Ok(object.into())
        }
    })
}

fn derive_variant_branches_unnamed_fields(
    enum_name: &Ident,
    variant_name: &Ident,
    unnamed_fields: Vec<&Field>,
) -> TokenStream {
    if unnamed_fields.len() == 0 {
        quote! {
            #enum_name::#variant_name => {
                let object = boa_engine::object::ObjectInitializer::new(context)
                    .property(
                        stringify!(#variant_name),
                        boa_engine::JsValue::Null,
                        boa_engine::property::Attribute::all()
                    )
                    .build();

                Ok(object.into())
            }
        }
    } else {
        quote! {
            #enum_name::#variant_name(value) => {
                let js_value = value.try_into_vm_value(context)?;

                let object = boa_engine::object::ObjectInitializer::new(context)
                    .property(
                        stringify!(#variant_name),
                        js_value,
                        boa_engine::property::Attribute::all()
                    )
                    .build();

                Ok(object.into())
            }
        }
    }
}

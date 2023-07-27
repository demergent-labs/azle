use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};
use syn::{DataEnum, Error, Field, Fields, Generics};

use crate::{derive_try_from_vm_value::derive_try_from_vm_value_vec, traits::MapTo};

pub fn generate(
    enum_name: &Ident,
    data_enum: &DataEnum,
    generics: &Generics,
) -> Result<TokenStream, Error> {
    let value_is_not_of_enum_type_error_message =
        derive_value_is_not_of_enum_type_error_message(enum_name);

    let variant_names = data_enum
        .variants
        .iter()
        .map(|variant| format!("'{}'", variant.ident))
        .collect::<Vec<_>>();

    let variant_names_vec_string = format!("[{}]", variant_names.join(", "));

    let missing_valid_variant_error_message = format!(
        "TypeError: Value must contain exactly one of the following properties: {}",
        variant_names_vec_string
    );

    let properties = derive_properties(enum_name, data_enum)?;

    let (impl_generics, ty_generics, where_clause) = generics.split_for_impl();

    let try_from_vm_value_vec_impl = derive_try_from_vm_value_vec::generate(enum_name, generics);

    Ok(quote! {
        impl #impl_generics CdkActTryFromVmValue<
            #enum_name #ty_generics,
            boa_engine::JsError,
            &mut boa_engine::Context<'_>
        >
            for boa_engine::JsValue
            #where_clause
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context
            ) -> Result<#enum_name #ty_generics, boa_engine::JsError> {
                let object = self
                    .as_object()
                    .ok_or_else(|| {
                        let cause = "TypeError: Value is not an object".to_js_error(None);

                        #value_is_not_of_enum_type_error_message.to_js_error(Some(cause))
                    })?;

                #(#properties)*

                let cause = #missing_valid_variant_error_message.to_js_error(None);

                return Err(#value_is_not_of_enum_type_error_message.to_js_error(Some(cause)));
            }
        }

        #try_from_vm_value_vec_impl
    })
}

fn derive_value_is_not_of_enum_type_error_message(enum_name: &Ident) -> String {
    format!(
        "TypeError: Value is not of type '{}'",
        enum_name.to_string()
    )
}

fn derive_properties(enum_name: &Ident, data_enum: &DataEnum) -> Result<Vec<TokenStream>, Error> {
    data_enum
        .variants
        .iter()
        .map(|variant| {
            let variant_name = &variant.ident;

            let object_variant_js_value_result_var_name =
                format_ident!("object_{}_js_value_result", variant_name);
            let object_variant_js_value_var_name =
                format_ident!("object_{}_js_value", variant_name);

            match &variant.fields {
                Fields::Named(fields_named) => derive_property_for_named_fields(
                    fields_named.named.iter().collect(),
                    enum_name,
                    variant_name,
                    &object_variant_js_value_result_var_name,
                    &object_variant_js_value_var_name,
                ),
                Fields::Unnamed(fields_unnamed) => Ok(derive_property_for_unnamed_fields(
                    fields_unnamed.unnamed.iter().collect(),
                    enum_name,
                    variant_name,
                    &object_variant_js_value_result_var_name,
                    &object_variant_js_value_var_name,
                )),
                Fields::Unit => Ok(derive_property_for_unnamed_fields(
                    vec![],
                    enum_name,
                    variant_name,
                    &object_variant_js_value_result_var_name,
                    &object_variant_js_value_var_name,
                )),
            }
        })
        .collect::<Result<_, _>>()
}

fn derive_property_for_named_fields(
    named_fields: Vec<&Field>,
    enum_name: &Ident,
    variant_name: &Ident,
    object_variant_js_value_result_var_name: &Ident,
    object_variant_js_value_var_name: &Ident,
) -> Result<TokenStream, Error> {
    let value_is_not_of_enum_type_error_message =
        derive_value_is_not_of_enum_type_error_message(enum_name);

    let named_field_js_value_result_variable_names =
        named_fields.map_to(enum_name, variant_name, |_, variable_name| {
            quote! { #variable_name }
        })?;

    let named_field_js_value_result_variable_declarations =
        named_fields.map_to(enum_name, variant_name, |field_name, variable_name| {
            quote! {
                let #variable_name = #object_variant_js_value_var_name
                    .as_object()
                    .ok_or_else(|| {
                        let cause = "TypeError: Value is not an object".to_js_error(None);

                        #value_is_not_of_enum_type_error_message.to_js_error(Some(cause))
                    })?
                    .get(stringify!(#field_name), context);
            }
        })?;

    let named_field_js_value_oks =
        named_fields.map_to(enum_name, variant_name, |_, variable_name| {
            quote! { Ok(#variable_name) }
        })?;

    let named_field_variable_declarations =
        named_fields.map_to(enum_name, variant_name, |field_name, variable_name| {
            let named_field_js_value_variable_name = format_ident!("{}_js_value", field_name);

            quote! {
                let #variable_name = #named_field_js_value_variable_name
                    .try_from_vm_value(&mut *context);
            }
        })?;

    let named_field_variable_oks =
        named_fields.map_to(enum_name, variant_name, |_, variable_name| {
            quote! { #variable_name }
        })?;

    let named_field_variable_names =
        named_fields.map_to(enum_name, variant_name, |field_name, _| {
            quote! { Ok(#field_name) }
        })?;

    let tuple_struct_field_definition =
        named_fields.map_to(enum_name, variant_name, |field_name, _| {
            quote! { #field_name: #field_name }
        })?;

    Ok(quote! {
        let #object_variant_js_value_result_var_name =
            object.get(stringify!(#variant_name), context);

        if let Ok(#object_variant_js_value_var_name) = #object_variant_js_value_result_var_name {
            if #object_variant_js_value_var_name.is_undefined() == false {
                #(#named_field_js_value_result_variable_declarations)*

                match (#(#named_field_js_value_result_variable_names),*) {
                    (#(#named_field_js_value_oks),*) => {
                        #(#named_field_variable_declarations)*

                        match (#(#named_field_variable_oks),*) {
                            (#(#named_field_variable_names),*) => {
                                return Ok(#enum_name::#variant_name {
                                    #(#tuple_struct_field_definition),*
                                });
                            },
                            _ => {
                                // TODO: Update this error message
                                return Err(
                                    #value_is_not_of_enum_type_error_message.to_js_error(None)
                                );
                            }
                        };
                    },
                    _ => {
                        // TODO: Update this error message
                        return Err(
                            #value_is_not_of_enum_type_error_message.to_js_error(None)
                        );
                    }
                };
            }
        }
    })
}

fn derive_property_for_unnamed_fields(
    unnamed_fields: Vec<&Field>,
    enum_name: &Ident,
    variant_name: &Ident,
    object_variant_js_value_result_var_name: &Ident,
    object_variant_js_value_var_name: &Ident,
) -> TokenStream {
    let value_is_not_of_enum_type_error_message =
        derive_value_is_not_of_enum_type_error_message(enum_name);

    let property_is_not_of_variant_type_error_message = format!(
        "TypeError: Property '{}' is not of the correct type",
        variant_name.to_string()
    );

    if unnamed_fields.len() == 0 {
        quote! {
            let #object_variant_js_value_result_var_name =
                object.get(stringify!(#variant_name), context);

            if let Ok(#object_variant_js_value_var_name) =
                #object_variant_js_value_result_var_name
            {
                if #object_variant_js_value_var_name.is_undefined() == false {
                    return Ok(#enum_name::#variant_name);
                }
            }
        }
    } else {
        quote! {
            let #object_variant_js_value_result_var_name =
                object.get(stringify!(#variant_name), context);

            if let Ok(#object_variant_js_value_var_name) =
                #object_variant_js_value_result_var_name
            {
                if #object_variant_js_value_var_name.is_undefined() == false {
                    return Ok(#enum_name::#variant_name(
                        #object_variant_js_value_var_name
                            .try_from_vm_value(&mut *context)
                            .map_err(|err| {
                                let cause = #property_is_not_of_variant_type_error_message.to_js_error(Some(err));

                                #value_is_not_of_enum_type_error_message.to_js_error(Some(cause))
                            })?
                    ));
                }
            }
        }
    }
}

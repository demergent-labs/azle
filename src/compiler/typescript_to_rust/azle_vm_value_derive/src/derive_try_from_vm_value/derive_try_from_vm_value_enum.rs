use proc_macro2::{Ident, Span, TokenStream};
use quote::{format_ident, quote};
use syn::{DataEnum, Error, Field, Fields, Generics};

trait TryGetEnumVariantFieldIdent {
    fn try_get_ident(
        &self,
        enum_name: &Ident,
        variant_name: &Ident,
        field_index: usize,
    ) -> Result<&Ident, Error>;
}

impl TryGetEnumVariantFieldIdent for Field {
    fn try_get_ident(
        &self,
        enum_name: &Ident,
        variant_name: &Ident,
        field_index: usize,
    ) -> Result<&Ident, Error> {
        self.ident.as_ref().ok_or_else(|| {
            Error::new(
                Span::call_site(),
                format!(
                    "Internal Error: expected field {field_index} in \
                        {enum_name}::{variant_name} to have a name but received None"
                ),
            )
        })
    }
}

pub fn derive_try_from_vm_value_enum(
    enum_name: &Ident,
    data_enum: &DataEnum,
    generics: &Generics,
) -> Result<TokenStream, Error> {
    let enum_name_string = enum_name.to_string();

    let value_is_not_an_object_error_message = format!(
        "[TypeError: Value is not of type '{}'] {{\n  \
            [cause]: TypeError: Value is not an object\n\
        }}",
        &enum_name_string
    );

    let variant_names = data_enum
        .variants
        .iter()
        .map(|variant| format!("'{}'", variant.ident))
        .collect::<Vec<_>>();

    let variant_names_vec_string = format!("[{}]", variant_names.join(", "));

    let missing_valid_variant_error_message = format!(
        "[TypeError: Value is not of type '{}'] {{\n  \
            [cause]: TypeError: Value must contain exactly one of the following properties: \
                {}\n\
        }}",
        &enum_name_string, variant_names_vec_string,
    );

    let properties = derive_properties(enum_name, data_enum)?;

    let (impl_generics, ty_generics, where_clause) = generics.split_for_impl();

    Ok(quote! {
        impl #impl_generics CdkActTryFromVmValue<
            #enum_name #ty_generics,
            &mut boa_engine::Context<'_>
        >
            for boa_engine::JsValue
            #where_clause
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context
            ) -> Result<#enum_name #ty_generics, CdkActTryFromVmValueError> {
                let object = self
                    .as_object()
                    .ok_or_else(|| #value_is_not_an_object_error_message.to_string())?;

                #(#properties)*

                return Err(CdkActTryFromVmValueError(
                    #missing_valid_variant_error_message.to_string()
                ));
            }
        }

        // TODO: The implementation for this is the same as for Records and
        // any other vec as seen in vm_value_conversion/try_from.../vec.rs
        // We should pull all this code together
        impl #impl_generics CdkActTryFromVmValue<
            Vec<#enum_name #ty_generics>,
            &mut boa_engine::Context<'_>
        >
            for boa_engine::JsValue
            #where_clause
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context
            ) -> Result<Vec<#enum_name #ty_generics>, CdkActTryFromVmValueError> {
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
                    let js_value = js_object
                        .get(index, context)
                        .map_err(|err| err.to_string())?;

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
    })
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

trait MapTo {
    fn map_to<T>(
        &self,
        enum_name: &Ident,
        variant_name: &Ident,
        callback: T,
    ) -> Result<Vec<TokenStream>, Error>
    where
        T: Fn(&Ident, Ident) -> TokenStream;
}

impl MapTo for Vec<&Field> {
    fn map_to<T>(
        &self,
        enum_name: &Ident,
        variant_name: &Ident,
        callback: T,
    ) -> Result<Vec<TokenStream>, Error>
    where
        T: Fn(&Ident, Ident) -> TokenStream,
    {
        let named_field_js_value_result_variable_names = self
            .iter()
            .enumerate()
            .map(|(field_index, named_field)| -> Result<TokenStream, Error> {
                let field_name = named_field.try_get_ident(enum_name, variant_name, field_index)?;
                let variable_name = format_ident!("{}_js_value_result", field_name);

                Ok(callback(&field_name, variable_name))
            })
            .collect::<Result<Vec<_>, _>>();

        named_field_js_value_result_variable_names
    }
}

fn derive_property_for_named_fields(
    named_fields: Vec<&Field>,
    enum_name: &Ident,
    variant_name: &Ident,
    object_variant_js_value_result_var_name: &Ident,
    object_variant_js_value_var_name: &Ident,
) -> Result<TokenStream, Error> {
    let enum_name_string = enum_name.to_string();

    let value_is_not_of_variant_type_error_message =
        format!("TypeError: Value is not of type '{}'", &enum_name_string);

    let named_field_js_value_result_variable_names =
        named_fields.map_to(enum_name, variant_name, |_, variable_name| {
            quote! { #variable_name }
        })?;

    let named_field_js_value_result_variable_declarations =
        named_fields.map_to(enum_name, variant_name, |field_name, variable_name| {
            quote! {
                let #variable_name = #object_variant_js_value_var_name
                    .as_object()
                    .ok_or_else(|| "TypeError: Value is not an object")?
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
                                return Err(CdkActTryFromVmValueError(
                                    #value_is_not_of_variant_type_error_message.to_string()
                                ));
                            }
                        };
                    },
                    _ => {
                        // TODO: Update this error message
                        return Err(CdkActTryFromVmValueError(
                            value_is_not_of_variant_type_error_message.to_string()
                        ));
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
    let enum_name_string = enum_name.to_string();
    let variant_name_string = variant_name.to_string();

    let todo_rename_this_error_message = format!(
        "[TypeError: Value is not of type '{}'] {{{{\n  \
            [cause]: TypeError: Property '{{}}' is not of the correct type {{{{\n    \
                [cause]: {{}}\n  \
            }}}}\n\
        }}}}",
        &enum_name_string
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
                            .map_err(|err| format!(
                                #todo_rename_this_error_message,
                                #variant_name_string,
                                err.0
                            ))?
                    ));
                }
            }
        }
    }
}

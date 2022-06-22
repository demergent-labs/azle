use proc_macro2::Ident;
use quote::{
    format_ident,
    quote
};
use syn::{
    DataEnum,
    Field,
    Fields
};

pub fn derive_azle_try_from_js_value_enum(
    enum_name: &Ident,
    data_enum: &DataEnum
) -> proc_macro2::TokenStream {
    let properties = derive_properties(
        enum_name,
        data_enum
    );

    quote! {
        impl AzleTryFromJsValue<#enum_name> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<#enum_name, AzleTryFromJsValueError> {
                let object_option = self.as_object();

                if let Some(object) = object_option {
                    #(#properties)*

                    return Err(AzleTryFromJsValueError("Enum variant does not exist".to_string()));
                }
                else {
                    return Err(AzleTryFromJsValueError("JsValue is not an object".to_string()));
                }
            }
        }

        // TODO the body of this function is repeated in azle_try_from_js_value_trait.ts
        impl AzleTryFromJsValue<Vec<#enum_name>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<#enum_name>, AzleTryFromJsValueError> {
                match self.as_object() {
                    Some(js_object) => {
                        if js_object.is_array() {
                            let mut processing: bool = true;
                            let mut index: usize = 0;

                            let mut result = vec![];

                            while processing == true {
                                match js_object.get(index, context) {
                                    Ok(js_value) => {
                                        if js_value.is_undefined() {
                                            processing = false;
                                        }
                                        else {
                                            match js_value.azle_try_from_js_value(context) {
                                                Ok(value) => {
                                                    result.push(value);
                                                    index += 1;
                                                }
                                                Err(err) => {
                                                    return Err(err);
                                                }
                                            }
                                        }
                                    },
                                    Err(_) => {
                                        return Err(AzleTryFromJsValueError("Item at array index does not exist".to_string()))
                                    }
                                }
                            }

                            Ok(result)
                        }
                        else {
                            Err(AzleTryFromJsValueError("JsObject is not an array".to_string()))
                        }
                    },
                    None => Err(AzleTryFromJsValueError("JsValue is not an object".to_string()))
                }
            }
        }
    }
}

fn derive_properties(
    enum_name: &Ident,
    data_enum: &DataEnum
) -> Vec<proc_macro2::TokenStream> {
    data_enum.variants.iter().map(|variant| {
        let variant_name = &variant.ident;

        let object_variant_js_value_result_var_name = format_ident!("object_{}_js_value_result", variant_name);
        let object_variant_js_value_var_name = format_ident!("object_{}_js_value", variant_name);

        match &variant.fields {
            Fields::Named(fields_named) => {
                derive_property_for_named_fields(
                    fields_named.named.iter().collect(),
                    enum_name,
                    variant_name,
                    &object_variant_js_value_result_var_name,
                    &object_variant_js_value_var_name
                )
            },
            Fields::Unnamed(fields_unnamed) => {
                derive_property_for_unnamed_fields(
                    fields_unnamed.unnamed.iter().collect(),
                    enum_name,
                    variant_name,
                    &object_variant_js_value_result_var_name,
                    &object_variant_js_value_var_name
                )
            },
            Fields::Unit => {
                derive_property_for_unnamed_fields(
                    vec![],
                    enum_name,
                    variant_name,
                    &object_variant_js_value_result_var_name,
                    &object_variant_js_value_var_name
                )
            }
        }
    }).collect()
}

fn derive_property_for_named_fields(
    named_fields: Vec<&Field>,
    enum_name: &Ident,
    variant_name: &Ident,
    object_variant_js_value_result_var_name: &Ident,
    object_variant_js_value_var_name: &Ident
) -> proc_macro2::TokenStream {
    let named_field_js_value_result_variable_names = named_fields.iter().map(|named_field| {
        let field_name = &named_field.ident.as_ref().unwrap();
        let variable_name = format_ident!("{}_js_value_result", field_name);

        quote! {
            #variable_name
        }
    });

    let named_field_js_value_result_variable_declarations = named_fields.iter().map(|named_field| {
        let field_name = &named_field.ident.as_ref().unwrap();
        let variable_name = format_ident!("{}_js_value_result", field_name);

        quote! {
            let #variable_name = #object_variant_js_value_var_name.as_object().unwrap().get(stringify!(#field_name), context);
        }
    });

    let named_field_js_value_oks = named_fields.iter().map(|named_field| {
        let field_name = &named_field.ident.as_ref().unwrap();
        let variable_name = format_ident!("{}_js_value", field_name);

        quote! {
            Ok(#variable_name)
        }
    });

    let named_field_variable_declarations = named_fields.iter().map(|named_field| {
        let field_name = &named_field.ident.as_ref().unwrap();
        let variable_name = format_ident!("{}_result", field_name);

        let named_field_js_value_variable_name = format_ident!("{}_js_value", field_name);

        quote! {
            let #variable_name = #named_field_js_value_variable_name.azle_try_from_js_value(context);
        }
    });

    let named_field_variable_oks = named_fields.iter().map(|named_field| {
        let field_name = &named_field.ident.as_ref().unwrap();
        let variable_name = format_ident!("{}_result", field_name);

        quote! {
            #variable_name
        }
    });

    let named_field_variable_names = named_fields.iter().map(|named_field| {
        let field_name = &named_field.ident.as_ref().unwrap();

        quote! {
            Ok(#field_name)
        }
    });

    let tuple_struct_field_definition = named_fields.iter().map(|named_field| {
        let field_name = &named_field.ident.as_ref().unwrap();

        quote! {
            #field_name: #field_name
        }
    });

    quote! {
        let #object_variant_js_value_result_var_name = object.get(stringify!(#variant_name), context);

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
                                return Err(AzleTryFromJsValueError("Could not convert JsValue to Rust type".to_string()));
                            }
                        };
                    },
                    _ => {
                        return Err(AzleTryFromJsValueError("Could not convert JsValue to Rust type".to_string()));
                    }
                };
            }
        }
    }
}

fn derive_property_for_unnamed_fields(
    unnamed_fields: Vec<&Field>,
    enum_name: &Ident,
    variant_name: &Ident,
    object_variant_js_value_result_var_name: &Ident,
    object_variant_js_value_var_name: &Ident
) -> proc_macro2::TokenStream {
    if unnamed_fields.len() == 0 {
        quote! {
            let #object_variant_js_value_result_var_name = object.get(stringify!(#variant_name), context);

            if let Ok(#object_variant_js_value_var_name) = #object_variant_js_value_result_var_name {
                if #object_variant_js_value_var_name.is_undefined() == false {
                    return Ok(#enum_name::#variant_name);
                }
            }
        }
    }
    else {
        let object_variant_result_var_name = format_ident!("object_{}_result", variant_name);
        let object_variant_var_name = format_ident!("object_{}", variant_name);

        quote! {
            let #object_variant_js_value_result_var_name = object.get(stringify!(#variant_name), context);

            if let Ok(#object_variant_js_value_var_name) = #object_variant_js_value_result_var_name {
                if #object_variant_js_value_var_name.is_undefined() == false {
                    let #object_variant_result_var_name = #object_variant_js_value_var_name.azle_try_from_js_value(context);

                    match #object_variant_result_var_name {
                        Ok(#object_variant_var_name) => {
                            return Ok(#enum_name::#variant_name(#object_variant_var_name));
                        },
                        Err(err) => {
                            return Err(err);
                        }
                    };
                }
            }
        }
    }
}
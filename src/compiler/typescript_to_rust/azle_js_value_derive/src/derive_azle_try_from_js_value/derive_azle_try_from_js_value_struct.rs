use proc_macro2::Ident;
use quote::{
    format_ident,
    quote
};
use syn::{
    DataStruct,
    Fields,
    Index
};

pub fn derive_azle_try_from_js_value_struct(
    struct_name: &Ident,
    data_struct: &DataStruct
) -> proc_macro2::TokenStream {
    let field_js_value_result_variable_definitions = derive_field_js_value_result_variable_definitions(data_struct);
    let field_js_value_result_names = derive_field_js_value_result_names(data_struct);
    let field_js_value_oks = derive_field_js_value_oks(data_struct);

    let field_result_variable_definitions = derive_field_result_variable_definitions(data_struct);
    let field_result_names = derive_field_result_names(data_struct);
    let field_oks = derive_field_oks(data_struct);

    let field_initializers = derive_field_initializers(data_struct);
    let struct_instantiation = derive_struct_instantiation(
        struct_name,
        data_struct,
        &field_initializers
    );

    quote! {
        impl AzleTryFromJsValue<#struct_name> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<#struct_name, TryFromJsValueError> {
                let object_option = self.as_object();

                if let Some(object) = object_option {
                    #(#field_js_value_result_variable_definitions)*

                    match (#(#field_js_value_result_names),*) {
                        (#(#field_js_value_oks),*) => {
                            #(#field_result_variable_definitions)*

                            match (#(#field_result_names),*) {
                                (#(#field_oks),*) => {
                                    return Ok(#struct_instantiation);
                                },
                                _ => {
                                    return Err(TryFromJsValueError("Could not convert JsValue to Rust type".to_string()));
                                }
                            };
                        },
                        _ => {
                            return Err(TryFromJsValueError("Struct field does not exist".to_string()));
                        }
                    };
                }
                else {
                    return Err(TryFromJsValueError("JsValue is not an object".to_string()));
                }
            }
        }
    }
}

fn derive_field_js_value_result_variable_definitions(data_struct: &DataStruct) -> Vec<proc_macro2::TokenStream> {
    match &data_struct.fields {
        Fields::Named(fields_named) => {
            fields_named.named.iter().map(|field| {
                let field_name = field.ident.as_ref().unwrap();

                let field_js_value_result_name = format_ident!("object_{}_js_value_result", field_name);

                quote! {
                    let #field_js_value_result_name = object.get(stringify!(#field_name), context);
                }
            }).collect()
        },
        Fields::Unnamed(field_unnamed) => {
            field_unnamed.unnamed.iter().enumerate().map(|(index, _)| {
                let field_name = format_ident!("field_{}", index);

                let field_js_value_result_name = format_ident!("object_{}_js_value_result", field_name);

                let syn_index = Index::from(index);

                quote! {
                    let #field_js_value_result_name = object.get(stringify!(#syn_index), context);
                }
            }).collect()
        },
        _ => panic!("Only named and unnamed fields supported for Structs")
    }
}

fn derive_field_js_value_result_names(data_struct: &DataStruct) -> Vec<proc_macro2::TokenStream> {
    match &data_struct.fields {
        Fields::Named(fields_named) => {
            fields_named.named.iter().map(|field| {
                let field_name = field.ident.as_ref().unwrap();

                let field_js_value_result_name = format_ident!("object_{}_js_value_result", field_name);

                quote! {
                    #field_js_value_result_name
                }
            }).collect()
        },
        Fields::Unnamed(fields_unnamed) => {
            fields_unnamed.unnamed.iter().enumerate().map(|(index, _)| {
                let field_name = format_ident!("field_{}", index);

                let field_js_value_result_name = format_ident!("object_{}_js_value_result", field_name);

                quote! {
                    #field_js_value_result_name
                }
            }).collect()
        },
        _ => panic!("Only named and unnamed fields supported for Structs")
    }
}

fn derive_field_js_value_oks(data_struct: &DataStruct) -> Vec<proc_macro2::TokenStream> {
    match &data_struct.fields {
        Fields::Named(fields_named) => {
            fields_named.named.iter().map(|field| {
                let field_name = field.ident.as_ref().unwrap();

                let field_js_value_name = format_ident!("object_{}_js_value", field_name);

                quote! {
                    Ok(#field_js_value_name)
                }
            }).collect()
        },
        Fields::Unnamed(fields_unnamed) => {
            fields_unnamed.unnamed.iter().enumerate().map(|(index, _)| {
                let field_name = format_ident!("field_{}", index);

                let field_js_value_name = format_ident!("object_{}_js_value", field_name);

                quote! {
                    Ok(#field_js_value_name)
                }
            }).collect()
        },
        _ => panic!("Only named and unnamed fields supported for Structs")
    }
}

fn derive_field_result_variable_definitions(data_struct: &DataStruct) -> Vec<proc_macro2::TokenStream> {
    match &data_struct.fields {
        Fields::Named(fields_named) => {
            fields_named.named.iter().map(|field| {
                let field_name = field.ident.as_ref().unwrap();

                let field_js_value_name = format_ident!("object_{}_js_value", field_name);
                let field_result_name = format_ident!("object_{}_result", field_name);

                quote! {
                    let #field_result_name = #field_js_value_name.azle_try_from_js_value(context);
                }
            }).collect()
        },
        Fields::Unnamed(fields_unnamed) => {
            fields_unnamed.unnamed.iter().enumerate().map(|(index, _)| {
                let field_name = format_ident!("field_{}", index);

                let field_js_value_name = format_ident!("object_{}_js_value", field_name);
                let field_result_name = format_ident!("object_{}_result", field_name);

                quote! {
                    let #field_result_name = #field_js_value_name.azle_try_from_js_value(context);
                }
            }).collect()
        },
        _ => panic!("Only named and unnamed fields supported for Structs")
    }
}

fn derive_field_result_names(data_struct: &DataStruct) -> Vec<proc_macro2::TokenStream> {
    match &data_struct.fields {
        Fields::Named(fields_named) => {
            fields_named.named.iter().map(|field| {
                let field_name = field.ident.as_ref().unwrap();

                let field_result_name = format_ident!("object_{}_result", field_name);

                quote! {
                    #field_result_name
                }
            }).collect()
        },
        Fields::Unnamed(fields_unnamed) => {
            fields_unnamed.unnamed.iter().enumerate().map(|(index, _)| {
                let field_name = format_ident!("field_{}", index);

                let field_result_name = format_ident!("object_{}_result", field_name);

                quote! {
                    #field_result_name
                }
            }).collect()
        },
        _ => panic!("Only named and unnamed fields supported for Structs")
    }
}

fn derive_field_oks(data_struct: &DataStruct) -> Vec<proc_macro2::TokenStream> {
    match &data_struct.fields {
        Fields::Named(fields_named) => {
            fields_named.named.iter().map(|field| {
                let field_name = field.ident.as_ref().unwrap();

                let field_var_name = format_ident!("object_{}", field_name);

                quote! {
                    Ok(#field_var_name)
                }
            }).collect()
        },
        Fields::Unnamed(fields_unnamed) => {
            fields_unnamed.unnamed.iter().enumerate().map(|(index, _)| {
                let field_name = format_ident!("field_{}", index);

                let field_var_name = format_ident!("object_{}", field_name);

                quote! {
                    Ok(#field_var_name)
                }
            }).collect()
        },
        _ => panic!("Only named and unnamed fields supported for Structs")
    }
}

fn derive_field_initializers(data_struct: &DataStruct) -> Vec<proc_macro2::TokenStream> {
    match &data_struct.fields {
        Fields::Named(fields_named) => {
            fields_named.named.iter().map(|field| {
                let field_name = field.ident.as_ref().unwrap();

                let field_var_name = format_ident!("object_{}", field_name);

                quote! {
                    #field_name: #field_var_name
                }
            }).collect()
        },
        Fields::Unnamed(fields_unnamed) => {
            fields_unnamed.unnamed.iter().enumerate().map(|(index, _)| {
                let field_name = format_ident!("field_{}", index);

                let field_var_name = format_ident!("object_{}", field_name);

                quote! {
                    #field_var_name
                }
            }).collect()
        },
        _ => panic!("Only named and unnamed fields supported for Structs")
    }
}

fn derive_struct_instantiation(
    struct_name: &Ident,
    data_struct: &DataStruct,
    field_initializers: &Vec<proc_macro2::TokenStream>
) -> proc_macro2::TokenStream {
    match &data_struct.fields {
        Fields::Named(_) => {
            quote! {
                #struct_name {
                    #(#field_initializers),*
                }
            }
        },
        Fields::Unnamed(_) => {
            quote! {
                #struct_name (
                    #(#field_initializers),*
                )
            }
        },
        _ => panic!("Only named and unnamed fields supported for Structs")
    }
}
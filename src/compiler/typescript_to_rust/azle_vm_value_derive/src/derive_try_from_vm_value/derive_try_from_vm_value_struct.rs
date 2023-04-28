use proc_macro2::Ident;
use quote::{format_ident, quote};
use syn::{DataStruct, Fields, Generics, Index};

pub fn derive_try_from_vm_value_struct(
    struct_name: &Ident,
    data_struct: &DataStruct,
    generics: &Generics,
) -> proc_macro2::TokenStream {
    let field_js_value_result_variable_definitions =
        derive_field_js_value_result_variable_definitions(struct_name, data_struct);
    let field_js_value_result_names = derive_field_js_value_result_names(struct_name, data_struct);
    let field_js_value_oks = derive_field_js_value_oks(struct_name, data_struct);

    let field_result_variable_definitions =
        derive_field_result_variable_definitions(struct_name, data_struct);
    let field_result_names = derive_field_result_names(struct_name, data_struct);
    let field_oks = derive_field_oks(struct_name, data_struct);

    let field_initializers = derive_field_initializers(struct_name, data_struct);
    let struct_instantiation =
        derive_struct_instantiation(struct_name, data_struct, &field_initializers);

    let (impl_generics, ty_generics, where_clause) = generics.split_for_impl();

    quote! {
        impl #impl_generics CdkActTryFromVmValue<#struct_name #ty_generics, &mut boa_engine::Context<'_>> for boa_engine::JsValue #where_clause {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<#struct_name #ty_generics, CdkActTryFromVmValueError> {
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
                                    return Err(CdkActTryFromVmValueError("Could not convert JsValue to Rust type".to_string()));
                                }
                            };
                        },
                        _ => {
                            return Err(CdkActTryFromVmValueError("Struct field does not exist".to_string()));
                        }
                    };
                }
                else {
                    return Err(CdkActTryFromVmValueError("JsValue is not an object".to_string()));
                }
            }
        }

        // TODO the body of this function is repeated in try_from_vm_value_trait.ts
        impl #impl_generics CdkActTryFromVmValue<Vec<#struct_name #ty_generics>, &mut boa_engine::Context<'_>> for boa_engine::JsValue #where_clause {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<#struct_name #ty_generics>, CdkActTryFromVmValueError> {
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
                                            match js_value.try_from_vm_value(&mut *context) {
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
                                        return Err(CdkActTryFromVmValueError("Item at array index does not exist".to_string()))
                                    }
                                }
                            }

                            Ok(result)
                        }
                        else {
                            Err(CdkActTryFromVmValueError("JsObject is not an array".to_string()))
                        }
                    },
                    None => Err(CdkActTryFromVmValueError("JsValue is not an object".to_string()))
                }
            }
        }
    }
}

fn uniformly_map_fields<F>(
    struct_name: &Ident,
    data_struct: &DataStruct,
    closure: F,
) -> Vec<proc_macro2::TokenStream>
where
    F: Fn(&Ident) -> proc_macro2::TokenStream,
{
    map_fields(
        struct_name,
        data_struct,
        |field_name| closure(field_name),
        |field_name, _| closure(field_name),
    )
}

fn map_fields<F, G>(
    struct_name: &Ident,
    data_struct: &DataStruct,
    named_field_closure: F,
    unnamed_field_closure: G,
) -> Vec<proc_macro2::TokenStream>
where
    F: Fn(&Ident) -> proc_macro2::TokenStream,
    G: Fn(&Ident, usize) -> proc_macro2::TokenStream,
{
    let field_must_be_named = format!("Named fields of struct {} must be named", struct_name);
    match &data_struct.fields {
        Fields::Named(fields_named) => fields_named
            .named
            .iter()
            .map(|field| {
                let field_name = field.ident.as_ref().expect(&field_must_be_named);

                named_field_closure(field_name)
            })
            .collect(),
        Fields::Unnamed(field_unnamed) => field_unnamed
            .unnamed
            .iter()
            .enumerate()
            .map(|(index, _)| {
                let field_name = format_ident!("field_{}", index);

                unnamed_field_closure(&field_name, index)
            })
            .collect(),
        _ => panic!("Only named and unnamed fields supported for Structs"),
    }
}

fn derive_field_js_value_result_variable_definitions(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Vec<proc_macro2::TokenStream> {
    map_fields(
        struct_name,
        data_struct,
        |field_name| {
            let field_js_value_result_name = format_ident!("object_{}_js_value_result", field_name);

            quote! {
                let #field_js_value_result_name = object.get(stringify!(#field_name), context);
            }
        },
        |field_name, index| {
            let field_js_value_result_name = format_ident!("object_{}_js_value_result", field_name);

            let syn_index = Index::from(index);

            quote! {
                let #field_js_value_result_name = object.get(stringify!(#syn_index), context);
            }
        },
    )
}

fn derive_field_js_value_result_names(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Vec<proc_macro2::TokenStream> {
    uniformly_map_fields(struct_name, data_struct, |field_name| {
        let field_js_value_result_name = format_ident!("object_{}_js_value_result", field_name);

        quote! { #field_js_value_result_name }
    })
}

fn derive_field_js_value_oks(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Vec<proc_macro2::TokenStream> {
    uniformly_map_fields(struct_name, data_struct, |field_name| {
        let field_js_value_name = format_ident!("object_{}_js_value", field_name);

        quote! { Ok(#field_js_value_name) }
    })
}

fn derive_field_result_variable_definitions(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Vec<proc_macro2::TokenStream> {
    uniformly_map_fields(struct_name, data_struct, |field_name| {
        let field_js_value_name = format_ident!("object_{}_js_value", field_name);
        let field_result_name = format_ident!("object_{}_result", field_name);

        quote! { let #field_result_name = #field_js_value_name.try_from_vm_value(&mut *context); }
    })
}

fn derive_field_result_names(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Vec<proc_macro2::TokenStream> {
    uniformly_map_fields(struct_name, data_struct, |field_name| {
        let field_result_name = format_ident!("object_{}_result", field_name);

        quote! { #field_result_name }
    })
}

fn derive_field_oks(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Vec<proc_macro2::TokenStream> {
    uniformly_map_fields(struct_name, data_struct, |field_name| {
        let field_var_name = format_ident!("object_{}", field_name);

        quote! { Ok(#field_var_name) }
    })
}

fn derive_field_initializers(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Vec<proc_macro2::TokenStream> {
    map_fields(
        struct_name,
        data_struct,
        |field_name| {
            let field_var_name = format_ident!("object_{}", field_name);

            quote! { #field_name: #field_var_name }
        },
        |field_name, _| {
            let field_var_name = format_ident!("object_{}", field_name);

            quote! { #field_var_name }
        },
    )
}

fn derive_struct_instantiation(
    struct_name: &Ident,
    data_struct: &DataStruct,
    field_initializers: &Vec<proc_macro2::TokenStream>,
) -> proc_macro2::TokenStream {
    match &data_struct.fields {
        Fields::Named(_) => {
            quote! {
                #struct_name {
                    #(#field_initializers),*
                }
            }
        }
        Fields::Unnamed(_) => {
            quote! {
                #struct_name (
                    #(#field_initializers),*
                )
            }
        }
        _ => panic!("Only named and unnamed fields supported for Structs"),
    }
}

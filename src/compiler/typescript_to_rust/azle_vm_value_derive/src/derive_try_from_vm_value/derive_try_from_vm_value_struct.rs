use proc_macro2::{Ident, Span, TokenStream};
use quote::{format_ident, quote};
use syn::{DataStruct, Error, Fields, Generics, Index};

use crate::{
    derive_try_from_vm_value::derive_try_from_vm_value_vec, traits::TryGetStructFieldIdent,
};

pub fn generate(
    struct_name: &Ident,
    data_struct: &DataStruct,
    generics: &Generics,
) -> Result<TokenStream, Error> {
    let value_is_not_of_struct_type_error_message = derive_error_message(struct_name);

    let properties = derive_properties(struct_name, data_struct)?;

    let (impl_generics, ty_generics, where_clause) = generics.split_for_impl();

    let try_from_vm_value_vec_impl = derive_try_from_vm_value_vec::generate(struct_name, generics);

    Ok(quote! {
        impl #impl_generics CdkActTryFromVmValue<
            #struct_name #ty_generics,
            boa_engine::JsError,
            &mut boa_engine::Context<'_>
        >
            for boa_engine::JsValue
            #where_clause
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context
            ) -> Result<#struct_name #ty_generics, boa_engine::JsError> {
                let object = self
                    .as_object()
                    .ok_or_else(|| {
                        let cause = "TypeError: Value is not an object".to_js_error(None);

                        #value_is_not_of_struct_type_error_message.to_js_error(Some(cause))
                    })?;

                #properties
            }
        }

        #try_from_vm_value_vec_impl
    })
}

fn derive_error_message(struct_name: &Ident) -> String {
    let struct_name_string = struct_name.to_string();

    format!("TypeError: Value is not of type '{}'", &struct_name_string)
}

fn derive_properties(struct_name: &Ident, data_struct: &DataStruct) -> Result<TokenStream, Error> {
    let value_is_not_of_struct_type_error_message = derive_error_message(struct_name);

    let field_js_value_result_variable_definitions =
        derive_field_js_value_result_variable_definitions(struct_name, data_struct)?;
    let field_js_value_result_names = derive_field_js_value_result_names(struct_name, data_struct)?;
    let field_js_value_oks = derive_field_js_value_oks(struct_name, data_struct)?;

    let field_result_variable_definitions =
        derive_field_result_variable_definitions(struct_name, data_struct)?;
    let field_result_names = derive_field_result_names(struct_name, data_struct)?;
    let field_oks = derive_field_oks(struct_name, data_struct)?;

    let field_initializers = derive_field_initializers(struct_name, data_struct)?;
    let struct_instantiation =
        derive_struct_instantiation(struct_name, data_struct, &field_initializers)?;

    Ok(quote! {
        #(#field_js_value_result_variable_definitions)*

        match (#(#field_js_value_result_names),*) {
            (#(#field_js_value_oks),*) => {
                #(#field_result_variable_definitions)*

                match (#(#field_result_names),*) {
                    (#(#field_oks),*) => {
                        return Ok(#struct_instantiation);
                    },
                    _ => {
                        let cause = "TypeError: One or more properties are of an incorrect type".to_js_error(None);

                        return Err(#value_is_not_of_struct_type_error_message.to_js_error(Some(cause)));
                    }
                };
            },
            _ => {
                return Err(
                    #value_is_not_of_struct_type_error_message.to_js_error(None)
                );
            }
        };
    })
}

fn uniformly_map_fields<F>(
    struct_name: &Ident,
    data_struct: &DataStruct,
    closure: F,
) -> Result<Vec<TokenStream>, Error>
where
    F: Fn(&Ident) -> TokenStream,
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
) -> Result<Vec<TokenStream>, Error>
where
    F: Fn(&Ident) -> TokenStream,
    G: Fn(&Ident, usize) -> TokenStream,
{
    match &data_struct.fields {
        Fields::Named(fields_named) => fields_named
            .named
            .iter()
            .enumerate()
            .map(|(index, field)| {
                let field_name = field.try_get_ident(struct_name, index)?;

                Ok(named_field_closure(field_name))
            })
            .collect::<Result<Vec<_>, _>>(),
        Fields::Unnamed(field_unnamed) => field_unnamed
            .unnamed
            .iter()
            .enumerate()
            .map(|(index, _)| {
                let field_name = format_ident!("field_{}", index);

                Ok(unnamed_field_closure(&field_name, index))
            })
            .collect::<Result<Vec<_>, _>>(),
        Fields::Unit => Err(Error::new(
            Span::call_site(),
            format!("CdkActTryFromVmValue not supported for unit-like structs"),
        )),
    }
}

fn derive_field_js_value_result_variable_definitions(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Result<Vec<TokenStream>, Error> {
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
) -> Result<Vec<TokenStream>, Error> {
    uniformly_map_fields(struct_name, data_struct, |field_name| {
        let field_js_value_result_name = format_ident!("object_{}_js_value_result", field_name);

        quote! { #field_js_value_result_name }
    })
}

fn derive_field_js_value_oks(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Result<Vec<TokenStream>, Error> {
    uniformly_map_fields(struct_name, data_struct, |field_name| {
        let field_js_value_name = format_ident!("object_{}_js_value", field_name);

        quote! { Ok(#field_js_value_name) }
    })
}

fn derive_field_result_variable_definitions(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Result<Vec<TokenStream>, Error> {
    uniformly_map_fields(struct_name, data_struct, |field_name| {
        let field_js_value_name = format_ident!("object_{}_js_value", field_name);
        let field_result_name = format_ident!("object_{}_result", field_name);

        quote! { let #field_result_name = #field_js_value_name.try_from_vm_value(&mut *context); }
    })
}

fn derive_field_result_names(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Result<Vec<TokenStream>, Error> {
    uniformly_map_fields(struct_name, data_struct, |field_name| {
        let field_result_name = format_ident!("object_{}_result", field_name);

        quote! { #field_result_name }
    })
}

fn derive_field_oks(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Result<Vec<TokenStream>, Error> {
    uniformly_map_fields(struct_name, data_struct, |field_name| {
        let field_var_name = format_ident!("object_{}", field_name);

        quote! { Ok(#field_var_name) }
    })
}

fn derive_field_initializers(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> Result<Vec<TokenStream>, Error> {
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
    field_initializers: &Vec<TokenStream>,
) -> Result<TokenStream, Error> {
    match &data_struct.fields {
        Fields::Named(_) => Ok(quote! {
            #struct_name {
                #(#field_initializers),*
            }
        }),
        Fields::Unnamed(_) => Ok(quote! {
            #struct_name (
                #(#field_initializers),*
            )
        }),
        Fields::Unit => Err(Error::new(
            Span::call_site(),
            format!("CdkActTryFromVmValue not supported for unit-like structs"),
        )),
    }
}

use proc_macro2::Ident;
use quote::{format_ident, quote};
use syn::{DataStruct, Fields, Index};

pub fn derive_try_into_vm_value_struct(
    struct_name: &Ident,
    data_struct: &DataStruct,
) -> proc_macro2::TokenStream {
    let variable_definitions = derive_struct_fields_variable_definitions(data_struct);
    let property_definitions = derive_struct_fields_property_definitions(data_struct);

    quote! {
        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for #struct_name {
            fn try_into_vm_value(self, _azle_context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                #(#variable_definitions)*

                let object = boa_engine::object::ObjectInitializer::new(_azle_context)
                    #(#property_definitions)*
                    .build();

                Ok(object.into())
            }
        }

        // TODO the body of this function is repeated in azle_into_js_value_trait.ts
        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<#struct_name> {
            fn try_into_vm_value(self, _azle_context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                let js_values = self.into_iter().map(|item| item.try_into_vm_value(_azle_context).unwrap()).collect::<Vec<boa_engine::JsValue>>();
                Ok(boa_engine::object::builtins::JsArray::from_iter(js_values, _azle_context).into())
            }
        }
    }
}

fn derive_struct_fields_variable_definitions(
    data_struct: &DataStruct,
) -> Vec<proc_macro2::TokenStream> {
    match &data_struct.fields {
        Fields::Named(fields_named) => fields_named
            .named
            .iter()
            .map(|field| {
                let field_name = &field.ident;

                quote! {
                    let #field_name = self.#field_name.try_into_vm_value(_azle_context).unwrap();
                }
            })
            .collect(),
        Fields::Unnamed(fields_unnamed) => fields_unnamed
            .unnamed
            .iter()
            .enumerate()
            .map(|(index, _)| {
                let field_name = format_ident!("field_{}", index);
                let syn_index = Index::from(index);

                quote! {
                    let #field_name = self.#syn_index.try_into_vm_value(_azle_context).unwrap();
                }
            })
            .collect(),
        _ => panic!("Only named and unnamed fields supported for Structs"),
    }
}

fn derive_struct_fields_property_definitions(
    data_struct: &DataStruct,
) -> Vec<proc_macro2::TokenStream> {
    match &data_struct.fields {
        Fields::Named(fields_named) => fields_named
            .named
            .iter()
            .map(|field| {
                let field_name = &field.ident;

                quote! {
                    .property(
                        stringify!(#field_name),
                        #field_name,
                        boa_engine::property::Attribute::all()
                    )
                }
            })
            .collect(),
        Fields::Unnamed(fields_unnamed) => fields_unnamed
            .unnamed
            .iter()
            .enumerate()
            .map(|(index, _)| {
                let field_name = format_ident!("field_{}", index);
                let syn_index = Index::from(index);

                quote! {
                    .property(
                        stringify!(#syn_index),
                        #field_name,
                        boa_engine::property::Attribute::all()
                    )
                }
            })
            .collect(),
        _ => panic!("Only named and unnamed fields supported for Structs"),
    }
}

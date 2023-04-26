use proc_macro2::Ident;
use quote::{format_ident, quote};
use syn::{DataStruct, Fields, Generics, Index};

pub fn derive_try_into_vm_value_struct(
    struct_name: &Ident,
    data_struct: &DataStruct,
    generics: &Generics,
) -> proc_macro2::TokenStream {
    let variable_definitions = derive_struct_fields_variable_definitions(data_struct);
    let property_definitions = derive_struct_fields_property_definitions(data_struct);

    // Capture generic parameters and their bounds
    let (impl_generics, ty_generics, where_clause) = generics.split_for_impl();

    quote! {
        impl #impl_generics CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for #struct_name #ty_generics #where_clause {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                #(#variable_definitions)*

                let object = boa_engine::object::ObjectInitializer::new(context)
                    #(#property_definitions)*
                    .build();

                Ok(object.into())
            }
        }

        // TODO the body of this function is repeated in azle_into_js_value_trait.ts
        impl #impl_generics CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for Vec<#struct_name #ty_generics> #where_clause {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                let js_values = self.into_iter().map(|item| item.try_into_vm_value(context).unwrap()).collect::<Vec<boa_engine::JsValue>>();
                Ok(boa_engine::object::builtins::JsArray::from_iter(js_values, context).into())
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
                let field_name = field.ident.as_ref().expect("Named field must have a name");
                let variable_name = format_ident!("{}_js_value", field_name);

                quote! {
                    let #variable_name = self.#field_name.try_into_vm_value(context).unwrap();
                }
            })
            .collect(),
        Fields::Unnamed(fields_unnamed) => fields_unnamed
            .unnamed
            .iter()
            .enumerate()
            .map(|(index, _)| {
                let variable_name = format_ident!("field_{}_js_value", index);
                let syn_index = Index::from(index);

                quote! {
                    let #variable_name = self.#syn_index.try_into_vm_value(context).unwrap();
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
                let field_name = field.ident.as_ref().expect("Named field must have a name");
                let variable_name = format_ident!("{}_js_value", field_name);

                quote! {
                    .property(
                        stringify!(#field_name),
                        #variable_name,
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
            .collect(),
        _ => panic!("Only named and unnamed fields supported for Structs"),
    }
}

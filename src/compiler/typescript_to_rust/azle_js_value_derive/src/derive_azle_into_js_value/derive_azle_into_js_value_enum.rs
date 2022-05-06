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

pub fn derive_azle_into_js_value_enum(
    enum_name: &Ident,
    data_enum: &DataEnum
) -> proc_macro2::TokenStream {
    let variant_branches = derive_variant_branches(
        &enum_name,
        &data_enum
    );

    quote! {
        impl AzleIntoJsValue for #enum_name {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                match self {
                    #(#variant_branches)*,
                }
            }
        }
    }
}

fn derive_variant_branches(
    enum_name: &Ident,
    data_enum: &DataEnum
) -> Vec<proc_macro2::TokenStream> {
    data_enum.variants.iter().map(|variant| {
        let variant_name = &variant.ident;

        match &variant.fields {
            Fields::Named(fields_named) => {
                derive_variant_branches_named_fields(
                    enum_name,
                    variant_name,
                    fields_named.named.iter().collect()
                )
            },
            Fields::Unnamed(fields_unnamed) => {
                derive_variant_branches_unnamed_fields(
                    enum_name,
                    variant_name,
                    fields_unnamed.unnamed.iter().collect()
                )
            },
            Fields::Unit => {
                derive_variant_branches_unnamed_fields(
                    enum_name,
                    variant_name,
                    vec![]
                )
            }
        }
    }).collect()
}

fn derive_variant_branches_named_fields(
    enum_name: &Ident,
    variant_name: &Ident,
    named_fields: Vec<&Field>
) -> proc_macro2::TokenStream {
    let field_names = named_fields.iter().map(|named_field| {
        let field_name = &named_field.ident.as_ref().unwrap();

        quote! {
            #field_name
        }
    });

    let named_field_variable_declarations = named_fields.iter().map(|named_field| {
        let field_name = &named_field.ident.as_ref().unwrap();
        let variable_name = format_ident!("{}_js_value", field_name);

        quote! {
            let #variable_name = #field_name.azle_into_js_value(context);
        }
    });

    let named_field_property_definitions = named_fields.iter().map(|named_field| {
        let field_name = &named_field.ident.as_ref().unwrap();
        let variable_name = format_ident!("{}_js_value", field_name);

        quote! {
            .property(
                stringify!(#field_name),
                #variable_name,
                boa_engine::property::Attribute::all()
            )
        }
    });

    let variant_object_variable_name = format_ident!("{}_js_object", variant_name);

    quote! {
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

            object.into()
        }
    }
}

fn derive_variant_branches_unnamed_fields(
    enum_name: &Ident,
    variant_name: &Ident,
    unnamed_fields: Vec<&Field>
) -> proc_macro2::TokenStream {
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

                object.into()
            }
        }
    }
    else {
        quote! {
            #enum_name::#variant_name(value) => {
                let js_value = value.azle_into_js_value(context);

                let object = boa_engine::object::ObjectInitializer::new(context)
                    .property(
                        stringify!(#variant_name),
                        js_value,
                        boa_engine::property::Attribute::all()
                    )
                    .build();

                object.into()
            }
        }
    }
}
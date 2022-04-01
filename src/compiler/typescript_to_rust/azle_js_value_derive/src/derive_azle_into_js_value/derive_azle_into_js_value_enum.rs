use proc_macro2::Ident;
use quote::quote;
use syn::{
    DataEnum,
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

        let fields = match &variant.fields {
            Fields::Unnamed(fields_unnamed) => {
                fields_unnamed.unnamed.iter().collect()
            },
            Fields::Unit => vec![],
            _ => panic!("Only unnamed or unit fields supported for Enums")
        };

        if fields.len() == 0 {
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
    }).collect()
}
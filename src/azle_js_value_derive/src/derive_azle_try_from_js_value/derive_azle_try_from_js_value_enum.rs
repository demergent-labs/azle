use proc_macro2::Ident;
use quote::{
    format_ident,
    quote
};
use syn::{
    DataEnum,
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
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<#enum_name, TryFromJsValueError> {
                let object_option = self.as_object();

                if let Some(object) = object_option {
                    #(#properties)*

                    return Err(TryFromJsValueError("Enum variant does not exist".to_string()));
                }
                else {
                    return Err(TryFromJsValueError("JsValue is not an object".to_string()));
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

        let fields = match &variant.fields {
            Fields::Unnamed(fields_unnamed) => {
                fields_unnamed.unnamed.iter().collect()
            },
            Fields::Unit => vec![],
            _ => panic!("Only unnamed or unit fields supported for Enums")
        };

        let object_variant_js_value_result_var_name = format_ident!("object_{}_js_value_result", variant_name);
        let object_variant_js_value_var_name = format_ident!("object_{}_js_value", variant_name);

        if fields.len() == 0 {
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
                                return Ok(TestEnum::One(#object_variant_var_name));
                            },
                            Err(err) => {
                                return Err(err);
                            }
                        };
                    }
                }
            }
        }
    }).collect()
}
use quote::quote;
use proc_macro2::{Ident};

pub fn generate_canister_method_body(function_name_ident: &Ident, params: &Vec<proc_macro2::TokenStream>) -> proc_macro2::TokenStream {
    quote! {
        unsafe {
            let mut boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

            let exports_js_value = boa_context.eval("exports").unwrap();
            let exports_js_object = exports_js_value.as_object().unwrap();

            let function_js_value = exports_js_object.get(stringify!(#function_name_ident), &mut boa_context).unwrap();
            let function_js_object = function_js_value.as_object().unwrap();

            let _azle_return_value = function_js_object.call(
                &boa_engine::JsValue::Null,
                &[
                    #(#params),*
                ],
                &mut boa_context
            ).unwrap();

            _azle_return_value.azle_try_from_js_value(boa_context).unwrap() // TODO add in the return result handler
        }
    }
}

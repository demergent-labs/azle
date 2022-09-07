use quote::quote;
use swc_ecma_ast::FnDecl;

use crate::utils::fn_decls::{
    get_fn_decl_function_name,
    get_param_name_idents
};

pub fn generate_canister_method_body(fn_decl: &FnDecl) -> proc_macro2::TokenStream {
    let call_to_js_function = generate_call_to_js_function(fn_decl);

    quote! {
        unsafe {
            let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

            #call_to_js_function

            _azle_boa_return_value.azle_try_from_js_value(&mut _azle_boa_context).unwrap() // TODO add in the return result handler
        }
    }
}

pub fn generate_call_to_js_function(fn_decl: &FnDecl) -> proc_macro2::TokenStream {
    let function_name = get_fn_decl_function_name(fn_decl);
    let param_name_idents = get_param_name_idents(fn_decl);

    quote! {
        let _azle_exports_js_value = _azle_boa_context.eval("exports").unwrap();
        let _azle_exports_js_object = _azle_exports_js_value.as_object().unwrap();

        let _azle_function_js_value = _azle_exports_js_object.get(#function_name, &mut _azle_boa_context).unwrap();
        let _azle_function_js_object = _azle_function_js_value.as_object().unwrap();

        let _azle_boa_return_value = _azle_function_js_object.call(
            &boa_engine::JsValue::Null,
            &[
                #(#param_name_idents.azle_into_js_value(&mut _azle_boa_context)),*
            ],
            &mut _azle_boa_context
        ).unwrap();
    }
}

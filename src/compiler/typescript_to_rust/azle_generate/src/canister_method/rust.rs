use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};

use crate::canister_method::AnnotatedFnDecl;

pub fn maybe_generate_call_to_js_function(
    annotated_fn_decl_option: &Option<&AnnotatedFnDecl>,
) -> TokenStream {
    if let Some(annotated_fn_decl) = annotated_fn_decl_option {
        generate_call_to_js_function(annotated_fn_decl)
    } else {
        quote!()
    }
}

pub fn generate_call_to_js_function(annotated_fn_decl: &AnnotatedFnDecl) -> TokenStream {
    let function_name = annotated_fn_decl.get_function_name();
    let param_name_idents: Vec<Ident> = annotated_fn_decl
        .build_params()
        .iter()
        .map(|param| format_ident!("{}", param.get_prefixed_name()))
        .collect();

    quote! {
        let _azle_exports_js_value = _azle_unwrap_boa_result(_azle_boa_context.eval("exports"), &mut _azle_boa_context);
        let _azle_exports_js_object = _azle_exports_js_value.as_object().unwrap();

        let _azle_function_js_value = _azle_exports_js_object.get(#function_name, &mut _azle_boa_context).unwrap();
        let _azle_function_js_object = _azle_function_js_value.as_object().unwrap();

        let _azle_boa_return_value = _azle_unwrap_boa_result(
            _azle_function_js_object.call(
                &boa_engine::JsValue::Null,
                &[
                    #(#param_name_idents.try_into_vm_value(&mut _azle_boa_context).unwrap()),*
                ],
                &mut _azle_boa_context
            ),
            &mut _azle_boa_context
        );
    }
}

use quote::quote;
use swc_ecma_ast::{
    TsKeywordTypeKind::{TsNullKeyword, TsVoidKeyword},
    TsType,
};

use crate::ts_ast::AzleFnDecl;

pub fn generate_canister_method_body(fn_decl: &AzleFnDecl) -> proc_macro2::TokenStream {
    let call_to_js_function = generate_call_to_js_function(fn_decl);
    let return_expression = generate_return_expression(fn_decl);

    quote! {
        unsafe {
            let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

            #call_to_js_function

            let _azle_final_return_value = _azle_async_result_handler(
                &mut _azle_boa_context,
                &_azle_boa_return_value
            ).await;

            #return_expression
        }
    }
}

pub fn maybe_generate_call_to_js_function(
    fn_decl_option: &Option<&AzleFnDecl>,
) -> proc_macro2::TokenStream {
    if let Some(post_upgrade_fn_decl) = fn_decl_option {
        generate_call_to_js_function(post_upgrade_fn_decl)
    } else {
        quote!()
    }
}

pub fn generate_call_to_js_function(fn_decl: &AzleFnDecl) -> proc_macro2::TokenStream {
    let function_name = fn_decl.get_function_name();
    let param_name_idents = fn_decl.get_param_name_idents();

    quote! {
        let _azle_exports_js_value = handle_boa_result(_azle_boa_context.eval("exports"), &mut _azle_boa_context);
        let _azle_exports_js_object = _azle_exports_js_value.as_object().unwrap();

        let _azle_function_js_value = _azle_exports_js_object.get(#function_name, &mut _azle_boa_context).unwrap();
        let _azle_function_js_object = _azle_function_js_value.as_object().unwrap();

        let _azle_boa_return_value = handle_boa_result(
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

/// Generates the return expression for a canister method body
///
/// # Context
///
/// * `_azle_final_return_value: boa_engine::JsValue` - The value to be returned
///    unless this is a ManualReply method.
/// * `_azle_boa_context: &mut boa_engine::Context` - The current boa context
fn generate_return_expression(fn_decl: &AzleFnDecl) -> proc_macro2::TokenStream {
    if fn_decl.is_manual() {
        return quote! {
            ic_cdk::api::call::ManualReply::empty()
        };
    }

    let return_type = fn_decl.get_return_ts_type();

    if type_is_null_or_void(return_type) {
        return quote! {
            return;
        };
    }

    quote! {
        _azle_final_return_value.try_from_vm_value(_azle_boa_context).unwrap()
    }
}

/// Returns true if the return type is `null`, or `void`. Otherwise returns false.
fn type_is_null_or_void(ts_type: &TsType) -> bool {
    match ts_type {
        TsType::TsKeywordType(keyword) => match keyword.kind {
            // TODO: Consider handling `TsNeverKeyword` and `TsUndefinedKeyword`
            TsNullKeyword | TsVoidKeyword => true,
            _ => false,
        },
        _ => false,
    }
}

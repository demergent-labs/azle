use quote::quote;
use swc_ecma_ast::{
    TsKeywordTypeKind::{TsNullKeyword, TsVoidKeyword},
    TsType,
};

use crate::canister_method::{rust, AnnotatedFnDecl};

pub use super::build_canister_methods::BuildCanisterMethods;

pub fn generate(fn_decl: &AnnotatedFnDecl) -> proc_macro2::TokenStream {
    let call_to_js_function = rust::generate_call_to_js_function(fn_decl);
    let return_expression = generate_return_expression(fn_decl);
    let function_name = fn_decl.get_function_name();
    let manual = fn_decl.is_manual();

    quote! {
        crate::ref_cells::BOA_CONTEXT.with(|boa_context_ref_cell| {
            let mut _azle_boa_context = boa_context_ref_cell.borrow_mut();

            let uuid = uuid::Uuid::new_v4().to_string();

            crate::ref_cells::set_uuid(&uuid);
            crate::ref_cells::set_method_name(&#function_name.to_string());
            crate::ref_cells::set_is_manual(#manual);

            #call_to_js_function

            let _azle_final_return_value = crate::_azle_async_await_result_handler(
                &mut _azle_boa_context,
                &_azle_boa_return_value,
                &uuid,
                #function_name,
                #manual
            );

            #return_expression
        })
    }
}

/// Generates the return expression for a canister method body
///
/// # Context
///
/// * `_azle_final_return_value: boa_engine::JsValue` - The value to be returned
///    unless this is a ManualReply method.
/// * `_azle_boa_context: &mut boa_engine::Context` - The current boa context
fn generate_return_expression(annotated_fn_decl: &AnnotatedFnDecl) -> proc_macro2::TokenStream {
    if annotated_fn_decl.is_manual() || annotated_fn_decl.is_promise() {
        return quote! {
            ic_cdk::api::call::ManualReply::empty()
        };
    }

    let return_type = annotated_fn_decl.get_return_ts_type();

    let null_and_void_handler = match return_type {
        TsType::TsKeywordType(keyword) => match keyword.kind {
            TsNullKeyword => quote! {
                if !_azle_final_return_value.is_null() {
                    ic_cdk::api::trap("TypeError: value is not of type 'null'");
                }
            },
            TsVoidKeyword => quote! {
                if !_azle_final_return_value.is_undefined() {
                    ic_cdk::api::trap("TypeError: value is not of type 'void'");
                }
            },
            _ => quote! {},
        },
        _ => quote! {},
    };

    quote! {
        #null_and_void_handler
        match _azle_final_return_value.try_from_vm_value(&mut *_azle_boa_context) {
            Ok(return_value) => return_value,
            Err(e) => ic_cdk::api::trap(&format!("TypeError: {}",&e.0))
        }
    }
}

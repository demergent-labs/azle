use quote::quote;
use swc_ecma_ast::{
    TsKeywordTypeKind::{TsNullKeyword, TsVoidKeyword},
    TsType,
};

use crate::{generators::canister_methods, ts_ast::AzleFnDecl};

pub fn generate_query_and_update_body(fn_decl: &AzleFnDecl) -> proc_macro2::TokenStream {
    let call_to_js_function = canister_methods::generate_call_to_js_function(fn_decl);
    let return_expression = generate_return_expression(fn_decl);
    let function_name = fn_decl.get_function_name();
    let manual = fn_decl.is_manual();

    quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

            let uuid = uuid::Uuid::new_v4().to_string();

            UUID_REF_CELL.with(|uuid_ref_cell| {
                let mut uuid_mut = uuid_ref_cell.borrow_mut();

                *uuid_mut = uuid.clone();
            });

            METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                let mut method_name_mut = method_name_ref_cell.borrow_mut();

                *method_name_mut = #function_name.to_string()
            });

            MANUAL_REF_CELL.with(|manual_ref_cell| {
                let mut manual_mut = manual_ref_cell.borrow_mut();

                *manual_mut = #manual;
            });

            #call_to_js_function

            let _azle_final_return_value = _azle_async_await_result_handler(
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
fn generate_return_expression(fn_decl: &AzleFnDecl) -> proc_macro2::TokenStream {
    if fn_decl.is_manual() || fn_decl.is_promise() {
        return quote! {
            ic_cdk::api::call::ManualReply::empty()
        };
    }

    let return_type = fn_decl.get_return_ts_type();

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

use cdk_framework::traits::CollectResults;
use proc_macro2::TokenStream;
use quote::quote;
use swc_ecma_ast::{
    TsKeywordTypeKind::{TsNullKeyword, TsVoidKeyword},
    TsType,
};

use crate::{
    canister_method::{rust, AnnotatedFnDecl},
    traits::GetName,
    ts_ast::SourceMapped,
    Error,
};

pub fn generate(
    fn_decl: &SourceMapped<AnnotatedFnDecl>,
) -> Result<proc_macro2::TokenStream, Vec<Error>> {
    let (call_to_js_function, return_expression) = (
        rust::generate_call_to_js_function(fn_decl),
        generate_return_expression(fn_decl).map_err(Error::into),
    )
        .collect_results()?;

    let manual = fn_decl.is_manual();
    let function_name = fn_decl.get_function_name();

    Ok(quote! {
        unwrap_or_trap(|| {
            BOA_CONTEXT_REF_CELL.with(|boa_context_ref_cell| {
                let mut boa_context = boa_context_ref_cell.borrow_mut();

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

                let final_return_value = async_await_result_handler(
                    &mut boa_context,
                    &boa_return_value,
                    &uuid,
                    #function_name,
                    #manual
                )?;

                #return_expression
            })
        })
    })
}

/// Generates the return expression for a canister method body
///
/// # Context
///
/// * `final_return_value: boa_engine::JsValue` - The value to be returned
///    unless this is a ManualReply method.
/// * `boa_context: &mut boa_engine::Context` - The current boa context
fn generate_return_expression(
    annotated_fn_decl: &SourceMapped<AnnotatedFnDecl>,
) -> Result<proc_macro2::TokenStream, Error> {
    if annotated_fn_decl.is_manual() || annotated_fn_decl.is_promise() {
        return Ok(quote! {
            Ok(ic_cdk::api::call::ManualReply::empty())
        });
    }

    let return_type = annotated_fn_decl.get_return_ts_type()?;

    let null_and_void_handler = match return_type {
        TsType::TsKeywordType(keyword) => match keyword.kind {
            TsNullKeyword => check_for_not_null_return_value(),
            TsVoidKeyword => check_for_not_void_return_value(),
            _ => quote! {},
        },
        TsType::TsTypeRef(type_ref) => {
            let sm_type_ref = annotated_fn_decl.spawn(type_ref);
            if sm_type_ref
                .alias_table
                .void
                .contains(&sm_type_ref.get_name())
            {
                check_for_not_void_return_value()
            } else if sm_type_ref
                .alias_table
                .null
                .contains(&sm_type_ref.get_name())
            {
                check_for_not_null_return_value()
            } else {
                quote! {}
            }
        }
        _ => quote! {},
    };

    Ok(quote! {
        #null_and_void_handler

        Ok(final_return_value
            .try_from_vm_value(&mut *boa_context)?)
    })
}

fn check_for_not_null_return_value() -> TokenStream {
    quote! {
        if !final_return_value.is_null() {
            return Err(RuntimeError::TypeError("Value is not of type 'null'".to_string()));
        }
    }
}

fn check_for_not_void_return_value() -> TokenStream {
    quote! {
        if !final_return_value.is_undefined() {
            return Err(RuntimeError::TypeError("Value is not of type 'void'".to_string()));
        }
    }
}

// TODO deduplicate and clean up this code

use cdk_framework::nodes::{ActExternalCanister, ActExternalCanisterMethod};
use proc_macro2::TokenStream;
use quote::{format_ident, quote};

use crate::generators::ic_object;

pub fn generate_ic_object_cross_canister_functions(
    external_canisters: &Vec<ActExternalCanister>,
) -> Vec<TokenStream> {
    external_canisters
        .iter()
        .map(|canister| {
            canister
                .methods
                .iter()
                .map(|method| {
                    let call_function = generate_call_function(canister, method);
                    let call_with_payment_function =
                        generate_call_with_payment_function(canister, method);
                    let call_with_payment128_function =
                        generate_call_with_payment128_function(canister, method);

                    quote! {
                        #call_function
                        #call_with_payment_function
                        #call_with_payment128_function
                    }
                })
                .collect()
        })
        .collect::<Vec<Vec<TokenStream>>>()
        .concat()
}

fn generate_call_function(
    canister: &ActExternalCanister,
    method: &ActExternalCanisterMethod,
) -> TokenStream {
    let call_function_name_string = format!("_azle_call_{}_{}", canister.name, method.name);
    let call_function_name_ident = format_ident!("{}", call_function_name_string);
    let call_wrapper_fn_name = format_ident!("{}_wrapper", call_function_name_string);
    let param_variables = ic_object::generate_param_variables(method);
    let args = ic_object::generate_args_list(method);

    quote! {
        fn #call_wrapper_fn_name(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let canister_id_js_value = _aargs.get(0).unwrap().clone();
            let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.try_from_vm_value(&mut *_context).unwrap();

            let args_js_value = _aargs.get(1).unwrap().clone();
            let args_js_object = args_js_value.as_object().unwrap();

            #(#param_variables)*

            let promise_js_value = _context.eval("new Promise(() => {})").unwrap();
            let promise_js_value_cloned = promise_js_value.clone();

            ic_cdk::spawn(async move {
                let uuid = UUID_REF_CELL.with(|uuid_ref_cell| uuid_ref_cell.borrow().clone());
                let method_name = METHOD_NAME_REF_CELL.with(|method_name_ref_cell| method_name_ref_cell.borrow().clone());

                let call_result = #call_function_name_ident(
                    canister_id_principal,
                    #args
                ).await;

                UUID_REF_CELL.with(|uuid_ref_cell| {
                    let mut uuid_mut = uuid_ref_cell.borrow_mut();

                    *uuid_mut = uuid.clone();
                });

                METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                    let mut method_name_mut = method_name_ref_cell.borrow_mut();

                    *method_name_mut = method_name.clone()
                });

                BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
                    let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

                    let call_result_js_value = match call_result {
                        Ok(value) => {
                            let js_value = value.try_into_vm_value(&mut *_azle_boa_context).unwrap();

                            let canister_result_js_object = boa_engine::object::ObjectInitializer::new(&mut *_azle_boa_context)
                                .property(
                                    "ok",
                                    js_value,
                                    boa_engine::property::Attribute::all()
                                )
                                .build();

                            let canister_result_js_value = canister_result_js_object.into();

                            canister_result_js_value
                        },
                        Err(err) => {
                            let js_value = format!("Rejection code {rejection_code}, {error_message}", rejection_code = (err.0 as i32).to_string(), error_message = err.1).try_into_vm_value(&mut *_azle_boa_context).unwrap();

                            let canister_result_js_object = boa_engine::object::ObjectInitializer::new(&mut *_azle_boa_context)
                                .property(
                                    "err",
                                    js_value,
                                    boa_engine::property::Attribute::all()
                                )
                                .build();

                            let canister_result_js_value = canister_result_js_object.into();

                            canister_result_js_value
                        }
                    };

                    let promise_js_object = promise_js_value.as_object().unwrap();
                    let mut promise_object = promise_js_object.borrow_mut();
                    let mut promise = promise_object.as_promise_mut().unwrap();

                    promise.fulfill_promise(&call_result_js_value, &mut *_azle_boa_context);

                    let main_promise = PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                        let promise_map = promise_map_ref_cell.borrow().clone();

                        let main_promise = promise_map.get(&uuid).unwrap();

                        main_promise.clone()
                    });

                    _azle_async_await_result_handler(&mut *_azle_boa_context, &main_promise, &uuid, &method_name);
                });
            });

            Ok(promise_js_value_cloned)
        }
    }
}

fn generate_call_with_payment_function(
    canister: &ActExternalCanister,
    method: &ActExternalCanisterMethod,
) -> TokenStream {
    let call_with_payment_function_name_string =
        format!("_azle_call_with_payment_{}_{}", canister.name, method.name);
    let call_with_payment_function_name_ident =
        format_ident!("{}", call_with_payment_function_name_string);
    let call_with_payment_wrapper_fn_name =
        format_ident!("{}_wrapper", call_with_payment_function_name_string);
    let param_variables = ic_object::generate_param_variables(method);
    let args = ic_object::generate_args_list(method);

    let index_string = param_variables.len().to_string();

    quote! {
        fn #call_with_payment_wrapper_fn_name(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let canister_id_js_value = _aargs.get(0).unwrap().clone();
            let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.try_from_vm_value(&mut *_context).unwrap();

            let args_js_value = _aargs.get(1).unwrap().clone();
            let args_js_object = args_js_value.as_object().unwrap();

            #(#param_variables)*

            let cycles_js_value = args_js_object.get(#index_string, _context).unwrap();
            let cycles: u64 = cycles_js_value.try_from_vm_value(&mut *_context).unwrap();

            let promise_js_value = _context.eval("new Promise(() => {})").unwrap();
            let promise_js_value_cloned = promise_js_value.clone();

            ic_cdk::spawn(async move {
                let uuid = UUID_REF_CELL.with(|uuid_ref_cell| uuid_ref_cell.borrow().clone());
                let method_name = METHOD_NAME_REF_CELL.with(|method_name_ref_cell| method_name_ref_cell.borrow().clone());

                let call_result = #call_with_payment_function_name_ident(
                    canister_id_principal,
                    #args,
                    cycles
                ).await;

                UUID_REF_CELL.with(|uuid_ref_cell| {
                    let mut uuid_mut = uuid_ref_cell.borrow_mut();

                    *uuid_mut = uuid.clone();
                });

                METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                    let mut method_name_mut = method_name_ref_cell.borrow_mut();

                    *method_name_mut = method_name.clone()
                });

                BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
                    let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

                    let call_result_js_value = match call_result {
                        Ok(value) => {
                            let js_value = value.try_into_vm_value(&mut *_azle_boa_context).unwrap();

                            let canister_result_js_object = boa_engine::object::ObjectInitializer::new(&mut *_azle_boa_context)
                                .property(
                                    "ok",
                                    js_value,
                                    boa_engine::property::Attribute::all()
                                )
                                .build();

                            let canister_result_js_value = canister_result_js_object.into();

                            canister_result_js_value
                        },
                        Err(err) => {
                            let js_value = format!("Rejection code {rejection_code}, {error_message}", rejection_code = (err.0 as i32).to_string(), error_message = err.1).try_into_vm_value(&mut *_azle_boa_context).unwrap();

                            let canister_result_js_object = boa_engine::object::ObjectInitializer::new(&mut *_azle_boa_context)
                                .property(
                                    "err",
                                    js_value,
                                    boa_engine::property::Attribute::all()
                                )
                                .build();

                            let canister_result_js_value = canister_result_js_object.into();

                            canister_result_js_value
                        }
                    };

                    let promise_js_object = promise_js_value.as_object().unwrap();
                    let mut promise_object = promise_js_object.borrow_mut();
                    let mut promise = promise_object.as_promise_mut().unwrap();

                    promise.fulfill_promise(&call_result_js_value, &mut *_azle_boa_context);

                    let main_promise = PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                        let promise_map = promise_map_ref_cell.borrow().clone();

                        let main_promise = promise_map.get(&uuid).unwrap();

                        main_promise.clone()
                    });

                    _azle_async_await_result_handler(&mut *_azle_boa_context, &main_promise, &uuid, &method_name);
                });
            });

            Ok(promise_js_value_cloned)
        }
    }
}

fn generate_call_with_payment128_function(
    canister: &ActExternalCanister,
    method: &ActExternalCanisterMethod,
) -> TokenStream {
    let call_with_payment128_function_name_string = format!(
        "_azle_call_with_payment128_{}_{}",
        canister.name, method.name
    );
    let call_with_payment128_function_name_ident =
        format_ident!("{}", call_with_payment128_function_name_string);
    let call_with_payment128_wrapper_fn_name =
        format_ident!("{}_wrapper", call_with_payment128_function_name_string);
    let param_variables = ic_object::generate_param_variables(method);
    let args = ic_object::generate_args_list(method);

    let index_string = param_variables.len().to_string();

    quote! {
        fn #call_with_payment128_wrapper_fn_name(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let canister_id_js_value = _aargs.get(0).unwrap().clone();
            let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.try_from_vm_value(&mut *_context).unwrap();

            let args_js_value = _aargs.get(1).unwrap().clone();
            let args_js_object = args_js_value.as_object().unwrap();

            #(#param_variables)*

            let cycles_js_value = args_js_object.get(#index_string, _context).unwrap();
            let cycles: u128 = cycles_js_value.try_from_vm_value(&mut *_context).unwrap();

            let promise_js_value = _context.eval("new Promise(() => {})").unwrap();
            let promise_js_value_cloned = promise_js_value.clone();

            ic_cdk::spawn(async move {
                let uuid = UUID_REF_CELL.with(|uuid_ref_cell| uuid_ref_cell.borrow().clone());
                let method_name = METHOD_NAME_REF_CELL.with(|method_name_ref_cell| method_name_ref_cell.borrow().clone());

                let call_result = #call_with_payment128_function_name_ident(
                    canister_id_principal,
                    #args,
                    cycles
                ).await;

                UUID_REF_CELL.with(|uuid_ref_cell| {
                    let mut uuid_mut = uuid_ref_cell.borrow_mut();

                    *uuid_mut = uuid.clone();
                });

                METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                    let mut method_name_mut = method_name_ref_cell.borrow_mut();

                    *method_name_mut = method_name.clone()
                });

                BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
                    let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

                    let call_result_js_value = match call_result {
                        Ok(value) => {
                            let js_value = value.try_into_vm_value(&mut *_azle_boa_context).unwrap();

                            let canister_result_js_object = boa_engine::object::ObjectInitializer::new(&mut *_azle_boa_context)
                                .property(
                                    "ok",
                                    js_value,
                                    boa_engine::property::Attribute::all()
                                )
                                .build();

                            let canister_result_js_value = canister_result_js_object.into();

                            canister_result_js_value
                        },
                        Err(err) => {
                            let js_value = format!("Rejection code {rejection_code}, {error_message}", rejection_code = (err.0 as i32).to_string(), error_message = err.1).try_into_vm_value(&mut *_azle_boa_context).unwrap();

                            let canister_result_js_object = boa_engine::object::ObjectInitializer::new(&mut *_azle_boa_context)
                                .property(
                                    "err",
                                    js_value,
                                    boa_engine::property::Attribute::all()
                                )
                                .build();

                            let canister_result_js_value = canister_result_js_object.into();

                            canister_result_js_value
                        }
                    };

                    let promise_js_object = promise_js_value.as_object().unwrap();
                    let mut promise_object = promise_js_object.borrow_mut();
                    let mut promise = promise_object.as_promise_mut().unwrap();

                    promise.fulfill_promise(&call_result_js_value, &mut *_azle_boa_context);

                    let main_promise = PROMISE_MAP_REF_CELL.with(|promise_map_ref_cell| {
                        let promise_map = promise_map_ref_cell.borrow().clone();

                        let main_promise = promise_map.get(&uuid).unwrap();

                        main_promise.clone()
                    });

                    _azle_async_await_result_handler(&mut *_azle_boa_context, &main_promise, &uuid, &method_name);
                });
            });

            Ok(promise_js_value_cloned)
        }
    }
}

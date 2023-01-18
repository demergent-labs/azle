use cdk_framework::nodes::ActExternalCanister;
use proc_macro2::TokenStream;
use quote::{format_ident, quote};

use crate::ts_ast::TsAst;

pub fn generate(ts_ast: &TsAst) -> TokenStream {
    let external_canisters = ts_ast.build_external_canisters();

    let notify_functions = generate_notify_functions(&external_canisters);
    let cross_canister_functions = generate_cross_canister_functions(&external_canisters);

    quote::quote! {
        fn _azle_register_ic_object(boa_context: &mut boa_engine::Context) {
            let ic = boa_engine::object::ObjectInitializer::new(boa_context)
                .function(_azle_ic_accept_message, "accept_message", 0)
                .function(_azle_ic_arg_data_raw, "arg_data_raw", 0)
                .function(_azle_ic_arg_data_raw_size, "arg_data_raw_size", 0)
                .function(_azle_ic_call_raw, "call_raw", 0)
                .function(_azle_ic_call_raw128, "call_raw128", 0)
                .function(_azle_ic_caller, "caller", 0)
                .function(_azle_ic_candid_decode, "candid_decode", 0)
                .function(_azle_ic_candid_encode, "candid_encode", 0)
                .function(_azle_ic_canister_balance, "canister_balance", 0)
                .function(_azle_ic_canister_balance128, "canister_balance128", 0)
                .function(_azle_ic_clear_timer, "clear_timer", 0)
                .function(_azle_ic_data_certificate, "data_certificate", 0)
                .function(_azle_ic_id, "id", 0)
                .function(_azle_ic_method_name, "method_name", 0)
                .function(_azle_ic_msg_cycles_accept, "msg_cycles_accept", 0)
                .function(_azle_ic_msg_cycles_accept128, "msg_cycles_accept128", 0)
                .function(_azle_ic_msg_cycles_available, "msg_cycles_available", 0)
                .function(_azle_ic_msg_cycles_available128, "msg_cycles_available128", 0)
                .function(_azle_ic_msg_cycles_refunded, "msg_cycles_refunded", 0)
                .function(_azle_ic_msg_cycles_refunded128, "msg_cycles_refunded128", 0)
                #(#notify_functions)*
                #(#cross_canister_functions)*
                .function(_azle_ic_notify_raw, "notify_raw", 0)
                .function(_azle_ic_performance_counter, "performance_counter", 0)
                .function(_azle_ic_print, "print", 0)
                .function(_azle_ic_reject, "reject", 0)
                .function(_azle_ic_reject_code, "reject_code", 0)
                .function(_azle_ic_reject_message, "reject_message", 0)
                .function(_azle_ic_reply, "reply", 0)
                .function(_azle_ic_reply_raw, "reply_raw", 0)
                .function(_azle_ic_set_certified_data, "set_certified_data", 0)
                .function(_azle_ic_set_timer, "set_timer", 0)
                .function(_azle_ic_set_timer_interval, "set_timer_interval", 0)
                .function(_azle_ic_stable_bytes, "stable_bytes", 0)
                .function(_azle_ic_stable_b_tree_map_contains_key, "stable_b_tree_map_contains_key", 0)
                .function(_azle_ic_stable_b_tree_map_get, "stable_b_tree_map_get", 0)
                .function(_azle_ic_stable_b_tree_map_insert, "stable_b_tree_map_insert", 0)
                .function(_azle_ic_stable_b_tree_map_is_empty, "stable_b_tree_map_is_empty", 0)
                .function(_azle_ic_stable_b_tree_map_items, "stable_b_tree_map_items", 0)
                .function(_azle_ic_stable_b_tree_map_keys, "stable_b_tree_map_keys", 0)
                .function(_azle_ic_stable_b_tree_map_values, "stable_b_tree_map_values", 0)
                .function(_azle_ic_stable_b_tree_map_len, "stable_b_tree_map_len", 0)
                .function(_azle_ic_stable_b_tree_map_remove, "stable_b_tree_map_remove", 0)
                .function(_azle_ic_stable_grow, "stable_grow", 0)
                .function(_azle_ic_stable_read, "stable_read", 0)
                .function(_azle_ic_stable_size, "stable_size", 0)
                .function(_azle_ic_stable_write, "stable_write", 0)
                .function(_azle_ic_stable64_grow, "stable64_grow", 0)
                .function(_azle_ic_stable64_read, "stable64_read", 0)
                .function(_azle_ic_stable64_size, "stable64_size", 0)
                .function(_azle_ic_stable64_write, "stable64_write", 0)
                .function(_azle_ic_time, "time", 0)
                .function(_azle_ic_trap, "trap", 0)
                .build();

            boa_context.register_global_property(
                "ic",
                ic,
                boa_engine::property::Attribute::all(),
            );
        }
    }
}

fn generate_notify_functions(external_canisters: &Vec<ActExternalCanister>) -> Vec<TokenStream> {
    external_canisters.iter().map(|canister| {
        canister.methods.iter().map(|method| {
            let notify_function_name_string = format!("_azle_notify_{}_{}", canister.name, method.name);
            let notify_wrapper_function_name = format_ident!("{}_wrapper", notify_function_name_string);

            let notify_with_payment128_function_name_string = format!("_azle_notify_with_payment128_{}_{}", canister.name, method.name);
            let notify_with_payment128_wrapper_function_name = format_ident!("{}_wrapper", notify_with_payment128_function_name_string);

            quote! {
                .function(#notify_wrapper_function_name, #notify_function_name_string, 0)
                .function(#notify_with_payment128_wrapper_function_name, #notify_with_payment128_function_name_string, 0)
            }
        }).collect()
    }).collect::<Vec<Vec<TokenStream>>>().concat()
}

fn generate_cross_canister_functions(
    external_canisters: &Vec<ActExternalCanister>,
) -> Vec<TokenStream> {
    external_canisters
        .iter()
        .map(|canister| {
            canister
                .methods
                .iter()
                .map(|method| {
                    let call_function_name_string =
                        format!("_azle_call_{}_{}", canister.name, method.name);
                    let call_wrapper_function_name =
                        format_ident!("{}_wrapper", call_function_name_string);

                    let call_with_payment_function_name_string =
                        format!("_azle_call_with_payment_{}_{}", canister.name, method.name);
                    let call_with_payment_wrapper_function_name =
                        format_ident!("{}_wrapper", call_with_payment_function_name_string);

                    let call_with_payment128_function_name_string =
                        format!("_azle_call_with_payment128_{}_{}", canister.name, method.name);
                    let call_with_payment128_wrapper_function_name =
                        format_ident!("{}_wrapper", call_with_payment128_function_name_string);

                    quote! {
                        .function(#call_wrapper_function_name, #call_function_name_string, 0)
                        .function(#call_with_payment_wrapper_function_name, #call_with_payment_function_name_string, 0)
                        .function(#call_with_payment128_wrapper_function_name, #call_with_payment128_function_name_string, 0)
                    }
                })
                .collect()
        })
        .collect::<Vec<Vec<TokenStream>>>()
        .concat()
}

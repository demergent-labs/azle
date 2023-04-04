use cdk_framework::act::node::candid::Service;
use proc_macro2::TokenStream;
use quote::{format_ident, quote};

use crate::ts_ast::TsAst;

pub fn generate(ts_ast: &TsAst) -> TokenStream {
    let services = ts_ast.build_services();

    let notify_functions = generate_notify_functions(&services);
    let cross_canister_functions = generate_cross_canister_functions(&services);

    quote::quote! {
        pub fn register(boa_context: &mut boa_engine::Context) {
            let ic = boa_engine::object::ObjectInitializer::new(boa_context)
                .function(accept_message, "acceptMessage", 0)
                .function(arg_data_raw, "argDataRaw", 0)
                .function(arg_data_raw_size, "argDataRawSize", 0)
                .function(call_raw, "callRaw", 0)
                .function(call_raw128, "callRaw128", 0)
                .function(caller, "caller", 0)
                .function(candid_decode, "candidDecode", 0)
                .function(candid_encode, "candidEncode", 0)
                .function(canister_balance, "canisterBalance", 0)
                .function(canister_balance128, "canisterBalance128", 0)
                .function(clear_timer, "clearTimer", 0)
                .function(data_certificate, "dataCertificate", 0)
                .function(id, "id", 0)
                .function(method_name, "methodName", 0)
                .function(msg_cycles_accept, "msgCyclesAccept", 0)
                .function(msg_cycles_accept128, "msgCyclesAccept128", 0)
                .function(msg_cycles_available, "msgCyclesAvailable", 0)
                .function(msg_cycles_available128, "msgCyclesAvailable128", 0)
                .function(msg_cycles_refunded, "msgCyclesRefunded", 0)
                .function(msg_cycles_refunded128, "msgCyclesRefunded128", 0)
                #(#notify_functions)*
                #(#cross_canister_functions)*
                .function(notify_raw, "notifyRaw", 0)
                .function(performance_counter, "performanceCounter", 0)
                .function(print, "print", 0)
                .function(reject, "reject", 0)
                .function(reject_code, "rejectCode", 0)
                .function(reject_message, "rejectMessage", 0)
                .function(reply, "reply", 0)
                .function(reply_raw, "replyRaw", 0)
                .function(set_certified_data, "setCertifiedData", 0)
                .function(set_timer, "setTimer", 0)
                .function(set_timer_interval, "setTimerInterval", 0)
                .function(stable_bytes, "stableBytes", 0)
                .function(stable_b_tree_map_contains_key, "stableBTreeMapContainsKey", 0)
                .function(stable_b_tree_map_get, "stableBTreeMapGet", 0)
                .function(stable_b_tree_map_insert, "stableBTreeMapInsert", 0)
                .function(stable_b_tree_map_is_empty, "stableBTreeMapIsEmpty", 0)
                .function(stable_b_tree_map_items, "stableBTreeMapItems", 0)
                .function(stable_b_tree_map_keys, "stableBTreeMapKeys", 0)
                .function(stable_b_tree_map_values, "stableBTreeMapValues", 0)
                .function(stable_b_tree_map_len, "stableBTreeMapLen", 0)
                .function(stable_b_tree_map_remove, "stableBTreeMapRemove", 0)
                .function(stable_grow, "stableGrow", 0)
                .function(stable_read, "stableRead", 0)
                .function(stable_size, "stableSize", 0)
                .function(stable_write, "stableWrite", 0)
                .function(stable64_grow, "stable64Grow", 0)
                .function(stable64_read, "stable64Read", 0)
                .function(stable64_size, "stable64Size", 0)
                .function(stable64_write, "stable64Write", 0)
                .function(time, "time", 0)
                .function(trap, "trap", 0)
                .build();

            boa_context.register_global_property(
                "ic",
                ic,
                boa_engine::property::Attribute::all(),
            );
        }
    }
}

fn generate_notify_functions(services: &Vec<Service>) -> Vec<TokenStream> {
    services.iter().map(|canister| {
        canister.methods.iter().map(|method| {
            let notify_function_name_string = format!("notify_{}_{}", canister.name, method.name);
            let notify_wrapper_function_name = format_ident!("{}_wrapper", notify_function_name_string);

            let notify_with_payment128_function_name_string = format!("notify_with_payment128_{}_{}", canister.name, method.name);
            let notify_with_payment128_wrapper_function_name = format_ident!("{}_wrapper", notify_with_payment128_function_name_string);

            quote! {
                .function(#notify_wrapper_function_name, #notify_function_name_string, 0)
                .function(#notify_with_payment128_wrapper_function_name, #notify_with_payment128_function_name_string, 0)
            }
        }).collect()
    }).collect::<Vec<Vec<TokenStream>>>().concat()
}

fn generate_cross_canister_functions(services: &Vec<Service>) -> Vec<TokenStream> {
    services
        .iter()
        .map(|canister| {
            canister
                .methods
                .iter()
                .map(|method| {
                    let call_function_name_string =
                        format!("call_{}_{}", canister.name, method.name);
                    let call_wrapper_function_name =
                        format_ident!("{}_wrapper", call_function_name_string);

                    let call_with_payment_function_name_string =
                        format!("call_with_payment_{}_{}", canister.name, method.name);
                    let call_with_payment_wrapper_function_name =
                        format_ident!("{}_wrapper", call_with_payment_function_name_string);

                    let call_with_payment128_function_name_string =
                        format!("call_with_payment128_{}_{}", canister.name, method.name);
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

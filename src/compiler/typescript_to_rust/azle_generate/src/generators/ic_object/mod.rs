use quote::{format_ident, quote};
use swc_ecma_ast::Program;

use super::cross_canister_call_functions::generate_cross_canister_call_functions_infos;

pub mod functions;

pub fn generate_ic_object(programs: &Vec<Program>) -> proc_macro2::TokenStream {
    let notify_functions = generate_notify_functions(programs);

    quote::quote! {
        let ic = boa_engine::object::ObjectInitializer::new(&mut _azle_boa_context)
            .function(
                _azle_ic_accept_message,
                "accept_message",
                0
            )
            .function(
                _azle_ic_arg_data_raw,
                "arg_data_raw",
                0
            )
            .function(
                _azle_ic_arg_data_raw_size,
                "arg_data_raw_size",
                0
            )
            .function(
                _azle_ic_caller,
                "caller",
                0
            )
            .function(
                _azle_ic_candid_decode,
                "candid_decode",
                0
            )
            .function(
                _azle_ic_candid_encode,
                "candid_encode",
                0
            )
            .function(
                _azle_ic_canister_balance,
                "canister_balance",
                0
            )
            .function(
                _azle_ic_canister_balance128,
                "canister_balance128",
                0
            )
            .function(
                _azle_ic_data_certificate,
                "data_certificate",
                0
            )
            .function(
                _azle_ic_id,
                "id",
                0
            )
            .function(
                _azle_ic_method_name,
                "method_name",
                0
            )
            #(#notify_functions)*
            .function(
                _azle_ic_msg_cycles_accept,
                "msg_cycles_accept",
                0
            )
            .function(
                _azle_ic_msg_cycles_accept128,
                "msg_cycles_accept128",
                0
            )
            .function(
                _azle_ic_msg_cycles_available,
                "msg_cycles_available",
                0
            )
            .function(
                _azle_ic_msg_cycles_available128,
                "msg_cycles_available128",
                0
            )
            .function(
                _azle_ic_msg_cycles_refunded,
                "msg_cycles_refunded",
                0
            )
            .function(
                _azle_ic_msg_cycles_refunded128,
                "msg_cycles_refunded128",
                0
            )
            .function(
                _azle_ic_notify_raw,
                "notify_raw",
                0
            )
            .function(
                _azle_ic_performance_counter,
                "performance_counter",
                0
            )
            .function(
                _azle_ic_print,
                "print",
                0
            )
            .function(
                _azle_ic_reject,
                "reject",
                0
            )
            .function(
                _azle_ic_reject_code,
                "reject_code",
                0
            )
            .function(
                _azle_ic_reject_message,
                "reject_message",
                0
            )
            .function(
                _azle_ic_reply,
                "reply",
                0
            )
            .function(
                _azle_ic_reply_raw,
                "reply_raw",
                0
            )
            .function(
                _azle_ic_set_certified_data,
                "set_certified_data",
                0
            )
            .function(
                _azle_ic_stable_bytes,
                "stable_bytes",
                0
            )
            .function(
                _azle_ic_stable_grow,
                "stable_grow",
                0
            )
            .function(
                _azle_ic_stable_read,
                "stable_read",
                0
            )
            .function(
                _azle_ic_stable_size,
                "stable_size",
                0
            )
            .function(
                _azle_ic_stable_write,
                "stable_write",
                0
            )
            .function(
                _azle_ic_stable64_grow,
                "stable64_grow",
                0
            )
            .function(
                _azle_ic_stable64_read,
                "stable64_read",
                0
            )
            .function(
                _azle_ic_stable64_size,
                "stable64_size",
                0
            )
            .function(
                _azle_ic_stable64_write,
                "stable64_write",
                0
            )
            .function(
                _azle_ic_time,
                "time",
                0
            )
            .function(
                _azle_ic_trap,
                "trap",
                0
            )
            .property(
                "_azle_stable_storage",
                _azle_stable_storage,
                boa_engine::property::Attribute::all()
            )
            .build();
    }
}

fn generate_notify_functions(programs: &Vec<Program>) -> Vec<proc_macro2::TokenStream> {
    let cross_canister_call_functions_infos =
        generate_cross_canister_call_functions_infos(programs);

    cross_canister_call_functions_infos
        .iter()
        .map(|cross_canister_call_functions_info| {
            let notify_function_name_string = &cross_canister_call_functions_info.notify.name;
            let notify_function_name_ident = format_ident!("{}", notify_function_name_string);

            let notify_with_payment128_function_name_string = &cross_canister_call_functions_info
                .notify_with_payment128
                .name;
            let notify_with_payment128_function_name_ident =
                format_ident!("{}", notify_with_payment128_function_name_string);

            quote! {
                .function(
                    #notify_function_name_ident,
                    #notify_function_name_string,
                    0
                )
                .function(
                    #notify_with_payment128_function_name_ident,
                    #notify_with_payment128_function_name_string,
                    0
                )
            }
        })
        .collect()
}

use cdk_framework::{
    act::abstract_canister_tree::{convert_module_path_to_name, Module},
    act::node::candid::Service,
    traits::ToIdent,
};
use proc_macro2::TokenStream;
use quote::{format_ident, quote};

use crate::Error;

pub fn generate(modules: &Vec<Module>) -> Result<TokenStream, Vec<Error>> {
    let cross_canister_functions: Vec<TokenStream> = modules.iter().fold(vec![], |acc, module| {
        let module_name = convert_module_path_to_name(&module.path);

        let cross_canister_functions =
            generate_cross_canister_functions(&module_name, &module.candid_types.services);

        vec![acc, cross_canister_functions].concat()
    });

    let notify_functions: Vec<TokenStream> = modules.iter().fold(vec![], |acc, module| {
        let module_name = convert_module_path_to_name(&module.path);

        let notify_functions =
            generate_notify_functions(&module_name, &module.candid_types.services);

        vec![acc, notify_functions].concat()
    });

    Ok(quote::quote! {
        pub fn register_ic_object(boa_context: &mut boa_engine::Context) {
            let ic = boa_engine::object::ObjectInitializer::new(boa_context)
                .function(boa_engine::NativeFunction::from_fn_ptr(accept_message), "acceptMessage", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(arg_data_raw), "argDataRaw", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(arg_data_raw_size), "argDataRawSize", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(call_raw), "callRaw", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(call_raw128), "callRaw128", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(caller), "caller", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(candid_decode), "candidDecode", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(candid_encode), "candidEncode", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(canister_balance), "canisterBalance", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(canister_balance128), "canisterBalance128", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(canister_version), "canisterVersion", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(clear_timer), "clearTimer", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(data_certificate), "dataCertificate", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(id), "id", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(instruction_counter), "instructionCounter", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(is_controller), "isController", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(method_name), "methodName", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(msg_cycles_accept), "msgCyclesAccept", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(msg_cycles_accept128), "msgCyclesAccept128", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(msg_cycles_available), "msgCyclesAvailable", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(msg_cycles_available128), "msgCyclesAvailable128", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(msg_cycles_refunded), "msgCyclesRefunded", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(msg_cycles_refunded128), "msgCyclesRefunded128", 0)
                #(#notify_functions)*
                #(#cross_canister_functions)*
                .function(boa_engine::NativeFunction::from_fn_ptr(notify_raw), "notifyRaw", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(performance_counter), "performanceCounter", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(print), "print", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(reject), "reject", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(reject_code), "rejectCode", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(reject_message), "rejectMessage", 0)
                // .function(boa_engine::NativeFunction::from_fn_ptr(reply), "reply", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(reply_raw), "replyRaw", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(set_certified_data), "setCertifiedData", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(set_timer), "setTimer", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(set_timer_interval), "setTimerInterval", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(stable_bytes), "stableBytes", 0)
                // .function(boa_engine::NativeFunction::from_fn_ptr(stable_b_tree_map_contains_key), "stableBTreeMapContainsKey", 0)
                // .function(boa_engine::NativeFunction::from_fn_ptr(stable_b_tree_map_get), "stableBTreeMapGet", 0)
                // .function(boa_engine::NativeFunction::from_fn_ptr(stable_b_tree_map_insert), "stableBTreeMapInsert", 0)
                // .function(boa_engine::NativeFunction::from_fn_ptr(stable_b_tree_map_is_empty), "stableBTreeMapIsEmpty", 0)
                // .function(boa_engine::NativeFunction::from_fn_ptr(stable_b_tree_map_items), "stableBTreeMapItems", 0)
                // .function(boa_engine::NativeFunction::from_fn_ptr(stable_b_tree_map_keys), "stableBTreeMapKeys", 0)
                // .function(boa_engine::NativeFunction::from_fn_ptr(stable_b_tree_map_values), "stableBTreeMapValues", 0)
                // .function(boa_engine::NativeFunction::from_fn_ptr(stable_b_tree_map_len), "stableBTreeMapLen", 0)
                // .function(boa_engine::NativeFunction::from_fn_ptr(stable_b_tree_map_remove), "stableBTreeMapRemove", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(stable_grow), "stableGrow", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(stable_read), "stableRead", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(stable_size), "stableSize", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(stable_write), "stableWrite", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(stable64_grow), "stable64Grow", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(stable64_read), "stable64Read", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(stable64_size), "stable64Size", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(stable64_write), "stable64Write", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(time), "time", 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(trap), "trap", 0)
                .build();

            boa_context.register_global_property(
                "ic",
                ic,
                boa_engine::property::Attribute::all(),
            );
        }
    })
}

fn generate_notify_functions(module_name: &str, services: &Vec<Service>) -> Vec<TokenStream> {
    let module_name_ident = module_name.to_string().to_ident();

    services.iter().map(|canister| {
        canister.methods.iter().map(|method| {
            let notify_function_name_string = format!("notify_{}_{}", canister.name, method.name);
            let notify_wrapper_function_name = format_ident!("{}_wrapper", notify_function_name_string);

            let notify_with_payment128_function_name_string = format!("notify_with_payment128_{}_{}", canister.name, method.name);
            let notify_with_payment128_wrapper_function_name = format_ident!("{}_wrapper", notify_with_payment128_function_name_string);

            quote! {
                .function(boa_engine::NativeFunction::from_fn_ptr(crate::#module_name_ident::#notify_wrapper_function_name), #notify_function_name_string, 0)
                .function(boa_engine::NativeFunction::from_fn_ptr(crate::#module_name_ident::#notify_with_payment128_wrapper_function_name), #notify_with_payment128_function_name_string, 0)
            }
        }).collect()
    }).collect::<Vec<Vec<TokenStream>>>().concat()
}

fn generate_cross_canister_functions(
    module_name: &str,
    services: &Vec<Service>,
) -> Vec<TokenStream> {
    let module_name_ident = module_name.to_string().to_ident();

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
                        .function(boa_engine::NativeFunction::from_fn_ptr(crate::#module_name_ident::#call_wrapper_function_name), #call_function_name_string, 0)
                        .function(boa_engine::NativeFunction::from_fn_ptr(crate::#module_name_ident::#call_with_payment_wrapper_function_name), #call_with_payment_function_name_string, 0)
                        .function(boa_engine::NativeFunction::from_fn_ptr(crate::#module_name_ident::#call_with_payment128_wrapper_function_name), #call_with_payment128_function_name_string, 0)
                    }
                })
                .collect()
        })
        .collect::<Vec<Vec<TokenStream>>>()
        .concat()
}

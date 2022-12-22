use cdk_framework::{nodes::ActExternalCanister, ActCanisterMethod};

mod accept_message;
mod arg_data_raw;
mod arg_data_raw_size;
mod call_raw;
mod call_raw128;
mod caller;
mod candid_decode;
mod candid_encode;
mod canister_balance;
mod canister_balance128;
mod clear_timer;
mod cross_canister_functions;
mod data_certificate;
mod id;
mod method_name;
mod msg_cycles_accept;
mod msg_cycles_accept128;
mod msg_cycles_available;
mod msg_cycles_available128;
mod msg_cycles_refunded;
mod msg_cycles_refunded128;
mod notify_functions;
mod notify_raw;
mod notify_with_payment128_functions;
mod performance_counter;
mod print;
mod reject;
mod reject_code;
mod reject_message;
mod reply;
mod reply_raw;
mod set_certified_data;
mod set_timer;
mod set_timer_interval;
mod stable64_grow;
mod stable64_read;
mod stable64_size;
mod stable64_write;
mod stable_b_tree_map;
mod stable_bytes;
mod stable_grow;
mod stable_read;
mod stable_size;
mod stable_write;
mod time;
mod trap;

pub fn generate_ic_object_functions(
    canister_methods: &Vec<ActCanisterMethod>,
    external_canisters: &Vec<ActExternalCanister>,
) -> proc_macro2::TokenStream {
    let accept_message = accept_message::generate_ic_object_function_accept_message();
    let arg_data_raw = arg_data_raw::generate_ic_object_function_arg_data_raw();
    let arg_data_raw_size = arg_data_raw_size::generate_ic_object_function_arg_data_raw_size();
    let call_raw = call_raw::generate_ic_object_function_call_raw();
    let call_raw128 = call_raw128::generate_ic_object_function_call_raw128();
    let cross_canister_functions =
        cross_canister_functions::generate_ic_object_cross_canister_functions(external_canisters);
    let caller = caller::generate_ic_object_function_caller();
    let candid_decode = candid_decode::generate_ic_object_function_candid_decode();
    let candid_encode = candid_encode::generate_ic_object_function_candid_encode();
    let canister_balance = canister_balance::generate_ic_object_function_canister_balance();
    let canister_balance128 =
        canister_balance128::generate_ic_object_function_canister_balance128();
    let clear_timer = clear_timer::generate_ic_object_function_clear_timer();
    let data_certificate = data_certificate::generate_ic_object_function_data_certificate();
    let id = id::generate_ic_object_function_id();
    let method_name = method_name::generate_ic_object_function_method_name();
    let msg_cycles_accept = msg_cycles_accept::generate_ic_object_function_msg_cycles_accept();
    let msg_cycles_accept128 =
        msg_cycles_accept128::generate_ic_object_function_msg_cycles_accept128();
    let msg_cycles_available =
        msg_cycles_available::generate_ic_object_function_msg_cycles_available();
    let msg_cycles_available128 =
        msg_cycles_available128::generate_ic_object_function_msg_cycles_available128();
    let msg_cycles_refunded =
        msg_cycles_refunded::generate_ic_object_function_msg_cycles_refunded();
    let msg_cycles_refunded128 =
        msg_cycles_refunded128::generate_ic_object_function_msg_cycles_refunded128();
    let notify_functions =
        notify_functions::generate_ic_object_notify_functions(external_canisters);
    let notify_with_payment128_functions =
        notify_with_payment128_functions::generate_ic_object_notify_with_payment128_functions(
            external_canisters,
        );
    let notify_raw = notify_raw::generate_ic_object_function_notify_raw();
    let performance_counter =
        performance_counter::generate_ic_object_function_performance_counter();
    let print = print::generate_ic_object_function_print();
    let reject = reject::generate_ic_object_function_reject();
    let reject_code = reject_code::generate_ic_object_function_reject_code();
    let reject_message = reject_message::generate_ic_object_function_reject_message();
    let reply = reply::generate_ic_object_function_reply(canister_methods);
    let reply_raw = reply_raw::generate_ic_object_function_reply_raw();
    let set_certified_data = set_certified_data::generate_ic_object_function_set_certified_data();
    let set_timer = set_timer::generate_ic_object_function_set_timer();
    let set_timer_interval = set_timer_interval::generate_ic_object_function_set_timer_interval();
    let stable64_grow = stable64_grow::generate_ic_object_function_stable64_grow();
    let stable64_read = stable64_read::generate_ic_object_function_stable64_read();
    let stable64_size = stable64_size::generate_ic_object_function_stable64_size();
    let stable64_write = stable64_write::generate_ic_object_function_stable64_write();
    let stable_bytes = stable_bytes::generate_ic_object_function_stable_bytes();
    let stable_grow = stable_grow::generate_ic_object_function_stable_grow();
    let stable_read = stable_read::generate_ic_object_function_stable_read();
    let stable_size = stable_size::generate_ic_object_function_stable_size();
    let stable_write = stable_write::generate_ic_object_function_stable_write();
    let time = time::generate_ic_object_function_time();
    let trap = trap::generate_ic_object_function_trap();
    let stable_b_tree_map_functions = stable_b_tree_map::generate();

    quote::quote! {
        #accept_message
        #arg_data_raw
        #arg_data_raw_size
        #call_raw
        #call_raw128
        #(#cross_canister_functions)*
        #caller
        #candid_decode
        #candid_encode
        #canister_balance
        #canister_balance128
        #clear_timer
        #data_certificate
        #id
        #method_name
        #msg_cycles_accept
        #msg_cycles_accept128
        #msg_cycles_available
        #msg_cycles_available128
        #msg_cycles_refunded
        #msg_cycles_refunded128
        #(#notify_functions)*
        #(#notify_with_payment128_functions)*
        #notify_raw
        #performance_counter
        #print
        #reject
        #reject_code
        #reject_message
        #reply
        #reply_raw
        #set_certified_data
        #set_timer
        #set_timer_interval
        #stable_b_tree_map_functions
        #stable64_grow
        #stable64_read
        #stable64_size
        #stable64_write
        #stable_bytes
        #stable_grow
        #stable_read
        #stable_size
        #stable_write
        #time
        #trap
    }
}

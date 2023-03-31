use cdk_framework::act::node::{candid::Service, canister_method::QueryOrUpdateMethod};

use crate::StableBTreeMapNode;

mod accept_message;
mod arg_data_raw;
mod arg_data_raw_size;
mod async_call;
mod call_raw;
mod call_raw128;
mod caller;
mod candid_decode;
mod candid_encode;
mod canister_balance;
mod canister_balance128;
mod clear_timer;
mod data_certificate;
mod id;
mod method_name;
mod msg_cycles_accept;
mod msg_cycles_accept128;
mod msg_cycles_available;
mod msg_cycles_available128;
mod msg_cycles_refunded;
mod msg_cycles_refunded128;
mod notify_raw;
mod performance_counter;
mod print;
mod reject;
mod reject_code;
mod reject_message;
mod reply;
mod reply_raw;
mod service;
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

pub fn generate(
    query_and_update_methods: &Vec<QueryOrUpdateMethod>,
    services: &Vec<Service>,
    stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>,
) -> proc_macro2::TokenStream {
    let accept_message = accept_message::generate();
    let arg_data_raw = arg_data_raw::generate();
    let arg_data_raw_size = arg_data_raw_size::generate();
    let call_raw = call_raw::generate();
    let call_raw128 = call_raw128::generate();
    let caller = caller::generate();
    let candid_decode = candid_decode::generate();
    let candid_encode = candid_encode::generate();
    let canister_balance = canister_balance::generate();
    let canister_balance128 = canister_balance128::generate();
    let clear_timer = clear_timer::generate();
    let data_certificate = data_certificate::generate();
    let id = id::generate();
    let method_name = method_name::generate();
    let msg_cycles_accept = msg_cycles_accept::generate();
    let msg_cycles_accept128 = msg_cycles_accept128::generate();
    let msg_cycles_available = msg_cycles_available::generate();
    let msg_cycles_available128 = msg_cycles_available128::generate();
    let msg_cycles_refunded = msg_cycles_refunded::generate();
    let msg_cycles_refunded128 = msg_cycles_refunded128::generate();
    let notify_raw = notify_raw::generate();
    let performance_counter = performance_counter::generate();
    let print = print::generate();
    let reject = reject::generate();
    let reject_code = reject_code::generate();
    let reject_message = reject_message::generate();
    let reply = reply::generate(query_and_update_methods);
    let reply_raw = reply_raw::generate();
    let service_functions = service::generate(services);
    let set_certified_data = set_certified_data::generate();
    let set_timer = set_timer::generate();
    let set_timer_interval = set_timer_interval::generate();
    let stable64_grow = stable64_grow::generate();
    let stable64_read = stable64_read::generate();
    let stable64_size = stable64_size::generate();
    let stable64_write = stable64_write::generate();
    let stable_b_tree_map = stable_b_tree_map::generate(stable_b_tree_map_nodes);
    let stable_bytes = stable_bytes::generate();
    let stable_grow = stable_grow::generate();
    let stable_read = stable_read::generate();
    let stable_size = stable_size::generate();
    let stable_write = stable_write::generate();
    let time = time::generate();
    let trap = trap::generate();

    quote::quote! {
        #accept_message
        #arg_data_raw
        #arg_data_raw_size
        #call_raw
        #call_raw128
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
        #notify_raw
        #performance_counter
        #print
        #reject
        #reject_code
        #reject_message
        #reply
        #reply_raw
        #(#service_functions)*
        #set_certified_data
        #set_timer
        #set_timer_interval
        #stable64_grow
        #stable64_read
        #stable64_size
        #stable64_write
        #stable_b_tree_map
        #stable_bytes
        #stable_grow
        #stable_read
        #stable_size
        #stable_write
        #time
        #trap
    }
}

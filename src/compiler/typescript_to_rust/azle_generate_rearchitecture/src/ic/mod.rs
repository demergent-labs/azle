use proc_macro2::TokenStream;
use quote::quote;

mod accept_message;
mod arg_data_raw;
mod arg_data_raw_size;
mod caller;
mod candid_decode;
mod candid_encode;
mod canister_balance;
mod canister_balance128;
mod canister_version;
mod clear_timer;
mod id;
mod instruction_counter;
mod is_controller;
mod method_name;
mod msg_cycles_accept;
mod msg_cycles_accept128;
mod msg_cycles_available;
mod msg_cycles_available128;
mod msg_cycles_refunded;
mod msg_cycles_refunded128;
mod performance_counter;
mod print;
mod reject;
mod reject_message;
mod reply_raw;
mod set_certified_data;
mod stable64_read;
mod stable64_size;
mod stable64_write;
mod stable_bytes;
mod stable_read;
mod stable_size;
mod stable_write;
mod time;
mod trap;

pub fn generate() -> TokenStream {
    let accept_message = accept_message::generate();
    let arg_data_raw_size = arg_data_raw_size::generate();
    let arg_data_raw = arg_data_raw::generate();
    let caller = caller::generate();
    let candid_decode = candid_decode::generate();
    let candid_encode = candid_encode::generate();
    let canister_balance = canister_balance::generate();
    let canister_balance128 = canister_balance128::generate();
    let canister_version = canister_version::generate();
    let clear_timer = clear_timer::generate();
    let id = id::generate();
    let instruction_counter = instruction_counter::generate();
    let is_controller = is_controller::generate();
    let method_name = method_name::generate();
    let msg_cycles_accept = msg_cycles_accept::generate();
    let msg_cycles_accept128 = msg_cycles_accept128::generate();
    let msg_cycles_available = msg_cycles_available::generate();
    let msg_cycles_available128 = msg_cycles_available128::generate();
    let msg_cycles_refunded = msg_cycles_refunded::generate();
    let msg_cycles_refunded128 = msg_cycles_refunded128::generate();
    let performance_counter = performance_counter::generate();
    let print = print::generate();
    let reject = reject::generate();
    let reject_message = reject_message::generate();
    let reject = reject::generate();
    let reply_raw = reply_raw::generate();
    let set_certified_data = set_certified_data::generate();
    let stable_bytes = stable_bytes::generate();
    let stable_read = stable_read::generate();
    let stable_size = stable_size::generate();
    let stable_write = stable_write::generate();
    let stable64_read = stable64_read::generate();
    let stable64_size = stable64_size::generate();
    let stable64_write = stable64_write::generate();
    let time = time::generate();
    let trap = trap::generate();

    quote! {
        #accept_message
        #arg_data_raw_size
        #arg_data_raw
        #caller
        #candid_decode
        #candid_encode
        #canister_balance
        #canister_balance128
        #canister_version
        #id
        #instruction_counter
        #is_controller
        #method_name
        #msg_cycles_accept
        #msg_cycles_accept128
        #msg_cycles_available
        #msg_cycles_available128
        #msg_cycles_refunded
        #msg_cycles_refunded128
        #performance_counter
        #print
        #reject
        #reject_message

        let ic = context.object_value().unwrap();

        ic.set_property("acceptMessage", context.wrap_callback2(accept_message).unwrap()).unwrap();
        ic.set_property("argDataRawSize", context.wrap_callback2(arg_data_raw_size).unwrap()).unwrap();
        ic.set_property("argDataRaw", context.wrap_callback2(arg_data_raw).unwrap()).unwrap();
        ic.set_property("caller", context.wrap_callback2(caller).unwrap()).unwrap();
        ic.set_property("candidDecode", context.wrap_callback2(candid_decode).unwrap()).unwrap();
        ic.set_property("candidEncode", context.wrap_callback2(candid_encode).unwrap()).unwrap();
        ic.set_property("canisterBalance", context.wrap_callback2(canister_balance).unwrap()).unwrap();
        ic.set_property("canisterBalance128", context.wrap_callback2(canister_balance128).unwrap()).unwrap();
        ic.set_property("canisterVersion", context.wrap_callback2(canister_version).unwrap()).unwrap();
        ic.set_property("print", context.wrap_callback2(print).unwrap()).unwrap();
        ic.set_property("id", context.wrap_callback2(id).unwrap()).unwrap();
        ic.set_property("instructionCounter", context.wrap_callback2(instruction_counter).unwrap()).unwrap();
        ic.set_property("isController", context.wrap_callback2(is_controller).unwrap()).unwrap();
        ic.set_property("methodName", context.wrap_callback2(method_name).unwrap()).unwrap();
        ic.set_property("msgCyclesAccept", context.wrap_callback2(msg_cycles_accept).unwrap()).unwrap();
        ic.set_property("msgCyclesAccept128", context.wrap_callback2(msg_cycles_accept128).unwrap()).unwrap();
        ic.set_property("msgCyclesAvailable", context.wrap_callback2(msg_cycles_available).unwrap()).unwrap();
        ic.set_property("msgCyclesAvailable128", context.wrap_callback2(msg_cycles_available128).unwrap()).unwrap();
        ic.set_property("msgCyclesRefunded", context.wrap_callback2(msg_cycles_refunded).unwrap()).unwrap();
        ic.set_property("msgCyclesRefunded128", context.wrap_callback2(msg_cycles_refunded128).unwrap()).unwrap();
        ic.set_property("performanceCounter", context.wrap_callback2(performance_counter).unwrap()).unwrap();
        ic.set_property("print", context.wrap_callback2(print).unwrap()).unwrap();
        ic.set_property("reject", context.wrap_callback2(reject).unwrap()).unwrap();
        ic.set_property("rejectMessage", context.wrap_callback2(reject_message).unwrap()).unwrap();

        let global = context.global_object().unwrap();
        global.set_property("_azleIc", ic).unwrap();
    }
}

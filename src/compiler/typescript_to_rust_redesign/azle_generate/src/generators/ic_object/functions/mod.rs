mod accept_message;
mod arg_data_raw;
mod arg_data_raw_size;
mod caller;
mod candid_decode;
mod candid_encode;
mod canister_balance;
mod canister_balance128;
mod data_certificate;
mod id;
mod method_name;
mod notify_raw;
mod performance_counter;
mod print;
mod reject;
mod set_certified_data;
mod stable64_grow;
mod stable64_read;
mod stable64_size;
mod stable64_write;
mod stable_bytes;
mod stable_grow;
mod stable_read;
mod stable_size;
mod stable_write;
mod time;
mod trap;

pub fn generate_ic_object_functions() -> proc_macro2::TokenStream {
    let accept_message = accept_message::generate_ic_object_function_accept_message();
    let arg_data_raw = arg_data_raw::generate_ic_object_function_arg_data_raw();
    let arg_data_raw_size = arg_data_raw_size::generate_ic_object_function_arg_data_raw_size();
    let caller = caller::generate_ic_object_function_caller();
    let candid_decode = candid_decode::generate_ic_object_function_candid_decode();
    let candid_encode = candid_encode::generate_ic_object_function_candid_encode();
    let canister_balance = canister_balance::generate_ic_object_function_canister_balance();
    let canister_balance128 =
        canister_balance128::generate_ic_object_function_canister_balance128();
    let data_certificate = data_certificate::generate_ic_object_function_data_certificate();
    let id = id::generate_ic_object_function_id();
    let method_name = method_name::generate_ic_object_function_method_name();
    let notify_raw = notify_raw::generate_ic_object_function_notify_raw();
    let performance_counter =
        performance_counter::generate_ic_object_function_performance_counter();
    let print = print::generate_ic_object_function_print();
    let reject = reject::generate_ic_object_function_reject();
    let set_certified_data = set_certified_data::generate_ic_object_function_set_certified_data();
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

    quote::quote! {
        #accept_message
        #arg_data_raw
        #arg_data_raw_size
        #caller
        #candid_decode
        #candid_encode
        #canister_balance
        #canister_balance128
        #data_certificate
        #id
        #method_name
        #notify_raw
        #performance_counter
        #print
        #reject
        #set_certified_data
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

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
        #time
        #trap
    }
}

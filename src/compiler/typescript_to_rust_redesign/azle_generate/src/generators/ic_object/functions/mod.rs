mod arg_data_raw;
mod arg_data_raw_size;
mod caller;
mod candid_decode;
mod candid_encode;
mod canister_balance;
mod canister_balance128;
mod data_certificate;
mod id;
mod performance_counter;
mod print;
mod reject;
mod set_certified_data;
mod time;
mod trap;

use arg_data_raw::generate_ic_object_function_arg_data_raw;
use arg_data_raw_size::generate_ic_object_function_arg_data_raw_size;
use caller::generate_ic_object_function_caller;
use candid_decode::generate_ic_object_function_candid_decode;
use candid_encode::generate_ic_object_function_candid_encode;
use canister_balance::generate_ic_object_function_canister_balance;
use canister_balance128::generate_ic_object_function_canister_balance128;
use data_certificate::generate_ic_object_function_data_certificate;
use id::generate_ic_object_function_id;
use performance_counter::generate_ic_object_function_performance_counter;
use print::generate_ic_object_function_print;
use reject::generate_ic_object_function_reject;
use set_certified_data::generate_ic_object_function_set_certified_data;
use time::generate_ic_object_function_time;
use trap::generate_ic_object_function_trap;

pub fn generate_ic_object_functions() -> proc_macro2::TokenStream {
    let arg_data_raw = generate_ic_object_function_arg_data_raw();
    let arg_data_raw_size = generate_ic_object_function_arg_data_raw_size();
    let caller = generate_ic_object_function_caller();
    let candid_decode = generate_ic_object_function_candid_decode();
    let candid_encode = generate_ic_object_function_candid_encode();
    let canister_balance = generate_ic_object_function_canister_balance();
    let canister_balance128 = generate_ic_object_function_canister_balance128();
    let data_certificate = generate_ic_object_function_data_certificate();
    let id = generate_ic_object_function_id();
    let performance_counter = generate_ic_object_function_performance_counter();
    let print = generate_ic_object_function_print();
    let reject = generate_ic_object_function_reject();
    let set_certified_data = generate_ic_object_function_set_certified_data();
    let time = generate_ic_object_function_time();
    let trap = generate_ic_object_function_trap();

    quote::quote! {
        #arg_data_raw
        #arg_data_raw_size
        #caller
        #candid_decode
        #candid_encode
        #canister_balance
        #canister_balance128
        #data_certificate
        #id
        #performance_counter
        #print
        #reject
        #set_certified_data
        #time
        #trap
    }
}

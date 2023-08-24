use proc_macro2::TokenStream;
use quote::quote;

mod accept_message;
mod arg_data_raw;
mod id;
mod print;

pub fn generate() -> TokenStream {
    let accept_message = accept_message::generate();
    let arg_data_raw = arg_data_raw::generate();
    let id = id::generate();
    let print = print::generate();

    quote! {
        #accept_message
        #arg_data_raw
        #id
        #print

        let ic = context.object_value().unwrap();
        ic.set_property("print", context.wrap_callback2(print).unwrap()).unwrap();
        ic.set_property("id", context.wrap_callback2(id).unwrap()).unwrap();

        let global = context.global_object().unwrap();
        global.set_property("ic", ic).unwrap();
    }
}

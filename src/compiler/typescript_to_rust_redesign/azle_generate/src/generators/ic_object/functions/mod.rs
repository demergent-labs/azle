mod performance_counter;
mod print;

use performance_counter::generate_ic_object_function_performance_counter;
use print::generate_ic_object_function_print;

pub fn generate_ic_object_functions() -> proc_macro2::TokenStream {
    let performance_counter = generate_ic_object_function_performance_counter();
    let print = generate_ic_object_function_print();

    quote::quote! {
        #performance_counter
        #print
    }
}

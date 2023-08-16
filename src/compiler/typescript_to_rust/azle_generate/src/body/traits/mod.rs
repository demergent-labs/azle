mod colors;
mod get_array_length;
mod serialize;
mod to_console_string;

pub fn generate() -> proc_macro2::TokenStream {
    let colors = colors::generate();
    let get_array_length = get_array_length::generate();
    let to_console_string = to_console_string::generate();
    let serialize = serialize::generate();

    quote::quote! {
        #colors
        #get_array_length
        #to_console_string
        #serialize
    }
}

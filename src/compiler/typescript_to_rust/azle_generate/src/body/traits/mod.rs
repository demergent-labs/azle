mod get_array_length;
mod to_std_string;

pub fn generate() -> proc_macro2::TokenStream {
    let get_array_length = get_array_length::generate();
    let to_std_string = to_std_string::generate();

    quote::quote! {
        #get_array_length
        #to_std_string
    }
}

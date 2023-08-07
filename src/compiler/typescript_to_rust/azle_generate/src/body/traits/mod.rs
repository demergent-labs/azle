mod get_array_length;

pub fn generate() -> proc_macro2::TokenStream {
    let get_array_length = get_array_length::generate();

    quote::quote! {
        #get_array_length
    }
}

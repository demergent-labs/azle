use proc_macro2::{Ident, TokenStream};

pub fn generate(wrapper_type_name: &Ident, max_size: u32) -> TokenStream {
    quote::quote! {
        impl BoundedStorable for #wrapper_type_name {
            fn max_size() -> u32 {
                #max_size
            }
        }
    }
}

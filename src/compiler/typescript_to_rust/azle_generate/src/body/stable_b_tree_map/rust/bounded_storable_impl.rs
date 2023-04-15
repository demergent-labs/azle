use proc_macro2::{Ident, TokenStream};

pub fn generate(wrapper_type_name: &Ident, max_size: u32) -> TokenStream {
    quote::quote! {
        impl ic_stable_structures::BoundedStorable for #wrapper_type_name {
            const MAX_SIZE: u32 = #max_size;
            const IS_FIXED_SIZE: bool = false;
        }
    }
}

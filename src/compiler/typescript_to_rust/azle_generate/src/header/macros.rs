use crate::body::stable_b_tree_map::rust::impls_macro;

pub fn generate() -> proc_macro2::TokenStream {
    let impls_macro = impls_macro::generate();

    quote::quote! {
        #impls_macro
    }
}

mod basic;
mod error_conversions;
mod generic;
mod numeric;
mod vec;

pub fn generate() -> proc_macro2::TokenStream {
    let error_conversions = error_conversions::generate();

    let basic_impls = basic::generate();
    let generic_impls = generic::generate();
    let numeric_impls = numeric::generate();
    let vec_impls = vec::generate();

    quote::quote! {
        #error_conversions
        #basic_impls
        #generic_impls
        #numeric_impls
        #vec_impls
    }
}

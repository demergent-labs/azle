mod basic;
mod generic;
mod numeric;
mod vec;

pub fn generate() -> proc_macro2::TokenStream {
    let basic_impls = basic::generate();
    let numeric_impls = numeric::generate();
    let generic_impls = generic::generate();
    let vec_impls = vec::generate();

    quote::quote! {
        #basic_impls
        #numeric_impls
        #generic_impls
        #vec_impls
    }
}

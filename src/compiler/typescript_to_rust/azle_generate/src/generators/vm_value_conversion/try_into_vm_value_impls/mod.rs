mod basic;
mod generic;
mod numeric;
mod vec;

pub fn generate() -> proc_macro2::TokenStream {
    let basic_impls = basic::generate();
    let generic_impls = generic::generate();
    let numeric_impls = numeric::generate();
    let vec_impls = vec::generate();

    quote::quote! {
        #basic_impls
        #generic_impls
        #numeric_impls
        #vec_impls
    }
}

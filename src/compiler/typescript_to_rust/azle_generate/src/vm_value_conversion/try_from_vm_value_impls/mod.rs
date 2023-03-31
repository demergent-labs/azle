mod basic;
mod generic;
mod numeric;
mod result;
mod vec;

pub fn generate() -> proc_macro2::TokenStream {
    let basic_impls = basic::generate();
    let generic_impls = generic::generate();
    let numeric_impls = numeric::generate();
    let result_impls = result::generate();
    let vec_impls = vec::generate();

    quote::quote! {
        #basic_impls
        #generic_impls
        #numeric_impls
        #result_impls
        #vec_impls
    }
}

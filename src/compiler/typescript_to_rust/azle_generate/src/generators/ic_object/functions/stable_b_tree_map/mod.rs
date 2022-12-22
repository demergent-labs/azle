mod contains_key;
mod get;
mod insert;
mod is_empty;
mod len;
mod remove;

pub fn generate() -> proc_macro2::TokenStream {
    let contains_key = contains_key::generate();
    let get = get::generate();
    let insert = insert::generate();
    let is_empty = is_empty::generate();
    let len = len::generate();
    let remove = remove::generate();

    quote::quote! {
        #contains_key
        #get
        #insert
        #is_empty
        #len
        #remove
    }
}

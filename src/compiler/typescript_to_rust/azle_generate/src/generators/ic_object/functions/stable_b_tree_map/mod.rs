use crate::StableBTreeMapNode;

mod contains_key;
mod get;
mod insert;
mod is_empty;
mod len;
mod remove;

pub fn generate(stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>) -> proc_macro2::TokenStream {
    let contains_key = contains_key::generate(stable_b_tree_map_nodes);
    let get = get::generate(stable_b_tree_map_nodes);
    let insert = insert::generate(stable_b_tree_map_nodes);
    let is_empty = is_empty::generate(stable_b_tree_map_nodes);
    let len = len::generate(stable_b_tree_map_nodes);
    let remove = remove::generate(stable_b_tree_map_nodes);

    quote::quote! {
        #contains_key
        #get
        #insert
        #is_empty
        #len
        #remove
    }
}

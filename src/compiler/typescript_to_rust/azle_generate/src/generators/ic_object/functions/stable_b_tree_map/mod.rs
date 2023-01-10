use crate::StableBTreeMapNode;

mod contains_key;
mod get;
mod insert;
mod is_empty;
mod items;
mod keys;
mod len;
mod remove;
mod values;

pub fn generate(stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>) -> proc_macro2::TokenStream {
    let contains_key = contains_key::generate(stable_b_tree_map_nodes);
    let get = get::generate(stable_b_tree_map_nodes);
    let insert = insert::generate(stable_b_tree_map_nodes);
    let is_empty = is_empty::generate(stable_b_tree_map_nodes);
    let items = items::generate(stable_b_tree_map_nodes);
    let keys = keys::generate(stable_b_tree_map_nodes);
    let len = len::generate(stable_b_tree_map_nodes);
    let remove = remove::generate(stable_b_tree_map_nodes);
    let values = values::generate(stable_b_tree_map_nodes);

    quote::quote! {
        #contains_key
        #get
        #insert
        #is_empty
        #items
        #keys
        #len
        #remove
        #values
    }
}

use proc_macro2::TokenStream;
use quote::quote;

use crate::StableBTreeMapNode;

pub mod impls_macro;
pub mod ref_cell_ident;
pub mod wrapper_type;

pub fn generate(stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>) -> TokenStream {
    stable_b_tree_map_nodes
        .iter()
        .map(|stable_b_tree_map_node| {
            let memory_id = stable_b_tree_map_node.memory_id;

            let (key_wrapper_type_name, key_wrapper_type) =
                wrapper_type::generate(&stable_b_tree_map_node.key_type, memory_id, "Key");
            let (value_wrapper_type_name, value_wrapper_type) =
                wrapper_type::generate(&stable_b_tree_map_node.value_type, memory_id, "Value");

            let max_key_size = stable_b_tree_map_node.max_key_size;
            let max_value_size = stable_b_tree_map_node.max_value_size;

            quote! {
                #key_wrapper_type
                stable_b_tree_map_type_impls!(#key_wrapper_type_name, #max_key_size);

                #value_wrapper_type
                stable_b_tree_map_type_impls!(#value_wrapper_type_name, #max_value_size);
            }
        })
        .collect()
}

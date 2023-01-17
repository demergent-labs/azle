use cdk_framework::ToTokenStream;
use quote::quote;

use crate::{generators::stable_b_tree_map, StableBTreeMapNode};

pub fn generate(stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>) -> proc_macro2::TokenStream {
    let match_arms = generate_match_arms(stable_b_tree_map_nodes);

    quote! {
        fn _azle_ic_stable_b_tree_map_values(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let memory_id: u8 = _aargs.get(0).unwrap().clone().try_from_vm_value(&mut *_context).unwrap();

            match memory_id {
                #(#match_arms)*
                _ => panic!("memory_id {} does not have an associated StableBTreeMap", memory_id)
            }
        }
    }
}

fn generate_match_arms(
    stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>,
) -> Vec<proc_macro2::TokenStream> {
    stable_b_tree_map_nodes
        .iter()
        .map(|stable_b_tree_map_node| {
            let memory_id = stable_b_tree_map_node.memory_id;
            let value_type = stable_b_tree_map_node.value_type.to_token_stream(&vec![]); // TODO do we need the keyword lists?
            let stable_b_tree_map_ref_cell =
                stable_b_tree_map::ref_cell_ident::generate(stable_b_tree_map_node.memory_id);

            quote! {
                #memory_id => {
                    Ok(
                        #stable_b_tree_map_ref_cell.with(|stable_b_tree_map_ref_cell| {
                            stable_b_tree_map_ref_cell
                                .borrow()
                                .iter()
                                .map(|(_, value_wrapper_type)| value_wrapper_type.0)
                                .collect::<Vec<#value_type>>()
                        }).try_into_vm_value(&mut *_context).unwrap()
                    )
                }
            }
        })
        .collect()
}

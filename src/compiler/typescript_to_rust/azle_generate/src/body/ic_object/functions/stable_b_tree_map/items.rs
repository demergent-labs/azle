use quote::quote;

use crate::{body::stable_b_tree_map, StableBTreeMapNode};

pub fn generate(stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>) -> proc_macro2::TokenStream {
    let match_arms = generate_match_arms(stable_b_tree_map_nodes);

    quote! {
        fn stable_b_tree_map_items(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let memory_id: u8 = aargs.get(0).unwrap().clone().try_from_vm_value(&mut *context).unwrap();

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
            let stable_b_tree_map_ref_cell =
                stable_b_tree_map::rust::ref_cell_ident::generate(stable_b_tree_map_node.memory_id);

            quote! {
                #memory_id => {
                    let items = #stable_b_tree_map_ref_cell.with(|stable_b_tree_map_ref_cell| {
                        stable_b_tree_map_ref_cell
                            .borrow()
                            .iter()
                            .map(|(key_wrapper_type, value_wrapper_type)| {
                                let key = key_wrapper_type.0.try_into_vm_value(&mut *context).unwrap();
                                let value = value_wrapper_type.0.try_into_vm_value(&mut *context).unwrap();
                                let tuple = vec![key, value];

                                boa_engine::object::builtins::JsArray::from_iter(tuple, &mut *context).into()
                            })
                            .collect::<Vec<boa_engine::JsValue>>()
                    });

                    Ok(boa_engine::object::builtins::JsArray::from_iter(items, &mut *context).into())
                }
            }
        })
        .collect()
}

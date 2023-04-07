use quote::quote;

use crate::{body::stable_b_tree_map, StableBTreeMapNode};

pub fn generate(stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>) -> proc_macro2::TokenStream {
    let match_arms = generate_match_arms(stable_b_tree_map_nodes);

    quote::quote! {
        fn stable_b_tree_map_insert(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let memory_id: u8 = _aargs.get(0).unwrap().clone().try_from_vm_value(&mut *_context).unwrap();
            let key_js_value = _aargs.get(1).unwrap().clone();
            let value_js_value = _aargs.get(2).unwrap().clone();

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
            let map_name_ident =
                stable_b_tree_map::rust::ref_cell_ident::generate(stable_b_tree_map_node.memory_id);

            let (key_wrapper_type_name, _) = stable_b_tree_map::rust::wrapper_type::generate(
                &stable_b_tree_map_node.key_type,
                memory_id,
                "Key",
            );
            let (value_wrapper_type_name, _) = stable_b_tree_map::rust::wrapper_type::generate(
                &stable_b_tree_map_node.value_type,
                memory_id,
                "Value",
            );

            // TODO the return value here might need a little work like in get
            quote! {
                #memory_id => {
                    let key = crate::#key_wrapper_type_name(
                        key_js_value.try_from_vm_value(&mut *_context).unwrap()
                    );
                    let value = crate::#value_wrapper_type_name(
                        value_js_value.try_from_vm_value(&mut *_context).unwrap()
                    );

                    let insert_result = crate::ref_cells::#map_name_ident.with(|p| {
                        p.borrow_mut().insert(key, value)
                    });

                    Ok(insert_result.try_into_vm_value(&mut *_context).unwrap())
                }
            }
        })
        .collect()
}

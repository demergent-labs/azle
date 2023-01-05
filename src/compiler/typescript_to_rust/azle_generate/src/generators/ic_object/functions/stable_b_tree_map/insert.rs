use quote::quote;

use crate::{generators::stable_b_tree_map, StableBTreeMapNode};

pub fn generate(stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>) -> proc_macro2::TokenStream {
    let match_arms = generate_match_arms(stable_b_tree_map_nodes);

    quote::quote! {
        fn _azle_ic_stable_b_tree_map_insert(
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
                stable_b_tree_map::ref_cell_ident(stable_b_tree_map_node.memory_id);

            let (key_wrapper_type_name, _) = stable_b_tree_map::generate_wrapper_type(
                &stable_b_tree_map_node.key_type,
                memory_id,
                "Key",
            );
            let (value_wrapper_type_name, _) = stable_b_tree_map::generate_wrapper_type(
                &stable_b_tree_map_node.value_type,
                memory_id,
                "Value",
            );

            // TODO the return value here might need a little work like in get
            quote! {
                #memory_id => {
                    let key = #key_wrapper_type_name(
                        key_js_value.try_from_vm_value(&mut *_context).unwrap()
                    );
                    let value = #value_wrapper_type_name(
                        value_js_value.try_from_vm_value(&mut *_context).unwrap()
                    );

                    let insert_result = #map_name_ident.with(|p| {
                        p.borrow_mut().insert(key, value)
                    });

                    let name_and_js_value = match insert_result {
                        Ok(existing_value_option) => {
                            let ok_js_value = match existing_value_option {
                                Some(existing_value) => {
                                    existing_value.0.try_into_vm_value(&mut *_context).unwrap()
                                }
                                None => ().try_into_vm_value(&mut *_context).unwrap()
                            };

                            ("ok", ok_js_value)
                        },
                        Err(insert_error) => {
                            ("err", insert_error.try_into_vm_value(&mut *_context).unwrap())
                        }
                    };

                    let result_object = boa_engine::object::ObjectInitializer::new(&mut *_context)
                        .property(
                            name_and_js_value.0,
                            name_and_js_value.1,
                            boa_engine::property::Attribute::all()
                        )
                        .build();

                    Ok(result_object.into())
                }
            }
        })
        .collect()
}

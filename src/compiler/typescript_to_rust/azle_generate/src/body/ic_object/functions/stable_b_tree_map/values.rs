// use cdk_framework::act::node::candid::type_annotation::ToTypeAnnotation;
use quote::{format_ident, quote};

use crate::{body::stable_b_tree_map, StableBTreeMapNode};

pub fn generate(stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>) -> proc_macro2::TokenStream {
    let match_arms = generate_match_arms(stable_b_tree_map_nodes);

    quote! {
        fn stable_b_tree_map_values(
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

            // let value_type = stable_b_tree_map_node.value_type.to_type_annotation(
            //     &ts_keywords::ts_keywords(),
            //     format!("StableBTreeMap{}Value", memory_id),
            // ); // TODO do we need the keyword lists?

            // TODO: I'm thinking that maybe Rust can figure out the type as long as we tell it
            // that it's collecting into a vec below. So we can just have it deduce the type with
            // "_"
            let value_type = format_ident!("_");

            let stable_b_tree_map_ref_cell =
                stable_b_tree_map::rust::ref_cell_ident::generate(stable_b_tree_map_node.memory_id);

            quote! {
                #memory_id => {
                    Ok(
                        #stable_b_tree_map_ref_cell.with(|stable_b_tree_map_ref_cell| {
                            stable_b_tree_map_ref_cell
                                .borrow()
                                .iter()
                                .map(|(_, value_wrapper_type)| value_wrapper_type.0)
                                .collect::<Vec<#value_type>>()
                        }).try_into_vm_value(&mut *context).unwrap()
                    )
                }
            }
        })
        .collect()
}

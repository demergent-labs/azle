use crate::body::stable_b_tree_map::{
    rust::{ref_cell_ident, wrapper_type},
    StableBTreeMapNode,
};
use proc_macro2::TokenStream;
use quote::quote;

pub fn generate(stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>) -> TokenStream {
    let stable_b_tree_maps = generate_stable_b_tree_map_ref_cells(stable_b_tree_map_nodes);

    quote! {
        pub mod ref_cells {
            use std::{cell::RefCell,collections::HashMap};
            use boa_engine::{Context, JsValue};
            use ic_stable_structures::{
                memory_manager::{MemoryId, MemoryManager, VirtualMemory},
                BoundedStorable, DefaultMemoryImpl, StableBTreeMap, Storable,
            };
            type Memory = VirtualMemory<DefaultMemoryImpl>;

            thread_local! {
                pub static BOA_CONTEXT: RefCell<Context> = RefCell::new(Context::default());
                pub static PROMISE_MAP: RefCell<HashMap<String, JsValue>> = RefCell::new(HashMap::new());
                pub static UUID: RefCell<String> = RefCell::new("".to_string());
                pub static METHOD_NAME: RefCell<String> = RefCell::new("".to_string());
                pub static MANUAL: RefCell<bool> = RefCell::new(false);

                static MEMORY_MANAGER_REF_CELL: RefCell<MemoryManager<DefaultMemoryImpl>>
                    = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

                #(#stable_b_tree_maps)*
            }

            pub fn get_uuid() -> String {
                UUID.with(|uuid_ref_cell| uuid_ref_cell.borrow().clone())
            }
            pub fn set_uuid(uuid: &String) {
                UUID.with(|uuid_ref_cell| {
                    let mut uuid_mut = uuid_ref_cell.borrow_mut();
                    *uuid_mut = uuid.clone();
                });
            }

            pub fn get_method_name() -> String {
                METHOD_NAME.with(|method_name_ref_cell| method_name_ref_cell.borrow().clone())
            }
            pub fn set_method_name(method_name: &String) {
                METHOD_NAME.with(|method_name_ref_cell| {
                    let mut method_name_mut = method_name_ref_cell.borrow_mut();
                    *method_name_mut = method_name.clone()
                });
            }

            pub fn get_is_manual() -> bool {
                MANUAL.with(|manual_ref_cell| manual_ref_cell.borrow().clone())
            }
            pub fn set_is_manual(is_manual: bool) {
                crate::ref_cells::MANUAL.with(|manual_ref_cell| {
                    let mut manual_mut = manual_ref_cell.borrow_mut();
                    *manual_mut = is_manual;
                });
            }
        }
    }
}

fn generate_stable_b_tree_map_ref_cells(
    stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>,
) -> Vec<TokenStream> {
    stable_b_tree_map_nodes
        .iter()
        .map(|stable_b_tree_map_node| {
            let map_name_ident = ref_cell_ident::generate(stable_b_tree_map_node.memory_id);
            let memory_id = stable_b_tree_map_node.memory_id;

            let (key_wrapper_type_name, _) =
                wrapper_type::generate(&stable_b_tree_map_node.key_type, memory_id, "Key");
            let (value_wrapper_type_name, _) =
                wrapper_type::generate(&stable_b_tree_map_node.value_type, memory_id, "Value");

            quote! {
                pub static #map_name_ident: RefCell<
                    StableBTreeMap<Memory, crate::#key_wrapper_type_name, crate::#value_wrapper_type_name>
                > = RefCell::new(StableBTreeMap::init(
                    MEMORY_MANAGER_REF_CELL.with(|m| m.borrow().get(MemoryId::new(#memory_id))),
                ));
            }
        })
        .collect()
}

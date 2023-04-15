use proc_macro2::TokenStream;
use quote::quote;

use crate::StableBTreeMapNode;

mod bounded_storable_impl;
mod storable_impl;

pub mod ref_cell_ident;
pub mod try_into_vm_value_impl;
pub mod wrapper_type;

pub fn generate(stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>) -> TokenStream {
    let stable_b_tree_maps_and_impls =
        generate_global_stable_b_tree_maps_and_impls(stable_b_tree_map_nodes);
    let stable_b_tree_maps: Vec<TokenStream> = stable_b_tree_maps_and_impls
        .iter()
        .map(|stable_b_tree_map_and_impl| stable_b_tree_map_and_impl.0.clone())
        .collect();
    let stable_b_tree_impls: Vec<TokenStream> = stable_b_tree_maps_and_impls
        .iter()
        .map(|stable_b_tree_map_and_impl| stable_b_tree_map_and_impl.1.clone())
        .collect();

    quote! {
        thread_local! {
            static MEMORY_MANAGER_REF_CELL: std::cell::RefCell<ic_stable_structures::memory_manager::MemoryManager<ic_stable_structures::DefaultMemoryImpl>>
                = std::cell::RefCell::new(ic_stable_structures::memory_manager::MemoryManager::init(ic_stable_structures::DefaultMemoryImpl::default()));

            #(#stable_b_tree_maps)*
        }

        #(#stable_b_tree_impls)*
    }
}

fn generate_global_stable_b_tree_maps_and_impls(
    stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>,
) -> Vec<(proc_macro2::TokenStream, proc_macro2::TokenStream)> {
    stable_b_tree_map_nodes
        .iter()
        .map(|stable_b_tree_map_node| {
            let map_name_ident = ref_cell_ident::generate(stable_b_tree_map_node.memory_id);
            let memory_id = stable_b_tree_map_node.memory_id;

            let (key_wrapper_type_name, key_wrapper_type) =
                wrapper_type::generate(&stable_b_tree_map_node.key_type, memory_id, "Key");
            let (value_wrapper_type_name, value_wrapper_type) =
                wrapper_type::generate(&stable_b_tree_map_node.value_type, memory_id, "Value");

            let key_try_into_vm_value_impl =
                try_into_vm_value_impl::generate(&key_wrapper_type_name);
            let key_storable_impl = storable_impl::generate(&key_wrapper_type_name);
            let key_bounded_storable_impl = bounded_storable_impl::generate(
                &key_wrapper_type_name,
                stable_b_tree_map_node.max_key_size,
            );

            let value_try_into_vm_value_impl =
                try_into_vm_value_impl::generate(&value_wrapper_type_name);
            let value_storable_impl = storable_impl::generate(&value_wrapper_type_name);
            let value_bounded_storable_impl = bounded_storable_impl::generate(
                &value_wrapper_type_name,
                stable_b_tree_map_node.max_value_size,
            );

            (
                quote! {
                    static #map_name_ident: std::cell::RefCell<
                        ic_stable_structures::StableBTreeMap<
                            #key_wrapper_type_name,
                            #value_wrapper_type_name,
                            ic_stable_structures::memory_manager::VirtualMemory<
                                ic_stable_structures::DefaultMemoryImpl
                            >
                        >
                    > = std::cell::RefCell::new(ic_stable_structures::StableBTreeMap::init(
                        MEMORY_MANAGER_REF_CELL.with(|m| {
                            m.borrow().get(ic_stable_structures::memory_manager::MemoryId::new(#memory_id))
                        }),
                    ));
                },
                quote! {
                    #key_wrapper_type
                    #key_try_into_vm_value_impl
                    #key_storable_impl
                    #key_bounded_storable_impl

                    #value_wrapper_type
                    #value_try_into_vm_value_impl
                    #value_storable_impl
                    #value_bounded_storable_impl
                },
            )
        })
        .collect()
}

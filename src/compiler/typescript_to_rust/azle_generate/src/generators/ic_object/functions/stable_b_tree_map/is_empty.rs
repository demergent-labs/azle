use crate::StableBTreeMapNode;

pub fn generate(stable_b_tree_map_nodes: &Vec<StableBTreeMapNode>) -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_stable_b_tree_map_is_empty(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            // TODO: Implement this!
            Ok(true.try_into_vm_value(_context).unwrap())
        }
    }
}

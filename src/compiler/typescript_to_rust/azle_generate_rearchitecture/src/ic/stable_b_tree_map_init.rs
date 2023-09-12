use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn stable_b_tree_map_init<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let memory_id_candid_bytes: Vec<u8> = args.get(0).expect("stable_b_tree_map_get argument 0 is undefined").to_js_value()?.try_into()?;
            let memory_id: u8 = candid::decode_one(&memory_id_candid_bytes)?;

            STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
                let mut stable_b_tree_maps = stable_b_tree_maps.borrow_mut();
                stable_b_tree_maps.push(
                    StableBTreeMap::init_v2(MEMORY_MANAGER_REF_CELL.with(|m| m.borrow().get(MemoryId::new(memory_id))),)
                );
            });

            context.undefined_value()
        }
    }
}

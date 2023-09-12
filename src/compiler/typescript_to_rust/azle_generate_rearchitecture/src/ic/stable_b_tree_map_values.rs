use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn stable_b_tree_map_values<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let memory_id_candid_bytes: Vec<u8> = args.get(0).expect("stable_b_tree_map_get argument 0 is undefined").to_js_value()?.try_into()?;
            let memory_id: u8 = candid::decode_one(&memory_id_candid_bytes)?;

            let values: Vec<Vec<u8>> = STABLE_B_TREE_MAPS.with(|stable_b_tree_maps| {
                let stable_b_tree_maps = stable_b_tree_maps.borrow();

                stable_b_tree_maps[memory_id as usize].iter().map(|(_, value)| value.candid_bytes).collect()
            });

            let js_values: Vec<JSValue> = values.into_iter().map(|value| value.into()).collect();

            let js_value: JSValue = js_values.into();

            to_qjs_value(&context, &js_value)
        }
    }
}

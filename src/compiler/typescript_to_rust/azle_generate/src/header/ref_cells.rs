pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        thread_local! {
            static BOA_CONTEXT_REF_CELL: std::cell::RefCell<boa_engine::Context> =
                std::cell::RefCell::new(boa_engine::Context::default());
            static PROMISE_MAP_REF_CELL: std::cell::RefCell<
                std::collections::HashMap<String, boa_engine::JsValue>,
            > = std::cell::RefCell::new(std::collections::HashMap::new());
            static UUID_REF_CELL: std::cell::RefCell<String> =
                std::cell::RefCell::new("".to_string());
            static METHOD_NAME_REF_CELL: std::cell::RefCell<String> =
                std::cell::RefCell::new("".to_string());
            static MANUAL_REF_CELL: std::cell::RefCell<bool> =
                std::cell::RefCell::new(false);
        }
    }
}

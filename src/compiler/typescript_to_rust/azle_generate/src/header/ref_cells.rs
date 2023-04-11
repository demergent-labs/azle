pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        thread_local! {
            static BOA_CONTEXT_REF_CELL: std::cell::RefCell<boa_engine::Context<'static>> = {
                // TODO leaking here is most likely not production-worthy
                // TODO Boa needs to allow us to pass in a job queue that is owned by the context builder
                // TODO once that happens we can remove this leak
                let job_queue = Box::leak(Box::new(boa_engine::job::SimpleJobQueue::new()));
                let context = boa_engine::context::ContextBuilder::new()
                    .job_queue(job_queue)
                    .build()
                    .unwrap();
                RefCell::new(context)
            };
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

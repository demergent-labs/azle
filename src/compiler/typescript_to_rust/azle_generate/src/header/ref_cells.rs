pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        thread_local! {
            // TODO all of this is for when we embrace native async functions
            // static SIMPLE_JOB_QUEUE_REF_CELL: std::cell::RefCell<boa_engine::job::SimpleJobQueue> = std::cell::RefCell::new(boa_engine::job::SimpleJobQueue::new());
            // let queue: Rc<dyn JobQueue> = Rc::new(queue);
            // let context = Context::builder().job_queue(queue).build().unwrap();
            // static BOA_CONTEXT_REF_CELL: std::cell::RefCell<boa_engine::Context<'static>> =
            // std::cell::RefCell::new(boa_engine::Context::default());
            // let job_queue: &dyn boa_engine::job::JobQueue = &boa_engine::job::SimpleJobQueue::new();
            // let job_queue: &dyn boa_engine::job::JobQueue = SIMPLE_JOB_QUEUE_REF_CELL.with(|jq| jq.borrow());
            // let job_queue: &dyn boa_engine::job::JobQueue = &SIMPLE_JOB_QUEUE_REF_CELL.with(|jq| *jq.borrow());

            static BOA_CONTEXT_REF_CELL: std::cell::RefCell<boa_engine::Context<'static>> = {
                struct Hooks;

                impl boa_engine::context::HostHooks for Hooks {
                    fn utc_now(&self) -> chrono::NaiveDateTime {
                        chrono::NaiveDateTime::from_timestamp_opt((ic_cdk::api::time() / 1_000_000_000) as i64, 0).unwrap()
                    }

                    fn tz_offset(&self) -> chrono::FixedOffset {
                        chrono::FixedOffset::east_opt(0).unwrap()
                    }
                }

                let hooks: &dyn boa_engine::context::HostHooks = &Hooks;

                let context = boa_engine::context::ContextBuilder::new()
                    .host_hooks(hooks)
                    .build()
                    .unwrap();
                std::cell::RefCell::new(context)
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

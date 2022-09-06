use quote::quote;

// TODO add in the IC object
// TODO call the developer_defined init function
pub fn generate_canister_method_system_init() -> proc_macro2::TokenStream {
    quote! {
        #[ic_cdk_macros::init]
        fn init() {
            unsafe {
                BOA_CONTEXT_OPTION = Some(boa_engine::Context::default());
                let mut boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                // TODO remove globalThis.ic once the ic object is created in Rust first
                boa_context.eval(format!(
                    "let exports = {{}}; globalThis.ic = {}; {compiled_js}",
                    compiled_js = MAIN_JS
                )).unwrap();
            }
        }
    }
}

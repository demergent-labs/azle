use quote::quote;
use crate::generators::ic_object::generate_ic_object;

// TODO call the developer_defined init function
pub fn generate_canister_method_system_init() -> proc_macro2::TokenStream {
    let ic_object = generate_ic_object();

    quote! {
        #[ic_cdk_macros::init]
        fn init() {
            unsafe {
                BOA_CONTEXT_OPTION = Some(boa_engine::Context::default());
                let mut boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                #ic_object

                boa_context.register_global_property(
                    "ic",
                    ic,
                    boa_engine::property::Attribute::all()
                );

                boa_context.eval(format!(
                    "let exports = {{}}; {compiled_js}",
                    compiled_js = MAIN_JS
                )).unwrap();
            }
        }
    }
}

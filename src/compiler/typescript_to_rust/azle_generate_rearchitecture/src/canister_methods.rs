use quote::quote;
use swc_ecma_ast::Module;

pub fn generate(_modules: &Vec<Module>) -> Vec<proc_macro2::TokenStream> {
    vec![quote! {
        #[ic_cdk_macros::query(manual_reply = true)]
        fn test() {
            execute_js("test");
        }

        #[ic_cdk_macros::query(manual_reply = true)]
        fn simpleQuery() {
            execute_js("simpleQuery");
        }

        #[ic_cdk_macros::query(manual_reply = true)]
        fn echoRecord() {
            execute_js("echoRecord");
        }
    }]
}

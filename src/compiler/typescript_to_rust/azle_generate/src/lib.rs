use quote::quote;

use crate::{
    cdk_act::{ToAct, ToTokenStream},
    generators::header,
    ts_ast::TsAst,
};

mod cdk_act;
mod ts_ast;

pub mod generators;

pub fn azle_generate(
    ts_file_names: &Vec<&str>,
    main_js: &str,
    stable_storage_js: &str,
) -> proc_macro2::token_stream::TokenStream {
    let header = header::generate_header_code();

    let canister_definition = TsAst::from_ts_file_names(&ts_file_names)
        .to_act()
        .to_token_stream();

    // -------------------------------------------------------------------------

    quote! {
        #header

        // TODO old safe working way
        // TODO I want to make sure I am doing this safely, but I can't do async code from within a with block
        // thread_local! {
        //     static BOA_CONTEXT: std::cell::RefCell<boa_engine::Context> = std::cell::RefCell::new(boa_engine::Context::default());
        // }

        // TODO new unsafe working way
        // TODO we are treading in dangerous territory now
        // TODO study this: https://mmapped.blog/posts/01-effective-rust-canisters.html
        // TODO try to get help from those on the forum
        // TODO it might be fine since we only ever obtain one mutable reference per query/update call
        // TODO we do not allow the user to obtain multiple mutable references, we only have one
        // TODO as long as we enforce that, we might be fine
        static mut BOA_CONTEXT_OPTION: Option<boa_engine::Context> = None;
        static MAIN_JS: &'static str = #main_js;
        static STABLE_STORAGE_JS: &'static str = #stable_storage_js;

        #canister_definition
    }
    .into()
}

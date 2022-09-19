use quote::quote;
use std::path::Path;
use swc_common::{sync::Lrc, SourceMap};
use swc_ecma_ast::Program;
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax, TsConfig};

use crate::{cdk_act::ToAct, generators::header, ts_program_bundle::TsProgramBundle};

mod cdk_act;
mod ts_ast;
mod ts_program_bundle;

pub mod generators;

pub fn azle_generate(
    ts_file_names: &Vec<&str>,
    main_js: &str,
    stable_storage_js: &str,
) -> proc_macro2::token_stream::TokenStream {
    let header = header::generate_header_code();

    let programs = get_programs(&ts_file_names);
    let ts_program_bundle = TsProgramBundle { programs };
    let abstract_canister_tree = ts_program_bundle.to_act();
    let canister_definition = abstract_canister_tree.to_token_stream();

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

fn get_programs(ts_file_names: &Vec<&str>) -> Vec<Program> {
    ts_file_names
        .iter()
        .map(|ts_file_name| {
            let filepath = Path::new(ts_file_name).to_path_buf();

            let cm: Lrc<SourceMap> = Default::default();

            let fm = cm.load_file(&filepath).unwrap();

            let lexer = Lexer::new(
                Syntax::Typescript(TsConfig::default()),
                Default::default(),
                StringInput::from(&*fm),
                None,
            );

            let mut parser = Parser::new_from(lexer);

            let program = parser.parse_program().unwrap();

            program
        })
        .collect()
}

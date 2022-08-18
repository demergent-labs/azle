// TODO let's find all Query and Update functions and create their function bodies
// TODO then we can move on from there

use proc_macro::TokenStream;
use quote::{
    format_ident,
    quote
};
use std::{path::Path, fmt::format};
use swc_ecma_parser::{
    lexer::Lexer,
    Parser,
    StringInput,
    // FileInput,
    // SourceFileInput,
    Syntax,
    TsConfig, token::Token
};
use swc_ecma_ast::{
    Program,
    Function,
    Stmt,
    ModuleDecl,
    ExportDecl,
    FnDecl, TsTypeAnn
};
use swc_common::{
    errors::{
        ColorConfig,
        Handler
    },
    sync::Lrc,
    SourceMap,
    FileName
};
use syn::{
    parse_macro_input,
    LitStr
};

mod generators {
    pub mod canister_methods;
}

use generators::canister_methods::{
    get_ast_fn_decls_from_programs,
    generate_query_function_token_streams,
    get_query_fn_decls
};

#[proc_macro]
pub fn azle_generate(ts_file_names_token_stream: TokenStream) -> TokenStream {
    let ts_file_names_string_literal = parse_macro_input!(ts_file_names_token_stream as LitStr);
    let ts_file_names_string_value = ts_file_names_string_literal.value();

    let ts_file_names: Vec<&str> = ts_file_names_string_value.split(",").collect();

    let programs = get_programs(&ts_file_names);

    let ast_fnc_decls = get_ast_fn_decls_from_programs(&programs);

    let ast_fnc_decls_query = get_query_fn_decls(ast_fnc_decls);

    println!("ast_fnc_decls_query: {:#?}", ast_fnc_decls_query);

    let query_function_token_streams = generate_query_function_token_streams(&ast_fnc_decls_query);

    quote! {
        type CandidNat = candid::Nat;
        #(#query_function_token_streams)*

        candid::export_service!();

        #[ic_cdk_macros::query(name = "__get_candid_interface_tmp_hack")]
        fn export_candid() -> String {
            __export_service()
        }

        #[cfg(test)]

        mod tests {
            use super::*;

            #[test]
            fn write_candid_to_disk() {
                std::fs::write("index.did", export_candid()).unwrap();
            }
        }
    }.into()
}

fn get_programs(ts_file_names: &Vec<&str>) -> Vec<Program> {
    ts_file_names.iter().map(|ts_file_name| {
        let filepath = Path::new(ts_file_name).to_path_buf();

        let cm: Lrc<SourceMap> = Default::default();

        let fm = cm.load_file(&filepath).unwrap();

        let lexer = Lexer::new(
            Syntax::Typescript(TsConfig::default()),
            Default::default(),
            StringInput::from(&*fm),
            None
        );

        let mut parser = Parser::new_from(lexer);

        let program = parser.parse_program().unwrap();

        program
    }).collect()
}

// TODO let's find all Query and Update functions and create their function bodies
// TODO then we can move on from there

use proc_macro::TokenStream;
use quote::{
    format_ident,
    quote
};
use std::path::Path;
use swc_ecma_parser::{
    lexer::Lexer,
    Parser,
    StringInput,
    // FileInput,
    // SourceFileInput,
    Syntax,
    TsConfig
};
use swc_ecma_ast::{
    Program,
    Function,
    Stmt,
    ModuleDecl,
    ExportDecl,
    FnDecl
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
        #(#query_function_token_streams)*
    }.into()
}

fn generate_query_function_token_streams(ast_fnc_decls_query: &Vec<FnDecl>) -> Vec<TokenStream> {
    ast_fnc_decls_query.iter().map(|ast_fnc_decl_query| {
        generate_query_function_token_stream(ast_fnc_decl_query)
    }).collect()
}

fn generate_query_function_token_stream(ast_fnc_decl_query: &FnDecl) -> TokenStream {
    let function_name = ast_fnc_decl_query.ident.to_string().replace("#0", "");
    let function_name_ident = format_ident!("{}", function_name);

    quote! {
        #[ic_cdk_macros::query]
        async fn #function_name_ident() -> Query<bool> {
            true
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

fn get_ast_fn_decls_from_programs(programs: &Vec<Program>) -> Vec<FnDecl> {
    programs.iter().fold(vec![], |acc, program| {
        let ast_fn_decls = get_ast_fn_decls_from_program(program);

        vec![acc, ast_fn_decls].concat()
    })
}

fn get_ast_fn_decls_from_program(program: &Program) -> Vec<FnDecl> {
    match program {
        Program::Module(module) => {
            let module_decls: Vec<ModuleDecl> =
                module
                    .body
                    .iter()
                    .filter(|module_item| module_item.is_module_decl())
                    .map(|module_item| module_item.as_module_decl().unwrap().clone())
                    .collect();

            let export_decls: Vec<ExportDecl> =
                module_decls
                    .iter()
                    .filter(|module_decl| module_decl.is_export_decl())
                    .map(|module_decl| {
                        module_decl.as_export_decl().unwrap().clone()
                    })
                    .collect();

            let fn_decls: Vec<FnDecl> =
                export_decls
                .iter()
                .filter(|export_decl| export_decl.decl.is_fn_decl())
                .map(|export_decl| {
                    export_decl.decl.as_fn_decl().unwrap().clone()
                })
                .collect();

            fn_decls
        },
        Program::Script(script) => {
            vec![]
        }
    }
}

fn get_query_fn_decls(fn_decls: Vec<FnDecl>) -> Vec<FnDecl> {
    fn_decls.into_iter().filter(|fn_decl| is_query_fn_decl(fn_decl)).collect()
}

fn is_query_fn_decl(fn_decl: &FnDecl) -> bool {
    if let Some(ts_type_ann) = &fn_decl.function.return_type {
        if ts_type_ann.type_ann.is_ts_type_ref() {
            let type_ref = ts_type_ann.type_ann.as_ts_type_ref().unwrap();

            if type_ref.type_name.is_ident() {
                let ident = type_ref.type_name.as_ident().unwrap();

                ident.to_string() == "Query#0" // TODO probably use ident.sym to get the real name without the #0
            }
            else {
                false
            }
        }
        else {
            false
        }
    }
    else {
        false
    }
}

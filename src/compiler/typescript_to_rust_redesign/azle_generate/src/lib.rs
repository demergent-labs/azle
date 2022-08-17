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
    Stmt, ModuleDecl
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


    let ast_functions = get_ast_functions_from_programs(&programs);

    println!("{:#?}", ast_functions);

    quote! {
        #[ic_cdk_macros::query]
        async fn query() -> String {
            "it works".to_string()
        }
    }.into()
}

fn get_programs(ts_file_names: &Vec<&str>) -> Vec<Program> {
    ts_file_names.iter().map(|ts_file_name| {
        println!("{}", ts_file_name);
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

fn get_ast_functions_from_programs(programs: &Vec<Program>) -> Vec<Function> {
    programs.iter().fold(vec![], |acc, program| {
        let ast_functions = get_ast_functions_from_program(program);

        vec![acc, ast_functions].concat()
    })
}

fn get_ast_functions_from_program(program: &Program) -> Vec<Function> {
    if let Program::Module(module) = program {
        let module_decls: Vec<ModuleDecl> =
            module
            .body
            .iter()
            .filter(|module_item| module_item.is_module_decl())
            .map(|module_item| module_item.as_module_decl().unwrap().clone())
            .collect();

        module_decls
            .iter()
            .filter(|module_decl| module_decl.is_export_decl())
            .map(|module_decl| {
                module_decl.as_export_decl().unwrap().decl.as_fn_decl().unwrap().function.clone()
            })
            .collect()
    }
    else {
        panic!();
    }
}

mod query;
mod functions;
mod update;

pub use query::{
    generate_query_function_token_streams,
    get_query_fn_decls
};

pub use update::{
    generate_update_function_token_streams,
    get_update_fn_decls
};

pub use functions::{
    generate_function_token_stream
};

use swc_ecma_ast::{Program, FnDecl, ModuleDecl, ExportDecl};

pub fn get_ast_fn_decls_from_programs(programs: &Vec<Program>) -> Vec<FnDecl> {
    programs.iter().fold(vec![], |acc, program| {
        let ast_fn_decls = get_ast_fn_decls_from_program(program);

        vec![acc, ast_fn_decls].concat()
    })
}

pub fn get_ast_fn_decls_from_program(program: &Program) -> Vec<FnDecl> {
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

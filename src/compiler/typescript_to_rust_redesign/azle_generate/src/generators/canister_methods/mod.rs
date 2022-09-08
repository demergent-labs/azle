pub mod async_result_handler;
pub mod functions;
mod method_body;
mod query;
mod record_type_aliases;
mod rust_types;
mod type_aliases;
mod types;
mod update;
mod variant_type_aliases;
pub mod system {
    pub mod heartbeat;
    pub mod init;
    pub mod inspect_message;
    pub mod post_upgrade;
    pub mod pre_upgrade;
}

pub use query::{generate_query_function_infos, get_query_fn_decls};

pub use update::{generate_update_function_infos, get_update_fn_decls};

pub use functions::{generate_function_info, FunctionInformation};

pub use type_aliases::{generate_hash_map, generate_type_alias_token_streams};

pub use variant_type_aliases::generate_variant_token_streams;

pub use record_type_aliases::generate_record_token_streams;

pub use rust_types::{ArrayTypeInfo, KeywordInfo, RustType, StructInfo, TypeRefInfo};

pub use types::ts_type_to_rust_type;

use swc_ecma_ast::{ExportDecl, FnDecl, Module, ModuleDecl, Program, Stmt, TsTypeAliasDecl};

pub fn get_ast_other_type_alias_decls(
    type_alias_decls: &Vec<TsTypeAliasDecl>,
) -> Vec<TsTypeAliasDecl> {
    type_alias_decls
        .clone()
        .into_iter()
        .filter(|ts_type_alias_decl| {
            !ts_type_alias_decl.type_ann.is_ts_type_lit()
                && (!ts_type_alias_decl.type_ann.is_ts_type_ref()
                    || (ts_type_alias_decl.type_ann.is_ts_type_ref()
                        && match ts_type_alias_decl.type_ann.as_ts_type_ref() {
                            Some(ts_type_ref) => match ts_type_ref.type_name.as_ident() {
                                Some(ident) => {
                                    let name = ident.sym.chars().as_str();
                                    name != "Func" && name != "Variant"
                                }
                                None => true,
                            },
                            None => true,
                        }))
        })
        .collect()
}

pub fn get_ast_record_type_alias_decls(
    type_alias_decls: &Vec<TsTypeAliasDecl>,
) -> Vec<TsTypeAliasDecl> {
    type_alias_decls
        .clone()
        .into_iter()
        .filter(|ts_type_alias_decl| ts_type_alias_decl.type_ann.is_ts_type_lit())
        .collect()
}

pub fn get_ast_variant_type_alias_decls(
    type_alias_decls: &Vec<TsTypeAliasDecl>,
) -> Vec<TsTypeAliasDecl> {
    get_ast_type_alias_decls_by_type_ref_name(type_alias_decls, "Variant")
}

pub fn get_ast_type_alias_decls_from_programs(programs: &Vec<Program>) -> Vec<TsTypeAliasDecl> {
    programs.iter().fold(vec![], |acc, program| {
        let ast_type_alias_decls = get_ast_type_alias_decls_from_program(program);

        vec![acc, ast_type_alias_decls].concat()
    })
}

pub fn get_ast_fn_decls_from_programs(programs: &Vec<Program>) -> Vec<FnDecl> {
    programs.iter().fold(vec![], |acc, program| {
        let ast_fn_decls = get_ast_fn_decls_from_program(program);

        vec![acc, ast_fn_decls].concat()
    })
}

fn get_export_decls(module: &Module) -> Vec<ExportDecl> {
    let module_decls: Vec<ModuleDecl> = module
        .body
        .iter()
        .filter(|module_item| module_item.is_module_decl())
        .map(|module_item| module_item.as_module_decl().unwrap().clone())
        .collect();

    let export_decls: Vec<ExportDecl> = module_decls
        .iter()
        .filter(|module_decl| module_decl.is_export_decl())
        .map(|module_decl| module_decl.as_export_decl().unwrap().clone())
        .collect();

    export_decls
}

fn get_type_alias_decls(module: &Module) -> Vec<TsTypeAliasDecl> {
    let module_stmts: Vec<Stmt> = module
        .body
        .iter()
        .filter(|module_item| module_item.is_stmt())
        .map(|module_item| module_item.as_stmt().unwrap().clone())
        .collect();

    let type_alias_decls: Vec<TsTypeAliasDecl> = module_stmts
        .iter()
        .filter(|module_stmt| module_stmt.is_decl())
        .map(|module_decl| module_decl.as_decl().unwrap().clone())
        .filter(|decl| decl.is_ts_type_alias())
        .map(|decl| decl.as_ts_type_alias().unwrap().clone())
        .collect();

    let export_decls: Vec<ExportDecl> = module
        .body
        .iter()
        .filter(|module_item| module_item.is_module_decl())
        .map(|module_item| module_item.as_module_decl().unwrap().clone())
        .filter(|module_decl| module_decl.is_export_decl())
        .map(|module_decl| module_decl.as_export_decl().unwrap().clone())
        .collect();

    let export_type_alias_decls: Vec<TsTypeAliasDecl> = export_decls
        .iter()
        .filter(|export_decl| export_decl.decl.is_ts_type_alias())
        .map(|export_decl| export_decl.decl.as_ts_type_alias().unwrap().clone())
        .collect();

    vec![type_alias_decls, export_type_alias_decls].concat()
}

fn get_ast_type_alias_decls_by_type_ref_name(
    type_alias_decls: &Vec<TsTypeAliasDecl>,
    type_ref_name: &str,
) -> Vec<TsTypeAliasDecl> {
    type_alias_decls
        .clone()
        .into_iter()
        .filter(|ts_type_alias_decl| {
            ts_type_alias_decl.type_ann.is_ts_type_ref()
                && match ts_type_alias_decl.type_ann.as_ts_type_ref() {
                    Some(ts_type_ref) => match ts_type_ref.type_name.as_ident() {
                        Some(ident) => ident.sym.chars().as_str() == type_ref_name,
                        None => false,
                    },
                    None => false,
                }
        })
        .collect()
}

pub fn get_ast_type_alias_decls_from_program(program: &Program) -> Vec<TsTypeAliasDecl> {
    match program {
        Program::Module(module) => get_type_alias_decls(module),
        Program::Script(_) => vec![],
    }
}

pub fn get_ast_fn_decls_from_program(program: &Program) -> Vec<FnDecl> {
    match program {
        Program::Module(module) => {
            let export_decls = get_export_decls(module);

            let fn_decls: Vec<FnDecl> = export_decls
                .iter()
                .filter(|export_decl| export_decl.decl.is_fn_decl())
                .map(|export_decl| export_decl.decl.as_fn_decl().unwrap().clone())
                .collect();

            fn_decls
        }
        Program::Script(_) => {
            vec![]
        }
    }
}

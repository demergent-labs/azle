use std::ops::Deref;
use std::path::Path;
use swc_common::{sync::Lrc, SourceMap};
use swc_ecma_ast::{Decl, ModuleDecl, ModuleItem, Stmt, TsTypeAliasDecl};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax, TsConfig};

use crate::alias_table::AliasLists;
use crate::AliasTables;
use crate::{
    errors::errors::{FileSyntaxError, UnableToLoadFile},
    internal_error, AliasTable, Error,
};

use super::SourceMapped;

pub struct Program {
    program: swc_ecma_ast::Program,
    pub source_map: SourceMap,
    pub filepath: String,
    pub alias_table: AliasTable,
    pub alias_list: Vec<String>,
}

impl Deref for Program {
    type Target = swc_ecma_ast::Program;

    fn deref(&self) -> &Self::Target {
        &self.program
    }
}

impl Program {
    pub fn from_file_name(
        ts_file_name: &str,
        alias_tables: &AliasTables,
        alias_lists: &AliasLists,
    ) -> Result<Option<Self>, Error> {
        let filepath = Path::new(ts_file_name).to_path_buf();

        let cm: Lrc<SourceMap> = Default::default();

        let fm = cm
            .load_file(&filepath)
            .map_err(|error| UnableToLoadFile::from_error(error, ts_file_name))?;

        let lexer = Lexer::new(
            Syntax::Typescript(TsConfig {
                decorators: true,
                ..TsConfig::default()
            }),
            Default::default(),
            StringInput::from(&*fm),
            None,
        );

        let mut parser = Parser::new_from(lexer);

        let parse_result = parser.parse_program();
        match parse_result {
            Ok(program) => {
                if let Ok(source_map) = std::rc::Rc::try_unwrap(cm) {
                    let alias_table = match alias_tables.get(ts_file_name) {
                        Some(alias_table) => alias_table,
                        None => return Ok(None), // If there is no symbol table for the program then we don't need to process it for candid types
                    };
                    let alias_list = match alias_lists.get(ts_file_name) {
                        Some(alias_lists) => alias_lists.clone(),
                        None => vec![],
                    };
                    return Ok(Some(Program {
                        program,
                        source_map,
                        filepath: ts_file_name.to_string(),
                        alias_table: alias_table.clone(),
                        alias_list: alias_list.clone(),
                    }));
                };
                internal_error!()
            }
            Err(_error) => return Err(FileSyntaxError::from_file_name(ts_file_name, _error).into()),
        }
    }

    pub fn ts_type_alias_decls(&self) -> Vec<SourceMapped<TsTypeAliasDecl>> {
        if let swc_ecma_ast::Program::Module(module) = self.deref() {
            module
                .body
                .iter()
                .filter_map(|module_item| match module_item {
                    ModuleItem::ModuleDecl(decl) => match decl {
                        ModuleDecl::ExportDecl(export_decl) => {
                            let decl = &export_decl.decl;
                            if let Decl::TsTypeAlias(ts_type_alias_decl) = decl {
                                Some(SourceMapped::new(
                                    ts_type_alias_decl,
                                    &self.source_map,
                                    &self.alias_table,
                                    &self.alias_list,
                                ))
                            } else {
                                None
                            }
                        }
                        _ => None,
                    },
                    ModuleItem::Stmt(stmt) => match stmt {
                        Stmt::Decl(decl) => {
                            if let Decl::TsTypeAlias(ts_type_alias_decl) = decl {
                                // acc is mut because SourceMapped<FnDecl> can't be cloned, which is
                                // necessary to do something like:
                                // return vec![
                                //     acc,
                                //     vec![SourceMapped::new(
                                //         ts_type_alias_decl,
                                //         &program.source_map,
                                //     )],
                                // ]
                                // .concat();

                                Some(SourceMapped::new(
                                    ts_type_alias_decl,
                                    &self.source_map,
                                    &self.alias_table,
                                    &self.alias_list,
                                ))
                            } else {
                                None
                            }
                        }
                        _ => None,
                    },
                })
                .collect()
        } else {
            vec![]
        }
    }
}

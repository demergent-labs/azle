use cdk_framework::traits::CollectIterResults;
pub use program::Program;
pub use source_map::SourceMapped;
use swc_ecma_ast::TsTypeAliasDecl;

use crate::{alias_table::AliasLists, AliasTables, Error};

pub mod expr;
pub mod program;
pub mod source_map;
pub mod ts_type;
pub mod ts_type_element;

pub struct TsAst {
    pub programs: Vec<Program>,
    pub main_js: String,
}

impl TsAst {
    pub fn new(
        ts_file_names: &Vec<String>,
        main_js: String,
        alias_tables: AliasTables,
        alias_list: AliasLists,
    ) -> Result<Self, Vec<Error>> {
        let file_name_to_program = |ts_file_name: &String| {
            Program::from_file_name(ts_file_name, &alias_tables, &alias_list)
                .map_err(Into::<Vec<Error>>::into)
        };
        let programs = ts_file_names
            .iter()
            .map(file_name_to_program)
            .collect_results()?
            .into_iter()
            .filter_map(|option| option)
            .collect();

        Ok(Self { programs, main_js })
    }

    // Note: Both module_items and decls seem like useful methods but we're not
    // currently using them so I just commented them out for now.

    // pub fn module_items(&self) -> Vec<SourceMapped<ModuleItem>> {
    //     self.programs.iter().fold(vec![], |mut acc, program| {
    //         if let swc_ecma_ast::Program::Module(module) = program.deref() {
    //             let source_mapped_module_items: Vec<_> = module
    //                 .body
    //                 .iter()
    //                 .map(|module_item| SourceMapped::new(module_item, &program.source_map))
    //                 .collect();

    //             acc.extend(source_mapped_module_items);
    //         }
    //         acc
    //     })
    // }

    // pub fn decls(&self) -> Vec<SourceMapped<Decl>> {
    //     self.programs.iter().fold(vec![], |mut acc, program| {
    //         if let swc_ecma_ast::Program::Module(module) = program.deref() {
    //             module
    //                 .body
    //                 .iter()
    //                 .for_each(|module_item| match module_item {
    //                     ModuleItem::ModuleDecl(decl) => match decl {
    //                         ModuleDecl::ExportDecl(export_decl) => {
    //                             acc.push(SourceMapped::new(&export_decl.decl, &program.source_map));
    //                         }
    //                         _ => (),
    //                     },
    //                     ModuleItem::Stmt(stmt) => match stmt {
    //                         Stmt::Decl(decl) => {
    //                             acc.push(SourceMapped::new(decl, &program.source_map));
    //                         }
    //                         _ => (),
    //                     },
    //                 })
    //         }
    //         acc
    //     })
    // }

    pub fn ts_type_alias_decls(&self) -> Vec<SourceMapped<TsTypeAliasDecl>> {
        self.programs
            .iter()
            .flat_map(|program| program.ts_type_alias_decls())
            .collect()
    }
}

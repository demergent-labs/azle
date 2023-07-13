use swc_common::SourceMap;
use swc_ecma_ast::{Decl, FnDecl, Module, ModuleDecl, ModuleItem, Stmt};

use crate::{
    canister_method::{
        errors::{ExtraneousCanisterMethodAnnotation, MissingReturnTypeAnnotation},
        AnnotatedFnDecl,
    },
    ts_ast::SourceMapped,
    AliasTable, Error,
};

pub trait ModuleHelperMethods {
    fn get_annotated_fn_decls<'a>(
        &'a self,
        source_map: &'a SourceMap,
        alias_table: &'a AliasTable,
        alias_list: &'a Vec<String>,
    ) -> (Vec<SourceMapped<AnnotatedFnDecl>>, Vec<Error>);
    fn get_fn_decls<'a>(
        &'a self,
        source_map: &'a SourceMap,
        alias_table: &'a AliasTable,
        alias_list: &'a Vec<String>,
    ) -> Vec<SourceMapped<'a, FnDecl>>;
}

struct Accumulator<'a> {
    pub annotated_fn_decls: Vec<SourceMapped<'a, AnnotatedFnDecl>>,
    pub errors: Vec<Error>,
}

impl Accumulator<'_> {
    pub fn new() -> Self {
        Self {
            annotated_fn_decls: Default::default(),
            errors: Default::default(),
        }
    }
}

impl<'a> From<Accumulator<'a>> for (Vec<SourceMapped<'a, AnnotatedFnDecl>>, Vec<Error>) {
    fn from(acc: Accumulator<'a>) -> Self {
        (acc.annotated_fn_decls, acc.errors)
    }
}

impl ModuleHelperMethods for Module {
    // TODO: This should be implemented on SourceMapped<Module>.
    // Then you wouldn't need to pass the source_map in as a param.
    // ideally body then would be a Vec<SourceMapped<ModuleItem>>
    fn get_annotated_fn_decls<'a>(
        &'a self,
        source_map: &'a SourceMap,
        alias_table: &'a AliasTable,
        alias_list: &'a Vec<String>,
    ) -> (Vec<SourceMapped<AnnotatedFnDecl>>, Vec<Error>) {
        let source_mapped_body: Vec<_> = self
            .body
            .iter()
            .map(|module_item| SourceMapped::new(module_item, source_map, alias_table, alias_list))
            .collect();

        source_mapped_body.clone()
            .into_iter()
            .enumerate()
            .fold(Accumulator::new(), |mut acc, (i, module_item)| {
                if let Some(result) = module_item.as_canister_method_annotation() {
                    match result {
                        Ok(annotation) => {
                            match source_mapped_body.get(i + 1) {
                                Some(next_item) => {
                                    let next_item = module_item.spawn(next_item);
                                    match next_item.as_exported_fn_decl() {
                                        Some(fn_decl) => {
                                            let annotated_fn_decl = AnnotatedFnDecl {
                                                annotation,
                                                fn_decl: fn_decl.clone(),
                                            };
                                            let sm_annotated_fn_decl = SourceMapped::new(&annotated_fn_decl, source_map, alias_table, alias_list);

                                            match &fn_decl.function.return_type {
                                                Some(_) => {
                                                    acc.annotated_fn_decls.push(sm_annotated_fn_decl)
                                                }
                                                None => {
                                                    let missing_return_type_annotation =
                                                        MissingReturnTypeAnnotation::from_annotated_fn_decl(&sm_annotated_fn_decl);
                                                    acc.errors.push(missing_return_type_annotation.into())
                                                }
                                            }
                                        }
                                        // There is an annotation not followed by an exported function (but not at end of file)
                                        None => acc.errors.push(
                                            ExtraneousCanisterMethodAnnotation::from_annotation(
                                                &module_item.spawn(&annotation)
                                            ).into()
                                        )
                                    }
                                }
                                // There is a dangling canister method annotation at the end of the file.
                                None => acc.errors.push(
                                    ExtraneousCanisterMethodAnnotation::from_annotation(&module_item.spawn(&annotation))
                                        .into(),
                                ),
                            };
                        },
                        Err(err) => acc.errors.push(err)
                    }
                }

                acc
            })
            .into()
    }

    fn get_fn_decls<'a>(
        &'a self,
        source_map: &'a SourceMap,
        alias_table: &'a AliasTable,
        alias_list: &'a Vec<String>,
    ) -> Vec<SourceMapped<'a, FnDecl>> {
        self.body
            .iter()
            .filter_map(|module_item| {
                Some(SourceMapped::new(
                    module_item.as_decl()?.as_fn_decl()?,
                    source_map,
                    alias_table,
                    alias_list,
                ))
            })
            .collect()
    }
}

trait AsDecl {
    fn as_decl(&self) -> Option<&Decl>;
}

impl AsDecl for ModuleItem {
    fn as_decl(&self) -> Option<&Decl> {
        match self {
            ModuleItem::ModuleDecl(decl) => match decl {
                ModuleDecl::ExportDecl(export_decl) => Some(&export_decl.decl),
                _ => None,
            },
            ModuleItem::Stmt(stmt) => match stmt {
                Stmt::Decl(decl) => Some(decl),
                _ => None,
            },
        }
    }
}

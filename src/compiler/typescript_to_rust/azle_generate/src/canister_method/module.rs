use swc_common::SourceMap;
use swc_ecma_ast::{Decl, FnDecl, Module, ModuleDecl, ModuleItem, Stmt};

use crate::{
    canister_method::{
        errors::{self, ExtraneousDecorator},
        module_item::ModuleItemHelperMethods,
        AnnotatedFnDecl, Annotation,
    },
    ts_ast::SourceMapped,
    Error,
};

pub trait ModuleHelperMethods {
    fn get_annotated_fn_decls<'a>(
        &'a self,
        source_map: &'a SourceMap,
    ) -> (Vec<AnnotatedFnDecl>, Vec<Error>);
    fn get_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<SourceMapped<'a, FnDecl>>;
}

impl ModuleHelperMethods for Module {
    // TODO: This should be implemented on SourceMapped<Module>.
    // Then you wouldn't need to pass the source_map in as a param.
    fn get_annotated_fn_decls<'a>(
        &'a self,
        source_map: &'a SourceMap,
    ) -> (Vec<AnnotatedFnDecl>, Vec<Error>) {
        // TODO: Consider changing this algorithm from being backward looking
        // to being forward looking

        let mut previous_item_was_canister_method_annotation = false;

        self.body
            .iter()
            .enumerate()
            .fold((vec![], vec![]), |mut acc, (i, module_item)| {
                let sm_module_item = SourceMapped::new(module_item, source_map);

                if previous_item_was_canister_method_annotation {
                    let annotation_module_item = self.body.get(i - 1).unwrap();
                    let sm_annotation_module_item =
                        SourceMapped::new(annotation_module_item, source_map);

                    match module_item.as_exported_fn_decl() {
                        Some(fn_decl) => {
                            let annotation =
                                match Annotation::from_module_item(&sm_annotation_module_item) {
                                    Ok(annotation) => annotation,
                                    Err(err) => panic!(
                                        "{}",
                                        errors::build_parse_error_message(
                                            err,
                                            annotation_module_item,
                                            source_map
                                        )
                                    ),
                                };

                            if fn_decl.function.return_type.is_none() {
                                panic!(
                                    "{}",
                                    errors::build_missing_return_type_error_message(
                                        &fn_decl, source_map
                                    )
                                )
                            }

                            acc.0.push(AnnotatedFnDecl {
                                annotation,
                                fn_decl,
                                source_map,
                            })
                        }
                        None => {
                            acc.1.push(
                                ExtraneousDecorator::from_module_item(sm_annotation_module_item)
                                    .into(),
                            );
                        }
                    }
                }

                if i + 1 == self.body.len() && module_item.is_custom_decorator() {
                    acc.1
                        .push(ExtraneousDecorator::from_module_item(sm_module_item).into());
                }

                previous_item_was_canister_method_annotation = module_item.is_custom_decorator();

                acc
            })
    }

    fn get_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<SourceMapped<'a, FnDecl>> {
        self.body
            .iter()
            .filter_map(|module_item| {
                Some(SourceMapped::new(
                    module_item.as_decl()?.as_fn_decl()?,
                    source_map,
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

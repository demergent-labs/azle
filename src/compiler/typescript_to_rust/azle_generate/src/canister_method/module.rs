use swc_common::SourceMap;
use swc_ecma_ast::{Decl, FnDecl, Module, ModuleDecl, ModuleItem, Stmt};

use crate::{
    canister_method::{errors, module_item::ModuleItemHelperMethods, AnnotatedFnDecl, Annotation},
    ts_ast::SourceMapped,
};

pub trait ModuleHelperMethods {
    fn get_annotated_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<AnnotatedFnDecl>;
    fn get_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<SourceMapped<'a, FnDecl>>;
}

impl ModuleHelperMethods for Module {
    fn get_annotated_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<AnnotatedFnDecl> {
        // TODO: Consider changing this algorithm from being backward looking
        // to being forward looking

        let mut previous_module_item_was_custom_decorator = false;

        self.body
            .iter()
            .enumerate()
            .fold(vec![], |mut acc, (i, module_item)| {
                if previous_module_item_was_custom_decorator {
                    let custom_decorator_module_item = self.body.get(i - 1).unwrap();

                    match module_item.as_exported_fn_decl() {
                        Some(fn_decl) => {
                            let annotation =
                                match Annotation::from_module_item(custom_decorator_module_item) {
                                    Ok(annotation) => annotation,
                                    Err(err) => panic!(
                                        "{}",
                                        errors::build_parse_error_message(
                                            err,
                                            custom_decorator_module_item,
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

                            acc.push(AnnotatedFnDecl {
                                annotation,
                                fn_decl,
                                source_map,
                            })
                        }
                        None => panic!(
                            "{}",
                            errors::build_extraneous_decorator_error_message(
                                custom_decorator_module_item,
                                source_map
                            )
                        ),
                    }
                }

                if i + 1 == self.body.len() && module_item.is_custom_decorator() {
                    panic!(
                        "{}",
                        errors::build_extraneous_decorator_error_message(module_item, source_map)
                    )
                }

                previous_module_item_was_custom_decorator = module_item.is_custom_decorator();
                acc
            })
    }

    fn get_fn_decls<'a>(&'a self, source_map: &'a SourceMap) -> Vec<SourceMapped<'a, FnDecl>> {
        self.body
            .iter()
            .fold(vec![], |mut acc, module_item| match module_item.as_decl() {
                Some(decl) => match decl {
                    Decl::Fn(fn_decl) => {
                        // acc is mut because SourceMapped<FnDecl> can't be cloned, which is
                        // necessary to do something like:
                        // vec![acc, vec![SourceMapped::new(&fn_decl, source_map)]].concat()

                        acc.push(SourceMapped::new(&fn_decl, source_map));
                        acc
                    }
                    _ => acc,
                },
                None => acc,
            })
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

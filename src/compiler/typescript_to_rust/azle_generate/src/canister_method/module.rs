use swc_common::SourceMap;
use swc_ecma_ast::{Decl, FnDecl, Module, ModuleDecl, ModuleItem, Stmt};

use crate::{
    canister_method::{
        errors::{self, ExtraneousCanisterMethodAnnotation, MissingReturnTypeAnnotation},
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

struct Accumulator<'a> {
    pub annotated_fn_decls: Vec<AnnotatedFnDecl<'a>>,
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

impl<'a> From<Accumulator<'a>> for (Vec<AnnotatedFnDecl<'a>>, Vec<Error>) {
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
    ) -> (Vec<AnnotatedFnDecl>, Vec<Error>) {
        let source_mapped_body: Vec<_> = self
            .body
            .iter()
            .map(|module_item| SourceMapped::new(module_item, source_map))
            .collect();

        source_mapped_body
            .iter()
            .enumerate()
            .fold(Accumulator::new(), |mut acc, (i, module_item)| {
                // TODO: Change this to something like module_item.as_canister_method_annotation
                if module_item.is_canister_method_annotation() {
                    match source_mapped_body.get(i + 1) {
                        Some(next_item) => {
                            let next_item = SourceMapped::new(next_item, source_map);
                            match next_item.as_exported_fn_decl() {
                                Some(fn_decl) => {
                                    // TODO: Change this to pop out up above when we check if is_canister_method_annotation
                                    match Annotation::from_module_item(&module_item) {
                                        Ok(annotation) => {
                                            let annotated_fn_decl = AnnotatedFnDecl {
                                                annotation,
                                                fn_decl: fn_decl.clone(),
                                                source_map,
                                            };

                                            match &fn_decl.function.return_type {
                                                Some(_) => {
                                                    acc.annotated_fn_decls.push(annotated_fn_decl)
                                                }
                                                None => {
                                                    let missing_return_type_annotation =
                                                        MissingReturnTypeAnnotation::from_annotated_fn_decl(&annotated_fn_decl);
                                                    acc.errors.push(missing_return_type_annotation.into())
                                                }
                                            }
                                        }
                                        Err(err) => acc.errors.push(err),
                                    }
                                }
                                // There is an annotation not followed by an exported function (but not at end of file)
                                None => acc.errors.push(
                                    ExtraneousCanisterMethodAnnotation::from_module_item(
                                        &module_item,
                                    )
                                    .into(),
                                ),
                            }
                        }
                        // There is a dangling canister method annotation at the end of the file.
                        None => acc.errors.push(
                            ExtraneousCanisterMethodAnnotation::from_module_item(&module_item)
                                .into(),
                        ),
                    };
                }

                acc
            })
            .into()
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

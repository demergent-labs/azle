use std::iter::FromIterator;

use crate::traits::get_name::GetName;
use crate::traits::get_source_file_info::GetSourceFileInfo;
use crate::ts_ast::{Program, SourceMapped};
use cdk_framework::act::abstract_canister_tree::{Export, Import};
use swc_ecma_ast::{ImportDecl, NamedExport};

impl Program {
    pub fn build_imports(&self) -> Vec<Import> {
        self.get_import_decls()
            .iter()
            .map(|import_decl| import_decl.to_import())
            .collect()
    }

    pub fn build_exports(&self) -> Vec<Export> {
        self.get_named_exports()
            .iter()
            .map(|export_decl| export_decl.to_export())
            .collect()
    }
}

// TODO we need to handle bare specifiers somehow
// TODO we need to map bare specifiers to their actual file paths
// TODO we essentially need to resolve bare specifiers to their file paths
// TODO relative paths also need to be resolved
// TODO add support for import renames, default and namespace imports

// TODO we will have to deal with all ./index.ts implicit directory stuff
// TODO if you import a directory it implicitly imports index.ts
impl SourceMapped<'_, ImportDecl> {
    fn to_import(&self) -> Import {
        let name = self.src.value.to_string();

        let names = self
            .specifiers
            .iter()
            .filter_map(|specifier| match specifier {
                swc_ecma_ast::ImportSpecifier::Named(named) => {
                    let unnormalized_name = named.local.get_name();

                    // TODO this really needs to be changed to have the module name in it
                    // TODO considering that other people might want to make result types
                    // TODO we should probably expand this to other Rust types as well??
                    // TODO though we might not run into the problems that Result has because
                    // TODO our macros or other dependencies were using Result and it was messing them up
                    if unnormalized_name == "Result" {
                        Some("_AzleResult".to_string())
                    } else {
                        Some(unnormalized_name)
                    }
                }
                swc_ecma_ast::ImportSpecifier::Default(_) => None,
                swc_ecma_ast::ImportSpecifier::Namespace(_) => None,
            })
            .collect::<Vec<_>>();

        // TODO are these / and . checks robust enough?
        // TODO I would think not because urls can also be used

        if name.starts_with("/") {
            let path = crate::convert_module_name_to_path(&name);
            return Import { names, path };
        }

        if name.starts_with(".") {
            let absolute_filepath_string = self.source_map.get_origin(self.span);

            let absolute_filepath = std::path::PathBuf::from(absolute_filepath_string);
            let absolute_directory_path = absolute_filepath.parent().unwrap();

            let combined_path = absolute_directory_path.join(std::path::Path::new(&name));

            let combined_path_string = combined_path.to_string_lossy().to_string();

            let resolved_path = path_clean::clean(combined_path_string);

            let final_resolved_path = if resolved_path.is_dir() {
                resolved_path.join("index")
            } else {
                resolved_path
            };

            let path = crate::convert_module_name_to_path(
                &final_resolved_path.to_string_lossy().to_string(),
            );

            return Import { names, path };
        }

        let bare_specifier_first_part = std::path::Path::new(&name);

        let components: Vec<std::path::Component> =
            bare_specifier_first_part.components().collect();

        if components.len() > 1 {
            let final_bare_specifier_name_part_one =
                components[0].as_os_str().to_string_lossy().to_string();

            let remaining = std::path::PathBuf::from_iter(components[1..].iter());

            let bare_specifier_path = node_resolve::resolve_from(
                &final_bare_specifier_name_part_one,
                std::path::PathBuf::from("../../../.."),
            )
            .unwrap()
            .parent()
            .unwrap()
            .parent()
            .unwrap()
            .parent()
            .unwrap()
            .join(remaining);

            let bare_specifier_path = if bare_specifier_path.is_dir() {
                bare_specifier_path.join("index")
            } else {
                bare_specifier_path
            };

            println!("bare_specifier_path: {:#?}", bare_specifier_path);

            // TODO we should probably pass in the root from the dfx.json compiler_info.json???
            // TODO instead of this relative path maybe?
            return Import {
                names,
                path: crate::convert_module_name_to_path(
                    &bare_specifier_path.to_str().unwrap().to_string(),
                ),
            };
        } else {
            // TODO we should probably pass in the root from the dfx.json compiler_info.json???
            // TODO instead of this relative path maybe?
            return Import {
                names,
                path: crate::convert_module_name_to_path(
                    &node_resolve::resolve_from(&name, std::path::PathBuf::from("../../../.."))
                        .unwrap()
                        .to_str()
                        .unwrap()
                        .to_string(),
                ),
            };
        }
    }
}

impl SourceMapped<'_, NamedExport> {
    fn to_export(&self) -> Export {
        let names = self
            .specifiers
            .iter()
            .map(|specifier| match specifier {
                swc_ecma_ast::ExportSpecifier::Named(named) => {
                    let unnormalized_name = match &named.orig {
                        swc_ecma_ast::ModuleExportName::Ident(ident) => ident.get_name(),
                        swc_ecma_ast::ModuleExportName::Str(_) => {
                            panic!("This is not supported yet, and not sure how it will be")
                        }
                    };

                    // TODO this really needs to be changed to have the module name in it
                    // TODO considering that other people might want to make result types
                    // TODO we should probably expand this to other Rust types as well??
                    // TODO though we might not run into the problems that Result has because
                    // TODO our macros or other dependencies were using Result and it was messing them up
                    if unnormalized_name == "Result" {
                        "_AzleResult".to_string()
                    } else {
                        unnormalized_name
                    }
                }
                swc_ecma_ast::ExportSpecifier::Default(_) => todo!(),
                swc_ecma_ast::ExportSpecifier::Namespace(_) => todo!(),
            })
            .collect::<Vec<_>>();

        let name_option = &self.src;

        match name_option {
            Some(name_str) => {
                let name = name_str.value.to_string();

                if name.starts_with("/") {
                    let path = crate::convert_module_name_to_path(&name);
                    return Export { names, path };
                }

                if name.starts_with(".") {
                    let absolute_filepath_string = self.source_map.get_origin(self.span);

                    let absolute_filepath = std::path::PathBuf::from(absolute_filepath_string);
                    let absolute_directory_path = absolute_filepath.parent().unwrap();

                    let combined_path = absolute_directory_path.join(std::path::Path::new(&name));

                    let combined_path_string = combined_path.to_string_lossy().to_string();

                    let resolved_path = path_clean::clean(combined_path_string);

                    let final_resolved_path = if resolved_path.is_dir() {
                        resolved_path.join("index")
                    } else {
                        resolved_path
                    };

                    let path = crate::convert_module_name_to_path(
                        &final_resolved_path.to_string_lossy().to_string(),
                    );

                    return Export { names, path };
                }

                Export {
                    names: vec![],
                    path: vec![],
                }
            }
            None => Export {
                names: vec![],
                path: vec![],
            },
        }
    }
}

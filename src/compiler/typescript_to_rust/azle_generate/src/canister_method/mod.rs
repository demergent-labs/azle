use cdk_framework::act::{node::canister_method::CanisterMethodType, CanisterMethods};

use crate::{
    canister_method_annotation::CanisterMethodAnnotation,
    ts_ast::{
        module_item::ModuleItemHelperMethods, source_map::SourceMapped, AzleFnDecl, Item, TsAst,
    },
};

pub use errors::ParseError;

mod annotated_fn_decl;
mod heartbeat_method;

pub mod errors;

impl TsAst {
    pub fn build_canister_methods(&self) -> CanisterMethods {
        let heartbeat_method = self.build_heartbeat_method();
        let init_method = Some(self.build_init_method());
        let inspect_message_method = self.build_inspect_method();
        let post_upgrade_method = Some(self.build_post_upgrade_method());
        let pre_upgrade_method = Some(self.build_pre_upgrade_method());
        let query_methods = self.build_query_methods();
        let update_methods = self.build_update_methods();

        CanisterMethods {
            heartbeat_method,
            init_method,
            inspect_message_method,
            post_upgrade_method,
            pre_upgrade_method,
            query_methods,
            update_methods,
        }
    }

    pub fn get_annotated_function_decls_of_type(
        &self,
        canister_method_type: CanisterMethodType,
    ) -> Vec<AzleFnDecl> {
        self.get_annotated_function_decls()
            .into_iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(canister_method_type.clone())
            })
            .collect()
    }

    /// All exported functions annotated with an Azle custom decorator.
    pub fn get_annotated_function_decls(&self) -> Vec<AzleFnDecl> {
        // TODO: Consider revising this algorithm. Instead of looking back for an annotation when
        // you have a canister method, consider looking forward for a canister method when you
        // detect an annotation.

        let mut previous_module_item_was_custom_decorator = false;

        self.items
            .iter()
            .enumerate()
            .fold(vec![], |mut acc, (i, item)| {
                if previous_module_item_was_custom_decorator {
                    let custom_decorator_module_item = self.items.get(i - 1).unwrap();

                    let annotation =
                        match CanisterMethodAnnotation::from_item(custom_decorator_module_item) {
                            Ok(annotation) => annotation,
                            Err(err) => panic!(err.error_message()),
                        };

                    let exported_fn_decl_option = item.as_exported_fn_decl();

                    match exported_fn_decl_option {
                        Some(exported_fn_decl) => acc.push(AzleFnDecl {
                            annotation,
                            fn_decl: exported_fn_decl,
                            source_map: &item.source_map,
                        }),
                        None => panic!(
                            "{}",
                            errors::build_extraneous_decorator_error_message(
                                custom_decorator_module_item,
                            )
                        ),
                    }
                }

                if i + 1 == self.items.len() && item.is_custom_decorator() {
                    panic!("{}", errors::build_extraneous_decorator_error_message(item))
                }

                previous_module_item_was_custom_decorator = item.is_custom_decorator();
                acc
            })
    }
}

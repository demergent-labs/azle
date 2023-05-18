use cdk_framework::{
    act::node::{canister_method::CanisterMethodType, canister_method::InspectMessageMethod},
    traits::CollectResults,
};

use super::{
    errors::{AsyncNotAllowed, VoidReturnTypeRequired},
    AnnotatedFnDecl, CheckLengthAndMap,
};
use crate::{Error, TsAst};

mod rust;

impl TsAst {
    pub fn build_inspect_message_method(
        &self,
        annotated_fn_decls: &Vec<AnnotatedFnDecl>,
    ) -> Result<Option<InspectMessageMethod>, Vec<Error>> {
        let inspect_message_methods = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::InspectMessage)
            })
            .collect::<Vec<_>>()
            .check_length_and_map(
                CanisterMethodType::InspectMessage,
                |inspect_message_fn_decl| {
                    let errors = match inspect_message_fn_decl.is_void() {
                        true => vec![],
                        false => {
                            vec![VoidReturnTypeRequired::from_annotated_fn_decl(
                                inspect_message_fn_decl,
                            )
                            .into()]
                        }
                    };

                    let errors = match inspect_message_fn_decl.fn_decl.function.is_async {
                        true => vec![
                            errors,
                            vec![
                                AsyncNotAllowed::from_annotated_fn_decl(inspect_message_fn_decl)
                                    .into(),
                            ],
                        ]
                        .concat(),
                        false => errors,
                    };

                    if !errors.is_empty() {
                        return Err(errors);
                    }

                    let body = rust::generate(inspect_message_fn_decl);
                    let guard_function_name = inspect_message_fn_decl.annotation.guard.clone();

                    Ok(InspectMessageMethod {
                        body,
                        guard_function_name,
                    })
                },
            )
            .collect_results()?;

        Ok(inspect_message_methods.get(0).cloned())
    }
}

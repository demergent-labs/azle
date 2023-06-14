use cdk_framework::{
    act::node::{canister_method::CanisterMethodType, canister_method::InspectMessageMethod},
    traits::CollectResults,
};

use super::{
    check_length_and_map::CheckLengthAndMapTwo,
    errors::{AsyncNotAllowed, DuplicateSystemMethod, VoidReturnTypeRequired},
    AnnotatedFnDecl,
};
use crate::{ts_ast::SourceMapped, Error, TsAst};

mod rust;

impl TsAst {
    pub fn build_inspect_message_method(
        &self,
        annotated_fn_decls: &Vec<SourceMapped<AnnotatedFnDecl>>,
    ) -> Result<Option<InspectMessageMethod>, Vec<Error>> {
        let inspect_message_fn_decls: Vec<_> = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::InspectMessage)
            })
            .collect();
        Ok(inspect_message_fn_decls
            .check_length_and_map(
                inspect_message_fn_decls.len() <= 1,
                |fn_decls| {
                    DuplicateSystemMethod::from_annotated_fn_decls(
                        &fn_decls,
                        CanisterMethodType::InspectMessage,
                    )
                    .into()
                },
                |inspect_message_fn_decl| {
                    let (_, _, body) = (
                        match inspect_message_fn_decl.is_void() {
                            true => Ok(()),
                            false => {
                                Err(vec![VoidReturnTypeRequired::error_from_annotated_fn_decl(
                                    inspect_message_fn_decl,
                                )])
                            }
                        },
                        match inspect_message_fn_decl.fn_decl.function.is_async {
                            true => Err(vec![AsyncNotAllowed::error_from_annotated_fn_decl(
                                inspect_message_fn_decl,
                            )
                            .into()]),
                            false => Ok(()),
                        },
                        rust::generate(inspect_message_fn_decl),
                    )
                        .collect_results()?;

                    let guard_function_name = inspect_message_fn_decl.annotation.guard.clone();

                    Ok(InspectMessageMethod {
                        body,
                        guard_function_name,
                    })
                },
            )
            .collect_results()?
            .pop())
    }
}

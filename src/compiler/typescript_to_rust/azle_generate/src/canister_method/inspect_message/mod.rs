use cdk_framework::act::node::{
    canister_method::CanisterMethodType, canister_method::InspectMessageMethod,
};

use super::AnnotatedFnDecl;
use crate::{canister_method::errors::DuplicateSystemMethod, Error, TsAst};

mod rust;

impl TsAst {
    pub fn build_inspect_message_method(
        &self,
        annotated_fn_decls: &Vec<AnnotatedFnDecl>,
    ) -> Result<Option<InspectMessageMethod>, Vec<Error>> {
        let inspect_message_fn_decls: Vec<_> = annotated_fn_decls
            .iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(CanisterMethodType::InspectMessage)
            })
            .collect();

        if inspect_message_fn_decls.len() > 1 {
            let duplicate_method_types_error: Error =
                DuplicateSystemMethod::from_annotated_fn_decls(
                    inspect_message_fn_decls,
                    CanisterMethodType::InspectMessage,
                )
                .into();

            return Err(vec![duplicate_method_types_error]);
        }

        let inspect_message_fn_decl_option = inspect_message_fn_decls.get(0);

        if let Some(inspect_message_fn_decl) = inspect_message_fn_decl_option {
            inspect_message_fn_decl.assert_return_type_is_void();
            inspect_message_fn_decl.assert_not_async();

            let body = rust::generate(inspect_message_fn_decl);
            let guard_function_name = inspect_message_fn_decl.annotation.guard.clone();

            Ok(Some(InspectMessageMethod {
                body,
                guard_function_name,
            }))
        } else {
            Ok(None)
        }
    }
}

use swc_ecma_ast::ModuleItem;

use crate::traits::GetOptionalName;

pub trait AsCanisterMethodAnnotation {
    fn as_canister_method_annotation(&self) -> Option<String>;
}

impl AsCanisterMethodAnnotation for ModuleItem {
    fn as_canister_method_annotation(&self) -> Option<String> {
        self.as_stmt()
            .and_then(|stmt| stmt.as_expr())
            .and_then(|expr_stmt| {
                expr_stmt
                    .expr
                    .as_call()
                    .and_then(|call_expr| call_expr.callee.as_expr())
                    .and_then(|box_expr| box_expr.get_name())
                    .or(expr_stmt.expr.get_name())
                    .and_then(|ident| {
                        // TODO: These are currently assumed to come from azle.
                        // We should be more robust like we were before the Runtimize epic.
                        // We also should handle the other annotations and should likely
                        // pull these out into a constant.
                        // See: https://github.com/demergent-labs/azle/blob/af95ae1fd13c3c104ad683411e695282844560e1/src/compiler/typescript_to_rust/azle_generate/src/canister_method/module_item.rs
                        if vec!["$query".to_string(), "$update".to_string()].contains(&ident) {
                            let dollar_sign_stripped_string = &ident[1..];
                            Some(dollar_sign_stripped_string.to_string())
                        } else {
                            None
                        }
                    })
            })
    }
}

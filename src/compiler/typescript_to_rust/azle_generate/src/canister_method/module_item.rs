use swc_ecma_ast::{ExprStmt, FnDecl, ModuleItem};

use crate::{traits::GetOptionalName, ts_ast::SourceMapped, Error};

use super::{annotation::is_canister_method_annotation, Annotation};

impl SourceMapped<'_, ModuleItem> {
    pub fn as_canister_method_annotation(&self) -> Option<Result<Annotation, Error>> {
        self.as_stmt()
            .and_then(|stmt| stmt.as_expr())
            .and_then(|expr_stmt| {
                expr_stmt
                    .expr
                    .as_call()
                    .and_then(|call_expr| call_expr.callee.as_expr())
                    .and_then(|box_expr| box_expr.get_name())
                    .or(expr_stmt.expr.get_name())
                    .and_then(|name| {
                        if is_canister_method_annotation(&name, self.alias_table) {
                            Some(Annotation::from_module_item(self))
                        } else {
                            None
                        }
                    })
            })
    }

    pub fn as_exported_fn_decl(&self) -> Option<FnDecl> {
        Some(
            self.as_module_decl()?
                .as_export_decl()?
                .decl
                .as_fn_decl()?
                .clone(),
        )
    }

    pub fn as_expr_stmt(&self) -> Option<ExprStmt> {
        Some(self.as_stmt()?.as_expr()?.clone())
    }
}

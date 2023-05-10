use std::ops::Deref;

use swc_ecma_ast::{ExprStmt, FnDecl, ModuleItem};

use crate::{canister_method::annotation::CANISTER_METHOD_ANNOTATIONS, traits::GetName};

pub trait ModuleItemHelperMethods {
    fn is_canister_method_annotation(&self) -> bool;
    fn as_exported_fn_decl(&self) -> Option<FnDecl>;
    fn as_expr_stmt(&self) -> Option<ExprStmt>;
}

impl ModuleItemHelperMethods for ModuleItem {
    fn is_canister_method_annotation(&self) -> bool {
        self.as_stmt()
            .and_then(|stmt| stmt.as_expr())
            .map(|expr_stmt| {
                expr_stmt
                    .expr
                    .as_call()
                    .and_then(|call_expr| call_expr.callee.as_expr())
                    .and_then(|box_expr| box_expr.deref().as_ident())
                    .and_then(|ident| Some(ident))
                    .or(expr_stmt.expr.as_ident())
                    .map(|ident| CANISTER_METHOD_ANNOTATIONS.contains(&ident.get_name()))
                    .unwrap_or(false)
            })
            .unwrap_or(false)
    }

    fn as_exported_fn_decl(&self) -> Option<FnDecl> {
        Some(
            self.as_module_decl()?
                .as_export_decl()?
                .decl
                .as_fn_decl()?
                .clone(),
        )
    }

    fn as_expr_stmt(&self) -> Option<ExprStmt> {
        Some(self.as_stmt()?.as_expr()?.clone())
    }
}

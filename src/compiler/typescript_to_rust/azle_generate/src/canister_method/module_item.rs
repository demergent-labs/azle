use std::ops::Deref;

use swc_ecma_ast::{Callee, Expr, ExprStmt, FnDecl, ModuleItem, Stmt};

use crate::{canister_method::annotation::CANISTER_METHOD_ANNOTATIONS, traits::GetName};

pub trait ModuleItemHelperMethods {
    fn is_canister_method_annotation(&self) -> bool;
    fn as_exported_fn_decl(&self) -> Option<FnDecl>;
    fn as_expr_stmt(&self) -> Option<ExprStmt>;
}

impl ModuleItemHelperMethods for ModuleItem {
    fn is_canister_method_annotation(&self) -> bool {
        match self {
            ModuleItem::Stmt(Stmt::Expr(expr_stmt)) => {
                let ident = match &*expr_stmt.expr {
                    Expr::Call(call_expr) => match &call_expr.callee {
                        Callee::Expr(box_expr) => match box_expr.deref() {
                            Expr::Ident(ident) => ident,
                            _ => return false,
                        },
                        _ => return false,
                    },
                    Expr::Ident(ident) => ident,
                    _ => return false,
                };
                CANISTER_METHOD_ANNOTATIONS.contains(&ident.get_name())
            }
            _ => false,
        }
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

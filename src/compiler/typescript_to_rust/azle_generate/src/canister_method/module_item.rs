use swc_ecma_ast::{Expr, ExprStmt, FnDecl, ModuleItem};

use crate::{canister_method::annotation::CANISTER_METHOD_ANNOTATIONS, traits::GetName};

pub trait ModuleItemHelperMethods {
    fn is_custom_decorator(&self) -> bool;
    fn as_exported_fn_decl(&self) -> Option<FnDecl>;
    fn as_expr_stmt(&self) -> Option<ExprStmt>;
}

impl ModuleItemHelperMethods for ModuleItem {
    fn is_custom_decorator(&self) -> bool {
        if !self.is_stmt() {
            return false;
        }

        let statement = self.as_stmt().unwrap();

        if !statement.is_expr() {
            return false;
        }

        let expression = statement.as_expr().unwrap();

        let ident = match &*expression.expr {
            Expr::Call(call_expr) => {
                if !call_expr.callee.is_expr() {
                    return false;
                }

                match &call_expr.callee {
                    swc_ecma_ast::Callee::Expr(expr) => match &**expr {
                        Expr::Ident(ident) => ident,
                        _ => return false,
                    },
                    _ => return false,
                }
            }
            Expr::Ident(ident) => ident,
            _ => return false,
        };

        CANISTER_METHOD_ANNOTATIONS.contains(&ident.get_name())
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

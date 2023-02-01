use swc_ecma_ast::{Expr, ExprStmt, FnDecl, ModuleItem};

use super::GetName;

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

                // TODO: Note, I'm not sure how the ident wouldn't be there so I'm just
                // unwrapping it. We should probably understand/handle this better
                call_expr.callee.as_expr().unwrap().clone().ident().unwrap()
            }
            Expr::Ident(ident) => ident.clone(),
            _ => return false,
        };

        let custom_decorators = [
            "$heartbeat",
            "$init",
            "$inspect_message",
            "$post_upgrade",
            "$pre_upgrade",
            "$query",
            "$update",
        ];

        custom_decorators.contains(&ident.get_name())
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

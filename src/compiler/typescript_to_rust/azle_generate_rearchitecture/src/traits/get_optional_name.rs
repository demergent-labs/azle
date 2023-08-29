use swc_ecma_ast::{Expr, MemberExpr, MemberProp};

use super::IdentValue;

pub trait GetOptionalName {
    fn get_name(&self) -> Option<String>;
}

impl GetOptionalName for Expr {
    fn get_name(&self) -> Option<String> {
        match self {
            Expr::Call(call) => call.callee.as_expr()?.get_name(),
            Expr::Member(member) => member.get_name(),
            Expr::Ident(ident) => Some(ident.value()),
            Expr::Class(class) => Some(class.ident.clone()?.value()),
            Expr::Fn(func) => Some(func.ident.clone()?.value()),
            _ => None,
        }
    }
}

impl GetOptionalName for MemberExpr {
    fn get_name(&self) -> Option<String> {
        let obj = self.obj.get_name()?;
        let prop = match &self.prop {
            MemberProp::Ident(ident) => ident.value(),
            MemberProp::PrivateName(private_name) => private_name.id.value(),
            MemberProp::Computed(computed) => computed.expr.get_name()?,
        };
        Some(format!("{obj}.{prop}"))
    }
}

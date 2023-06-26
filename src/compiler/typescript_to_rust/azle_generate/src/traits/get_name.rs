use swc_ecma_ast::{Expr, Ident, MemberExpr, MemberProp, TsEntityName, TsQualifiedName};

pub trait GetName {
    fn get_name(&self) -> String;
}

impl GetName for Ident {
    fn get_name(&self) -> String {
        self.sym.chars().as_str().to_string()
    }
}

pub trait GetOptionalName {
    fn get_name(&self) -> Option<String>;
}

impl GetName for TsQualifiedName {
    fn get_name(&self) -> String {
        let right = self.right.get_name();
        let left = self.left.get_name();
        return format!("{left}.{right}");
    }
}

impl GetName for TsEntityName {
    fn get_name(&self) -> String {
        match self {
            TsEntityName::TsQualifiedName(qualified_name) => qualified_name.get_name(),
            TsEntityName::Ident(ident) => ident.get_name(),
        }
    }
}

impl GetOptionalName for Expr {
    fn get_name(&self) -> Option<String> {
        match self {
            Expr::Call(call) => call.callee.as_expr()?.get_name(),
            Expr::Member(member) => member.get_name(),
            Expr::Ident(ident) => Some(ident.get_name()),
            Expr::Class(class) => Some(class.ident.clone()?.get_name()),
            Expr::Fn(func) => Some(func.ident.clone()?.get_name()),
            _ => None,
        }
    }
}

impl GetOptionalName for MemberExpr {
    fn get_name(&self) -> Option<String> {
        let obj = self.obj.get_name()?;
        let prop = match &self.prop {
            MemberProp::Ident(ident) => ident.get_name(),
            MemberProp::PrivateName(private_name) => private_name.id.get_name(),
            MemberProp::Computed(computed) => computed.expr.get_name()?,
        };
        Some(format!("{obj}.{prop}"))
    }
}

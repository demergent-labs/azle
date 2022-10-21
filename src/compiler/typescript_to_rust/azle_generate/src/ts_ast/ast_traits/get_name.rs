pub trait GetName {
    fn get_name(&self) -> &str;
}

impl GetName for swc_ecma_ast::Expr {
    fn get_name(&self) -> &str {
        match self {
            swc_ecma_ast::Expr::This(_) => todo!(),
            swc_ecma_ast::Expr::Array(_) => todo!(),
            swc_ecma_ast::Expr::Object(_) => todo!(),
            swc_ecma_ast::Expr::Fn(_) => todo!(),
            swc_ecma_ast::Expr::Unary(_) => todo!(),
            swc_ecma_ast::Expr::Update(_) => todo!(),
            swc_ecma_ast::Expr::Bin(_) => todo!(),
            swc_ecma_ast::Expr::Assign(_) => todo!(),
            swc_ecma_ast::Expr::Member(_) => todo!(),
            swc_ecma_ast::Expr::SuperProp(_) => todo!(),
            swc_ecma_ast::Expr::Cond(_) => todo!(),
            swc_ecma_ast::Expr::Call(_) => todo!(),
            swc_ecma_ast::Expr::New(_) => todo!(),
            swc_ecma_ast::Expr::Seq(_) => todo!(),
            swc_ecma_ast::Expr::Ident(identifier) => identifier.get_name(),
            swc_ecma_ast::Expr::Lit(_) => todo!(),
            swc_ecma_ast::Expr::Tpl(_) => todo!(),
            swc_ecma_ast::Expr::TaggedTpl(_) => todo!(),
            swc_ecma_ast::Expr::Arrow(_) => todo!(),
            swc_ecma_ast::Expr::Class(_) => todo!(),
            swc_ecma_ast::Expr::Yield(_) => todo!(),
            swc_ecma_ast::Expr::MetaProp(_) => todo!(),
            swc_ecma_ast::Expr::Await(_) => todo!(),
            swc_ecma_ast::Expr::Paren(_) => todo!(),
            swc_ecma_ast::Expr::JSXMember(_) => todo!(),
            swc_ecma_ast::Expr::JSXNamespacedName(_) => todo!(),
            swc_ecma_ast::Expr::JSXEmpty(_) => todo!(),
            swc_ecma_ast::Expr::JSXElement(_) => todo!(),
            swc_ecma_ast::Expr::JSXFragment(_) => todo!(),
            swc_ecma_ast::Expr::TsTypeAssertion(_) => todo!(),
            swc_ecma_ast::Expr::TsConstAssertion(_) => todo!(),
            swc_ecma_ast::Expr::TsNonNull(_) => todo!(),
            swc_ecma_ast::Expr::TsAs(_) => todo!(),
            swc_ecma_ast::Expr::TsInstantiation(_) => todo!(),
            swc_ecma_ast::Expr::PrivateName(_) => todo!(),
            swc_ecma_ast::Expr::OptChain(_) => todo!(),
            swc_ecma_ast::Expr::Invalid(_) => todo!(),
        }
    }
}

impl GetName for swc_ecma_ast::TsPropertySignature {
    fn get_name(&self) -> &str {
        self.key.get_name()
    }
}

pub trait GetName {
    fn get_name(&self) -> &str;
}

impl GetName for swc_ecma_ast::TsEntityName {
    fn get_name(&self) -> &str {
        match self {
            swc_ecma_ast::TsEntityName::TsQualifiedName(qualified_name) => {
                let left = qualified_name.left.get_name();
                let right = qualified_name.right.get_name();
                let message = format!("We don't support qualified names like {left}.{right}\nTry importing {left} and then use {right} directly");
                panic!("{}", message)
            }
            swc_ecma_ast::TsEntityName::Ident(identifier) => identifier.get_name(),
        }
    }
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

impl GetName for swc_ecma_ast::TsMethodSignature {
    fn get_name(&self) -> &str {
        self.key.get_name()
    }
}

impl GetName for swc_ecma_ast::TsGetterSignature {
    fn get_name(&self) -> &str {
        self.key.get_name()
    }
}

impl GetName for swc_ecma_ast::TsSetterSignature {
    fn get_name(&self) -> &str {
        self.key.get_name()
    }
}

trait TsIndexSignatureErrors {
    fn wrong_number_of_params_error(&self) -> String;
}

impl TsIndexSignatureErrors for swc_ecma_ast::TsIndexSignature {
    fn wrong_number_of_params_error(&self) -> String {
        format!(
            "There should be only one parameter for an index signature. {} were found.",
            self.params.len()
        )
    }
}

impl GetName for swc_ecma_ast::TsIndexSignature {
    fn get_name(&self) -> &str {
        if self.params.len() != 1 {
            panic!("{}", self.wrong_number_of_params_error())
        }
        match self.params.get(0) {
            Some(param) => param.get_name(),
            None => panic!("{}", self.wrong_number_of_params_error()),
        }
    }
}

impl GetName for swc_ecma_ast::TsCallSignatureDecl {
    fn get_name(&self) -> &str {
        todo!("Get Name for TsCallSignatureDecl not implemented. It's unclear what a name would be for a TsCallSignatureDecl")
    }
}

impl GetName for swc_ecma_ast::TsConstructSignatureDecl {
    fn get_name(&self) -> &str {
        todo!("Get Name for TsConstructSignatureDecl not implemented. It's unclear what a name would be for a TsConstructSignatureDecl")
    }
}

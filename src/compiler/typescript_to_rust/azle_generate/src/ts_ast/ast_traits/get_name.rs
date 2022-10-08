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

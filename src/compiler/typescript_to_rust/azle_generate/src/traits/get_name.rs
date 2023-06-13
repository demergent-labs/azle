use swc_ecma_ast::Ident;

pub trait GetName {
    fn get_name(&self) -> String;
}

impl GetName for Ident {
    fn get_name(&self) -> String {
        self.sym.chars().as_str().to_string()
    }
}

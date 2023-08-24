use swc_ecma_ast::Ident;

pub trait IdentValue {
    fn value(&self) -> String;
}

impl IdentValue for Ident {
    fn value(&self) -> String {
        self.sym.chars().as_str().to_string()
    }
}

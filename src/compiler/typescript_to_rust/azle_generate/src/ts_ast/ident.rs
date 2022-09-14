use swc_ecma_ast::Ident;

pub fn ident_to_string(ident: &Ident) -> String {
    ident.sym.chars().as_str().to_string()
}

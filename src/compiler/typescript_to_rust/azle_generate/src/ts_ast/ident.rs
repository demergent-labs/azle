use swc_ecma_ast::Ident;

use super::GetName;

pub fn ident_to_string(ident: &Ident) -> String {
    ident.get_name().to_string()
}

impl GetName for Ident {
    fn get_name(&self) -> &str {
        self.sym.chars().as_str()
    }
}

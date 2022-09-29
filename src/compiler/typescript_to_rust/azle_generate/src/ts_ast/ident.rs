use swc_ecma_ast::Ident;

use super::GetName;

impl GetName for Ident {
    fn get_name(&self) -> &str {
        self.sym.chars().as_str()
    }
}

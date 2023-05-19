use swc_ecma_ast::Ident;

use crate::Error;

pub trait GetNameWithError {
    fn get_name(&self) -> Result<&str, Error>;
}

pub trait GetName {
    fn get_name(&self) -> &str;
}

impl GetName for Ident {
    fn get_name(&self) -> &str {
        self.sym.chars().as_str()
    }
}

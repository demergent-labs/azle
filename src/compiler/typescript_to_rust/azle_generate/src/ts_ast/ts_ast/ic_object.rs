use super::TsAst;
use crate::generators::ic_object;

impl TsAst {
    pub fn generate_ic_object(&self) -> proc_macro2::TokenStream {
        ic_object::generate_ic_object(self)
    }
}

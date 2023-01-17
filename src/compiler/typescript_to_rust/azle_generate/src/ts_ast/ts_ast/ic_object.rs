use super::TsAst;
use crate::generators::ic_object;

impl TsAst {
    pub fn generate_register_ic_object_function(&self) -> proc_macro2::TokenStream {
        ic_object::generate_register_ic_object_function(self)
    }
}

mod errors;
mod function_and_method_helpers;
mod get_dependencies;
mod get_source_info;

use swc_common::SourceMap;
use swc_ecma_ast::{Expr, TsMethodSignature};

use crate::ts_ast::GetName;

pub struct AzleMethodSignature<'a> {
    pub ts_method_signature: TsMethodSignature,
    pub source_map: &'a SourceMap,
}

impl AzleMethodSignature<'_> {
    pub fn get_method_name(&self) -> String {
        match &*self.ts_method_signature.key {
            Expr::Ident(ident) => ident.get_name().to_string(),
            _ => panic!("{}", self.todo_name_this_error()),
        }
    }
}

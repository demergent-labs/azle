use swc_ecma_ast::FnDecl;

use crate::ts_ast::{source_map::SourceMapped, GetName};

impl SourceMapped<'_, FnDecl> {
    pub fn has_guard_result_return_type(&self) -> bool {
        match &self.function.return_type {
            Some(ts_type_ann) => match &*ts_type_ann.type_ann {
                swc_ecma_ast::TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
                    swc_ecma_ast::TsEntityName::Ident(ident) => ident.get_name() == "GuardResult",
                    swc_ecma_ast::TsEntityName::TsQualifiedName(_) => false,
                },
                _ => false,
            },
            None => false,
        }
    }
}

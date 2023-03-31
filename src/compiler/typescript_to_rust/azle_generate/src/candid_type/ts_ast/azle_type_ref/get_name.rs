use swc_ecma_ast::TsEntityName;

use super::AzleTypeRef;
use crate::ts_ast::GetName;

impl GetName for AzleTypeRef<'_> {
    fn get_name(&self) -> &str {
        match &self.ts_type_ref.type_name {
            TsEntityName::TsQualifiedName(ts_qualified_name) => {
                // TODO: This could be improved for Qualified TypeRefs with type params.
                // Currently we just drop the type params. It would be better if we
                // included them.
                panic!(
                    "{}",
                    self.qualified_name_error(ts_qualified_name.right.get_name().to_string())
                )
            }
            TsEntityName::Ident(identifier) => identifier.get_name(),
        }
    }
}

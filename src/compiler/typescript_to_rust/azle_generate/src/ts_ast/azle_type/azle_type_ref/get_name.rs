use crate::ts_ast::GetName;

use super::AzleTypeRef;

impl GetName for AzleTypeRef<'_> {
    fn get_name(&self) -> &str {
        self.ts_type_ref.get_name()
    }
}

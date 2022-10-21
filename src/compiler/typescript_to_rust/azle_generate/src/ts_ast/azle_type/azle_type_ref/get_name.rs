use super::AzleTypeRef;
use crate::ts_ast::GetName;

impl GetName for AzleTypeRef<'_> {
    fn get_name(&self) -> &str {
        self.ts_type_ref.get_name()
    }
}

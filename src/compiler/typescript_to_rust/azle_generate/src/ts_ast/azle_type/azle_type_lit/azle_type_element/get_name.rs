use crate::ts_ast::GetName;

use super::AzleTypeElement;

impl GetName for AzleTypeElement<'_> {
    fn get_name(&self) -> &str {
        self.ts_type_element.get_name()
    }
}

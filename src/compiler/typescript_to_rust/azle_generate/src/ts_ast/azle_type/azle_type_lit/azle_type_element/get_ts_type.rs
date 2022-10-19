use swc_ecma_ast::TsType;

use crate::ts_ast::GetTsType;

use super::AzleTypeElement;

impl GetTsType for AzleTypeElement<'_> {
    fn get_ts_type(&self) -> TsType {
        self.ts_type_element.get_ts_type()
    }
}

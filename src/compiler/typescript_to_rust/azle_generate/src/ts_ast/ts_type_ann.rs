use swc_ecma_ast::TsTypeAnn;

use super::traits::GetTsType;

impl GetTsType for TsTypeAnn {
    fn get_ts_type(&self) -> swc_ecma_ast::TsType {
        *self.type_ann.clone()
    }
}

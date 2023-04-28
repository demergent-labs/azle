use cdk_framework::act::node::candid::Array;
use swc_ecma_ast::TsTypeRef;

use crate::ts_ast::SourceMapped;

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_vec(&self) -> Array {
        let enclosed_act_data_type = self.get_ts_type().to_candid_type();
        Array {
            enclosed_type: Box::from(enclosed_act_data_type),
        }
    }
}

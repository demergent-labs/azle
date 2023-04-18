use cdk_framework::act::node::candid::Opt;
use swc_ecma_ast::TsTypeRef;

use crate::ts_ast::SourceMapped;

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_option(&self) -> Opt {
        let enclosed_act_data_type = self.get_ts_type().to_candid_type();
        Opt {
            enclosed_type: Box::from(enclosed_act_data_type),
        }
    }
}

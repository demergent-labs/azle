use cdk_framework::act::node::candid::Array;
use swc_ecma_ast::TsTypeRef;

use crate::{ts_ast::SourceMapped, Error};

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_vec(&self) -> Result<Array, Vec<Error>> {
        let enclosed_act_data_type = self.get_ts_type()?.to_candid_type()?;
        Ok(Array {
            enclosed_type: Box::from(enclosed_act_data_type),
        })
    }
}

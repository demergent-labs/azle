use cdk_framework::act::node::candid::Array;
use swc_ecma_ast::TsTypeRef;

use crate::{traits::GetNameWithError, ts_ast::SourceMapped, Error};

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_vec(&self) -> Result<Option<Array>, Vec<Error>> {
        if self
            .symbol_table
            .vec
            .contains(&self.get_name()?.to_string())
        {
            let enclosed_act_data_type = self.get_ts_type()?.to_candid_type()?;
            Ok(Some(Array {
                enclosed_type: Box::from(enclosed_act_data_type),
            }))
        } else {
            Ok(None)
        }
    }
}

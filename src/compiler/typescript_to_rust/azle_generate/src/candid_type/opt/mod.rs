use cdk_framework::act::node::candid::Opt;
use swc_ecma_ast::TsTypeRef;

use crate::{traits::GetNameWithError, ts_ast::SourceMapped, Error};

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_option(&self) -> Result<Option<Opt>, Vec<Error>> {
        if self
            .symbol_table
            .opt
            .contains(&self.get_name()?.to_string())
        {
            let enclosed_act_data_type = self.get_ts_type()?.to_candid_type()?;
            Ok(Some(Opt {
                enclosed_type: Box::from(enclosed_act_data_type),
            }))
        } else {
            Ok(None)
        }
    }
}

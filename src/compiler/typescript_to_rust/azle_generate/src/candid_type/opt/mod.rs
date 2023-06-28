use cdk_framework::act::node::candid::Opt;
use swc_ecma_ast::TsTypeRef;

use crate::{traits::GetName, ts_ast::SourceMapped, Error};

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_option(&self) -> Result<Option<Opt>, Vec<Error>> {
        if self.alias_table.opt.contains(&self.get_name()) {
            let enclosed_act_data_type = self.get_ts_type()?.to_candid_type()?;
            Ok(Some(Opt {
                enclosed_type: Box::from(enclosed_act_data_type),
            }))
        } else {
            Ok(None)
        }
    }
}

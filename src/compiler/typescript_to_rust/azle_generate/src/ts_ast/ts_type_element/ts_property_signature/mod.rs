use swc_ecma_ast::TsPropertySignature;

use crate::{
    traits::{GetName, GetTsType},
    ts_ast::SourceMapped,
    Error,
};
use cdk_framework::act::node::CandidType;

use self::errors::{NoTypeAnnotation, UnsupportedMemberName};

pub mod errors;
mod get_span;

impl SourceMapped<'_, TsPropertySignature> {
    pub fn get_member_name(&self) -> Result<String, Error> {
        Ok(match self.key.as_ident() {
            Some(ident) => ident,
            None => return Err(UnsupportedMemberName::from_ts_property_signature(self).into()),
        }
        .get_name())
    }

    pub fn get_act_data_type(&self) -> Result<CandidType, Vec<Error>> {
        let ts_type = match &self.type_ann {
            Some(ts_type_ann) => ts_type_ann.get_ts_type(),
            None => {
                return Err(vec![
                    NoTypeAnnotation::from_ts_property_signature(self).into()
                ])
            }
        };

        self.spawn(&ts_type).to_candid_type()
    }
}

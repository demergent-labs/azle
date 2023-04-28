use swc_ecma_ast::TsPropertySignature;

use crate::{
    traits::{GetName, GetTsType},
    ts_ast::SourceMapped,
};
use cdk_framework::act::node::CandidType;

mod errors;
mod get_span;

impl SourceMapped<'_, TsPropertySignature> {
    pub fn get_member_name(&self) -> String {
        self.key
            .as_ident()
            .expect(&self.unsupported_member_name_error().to_string())
            .get_name()
            .to_string()
    }

    pub fn get_act_data_type(&self) -> CandidType {
        let ts_type = match &self.type_ann {
            Some(ts_type_ann) => ts_type_ann.get_ts_type(),
            None => panic!("{}", self.no_type_annotation_error()),
        };

        SourceMapped::new(&ts_type, self.source_map).to_candid_type()
    }
}

use super::GetName;
use swc_ecma_ast::{TsType, TsTypeRef};

pub trait TsTypeRefHelperMethods {
    fn get_enclosed_ts_types(&self) -> Vec<TsType>;
}

impl GetName for TsTypeRef {
    fn get_name(&self) -> &str {
        self.type_name.get_name()
    }
}

impl TsTypeRefHelperMethods for TsTypeRef {
    fn get_enclosed_ts_types(&self) -> Vec<TsType> {
        match &self.type_params {
            Some(params) => params.params.iter().map(|param| *param.clone()).collect(),
            None => vec![],
        }
    }
}

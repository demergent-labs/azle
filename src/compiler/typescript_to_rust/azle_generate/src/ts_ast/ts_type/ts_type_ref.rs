use swc_ecma_ast::{TsType, TsTypeRef};

pub trait GetEnclosedTsTypes {
    fn get_enclosed_ts_types(&self) -> Vec<TsType>;
}

impl GetEnclosedTsTypes for TsTypeRef {
    fn get_enclosed_ts_types(&self) -> Vec<TsType> {
        match &self.type_params {
            Some(params) => params.params.iter().map(|param| *param.clone()).collect(),
            None => vec![],
        }
    }
}

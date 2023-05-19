use swc_ecma_ast::TsType;

use crate::Error;

pub trait GetTsType {
    fn get_ts_type(&self) -> TsType;
}

pub trait GetTsTypeWithError {
    fn get_ts_type(&self) -> Result<TsType, Error>;
}

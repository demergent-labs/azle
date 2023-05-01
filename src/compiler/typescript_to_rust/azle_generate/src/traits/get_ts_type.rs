use swc_ecma_ast::TsType;

pub trait GetTsType {
    fn get_ts_type(&self) -> TsType;
}

use swc_ecma_ast::{TsFnParam, TsMethodSignature, TsType, TsTypeAnn};

pub trait TsMethodHelperMethods {
    fn get_return_type(&self) -> TsType;
    fn get_param_ts_types(&self) -> Vec<TsType>;
}

impl TsMethodHelperMethods for TsMethodSignature {
    fn get_return_type(&self) -> TsType {
        self.type_ann.get_ts_type()
    }

    fn get_param_ts_types(&self) -> Vec<TsType> {
        let params = &self.params;
        params.iter().fold(vec![], |acc, param| {
            vec![acc, vec![param.get_ts_type()]].concat()
        })
    }
}

pub trait GetTsType {
    fn get_ts_type(&self) -> TsType;
}

impl GetTsType for TsFnParam {
    fn get_ts_type(&self) -> TsType {
        let param_type_ann = &self.as_ident().unwrap().type_ann.as_ref();
        let param_type_ann = param_type_ann.clone().unwrap();
        let param_ts_type = *param_type_ann.type_ann.clone();
        param_ts_type
    }
}

impl GetTsType for Option<TsTypeAnn> {
    fn get_ts_type(&self) -> TsType {
        let ts_type_ann = self.as_ref();
        let return_type_ann = ts_type_ann.clone().unwrap();
        let return_type_ref = return_type_ann.type_ann.as_ts_type_ref().unwrap();
        let return_type_params = return_type_ref.type_params.clone().unwrap();

        *return_type_params.params[0].clone()
    }
}

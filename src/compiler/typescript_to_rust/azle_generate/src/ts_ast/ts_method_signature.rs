use swc_ecma_ast::{TsFnParam, TsMethodSignature, TsType, TsTypeAnn};

use super::ast_traits::GetTsType;

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

// TODO these need better homes
impl GetTsType for TsFnParam {
    fn get_ts_type(&self) -> TsType {
        let type_ann = &self.as_ident().unwrap().type_ann.as_ref();
        let ts_type = type_ann.unwrap().get_ts_type();
        ts_type
    }
}

impl GetTsType for Option<TsTypeAnn> {
    fn get_ts_type(&self) -> TsType {
        let ts_type_ann = self.as_ref();
        let ts_type = ts_type_ann.unwrap().get_ts_type();
        // TODO I feel like we need to explicitly say that we are looking for query update or oneway here
        // But that's not entirely true for all Option<TsTypeAnn>s just the ones used in this case.
        // I am wondering about adding Those as options to the ts_type_ref conversion
        let return_type_ref = ts_type.as_ts_type_ref().unwrap();
        let return_type_params = return_type_ref.type_params.clone().unwrap();

        *return_type_params.params[0].clone()
    }
}

use swc_ecma_ast::{TsMethodSignature, TsType};

pub fn get_return_ts_type_from_method(method_sig: &TsMethodSignature) -> TsType {
    let ts_type_ann = method_sig.type_ann.as_ref();
    let return_type_ann = ts_type_ann.clone().unwrap();
    let return_type_ref = return_type_ann.type_ann.as_ts_type_ref().unwrap();
    let return_type_params = return_type_ref.type_params.clone().unwrap();

    let return_ts_type = *return_type_params.params[0].clone();
    return_ts_type
}

pub fn get_param_ts_types_from_method(method_sig: &TsMethodSignature) -> Vec<TsType> {
    let params = &method_sig.params;
    params.iter().fold(vec![], |acc, param| {
        let param_type_ann = &param.as_ident().unwrap().type_ann.as_ref();
        let param_type_ann = param_type_ann.clone().unwrap();
        let param_ts_type = *param_type_ann.type_ann.clone();

        vec![acc, vec![param_ts_type]].concat()
    })
}

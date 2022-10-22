mod azle_fn_param;
mod errors;
mod ts_fn_param;

use swc_common::SourceMap;
use swc_ecma_ast::{TsFnParam, TsType, TsTypeAnn};

use crate::{errors::ErrorMessage, ts_ast::azle_functions_and_methods::azle_fn_param::AzleFnParam};

use super::{ast_traits::GetSourceInfo, azle_type::AzleType, GetName, GetTsType};

pub trait FunctionAndMethodTypeHelperMethods {
    fn get_ts_type_ann(&self) -> TsTypeAnn;
    fn get_ts_fn_params(&self) -> Vec<TsFnParam>;
    fn get_valid_return_types(&self) -> Vec<&str>;

    fn get_param_types(&self, source_map: &SourceMap) -> Vec<TsType> {
        self.get_ts_fn_params().iter().fold(vec![], |acc, param| {
            let azle_fn_param = AzleFnParam::from_ts_fn_param(param.clone(), source_map);
            let ts_type = azle_fn_param.get_ts_type();
            vec![acc, vec![ts_type.clone()]].concat()
        })
    }

    fn get_return_type(&self, source_map: &SourceMap) -> Option<TsType> {
        let mode = self.get_func_mode(source_map);
        if mode == "Oneway" {
            None
        } else {
            let ts_type = self.get_ts_type_ann().get_ts_type();
            let azle_type = AzleType::from_ts_type(ts_type, source_map);
            let azle_type_ref = match azle_type.clone().as_azle_type_ref() {
                Some(azle_type_ref) => azle_type_ref,
                // TODO this feels like a copy paste error to me. Double check the previous commit to make sure this is right
                None => panic!(
                    "Unreachable:\n{}",
                    self.invalid_return_type_count(azle_type)
                ),
            };
            let ts_type_ref = azle_type_ref.ts_type_ref;
            match &ts_type_ref.type_params {
                Some(type_param_inst) => {
                    if type_param_inst.params.len() != 1 {
                        panic!("{}", self.invalid_return_type_count(azle_type));
                    }
                    match type_param_inst.params.get(0) {
                        Some(param) => {
                            let ts_type = &**param;
                            Some(ts_type.clone())
                        }
                        // The length check should catch this error
                        None => panic!(
                            "Unreachable:\n{}",
                            self.invalid_return_type_count(azle_type)
                        ),
                    }
                }
                None => panic!("{}", self.invalid_return_type_count(azle_type)),
            }
        }
    }

    fn get_func_mode(&self, source_map: &SourceMap) -> String {
        let ts_type = &self.get_ts_type_ann().get_ts_type();
        let azle_type = AzleType::from_ts_type(ts_type.clone(), source_map);
        match azle_type.clone().as_azle_type_ref() {
            Some(azle_type_ref) => {
                let mode = azle_type_ref.get_name();
                if !self.get_valid_return_types().contains(&mode) {
                    panic!("{}", self.invalid_return_type_error(&azle_type))
                }
                mode.to_string()
            }
            None => panic!("{}", self.invalid_return_type_error(&azle_type)),
        }
    }

    // TODO change this a little if the count is 0, like what we did for Option, Func, and Variant
    fn invalid_return_type_count(&self, azle_type: AzleType) -> ErrorMessage {
        ErrorMessage {
            title: "Func must specify exactly one return type".to_string(),
            origin: azle_type.get_origin(),
            line_number: azle_type.get_line_number(),
            source: azle_type.get_source(),
            range: azle_type.get_range(),
            annotation: "".to_string(),
            suggestion: None,
        }
    }

    // TODO make this better by doing an example with Update and whatever return type they gave
    fn invalid_return_type_error(&self, azle_type: &AzleType) -> ErrorMessage {
        ErrorMessage {
            title: format!(
                "Return type must be one of {:?}",
                self.get_valid_return_types()
            ),
            origin: azle_type.get_origin(),
            line_number: azle_type.get_line_number(),
            source: azle_type.get_source(),
            range: azle_type.get_range(),
            annotation: "".to_string(),
            suggestion: None,
        }
    }
}

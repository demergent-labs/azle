use swc_ecma_ast::{TsEntityName, TsFnParam, TsType, TsTypeAnn};

use super::AzleMethodSignature;
use crate::ts_ast::{
    ast_traits::GetTsType, azle_functions_and_methods::FunctionAndMethodTypeHelperMethods, GetName,
};

impl FunctionAndMethodTypeHelperMethods for AzleMethodSignature<'_> {
    fn get_ts_fn_params(&self) -> Vec<TsFnParam> {
        self.ts_method_signature.params.clone()
    }

    fn get_ts_type_ann(&self) -> TsTypeAnn {
        match &self.ts_method_signature.type_ann {
            Some(type_ann) => type_ann.clone(),
            None => panic!("{}", self.no_type_annotation_error()),
        }
    }

    fn get_valid_return_types(&self) -> Vec<&str> {
        vec!["Oneway", "Update", "Query", "CanisterResult"]
    }

    fn get_return_type(&self) -> Option<TsType> {
        let mode = match self.get_ts_type_ann().get_ts_type() {
            TsType::TsTypeRef(type_reference) => match &type_reference.type_name {
                TsEntityName::TsQualifiedName(_) => panic!("Unsupported qualified name. Func return type must directly be Query, Update, or Oneway"),
                TsEntityName::Ident(identifier) => {
                let mode = identifier.get_name();
                if !self.get_valid_return_types().contains(&mode) {
                    panic!("Return type must be one of {:?}", self.get_valid_return_types())
                }
                mode.to_string()
            }
            },
            _ => panic!("Return type must be one of {:?}", self.get_valid_return_types()),
        };

        if mode == "Oneway" {
            None
        } else {
            let ts_type = self.get_ts_type_ann().get_ts_type();
            let ts_type_ref = ts_type.as_ts_type_ref().unwrap();
            match &ts_type_ref.type_params {
                Some(type_param_inst) => {
                    if type_param_inst.params.len() != 1 {
                        panic!("Func must specify exactly one return type")
                    }
                    match type_param_inst.params.get(0) {
                        Some(param) => {
                            let ts_type = &**param;
                            Some(ts_type.clone())
                        }
                        None => panic!("Func must specify exactly one return type"),
                    }
                }
                None => panic!("Func must specify a return type"),
            }
        }
    }
}

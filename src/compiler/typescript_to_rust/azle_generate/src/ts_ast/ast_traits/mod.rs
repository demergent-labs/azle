pub mod generate_inline_name;
pub mod get_name;
pub mod to_display_string;

pub use generate_inline_name::GenerateInlineName;
pub use get_name::GetName;
use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsEntityName, TsFnParam, TsPropertySignature, TsType, TsTypeAnn};
pub use to_display_string::ToDisplayString;

use super::AzleTypeAlias;

pub trait GetDependencies {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAlias>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String>;
}

pub trait GetTsType {
    fn get_ts_type(&self) -> TsType;
}

impl GetTsType for TsPropertySignature {
    fn get_ts_type(&self) -> TsType {
        self.type_ann.as_ref().unwrap().get_ts_type()
    }
}

pub trait FunctionAndMethodTypeHelperMethods {
    fn get_ts_type_ann(&self) -> TsTypeAnn;
    fn get_ts_fn_params(&self) -> Vec<TsFnParam>;
    fn get_valid_return_types(&self) -> Vec<&str>;

    fn get_param_types(&self) -> Vec<TsType> {
        self.get_ts_fn_params().iter().fold(vec![], |acc, param| {
            vec![acc, vec![param.get_ts_type().clone()]].concat()
        })
    }

    fn get_return_type(&self) -> Option<TsType> {
        let mode = self.get_func_mode();
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

    fn get_func_mode(&self) -> String {
        match self.get_ts_type_ann().get_ts_type() {
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
        }
    }
}

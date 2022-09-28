pub mod generate_inline_name;
use std::collections::{HashMap, HashSet};

pub use generate_inline_name::GenerateInlineName;
use swc_ecma_ast::{TsEntityName, TsFnParam, TsType, TsTypeAliasDecl, TsTypeAnn};

pub trait GetDependencies {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String>;
}

pub trait GetName {
    fn get_name(&self) -> &str;
}

pub trait GetTsType {
    fn get_ts_type(&self) -> TsType;
}

pub trait FunctionAndMethodTypeHelperMethods {
    fn get_ts_type_ann(&self) -> TsTypeAnn;
    fn get_ts_fn_params(&self) -> Vec<TsFnParam>;

    fn get_param_types(&self) -> Vec<TsType> {
        self.get_ts_fn_params()
            .iter()
            .fold(vec![], |acc, param| match param {
                TsFnParam::Ident(identifier) => match &identifier.type_ann {
                    Some(param_type) => vec![acc, vec![param_type.get_ts_type().clone()]].concat(),
                    None => panic!("Function parameter must have a type"),
                },
                TsFnParam::Array(_) => todo!(),
                TsFnParam::Rest(_) => todo!(),
                TsFnParam::Object(_) => todo!(),
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
        // TODO should this be an enum since the only legal values are Update, Oneway, and Query?
        match self.get_ts_type_ann().get_ts_type() {
            TsType::TsTypeRef(type_reference) => match &type_reference.type_name {
                TsEntityName::TsQualifiedName(_) => panic!("Unsupported qualified name. Func return type must directly be Query, Update, or Oneway"),
                TsEntityName::Ident(identifier) => {
                let mode = identifier.get_name();
                if mode != "Query" && mode != "Update" && mode != "Oneway" {
                    panic!("Func return type must be Query, Update, or Oneway")
                }
                mode.to_string()
            }
            },
            _ => panic!("Func return type must be Query, Update, or Oneway"),
        }
    }
}

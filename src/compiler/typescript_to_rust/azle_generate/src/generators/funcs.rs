use crate::cdk_act::ToTokenStream;
use crate::ts_ast::ts_types_to_act;
use swc_ecma_ast::TsEntityName::{Ident, TsQualifiedName};
use swc_ecma_ast::TsType::TsTypeRef;

pub fn get_func_mode(function_type: &swc_ecma_ast::TsFnType) -> String {
    match &*function_type.type_ann.type_ann {
        TsTypeRef(type_reference) => match &type_reference.type_name {
            TsQualifiedName(_) => panic!("Unsupported qualified name. Func return type must directly be Query, Update, or Oneway"),
            Ident(identifier) => {
                let mode = identifier.sym.chars().as_str();
                if mode != "Query" && mode != "Update" && mode != "Oneway" {
                    panic!("Func return type must be Query, Update, or Oneway")
                }
                mode.to_string()
            }
        },
        _ => panic!("Func return type must be Query, Update, or Oneway"),
    }
}

pub fn get_param_types(function_type: &swc_ecma_ast::TsFnType) -> Vec<String> {
    function_type
        .params
        .iter()
        .map(|param| match param {
            swc_ecma_ast::TsFnParam::Ident(identifier) => match &identifier.type_ann {
                Some(param_type) => {
                    ts_types_to_act::ts_type_to_act_node(&*param_type.type_ann, &None)
                        .to_token_stream()
                        .to_string()
                }
                None => panic!("Function parameter must have a return type"),
            },
            _ => panic!("Func parameter must be an identifier"),
        })
        .collect()
}

pub fn get_return_type(function_type: &swc_ecma_ast::TsFnType) -> String {
    match &*function_type.type_ann.type_ann {
        TsTypeRef(type_reference) => match &type_reference.type_name {
            TsQualifiedName(_) => panic!("Unsupported qualified name. Func return type must directly be Query, Update, or Oneway"),
            Ident(identifier) => {
                let mode = identifier.sym.chars().as_str();
                if mode != "Query" && mode != "Update" && mode != "Oneway" {
                    panic!("Func return type must be Query, Update, or Oneway")
                }

                if mode == "Oneway" {
                    "".to_string()
                } else {
                    match &type_reference.type_params {
                        Some(type_param_inst) => {
                            if type_param_inst.params.len() != 1 {
                                panic!("Func must specify exactly one return type")
                            }
                            match type_param_inst.params.get(0) {
                                Some(param) => {
                                    ts_types_to_act::ts_type_to_act_node(&**param, &None).to_token_stream().to_string()
                                },
                                None => panic!("Func must specify exactly one return type"),
                            }
                        },
                        None => panic!("Func must specify a return type"),
                    }
                }
            }
        },
        _ => panic!("Func return type must be Query, Update, or Oneway"),
    }
}

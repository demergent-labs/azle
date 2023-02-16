use cdk_framework::nodes::ActExternalCanisterMethod;
use swc_ecma_ast::{ClassProp, Expr, TsFnOrConstructorType, TsType};

use crate::ts_ast::{
    azle_functions_and_methods::ts_fn_param::ToActFnParam, source_map::SourceMapped,
};

use super::GetName;

impl SourceMapped<'_, ClassProp> {
    pub fn to_act_external_canister_method(&self) -> Option<ActExternalCanisterMethod> {
        if !self.contains_decorator("query") && self.contains_decorator("update") {
            return None;
        }

        if self.decorators.len() != 1 {
            panic!(
                "InvalidExternalCanisterDeclaration: child property specifies multiple decorators."
            );
        };

        let mode = self
            .decorators
            .get(0)
            .unwrap()
            .expr
            .as_ident()
            .unwrap()
            .get_name()
            .to_string();

        let name = match self.key {
            swc_ecma_ast::PropName::Ident(ident) => ident.get_name().to_string(),
            swc_ecma_ast::PropName::Str(str) => str.value.to_string(),
            swc_ecma_ast::PropName::Num(num) => num.value.to_string(),
            swc_ecma_ast::PropName::Computed(_) => panic!("InvalidExternalCanisterDeclaration: contains a computed method name which isn't currently supported"),
            swc_ecma_ast::PropName::BigInt(big_int) => big_int.value.to_string(),
        };

        let fn_type = match &self.type_ann {
            Some(type_ann) => match *type_ann.type_ann {
                TsType::TsFnOrConstructorType(fn_or_constructor_type) => match fn_or_constructor_type {
                    TsFnOrConstructorType::TsFnType(ts_fn_type) => ts_fn_type,
                    TsFnOrConstructorType::TsConstructorType(_) => panic!("InvalidExternalCanisterDeclaration: Decorator \"@{}\" not allowed on constructor", mode),
                }
                _ => panic!(
                    "InvalidExternalCanisterDeclaration: method \"{}\" has an invalid return type. Only function return types are permitted", name
                ),
            },
            None => panic!("InvalidExternalCanisterDeclaration: method \"{}\" is missing a type annotation", name),
        };

        let params: Vec<_> = fn_type
            .params
            .iter()
            .map(|param| param.to_act_fn_param())
            .collect();

        // let name = self.decorators
        // prop.
        // self.class.body.iter().map()
        // ts_type_lit
        //     .members
        //     .iter()
        //     .map(|member| match member {
        //         TsTypeElement::TsMethodSignature(ts_method_signature) => {
        //             let azle_method_signature = AzleMethodSignature {
        //                 ts_method_signature: ts_method_signature.clone(),
        //                 self.source_map,
        //             };
        //             azle_method_signature.to_act_external_canister_method()
        //         }
        //         _ => panic!("Canister methods must be method signatures"),
        //     })
        //     .collect()
        Some(ActExternalCanisterMethod {
            name,
            params: vec![], // TODO
            return_type: todo!(),
        })
    }

    fn contains_decorator(&self, name: &str) -> bool {
        self.decorators.iter().any(|decorator| {
            if let Expr::Ident(ident) = &*decorator.expr {
                return ident.get_name() == name;
            }
            false
        })
    }
}

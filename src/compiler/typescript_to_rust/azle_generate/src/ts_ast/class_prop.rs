use cdk_framework::nodes::{ActExternalCanisterMethod, ActFnParam};
use swc_ecma_ast::{ClassProp, Expr, TsFnOrConstructorType, TsType};

use crate::ts_ast::{source_map::SourceMapped, GetName};

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

        let name = self.name();
        let params: Vec<ActFnParam> = self.build_act_fn_params();

        Some(ActExternalCanisterMethod {
            name,
            params,
            return_type: todo!(), // TODO
        })
    }

    fn build_act_fn_params(&self) -> Vec<ActFnParam> {
        match &self.type_ann {
            Some(type_ann) => match &*type_ann.type_ann {
                TsType::TsFnOrConstructorType(fn_or_constructor_type) => {
                    match fn_or_constructor_type {
                        TsFnOrConstructorType::TsFnType(ts_fn_type) => SourceMapped::new(ts_fn_type, self.source_map).build_act_fn_params(),
                        TsFnOrConstructorType::TsConstructorType(_) => panic!("InvalidExternalCanisterDeclaration: Decorator \"@{}\" not allowed on constructor", self.mode()),
                    }
                }
                _ => panic!(
                    "InvalidExternalCanisterDeclaration: method \"{}\" has an invalid return type. Only function return types are permitted", self.name()
                ),
            },
            None => panic!("InvalidExternalCanisterDeclaration: method \"{}\" is missing a type annotation", self.name()),
        }
    }

    fn contains_decorator(&self, name: &str) -> bool {
        self.decorators.iter().any(|decorator| {
            if let Expr::Ident(ident) = &*decorator.expr {
                return ident.get_name() == name;
            }
            false
        })
    }

    fn mode(&self) -> String {
        self.decorators
            .get(0)
            .unwrap()
            .expr
            .as_ident()
            .unwrap()
            .get_name()
            .to_string()
    }

    fn name(&self) -> String {
        match &self.key {
            swc_ecma_ast::PropName::Ident(ident) => ident.get_name().to_string(),
            swc_ecma_ast::PropName::Str(str) => str.value.to_string(),
            swc_ecma_ast::PropName::Num(num) => num.value.to_string(),
            swc_ecma_ast::PropName::Computed(_) => panic!("InvalidExternalCanisterDeclaration: contains a computed method name which isn't currently supported"),
            swc_ecma_ast::PropName::BigInt(big_int) => big_int.value.to_string(),
        }
    }
}

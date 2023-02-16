use cdk_framework::{
    nodes::{ActExternalCanisterMethod, ActFnParam},
    ActDataType,
};
use swc_ecma_ast::{ClassProp, Expr, TsFnOrConstructorType, TsFnType, TsType};

use crate::ts_ast::{source_map::SourceMapped, GetName};

impl SourceMapped<'_, ClassProp> {
    pub fn to_act_external_canister_method(&self) -> Option<ActExternalCanisterMethod> {
        if !self.has_azle_decorator() {
            return None;
        }

        let name = self.name();
        let params = self.build_act_fn_params();
        let return_type = self.build_return_type();

        Some(ActExternalCanisterMethod {
            name,
            params,
            return_type,
        })
    }

    fn build_act_fn_params(&self) -> Vec<ActFnParam> {
        self.ts_fn_type().build_act_fn_params()
    }

    fn build_return_type(&self) -> ActDataType {
        self.ts_fn_type().build_return_type()
    }

    fn contains_decorator(&self, name: &str) -> bool {
        self.decorators.iter().any(|decorator| {
            if let Expr::Ident(ident) = &*decorator.expr {
                return ident.get_name() == name;
            }
            false
        })
    }

    fn has_azle_decorator(&self) -> bool {
        self.contains_decorator("query") || self.contains_decorator("update")
    }

    fn mode(&self) -> String {
        if self.decorators.len() != 1 {
            panic!(
                "InvalidExternalCanisterDeclaration: child property specifies multiple decorators."
            );
        };

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

    fn ts_fn_type(&self) -> SourceMapped<TsFnType> {
        match &self.type_ann {
            Some(type_ann) => match &*type_ann.type_ann {
                TsType::TsFnOrConstructorType(fn_or_constructor_type) => {
                    match fn_or_constructor_type {
                        TsFnOrConstructorType::TsFnType(ts_fn_type) => SourceMapped::new(ts_fn_type, self.source_map),
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
}

use cdk_framework::{
    nodes::{ActExternalCanisterMethod, ActFnParam},
    ActDataType, ToActDataType,
};
use swc_ecma_ast::{ClassProp, Expr, TsFnOrConstructorType, TsFnType, TsType};

use crate::{
    errors::external_canister_method::ParseError,
    ts_ast::{source_map::SourceMapped, GetName},
};

use super::azle_type::AzleType;

mod get_dependent_types;

impl SourceMapped<'_, ClassProp> {
    pub fn to_act_external_canister_method(&self) -> Result<ActExternalCanisterMethod, ParseError> {
        if !self.has_azle_decorator() {
            return Err(ParseError::MissingDecorator("Property is missing a decorator. It must be decorated with either @query, @update, or @oneway".to_string()));
        }

        let name = self.name()?;
        let params = self.build_act_fn_params()?;
        let return_type = self.build_return_type()?;

        Ok(ActExternalCanisterMethod {
            name,
            params,
            return_type,
        })
    }

    fn build_act_fn_params(&self) -> Result<Vec<ActFnParam>, ParseError> {
        Ok(self.ts_fn_type()?.build_act_fn_params())
    }

    fn build_return_type(&self) -> Result<ActDataType, ParseError> {
        let return_ts_type = self.return_ts_type()?;
        let azle_type = AzleType::from_ts_type(return_ts_type, self.source_map);
        let act_data_type = azle_type.to_act_data_type(&None);
        Ok(act_data_type)
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

    fn mode(&self) -> Result<String, ParseError> {
        if self.decorators.len() != 1 {
            return Err(ParseError::MultipleDecorators(
                "InvalidExternalCanisterDeclaration: child property specifies multiple decorators."
                    .to_string(),
            ));
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

        Ok(mode)
    }

    fn name(&self) -> Result<String, ParseError> {
        let name = match &self.key {
            swc_ecma_ast::PropName::Ident(ident) => ident.get_name().to_string(),
            swc_ecma_ast::PropName::Str(str) => str.value.to_string(),
            swc_ecma_ast::PropName::Num(num) => num.value.to_string(),
            swc_ecma_ast::PropName::Computed(_) => return Err(ParseError::InvalidMethodName("InvalidExternalCanisterDeclaration: contains a computed method name which isn't currently supported".to_string())),
            swc_ecma_ast::PropName::BigInt(big_int) => big_int.value.to_string(),
        };

        return Ok(name);
    }

    fn param_ts_types(&self) -> Result<Vec<TsType>, ParseError> {
        Ok(self.ts_fn_type()?.get_param_ts_types())
    }

    fn return_ts_type(&self) -> Result<TsType, ParseError> {
        let ts_fn_type = self.ts_fn_type()?;
        match &*ts_fn_type.type_ann.type_ann {
            TsType::TsTypeRef(ts_type_ref) => {
                let name = match &ts_type_ref.type_name {
                    swc_ecma_ast::TsEntityName::TsQualifiedName(_) => {
                        return Err(ParseError::QualifiedNameError(
                            "InvalidExternalCanisterDeclaration: qualified names in member return types are not currently supported. Try importing the type directly.".to_string()
                        ))
                    }
                    swc_ecma_ast::TsEntityName::Ident(ident) => ident.get_name().to_string(),
                };

                if name != "CanisterResult" {
                    return Err(ParseError::MissingCanisterResultAnnotation(format!(
                        "InvalidExternalCanisterDeclaration: return type of property \"{}\" is not a CanisterResult. External canister methods must wrap their return types in the CanisterResult<T> generic type.", self.name()?
                    )))
                }

                match &ts_type_ref.type_params {
                    Some(ts_type_param_inst) => {
                        if ts_type_param_inst.params.len() != 1 {
                            return Err(ParseError::IncorrectTypeArgumentsToCanisterResult(format!(
                                "InvalidExternalCanisterDeclaration: incorrect number of type arguments to generic type CanisterResult<T> for property \"{}\".", self.name()?
                            )))
                        }

                        let inner_type = &**ts_type_param_inst.params.get(0).unwrap();
                        Ok(inner_type.clone())
                    },
                    None => {
                        return Err(ParseError::IncorrectTypeArgumentsToCanisterResult(format!(
                            "InvalidExternalCanisterDeclaration: missing type argument to generic return type CanisterResult<T> for property \"{}\".", self.name()?
                        )))

                    }
                }
            },
            _ => return Err(ParseError::MissingCanisterResultAnnotation(format!(
                "InvalidExternalCanisterDeclaration: return type of property \"{}\" is not a CanisterResult. External canister methods must wrap their return types in the CanisterResult<T> generic type.", self.name()?
            )))
        }
    }

    fn ts_fn_type(&self) -> Result<SourceMapped<TsFnType>, ParseError> {
        match &self.type_ann {
            Some(type_ann) => match &*type_ann.type_ann {
                TsType::TsFnOrConstructorType(fn_or_constructor_type) => {
                    match fn_or_constructor_type {
                        TsFnOrConstructorType::TsFnType(ts_fn_type) => Ok(SourceMapped::new(ts_fn_type, self.source_map)),
                        TsFnOrConstructorType::TsConstructorType(_) => return Err(ParseError::InvalidDecorator(format!("InvalidExternalCanisterDeclaration: Decorator \"@{}\" not allowed on constructor", self.mode()?))),
                    }
                }
                _ => return Err(ParseError::InvalidReturnType(format!(
                    "InvalidExternalCanisterDeclaration: method \"{}\" has an invalid return type. Only function return types are permitted", self.name()?
                ))),
            },
            None => return Err(ParseError::MissingTypeAnnotation(format!("InvalidExternalCanisterDeclaration: method \"{}\" is missing a type annotation", self.name()?))),
        }
    }
}

use cdk_framework::{
    act::node::{candid::service::Method, node_parts::mode::Mode, CandidType, Param},
    traits::{CollectIterResults, CollectResults},
};
use swc_ecma_ast::{ClassProp, TsFnOrConstructorType, TsFnParam, TsFnType, TsType};

pub use crate::canister_method::check_length_and_map::CheckLengthAndMapTwo;
use crate::{
    errors::errors::{
        ArrayDestructuringInParamsNotSupported, FunctionParamsMustHaveType,
        ObjectDestructuringNotSupported, RestParametersNotSupported,
    },
    traits::{GetName, GetOptionalName, GetTsType},
    ts_ast::SourceMapped,
    Error,
};

use super::errors::{
    ComputedPropertyNotAllowed, InvalidDecorator, InvalidReturnType, MissingCallResultAnnotation,
    MissingDecorator, MissingTypeAnnotation, MissingTypeArguments, NotExactlyOneDecorator,
    TooManyReturnTypes,
};

impl SourceMapped<'_, ClassProp> {
    pub fn to_service_method(&self) -> Result<Method, Vec<Error>> {
        let (_, _, name, mode, params, return_type) = (
            if self.decorators.len() == 0 {
                Err(vec![MissingDecorator::from_class_prop(self).into()])
            } else {
                Ok(())
            },
            if !self.has_azle_decorator() {
                Err(vec![InvalidDecorator::from_class_prop(self).into()])
            } else {
                Ok(())
            },
            self.name().map_err(Error::into),
            {
                let decorator_name = self.get_decorator_name()?[..].to_string();
                match decorator_name.as_str() {
                    _ if self
                        .alias_table
                        .service_query_decorator
                        .contains(&decorator_name) =>
                    {
                        Ok(Mode::Query)
                    }
                    _ if self
                        .alias_table
                        .service_update_decorator
                        .contains(&decorator_name) =>
                    {
                        Ok(Mode::Update)
                    }
                    _ => Err(vec![InvalidDecorator::from_class_prop(self).into()]),
                }
            },
            self.build_act_fn_params(),
            self.build_return_type(),
        )
            .collect_results()?;

        Ok(Method::new(name, mode, params, return_type))
    }

    fn build_act_fn_params(&self) -> Result<Vec<Param>, Vec<Error>> {
        self.ts_fn_type()
            .map_err(Into::<Vec<Error>>::into)?
            .build_act_fn_params()
    }

    fn build_return_type(&self) -> Result<CandidType, Vec<Error>> {
        let return_ts_type = self.return_ts_type()?;
        let candid_type = self.spawn(&return_ts_type).to_candid_type()?;
        Ok(candid_type)
    }

    fn contains_decorator(&self, names: &Vec<String>) -> bool {
        self.decorators.iter().any(|decorator| {
            if let Some(name) = decorator.expr.get_name() {
                return names.contains(&name);
            }
            false
        })
    }

    fn has_azle_decorator(&self) -> bool {
        self.contains_decorator(&self.alias_table.service_query_decorator)
            || self.contains_decorator(&self.alias_table.service_update_decorator)
    }

    fn get_decorator_name(&self) -> Result<String, Vec<Error>> {
        self.decorators.check_length_is_one_and_map(
            |decorators| NotExactlyOneDecorator::from_decorator_list(decorators, self).into(),
            |decorator| {
                decorator
                    .expr
                    .get_name()
                    .ok_or_else(|| vec![InvalidDecorator::from_class_prop(self).into()])
            },
        )
    }

    fn name(&self) -> Result<String, Error> {
        let name = match &self.key {
            swc_ecma_ast::PropName::Ident(ident) => ident.get_name(),
            swc_ecma_ast::PropName::Str(str) => str.value.to_string(),
            swc_ecma_ast::PropName::Num(num) => num.value.to_string(),
            swc_ecma_ast::PropName::Computed(_) => {
                return Err(ComputedPropertyNotAllowed::from_class_prop(self).into())
            }
            swc_ecma_ast::PropName::BigInt(big_int) => big_int.value.to_string(),
        };

        return Ok(name);
    }

    fn return_ts_type(&self) -> Result<TsType, Error> {
        let ts_fn_type = self.ts_fn_type()?;
        match &*ts_fn_type.type_ann.type_ann {
            TsType::TsTypeRef(ts_type_ref) => {
                if !self
                    .alias_table
                    .call_result
                    .contains(&ts_type_ref.type_name.get_name())
                {
                    return Err(MissingCallResultAnnotation::from_class_prop(self).into());
                }

                match &ts_type_ref.type_params {
                    Some(ts_type_param_inst) => {
                        if ts_type_param_inst.params.len() != 1 {
                            return Err(TooManyReturnTypes::from_class_prop(self).into());
                        }

                        let inner_type = &*ts_type_param_inst.params[0];
                        Ok(inner_type.clone())
                    }
                    None => return Err(MissingTypeArguments::from_class_prop(self).into()),
                }
            }
            _ => return Err(MissingCallResultAnnotation::from_class_prop(self).into()),
        }
    }

    fn ts_fn_type(&self) -> Result<SourceMapped<TsFnType>, Error> {
        match &self.type_ann {
            Some(type_ann) => match &*type_ann.type_ann {
                TsType::TsFnOrConstructorType(fn_or_constructor_type) => {
                    match fn_or_constructor_type {
                        TsFnOrConstructorType::TsFnType(ts_fn_type) => Ok(self.spawn(ts_fn_type)),
                        TsFnOrConstructorType::TsConstructorType(_) => {
                            return Err(InvalidReturnType::from_class_prop(self).into())
                        }
                    }
                }
                _ => return Err(InvalidReturnType::from_class_prop(self).into()),
            },
            None => return Err(MissingTypeAnnotation::from_class_prop(self).into()),
        }
    }
}

impl SourceMapped<'_, TsFnType> {
    pub fn build_act_fn_params(&self) -> Result<Vec<Param>, Vec<Error>> {
        self.params
            .iter()
            .map(|param| self.ts_fn_param_to_param(param))
            .collect_results()
    }

    fn ts_fn_param_to_param(&self, param: &TsFnParam) -> Result<Param, Vec<Error>> {
        match param {
            TsFnParam::Ident(identifier) => {
                let name = identifier.get_name();
                let candid_type = match &identifier.type_ann {
                    Some(ts_type_ann) => self.spawn(&ts_type_ann.get_ts_type()).to_candid_type()?,
                    None => {
                        return Err(vec![Into::<Error>::into(
                            FunctionParamsMustHaveType::from_ts_fn_type(self),
                        )])
                    }
                };
                Ok(Param { name, candid_type })
            }
            TsFnParam::Array(array_pat) => {
                return Err(vec![Into::<Error>::into(
                    ArrayDestructuringInParamsNotSupported::from_ts_fn_type(self, array_pat),
                )])
            }
            TsFnParam::Rest(rest_pat) => {
                return Err(vec![RestParametersNotSupported::from_ts_fn_type(
                    self, rest_pat,
                )
                .into()])
            }
            TsFnParam::Object(object_pat) => {
                return Err(vec![ObjectDestructuringNotSupported::from_ts_fn_type(
                    self, object_pat,
                )
                .into()])
            }
        }
    }
}

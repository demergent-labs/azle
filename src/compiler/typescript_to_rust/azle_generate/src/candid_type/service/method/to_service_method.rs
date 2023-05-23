use cdk_framework::act::node::{
    candid::service::Method, node_parts::mode::Mode, CandidType, Param,
};
use swc_ecma_ast::{ClassProp, Expr, TsFnOrConstructorType, TsFnParam, TsFnType, TsType};

pub use crate::canister_method::check_length_and_map::CheckLengthAndMapTwo;
use crate::{
    errors::{
        errors::{
            ArrayDestructuringInParamsNotSupported, FunctionParamsMustHaveType,
            ObjectDestructuringNotSupported, RestParametersNotSupported,
        },
        CollectResults,
    },
    traits::{GetName, GetTsType},
    ts_ast::SourceMapped,
    Error,
};

use super::errors::{
    ComputedPropertyNotAllowed, InvalidDecorator, InvalidReturnType, MissingCallResultAnnotation,
    MissingDecorator, MissingTypeAnnotation, MissingTypeArguments, NamespaceQualifiedType,
    NotExactlyOneDecorator, TooManyReturnTypes,
};

impl SourceMapped<'_, ClassProp> {
    pub fn to_service_method(&self) -> Result<Method, Vec<Error>> {
        if self.decorators.len() == 0 {
            return Err(vec![MissingDecorator::from_class_prop(self).into()]);
        }

        if !self.has_azle_decorator() {
            return Err(vec![InvalidDecorator::from_class_prop(self).into()]);
        }

        let name = self.name()?;
        let mode = match &self.mode()?[..] {
            "serviceQuery" => Mode::Query,
            "serviceUpdate" => Mode::Update,
            _ => return Err(vec![InvalidDecorator::from_class_prop(self).into()]),
        };
        let params = self.build_act_fn_params()?;
        let return_type = self.build_return_type()?;

        Ok(Method::new(name, mode, params, return_type))
    }

    fn build_act_fn_params(&self) -> Result<Vec<Param>, Vec<Error>> {
        self.ts_fn_type()
            .map_err(Into::<Vec<Error>>::into)?
            .build_act_fn_params()
    }

    fn build_return_type(&self) -> Result<CandidType, Vec<Error>> {
        let return_ts_type = self.return_ts_type()?;
        let candid_type = SourceMapped::new(&return_ts_type, self.source_map).to_candid_type()?;
        Ok(candid_type)
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
        self.contains_decorator("serviceQuery") || self.contains_decorator("serviceUpdate")
    }

    fn mode(&self) -> Result<String, Vec<Error>> {
        self.decorators.check_length_is_one_and_map(
            |decorators| NotExactlyOneDecorator::from_decorator_list(decorators).into(),
            |decorator| {
                let mode = match decorator.expr.as_ident() {
                    Some(ident) => ident,
                    None => return Err(vec![InvalidDecorator::from_class_prop(self).into()]),
                }
                .get_name()
                .to_string();

                Ok(mode)
            },
        )
    }

    fn name(&self) -> Result<String, Error> {
        let name = match &self.key {
            swc_ecma_ast::PropName::Ident(ident) => ident.get_name().to_string(),
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
                let name = match &ts_type_ref.type_name {
                    swc_ecma_ast::TsEntityName::TsQualifiedName(_) => {
                        return Err(NamespaceQualifiedType::from_class_prop(self).into())
                    }
                    swc_ecma_ast::TsEntityName::Ident(ident) => ident.get_name().to_string(),
                };

                if name != "CallResult" {
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
                        TsFnOrConstructorType::TsFnType(ts_fn_type) => {
                            Ok(SourceMapped::new(ts_fn_type, self.source_map))
                        }
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
            .map(|param| match param {
                TsFnParam::Ident(identifier) => {
                    let name = identifier.get_name().to_string();
                    let candid_type = match &identifier.type_ann {
                        Some(ts_type_ann) => {
                            SourceMapped::new(&ts_type_ann.get_ts_type(), self.source_map)
                                .to_candid_type()?
                        }
                        None => {
                            return Err(vec![Into::<Error>::into(
                                FunctionParamsMustHaveType::from_ts_fn_type(self),
                            )])
                        }
                    };
                    Ok(Param { name, candid_type })
                }
                TsFnParam::Array(_) => {
                    return Err(vec![Into::<Error>::into(
                        ArrayDestructuringInParamsNotSupported::from_ts_fn_type(self),
                    )])
                }
                TsFnParam::Rest(_) => {
                    return Err(vec![
                        RestParametersNotSupported::from_ts_fn_type(self).into()
                    ])
                }
                TsFnParam::Object(_) => {
                    return Err(vec![
                        ObjectDestructuringNotSupported::from_ts_fn_type(self).into()
                    ])
                }
            })
            .collect_results()
    }
}

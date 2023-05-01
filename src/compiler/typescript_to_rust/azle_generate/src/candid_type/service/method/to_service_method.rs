use cdk_framework::act::node::{
    candid::service::Method, node_parts::mode::Mode, CandidType, Param,
};
use swc_ecma_ast::{ClassProp, Expr, TsFnOrConstructorType, TsFnParam, TsFnType, TsType};

use crate::{
    errors::service_method::ParseError,
    traits::{GetName, GetTsType},
    ts_ast::SourceMapped,
};

impl SourceMapped<'_, ClassProp> {
    pub fn to_service_method(&self) -> Result<Method, ParseError> {
        if self.decorators.len() == 0 {
            return Err(ParseError::MissingDecorator);
        }

        if !self.has_azle_decorator() {
            return Err(ParseError::InvalidDecorator);
        }

        let name = self.name()?;
        let mode = match &self.mode()?[..] {
            "serviceQuery" => Mode::Query,
            "serviceUpdate" => Mode::Update,
            _ => panic!("this is not supported"),
        };
        let params = self.build_act_fn_params()?;
        let return_type = self.build_return_type()?;

        Ok(Method::new(name, mode, params, return_type))
    }

    fn build_act_fn_params(&self) -> Result<Vec<Param>, ParseError> {
        Ok(self.ts_fn_type()?.build_act_fn_params())
    }

    fn build_return_type(&self) -> Result<CandidType, ParseError> {
        let return_ts_type = self.return_ts_type()?;
        let candid_type = SourceMapped::new(&return_ts_type, self.source_map).to_candid_type();
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

    fn mode(&self) -> Result<String, ParseError> {
        if self.decorators.len() != 1 {
            return Err(ParseError::MultipleDecorators);
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
            swc_ecma_ast::PropName::Computed(_) => {
                return Err(ParseError::UnallowedComputedProperty)
            }
            swc_ecma_ast::PropName::BigInt(big_int) => big_int.value.to_string(),
        };

        return Ok(name);
    }

    fn return_ts_type(&self) -> Result<TsType, ParseError> {
        let ts_fn_type = self.ts_fn_type()?;
        match &*ts_fn_type.type_ann.type_ann {
            TsType::TsTypeRef(ts_type_ref) => {
                let name = match &ts_type_ref.type_name {
                    swc_ecma_ast::TsEntityName::TsQualifiedName(_) => {
                        return Err(ParseError::NamespaceQualifiedType)
                    }
                    swc_ecma_ast::TsEntityName::Ident(ident) => ident.get_name().to_string(),
                };

                if name != "CallResult" {
                    return Err(ParseError::MissingCallResultAnnotation);
                }

                match &ts_type_ref.type_params {
                    Some(ts_type_param_inst) => {
                        if ts_type_param_inst.params.len() != 1 {
                            return Err(ParseError::TooManyReturnTypes);
                        }

                        let inner_type = &**ts_type_param_inst.params.get(0).unwrap();
                        Ok(inner_type.clone())
                    }
                    None => return Err(ParseError::MissingTypeArgument),
                }
            }
            _ => return Err(ParseError::MissingCallResultAnnotation),
        }
    }

    fn ts_fn_type(&self) -> Result<SourceMapped<TsFnType>, ParseError> {
        match &self.type_ann {
            Some(type_ann) => match &*type_ann.type_ann {
                TsType::TsFnOrConstructorType(fn_or_constructor_type) => {
                    match fn_or_constructor_type {
                        TsFnOrConstructorType::TsFnType(ts_fn_type) => {
                            Ok(SourceMapped::new(ts_fn_type, self.source_map))
                        }
                        TsFnOrConstructorType::TsConstructorType(_) => {
                            return Err(ParseError::InvalidReturnType)
                        }
                    }
                }
                _ => return Err(ParseError::InvalidReturnType),
            },
            None => return Err(ParseError::MissingTypeAnnotation),
        }
    }
}

impl SourceMapped<'_, TsFnType> {
    pub fn build_act_fn_params(&self) -> Vec<Param> {
        self.params
            .iter()
            .map(|param| match param {
                TsFnParam::Ident(identifier) => {
                    let name = identifier.get_name().to_string();
                    let candid_type = match &identifier.type_ann {
                        Some(ts_type_ann) => {
                            SourceMapped::new(&ts_type_ann.get_ts_type(), self.source_map)
                                .to_candid_type()
                        }
                        None => panic!("Function parameters must have a type"),
                    };
                    Param { name, candid_type }
                }
                TsFnParam::Array(_) => {
                    panic!("Array destructuring in parameters is unsupported at this time")
                }
                TsFnParam::Rest(_) => {
                    panic!("Rest parameters are not supported at this time")
                }
                TsFnParam::Object(_) => {
                    panic!("Object destructuring in parameters is unsupported at this time")
                }
            })
            .collect()
    }
}

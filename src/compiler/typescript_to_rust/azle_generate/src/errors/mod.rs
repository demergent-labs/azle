use std::fmt::Debug;

use cdk_framework::act::abstract_canister_tree::Error as CdkfError;

mod compiler_output;
mod location;
mod suggestion;

pub mod errors;

use self::errors::{
    ArrayDestructuringInParamsNotSupported, FileSyntaxError, FunctionParamsMustHaveType,
    ObjectDestructuringNotSupported, RestParametersNotSupported, UnableToLoadFile,
};
pub use self::{
    compiler_output::CompilerOutput,
    errors::{
        ArgumentError, GuardFunctionNotFound, InternalError, SyntaxError, TypeError, TypeNotFound,
    },
    location::Location,
    suggestion::Suggestion,
};
use crate::{
    body::stable_b_tree_map::new_expr::errors::{
        ArgSpread, IncorrectNumberOfArgs, IncorrectTypeArgs, InvalidArg, MissingArgs,
    },
    candid_type::{
        errors::WrongEnclosedType,
        primitive::errors::UnsupportedType,
        record::errors::RecordPropertySignature,
        service::method::errors::{
            ComputedPropertyNotAllowed, InvalidClassMember, InvalidClassProp, InvalidDecorator,
            InvalidReturnType, MissingCallResultAnnotation, MissingDecorator,
            MissingTypeAnnotation, MissingTypeArguments, NamespaceQualifiedType,
            NotExactlyOneDecorator, TooManyReturnTypes,
        },
        type_ref::errors::{QualifiedName, WrongNumberOfParams},
        variant::errors::VariantPropertySignature,
    },
    canister_method::{
        annotated_fn_decl::errors::{
            MissingReturnType, ParamDefaultValue, QualifiedType, UntypedParam,
        },
        errors::{
            AsyncNotAllowed, DuplicateSystemMethod, ExtraneousCanisterMethodAnnotation,
            MissingReturnTypeAnnotation, VoidReturnTypeRequired,
        },
    },
    ts_ast::{
        ts_type::{
            errors::{UnexpectedTsTupleTypes, UnexpectedTsType, UnexpectedTsTypeLiteral},
            ts_fn_or_constructor_type::ts_fn_type::errors::NotEnclosedInFunc,
        },
        ts_type_element::ts_property_signature::errors::NoTypeAnnotation,
    },
};

use crate::canister_method::annotated_fn_decl::errors::InvalidParams;

#[derive(Debug, Clone, PartialEq)]
pub enum Error {
    TypeNotFound(TypeNotFound),
    GuardFunctionNotFound(GuardFunctionNotFound),
    DuplicateSystemMethodImplementation(DuplicateSystemMethod),
    ExtraneousCanisterMethodAnnotation(ExtraneousCanisterMethodAnnotation),
    MissingReturnTypeAnnotation(MissingReturnTypeAnnotation),
    InternalError(InternalError),
    ArgumentError(ArgumentError),
    TypeError(TypeError),
    SyntaxError(SyntaxError),
    VoidReturnTypeRequired(VoidReturnTypeRequired),
    AsyncNotAllowed(AsyncNotAllowed),
    ArrayDestructuringInParamsNotSupported(ArrayDestructuringInParamsNotSupported),
    ComputedPropertyNotAllowed(ComputedPropertyNotAllowed),
    FileSyntaxError(FileSyntaxError),
    FunctionParamsMustHaveType(FunctionParamsMustHaveType),
    InvalidClassMember(InvalidClassMember),
    InvalidClassProp(InvalidClassProp),
    InvalidDecorator(InvalidDecorator),
    InvalidParams(InvalidParams),
    InvalidReturnType(InvalidReturnType),
    MissingCallResultAnnotation(MissingCallResultAnnotation),
    MissingDecorator(MissingDecorator),
    MissingReturnType(MissingReturnType),
    MissingTypeAnnotation(MissingTypeAnnotation),
    MissingTypeArgument(MissingTypeArguments),
    NamespaceQualifiedType(NamespaceQualifiedType),
    NotEnclosedInFunc(NotEnclosedInFunc),
    NotExactlyOneDecorator(NotExactlyOneDecorator),
    NoTypeAnnotation(NoTypeAnnotation),
    ObjectDestructuringNotSupported(ObjectDestructuringNotSupported),
    ParamDefaultValue(ParamDefaultValue),
    QualifiedName(QualifiedName),
    QualifiedType(QualifiedType),
    RecordPropertySignature(RecordPropertySignature),
    RestParametersNotSupported(RestParametersNotSupported),
    TooManyReturnTypes(TooManyReturnTypes),
    UnableToLoadFile(UnableToLoadFile),
    UnexpectedTsTupleType(UnexpectedTsTupleTypes),
    UnexpectedTsType(UnexpectedTsType),
    UnexpectedTsTypeLiteral(UnexpectedTsTypeLiteral),
    UnsupportedType(UnsupportedType),
    UntypedParam(UntypedParam),
    VariantPropertySignature(VariantPropertySignature),
    WrongEnclosedType(WrongEnclosedType),
    WrongNumberOfParams(WrongNumberOfParams),
    ArgSpread(ArgSpread),
    IncorrectNumberOfArgs(IncorrectNumberOfArgs),
    IncorrectTypeArgs(IncorrectTypeArgs),
    InvalidArg(InvalidArg),
    MissingArgs(MissingArgs),
}

impl std::error::Error for Error {}

fn get_error<'a>(error: &'a Error) -> &'a dyn std::error::Error {
    match error {
        Error::TypeNotFound(e) => e,
        Error::GuardFunctionNotFound(e) => e,
        Error::DuplicateSystemMethodImplementation(e) => e,
        Error::ExtraneousCanisterMethodAnnotation(e) => e,
        Error::MissingReturnTypeAnnotation(e) => e,
        Error::InternalError(e) => e,
        Error::ArgumentError(e) => e,
        Error::TypeError(e) => e,
        Error::SyntaxError(e) => e,
        Error::VoidReturnTypeRequired(e) => e,
        Error::AsyncNotAllowed(e) => e,
        Error::ArrayDestructuringInParamsNotSupported(e) => e,
        Error::ComputedPropertyNotAllowed(e) => e,
        Error::FileSyntaxError(e) => e,
        Error::FunctionParamsMustHaveType(e) => e,
        Error::InvalidClassMember(e) => e,
        Error::InvalidClassProp(e) => e,
        Error::InvalidDecorator(e) => e,
        Error::InvalidParams(e) => e,
        Error::InvalidReturnType(e) => e,
        Error::MissingCallResultAnnotation(e) => e,
        Error::MissingDecorator(e) => e,
        Error::MissingReturnType(e) => e,
        Error::MissingTypeAnnotation(e) => e,
        Error::MissingTypeArgument(e) => e,
        Error::NamespaceQualifiedType(e) => e,
        Error::NotEnclosedInFunc(e) => e,
        Error::NotExactlyOneDecorator(e) => e,
        Error::NoTypeAnnotation(e) => e,
        Error::ObjectDestructuringNotSupported(e) => e,
        Error::ParamDefaultValue(e) => e,
        Error::QualifiedName(e) => e,
        Error::QualifiedType(e) => e,
        Error::RecordPropertySignature(e) => e,
        Error::RestParametersNotSupported(e) => e,
        Error::TooManyReturnTypes(e) => e,
        Error::UnableToLoadFile(e) => e,
        Error::UnexpectedTsTupleType(e) => e,
        Error::UnexpectedTsType(e) => e,
        Error::UnexpectedTsTypeLiteral(e) => e,
        Error::UnsupportedType(e) => e,
        Error::UntypedParam(e) => e,
        Error::VariantPropertySignature(e) => e,
        Error::WrongEnclosedType(e) => e,
        Error::WrongNumberOfParams(e) => e,
        Error::ArgSpread(e) => e,
        Error::IncorrectNumberOfArgs(e) => e,
        Error::IncorrectTypeArgs(e) => e,
        Error::InvalidArg(e) => e,
        Error::MissingArgs(e) => e,
    }
}

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        std::fmt::Display::fmt(&get_error(self), f)
    }
}

impl From<CdkfError> for crate::Error {
    fn from(value: CdkfError) -> Self {
        match value {
            CdkfError::TypeNotFound(name) => crate::Error::TypeNotFound(TypeNotFound { name }),
            CdkfError::GuardFunctionNotFound(name) => {
                crate::Error::GuardFunctionNotFound(GuardFunctionNotFound { name })
            }
        }
    }
}

impl From<Error> for Vec<Error> {
    fn from(value: Error) -> Self {
        vec![value]
    }
}

pub trait CollectResults<T> {
    fn collect_results(self) -> Result<Vec<T>, Vec<Error>>;
}

impl<I, T> CollectResults<T> for I
where
    I: Iterator<Item = Result<T, Vec<Error>>>,
{
    fn collect_results(self) -> Result<Vec<T>, Vec<Error>> {
        let mut errors = Vec::new();
        let mut ok_values = Vec::new();

        self.for_each(|result| match result {
            Ok(ok_value) => ok_values.push(ok_value),
            Err(errs) => errors.extend(errs),
        });

        if errors.is_empty() {
            Ok(ok_values)
        } else {
            Err(errors)
        }
    }
}

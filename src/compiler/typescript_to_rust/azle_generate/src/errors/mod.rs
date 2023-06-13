use std::fmt::Debug;

use cdk_framework::act::abstract_canister_tree::Error as CdkfError;

mod compiler_output;
mod location;
mod suggestion;

pub mod errors;

use self::errors::{
    ArrayDestructuringInParamsNotSupported, FileSyntaxError, FunctionParamsMustHaveType,
    MultipleCanisterMethodDefinitions, MultipleGuardFunctionDefinitions, MultipleTypeDefinitions,
    ObjectDestructuringNotSupported, RestParametersNotSupported, UnableToLoadFile,
    UnableToLoadPlugin, UnableToParsePlugin,
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
        MissingSbtmTypeArguments,
    },
    candid_type::{
        errors::WrongEnclosedType,
        primitive::errors::UnsupportedType,
        record::errors::RecordPropertySignature,
        service::method::errors::{
            ComputedPropertyNotAllowed, InvalidClassMember, InvalidDecorator, InvalidReturnType,
            MissingCallResultAnnotation, MissingDecorator, MissingTypeAnnotation,
            MissingTypeArguments, NotExactlyOneDecorator, TooManyReturnTypes,
        },
        type_ref::errors::WrongNumberOfParams,
        variant::errors::VariantPropertySignature,
    },
    canister_method::{
        annotated_fn_decl::errors::{MissingReturnType, ParamDefaultValue, UntypedParam},
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
        ts_type_element::ts_property_signature::errors::{NoTypeAnnotation, UnsupportedMemberName},
    },
};

use crate::canister_method::annotated_fn_decl::errors::InvalidParams;

pub type SuggestionModifications = (String, (usize, usize));

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
    InvalidDecorator(InvalidDecorator),
    InvalidParams(InvalidParams),
    InvalidReturnType(InvalidReturnType),
    MissingCallResultAnnotation(MissingCallResultAnnotation),
    MissingDecorator(MissingDecorator),
    MissingReturnType(MissingReturnType),
    MissingTypeAnnotation(MissingTypeAnnotation),
    MissingTypeArgument(MissingTypeArguments),
    MissingSbtmTypeArgument(MissingSbtmTypeArguments),
    NotEnclosedInFunc(NotEnclosedInFunc),
    NotExactlyOneDecorator(NotExactlyOneDecorator),
    NoTypeAnnotation(NoTypeAnnotation),
    ObjectDestructuringNotSupported(ObjectDestructuringNotSupported),
    ParamDefaultValue(ParamDefaultValue),
    RecordPropertySignature(RecordPropertySignature),
    RestParametersNotSupported(RestParametersNotSupported),
    TooManyReturnTypes(TooManyReturnTypes),
    UnableToLoadFile(UnableToLoadFile),
    UnableToLoadPlugin(UnableToLoadPlugin),
    UnableToParsePlugin(UnableToParsePlugin),
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
    UnsupportedMemberName(UnsupportedMemberName),
    MissingArgs(MissingArgs),
    MultipleTypeDefinitions(MultipleTypeDefinitions),
    MultipleGuardFunctionDefinitions(MultipleGuardFunctionDefinitions),
    MultipleCanisterMethodDefinitions(MultipleCanisterMethodDefinitions),
}

impl std::error::Error for Error {}

impl Error {
    fn get_error<'a>(&'a self) -> &'a dyn std::error::Error {
        match self {
            Self::TypeNotFound(e) => e,
            Self::GuardFunctionNotFound(e) => e,
            Self::DuplicateSystemMethodImplementation(e) => e,
            Self::ExtraneousCanisterMethodAnnotation(e) => e,
            Self::MissingReturnTypeAnnotation(e) => e,
            Self::InternalError(e) => e,
            Self::ArgumentError(e) => e,
            Self::TypeError(e) => e,
            Self::SyntaxError(e) => e,
            Self::VoidReturnTypeRequired(e) => e,
            Self::AsyncNotAllowed(e) => e,
            Self::ArrayDestructuringInParamsNotSupported(e) => e,
            Self::ComputedPropertyNotAllowed(e) => e,
            Self::FileSyntaxError(e) => e,
            Self::FunctionParamsMustHaveType(e) => e,
            Self::InvalidClassMember(e) => e,
            Self::InvalidDecorator(e) => e,
            Self::InvalidParams(e) => e,
            Self::InvalidReturnType(e) => e,
            Self::MissingCallResultAnnotation(e) => e,
            Self::MissingDecorator(e) => e,
            Self::MissingReturnType(e) => e,
            Self::MissingTypeAnnotation(e) => e,
            Self::MissingTypeArgument(e) => e,
            Self::NotEnclosedInFunc(e) => e,
            Self::NotExactlyOneDecorator(e) => e,
            Self::NoTypeAnnotation(e) => e,
            Self::ObjectDestructuringNotSupported(e) => e,
            Self::ParamDefaultValue(e) => e,
            Self::RecordPropertySignature(e) => e,
            Self::RestParametersNotSupported(e) => e,
            Self::TooManyReturnTypes(e) => e,
            Self::UnableToLoadFile(e) => e,
            Self::UnexpectedTsTupleType(e) => e,
            Self::UnexpectedTsType(e) => e,
            Self::UnexpectedTsTypeLiteral(e) => e,
            Self::UnsupportedType(e) => e,
            Self::UntypedParam(e) => e,
            Self::VariantPropertySignature(e) => e,
            Self::WrongEnclosedType(e) => e,
            Self::WrongNumberOfParams(e) => e,
            Self::ArgSpread(e) => e,
            Self::IncorrectNumberOfArgs(e) => e,
            Self::IncorrectTypeArgs(e) => e,
            Self::InvalidArg(e) => e,
            Self::MissingArgs(e) => e,
            Self::UnsupportedMemberName(e) => e,
            Self::UnableToParsePlugin(e) => e,
            Self::UnableToLoadPlugin(e) => e,
            Self::MissingSbtmTypeArgument(e) => e,
            Self::MultipleTypeDefinitions(e) => e,
            Self::MultipleGuardFunctionDefinitions(e) => e,
            Self::MultipleCanisterMethodDefinitions(e) => e,
        }
    }
}

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        std::fmt::Display::fmt(&self.get_error(), f)
    }
}

impl From<CdkfError> for crate::Error {
    fn from(value: CdkfError) -> Self {
        match value {
            CdkfError::TypeNotFound(name) => TypeNotFound { name }.into(),
            CdkfError::GuardFunctionNotFound(name) => GuardFunctionNotFound { name }.into(),
            CdkfError::MultipleTypeDefinitions(name) => {
                MultipleCanisterMethodDefinitions { name }.into()
            }
            CdkfError::MultipleGuardFunctionDefinitions(name) => {
                MultipleGuardFunctionDefinitions { name }.into()
            }
            CdkfError::MultipleCanisterMethodDefinitions(name) => {
                MultipleCanisterMethodDefinitions { name }.into()
            }
        }
    }
}

impl From<Error> for Vec<Error> {
    fn from(value: Error) -> Self {
        vec![value]
    }
}

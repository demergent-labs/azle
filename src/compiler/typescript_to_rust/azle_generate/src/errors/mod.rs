use cdk_framework::act::abstract_canister_tree::Error as CdkfError;

mod compiler_output;
mod location;
mod suggestion;

pub mod errors;

pub use self::{
    compiler_output::CompilerOutput,
    errors::{
        ArgumentError, GuardFunctionNotFound, InternalError, SyntaxError, TypeError, TypeNotFound,
    },
    location::Location,
    suggestion::Suggestion,
};
use crate::canister_method::errors::{
    AsyncNotAllowed, DuplicateSystemMethod, ExtraneousCanisterMethodAnnotation,
    MissingReturnTypeAnnotation, VoidReturnTypeRequired,
};

pub mod service_method;

#[derive(Debug, Clone, PartialEq, Eq)]
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
}

impl std::error::Error for Error {}

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::TypeNotFound(e) => e.fmt(f),
            Self::GuardFunctionNotFound(e) => e.fmt(f),
            Self::DuplicateSystemMethodImplementation(e) => e.fmt(f),
            Self::ExtraneousCanisterMethodAnnotation(e) => e.fmt(f),
            Self::MissingReturnTypeAnnotation(e) => e.fmt(f),
            Self::InternalError(e) => e.fmt(f),
            Self::ArgumentError(e) => e.fmt(f),
            Self::TypeError(e) => e.fmt(f),
            Self::SyntaxError(e) => e.fmt(f),
            Self::VoidReturnTypeRequired(e) => e.fmt(f),
            Self::AsyncNotAllowed(e) => e.fmt(f),
        }
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

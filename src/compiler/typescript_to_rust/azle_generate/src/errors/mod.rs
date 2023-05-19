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
use crate::{
    candid_type::type_ref::errors::WrongEnclosedType,
    canister_method::errors::{
        AsyncNotAllowed, DuplicateSystemMethod, ExtraneousCanisterMethodAnnotation,
        MissingReturnTypeAnnotation, VoidReturnTypeRequired,
    },
};

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
    WrongEnclosedType(WrongEnclosedType),
    InvalidDecorator,
    InvalidReturnType,
    MissingCallResultAnnotation,
    MissingDecorator,
    MissingTypeAnnotation,
    MissingTypeArgument,
    MultipleDecorators,
    NamespaceQualifiedType,
    TooManyReturnTypes,
    UnallowedComputedProperty,
    UnsupportedTypeError,
    RecordPropertySignature,
    InvalidClassProp,
    InvalidClassMember,
    FunctionParamsMustHaveType,
    ArrayDestructuringInParamsNotSupported,
    RestParametersNotSupported,
    ObjectDestructuringNotSupported,
    NewError(String),
}
impl Error {
    pub fn error_message(&self) -> String {
        let str = match self {
            Self::InvalidDecorator => "Invalid decorator. Only @query and @update are permitted.",
            Self::InvalidReturnType => "Method has an invalid return type. Only function return types are permitted.",
            Self::MissingCallResultAnnotation => "Invalid return type. External canister methods must wrap their return types in the CallResult<T> generic type.",
            Self::MissingDecorator => "Missing decorator. External canister methods must be decorated with either @query or @update.",
            Self::MissingTypeAnnotation => "Missing type annotation. External canister methods must specify a return type.",
            Self::MissingTypeArgument => "Missing type argument. Generic type CallResult requires 1 type argument.",
            Self::MultipleDecorators => "Too many decorators. External canister methods can only specify one decorator: @query or @update.",
            Self::NamespaceQualifiedType => "Unsupported data type. Qualified types are not currently supported. Try importing the type directly.",
            Self::TooManyReturnTypes => "Too many return types. Generic type CallResult requires 1 type argument.",
            Self::UnallowedComputedProperty => "Unallowed computed property. Computed properties in external canister definitions aren't currently supported.",
            _ => todo!()
        };
        str.to_string()
    }
}

impl std::error::Error for Error {}

// TODO change these all back to Self:: instead of Error::
// TODO ^ for some reason when I automatically add more options it adds everything again with Error:: so its going to be much easier to work with Error and change it back to Self later
impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Error::TypeNotFound(e) => e.fmt(f),
            Error::GuardFunctionNotFound(e) => e.fmt(f),
            Error::DuplicateSystemMethodImplementation(e) => e.fmt(f),
            Error::ExtraneousCanisterMethodAnnotation(e) => e.fmt(f),
            Error::MissingReturnTypeAnnotation(e) => e.fmt(f),
            Error::InternalError(e) => e.fmt(f),
            Error::ArgumentError(e) => e.fmt(f),
            Error::TypeError(e) => e.fmt(f),
            Error::SyntaxError(e) => e.fmt(f),
            Error::VoidReturnTypeRequired(e) => e.fmt(f),
            Error::AsyncNotAllowed(e) => e.fmt(f),
            Error::InvalidDecorator => todo!(),
            Error::InvalidReturnType => todo!(),
            Error::MissingCallResultAnnotation => todo!(),
            Error::MissingDecorator => todo!(),
            Error::MissingTypeAnnotation => todo!(),
            Error::MissingTypeArgument => todo!(),
            Error::MultipleDecorators => todo!(),
            Error::NamespaceQualifiedType => todo!(),
            Error::TooManyReturnTypes => todo!(),
            Error::UnallowedComputedProperty => todo!(),
            Error::WrongEnclosedType(e) => e.fmt(f),
            Error::UnsupportedTypeError => todo!(),
            Error::NewError(_) => todo!(),
            Error::RecordPropertySignature => todo!(),
            _ => todo!(),
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

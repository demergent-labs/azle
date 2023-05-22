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
    candid_type::{
        record::errors::RecordPropertySignature,
        service::method::errors::{
            InvalidClassMember, InvalidClassProp, InvalidDecorator, InvalidReturnType,
            MissingCallResultAnnotation, MissingDecorator, MissingTypeAnnotation,
            MissingTypeArguments, MultipleDecorators, NamespaceQualifiedType, TooManyReturnTypes,
            UnallowedComputedProperty,
        },
        type_ref::errors::QualifiedName,
        variant::errors::{VariantPropertySignature, WrongNumberOfParams},
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
    ArrayDestructuringInParamsNotSupported(ArrayDestructuringInParamsNotSupported),
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
    MultipleDecorators(MultipleDecorators),
    NamespaceQualifiedType(NamespaceQualifiedType),
    NotEnclosedInFunc(NotEnclosedInFunc),
    NoTypeAnnotation(NoTypeAnnotation),
    ObjectDestructuringNotSupported(ObjectDestructuringNotSupported),
    ParamDefaultValue(ParamDefaultValue),
    QualifiedName(QualifiedName),
    QualifiedType(QualifiedType),
    RecordPropertySignature(RecordPropertySignature),
    RestParametersNotSupported(RestParametersNotSupported),
    TooManyReturnTypes(TooManyReturnTypes),
    UnableToLoadFile(UnableToLoadFile),
    UnallowedComputedProperty(UnallowedComputedProperty),
    UnexpectedTsTupleType(UnexpectedTsTupleTypes),
    UnexpectedTsType(UnexpectedTsType),
    UnexpectedTsTypeLiteral(UnexpectedTsTypeLiteral),
    UnsupportedType,
    UntypedParam(UntypedParam),
    VariantPropertySignature(VariantPropertySignature),
    WrongEnclosedType,
    WrongNumberOfParams(WrongNumberOfParams),
    NewError(String),
}
impl Error {
    pub fn error_message(&self) -> String {
        todo!()
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

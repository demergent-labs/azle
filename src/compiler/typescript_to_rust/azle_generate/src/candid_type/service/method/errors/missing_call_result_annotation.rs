use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MissingCallResultAnnotation {}

impl MissingCallResultAnnotation {
    pub fn from_class_prop(class_prop: &ClassProp) -> Self {
        // Self::MissingCallResultAnnotation => "Invalid return type. External canister methods must wrap their return types in the CallResult<T> generic type.",
        Self {}
    }
}

impl From<MissingCallResultAnnotation> for crate::Error {
    fn from(error: MissingCallResultAnnotation) -> Self {
        Self::MissingCallResultAnnotation(error)
    }
}

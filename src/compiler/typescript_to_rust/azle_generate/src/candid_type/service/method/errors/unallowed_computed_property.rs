use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ComputedPropertyNotAllowed {}

impl ComputedPropertyNotAllowed {
    pub fn from_class_prop(_: &ClassProp) -> Self {
        Self {}
    }
}

impl From<ComputedPropertyNotAllowed> for crate::Error {
    fn from(error: ComputedPropertyNotAllowed) -> Self {
        Self::ComputedPropertyNotAllowed(error)
    }
}

impl std::fmt::Display for ComputedPropertyNotAllowed {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Computed property not allowed. Computed properties in service definitions aren't currently supported.")
    }
}

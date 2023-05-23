use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ComputedPropertyNotAllowed {}

impl ComputedPropertyNotAllowed {
    pub fn from_class_prop(class_prop: &ClassProp) -> Self {
        // Self::UnallowedComputedProperty => "Unallowed computed property. Computed properties in external canister definitions aren't currently supported.",
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
        write!(f, "TODO")
    }
}

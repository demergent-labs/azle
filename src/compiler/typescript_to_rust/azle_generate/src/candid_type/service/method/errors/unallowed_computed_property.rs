use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UnallowedComputedProperty {}

impl UnallowedComputedProperty {
    pub fn from_class_prop(class_prop: &ClassProp) -> Self {
        // Self::UnallowedComputedProperty => "Unallowed computed property. Computed properties in external canister definitions aren't currently supported.",
        Self {}
    }
}

impl From<UnallowedComputedProperty> for crate::Error {
    fn from(error: UnallowedComputedProperty) -> Self {
        Self::UnallowedComputedProperty(error)
    }
}

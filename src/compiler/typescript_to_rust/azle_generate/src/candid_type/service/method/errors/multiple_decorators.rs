use swc_ecma_ast::{ClassProp, Decorator};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct NotExactlyOneDecorator {}

impl NotExactlyOneDecorator {
    pub fn from_class_prop(class_prop: &ClassProp) -> Self {
        // Self::MultipleDecorators => "Too many decorators. External canister methods can only specify one decorator: @query or @update.",
        Self {}
    }
    pub fn from_decorator_list(decorator_list: &Vec<Decorator>) -> Self {
        Self {}
    }
}

impl From<NotExactlyOneDecorator> for crate::Error {
    fn from(error: NotExactlyOneDecorator) -> Self {
        Self::NotExactlyOneDecorator(error)
    }
}

impl std::fmt::Display for NotExactlyOneDecorator {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "TODO")
    }
}

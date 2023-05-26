use swc_ecma_ast::Decorator;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct NotExactlyOneDecorator {
    decorators: Vec<Decorator>,
}

impl NotExactlyOneDecorator {
    pub fn from_decorator_list(decorators: &Vec<Decorator>) -> Self {
        Self {
            decorators: decorators.clone(),
        }
    }
}

impl std::error::Error for NotExactlyOneDecorator {}

impl From<NotExactlyOneDecorator> for crate::Error {
    fn from(error: NotExactlyOneDecorator) -> Self {
        Self::NotExactlyOneDecorator(error)
    }
}

impl std::fmt::Display for NotExactlyOneDecorator {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Too many decorators. Service methods can only specify one decorator: @serviceQuery or @serviceUpdate.")
    }
}

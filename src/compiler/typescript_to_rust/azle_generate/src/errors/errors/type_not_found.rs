#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TypeNotFound {
    pub name: String,
}

impl std::error::Error for TypeNotFound {}

impl std::fmt::Display for TypeNotFound {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "The type {} is used, but never defined.", self.name)
    }
}

impl From<TypeNotFound> for crate::Error {
    fn from(error: TypeNotFound) -> Self {
        Self::TypeNotFound(error)
    }
}

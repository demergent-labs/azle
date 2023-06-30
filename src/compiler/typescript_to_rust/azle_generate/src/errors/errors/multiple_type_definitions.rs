#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MultipleTypeDefinitions {
    pub name: String,
}

impl std::error::Error for MultipleTypeDefinitions {}

impl std::fmt::Display for MultipleTypeDefinitions {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Conflicting type definitions found for {}.", self.name)
    }
}

impl From<MultipleTypeDefinitions> for crate::Error {
    fn from(error: MultipleTypeDefinitions) -> Self {
        Self::MultipleTypeDefinitions(error)
    }
}

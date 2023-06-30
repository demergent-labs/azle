#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MultipleGuardFunctionDefinitions {
    pub name: String,
}

impl std::error::Error for MultipleGuardFunctionDefinitions {}

impl std::fmt::Display for MultipleGuardFunctionDefinitions {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "Conflicting guard function definitions found for {}.",
            self.name
        )
    }
}

impl From<MultipleGuardFunctionDefinitions> for crate::Error {
    fn from(error: MultipleGuardFunctionDefinitions) -> Self {
        Self::MultipleGuardFunctionDefinitions(error)
    }
}

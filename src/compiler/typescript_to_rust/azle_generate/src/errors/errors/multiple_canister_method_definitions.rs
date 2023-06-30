#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MultipleCanisterMethodDefinitions {
    pub name: String,
}

impl std::error::Error for MultipleCanisterMethodDefinitions {}

impl std::fmt::Display for MultipleCanisterMethodDefinitions {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "Conflicting canister method definitions found for {}.",
            self.name
        )
    }
}

impl From<MultipleCanisterMethodDefinitions> for crate::Error {
    fn from(error: MultipleCanisterMethodDefinitions) -> Self {
        Self::MultipleCanisterMethodDefinitions(error)
    }
}

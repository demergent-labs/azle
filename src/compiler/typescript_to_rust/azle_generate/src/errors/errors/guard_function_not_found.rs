#[derive(Debug, Clone, PartialEq, Eq)]
pub struct GuardFunctionNotFound {
    pub name: String,
}

impl std::error::Error for GuardFunctionNotFound {}

impl std::fmt::Display for GuardFunctionNotFound {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "The guard function {} is used, but never defined.",
            self.name
        )
    }
}

impl From<GuardFunctionNotFound> for crate::Error {
    fn from(error: GuardFunctionNotFound) -> Self {
        Self::GuardFunctionNotFound(error)
    }
}

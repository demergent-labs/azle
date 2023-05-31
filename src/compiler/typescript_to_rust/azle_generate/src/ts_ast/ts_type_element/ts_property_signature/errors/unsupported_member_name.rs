use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};
use swc_ecma_ast::TsPropertySignature;

#[derive(Debug, Clone, PartialEq)]
pub struct UnsupportedMemberName {
    location: Location,
}

impl UnsupportedMemberName {
    pub fn from_ts_property_signature(sm_property_sig: &SourceMapped<TsPropertySignature>) -> Self {
        Self {
            location: sm_property_sig.get_location(),
        }
    }

    /// Note: This shouldn't ever be hit because it is mostly likely caught by
    /// by the `unsupported_type_error` function in
    /// ts_ast/azle_type/azle_type_lit/azle_type_element/errors.rs
    ///
    fn unsupported_member_name_error(&self) -> CompilerOutput {
        CompilerOutput {
            title: "Unsupported member name".to_string(),
            location: self.location.clone(),
            annotation: "change this to a simple identifier".to_string(),
            suggestion: None,
        }
    }
}

impl std::error::Error for UnsupportedMemberName {}

impl From<UnsupportedMemberName> for crate::Error {
    fn from(error: UnsupportedMemberName) -> Self {
        Self::UnsupportedMemberName(error)
    }
}

impl std::fmt::Display for UnsupportedMemberName {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.unsupported_member_name_error())
    }
}

impl SourceMapped<'_, TsPropertySignature> {}

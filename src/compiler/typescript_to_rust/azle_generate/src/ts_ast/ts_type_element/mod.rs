use std::ops::Deref;
use swc_ecma_ast::{TsPropertySignature, TsTypeElement};

use crate::ts_ast::source_map::SourceMapped;

mod azle_method_signature;
mod get_source_info;
mod get_span;
mod type_to_string;

pub mod azle_property_signature;

impl SourceMapped<'_, TsTypeElement> {
    pub fn as_property_signature(&self) -> Option<SourceMapped<TsPropertySignature>> {
        match self.deref() {
            TsTypeElement::TsPropertySignature(ts_property_signature) => {
                Some(SourceMapped::new(ts_property_signature, self.source_map))
            }
            _ => None,
        }
    }
}

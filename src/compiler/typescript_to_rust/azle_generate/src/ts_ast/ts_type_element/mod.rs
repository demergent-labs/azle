use std::ops::Deref;
use swc_ecma_ast::{TsPropertySignature, TsTypeElement};

use crate::ts_ast::SourceMapped;

mod get_span;
pub mod ts_property_signature;
mod type_to_string;

impl SourceMapped<'_, TsTypeElement> {
    pub fn as_property_signature(&self) -> Option<SourceMapped<TsPropertySignature>> {
        match self.deref() {
            TsTypeElement::TsPropertySignature(ts_property_signature) => {
                Some(self.spawn(ts_property_signature))
            }
            _ => None,
        }
    }
}

use std::ops::Deref;

use swc_ecma_ast::TsTypeElement;

use crate::ts_ast::{source_map::SourceMapped, traits::GetSourceInfo};

impl GetSourceInfo for SourceMapped<'_, TsTypeElement> {
    fn get_source(&self) -> String {
        match self.deref() {
            TsTypeElement::TsPropertySignature(property) => {
                SourceMapped::new(property, self.source_map).get_source()
            }
            TsTypeElement::TsMethodSignature(method) => {
                SourceMapped::new(method, self.source_map).get_source()
            }
            _ => panic!("Unexpected member type. We are expecting a property or method"),
        }
    }

    fn get_line_number(&self) -> usize {
        match self.deref() {
            TsTypeElement::TsPropertySignature(property) => {
                SourceMapped::new(property, self.source_map).get_line_number()
            }
            TsTypeElement::TsMethodSignature(method) => {
                SourceMapped::new(method, self.source_map).get_line_number()
            }
            _ => panic!("Unexpected member type. We are expecting a property or method"),
        }
    }

    fn get_origin(&self) -> String {
        match self.deref() {
            TsTypeElement::TsPropertySignature(property) => {
                SourceMapped::new(property, self.source_map).get_origin()
            }
            TsTypeElement::TsMethodSignature(method) => {
                SourceMapped::new(method, self.source_map).get_origin()
            }
            _ => panic!("Unexpected member type. We are expecting a property or method"),
        }
    }

    fn get_range(&self) -> (usize, usize) {
        match self.deref() {
            TsTypeElement::TsPropertySignature(property) => {
                SourceMapped::new(property, self.source_map).get_range()
            }
            TsTypeElement::TsMethodSignature(method) => {
                SourceMapped::new(method, self.source_map).get_range()
            }
            _ => panic!("Unexpected member type. We are expecting a property or method"),
        }
    }
}

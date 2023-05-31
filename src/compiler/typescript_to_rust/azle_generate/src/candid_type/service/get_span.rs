use swc_common::Span;
use swc_ecma_ast::{ClassMember, ClassProp};

use crate::traits::GetSpan;

impl GetSpan for ClassProp {
    fn get_span(&self) -> Span {
        self.span
    }
}

impl GetSpan for ClassMember {
    fn get_span(&self) -> Span {
        match self {
            ClassMember::Constructor(constructor) => constructor.span,
            ClassMember::Method(method) => method.span,
            ClassMember::PrivateMethod(private_method) => private_method.span,
            ClassMember::ClassProp(class_prop) => class_prop.span,
            ClassMember::PrivateProp(private_prop) => private_prop.span,
            ClassMember::TsIndexSignature(ts_index_signature) => ts_index_signature.span,
            ClassMember::Empty(empty) => empty.span,
            ClassMember::StaticBlock(static_block) => static_block.span,
        }
    }
}

use swc_ecma_ast::{TsKeywordTypeKind, TsType};

use crate::{canister_method::AnnotatedFnDecl, ts_ast::SourceMapped};

pub use async_not_allowed::AsyncNotAllowed;
pub use duplicate_system_method::DuplicateSystemMethod;
pub use extraneous_canister_method_annotation::ExtraneousCanisterMethodAnnotation;
pub use missing_return_type::MissingReturnTypeAnnotation;
pub use void_return_type_required::VoidReturnTypeRequired;

mod async_not_allowed;
mod duplicate_system_method;
mod extraneous_canister_method_annotation;
mod missing_return_type;
mod void_return_type_required;

impl<'a> SourceMapped<'a, AnnotatedFnDecl> {
    pub fn is_void(&self) -> bool {
        if let Ok(TsType::TsKeywordType(keyword)) = self.get_return_ts_type() {
            if let TsKeywordTypeKind::TsVoidKeyword = keyword.kind {
                return true;
            }
        }

        return false;
    }
}

use cdk_framework::act::node::canister_method::CanisterMethodType;
use swc_ecma_ast::{TsKeywordTypeKind, TsType};

use crate::{canister_method::AnnotatedFnDecl, Error};

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

impl<'a> AnnotatedFnDecl<'a> {
    pub fn assert_return_type_is_void(&self) -> Result<(), Error> {
        if self.annotation.method_type != CanisterMethodType::Heartbeat && self.is_promise() {
            return Err(VoidReturnTypeRequired::from_annotated_fn_decl(self).into());
        }

        let return_ts_type = self.get_return_ts_type();

        if let TsType::TsKeywordType(keyword) = return_ts_type {
            if let TsKeywordTypeKind::TsVoidKeyword = keyword.kind {
                return Ok(());
            }
        }

        return Err(VoidReturnTypeRequired::from_annotated_fn_decl(self).into());
    }
}

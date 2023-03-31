use cdk_framework::act::node::canister_method::CanisterMethodType;
use swc_ecma_ast::TsType;

use crate::canister_method::AnnotatedFnDecl;

pub use async_not_allowed::build_async_not_allowed_error_message;
pub use duplicate_method_types::{
    build_duplicate_method_types_error_message,
    build_duplicate_method_types_error_message_from_annotated_fn_decl,
};
pub use extraneous_decorator::build_extraneous_decorator_error_message;
pub use missing_return_type::build_missing_return_type_error_message;
pub use parse_error::build_parse_error_message;
pub use parse_error::ParseError;
pub use void_return_type_required::build_void_return_type_required_error_message;

mod async_not_allowed;
mod duplicate_method_types;
mod extraneous_decorator;
mod missing_return_type;
mod parse_error;
mod void_return_type_required;

impl<'a> AnnotatedFnDecl<'a> {
    pub fn assert_return_type_is_void(&self) {
        if self.annotation.method_type != CanisterMethodType::Heartbeat && self.is_promise() {
            panic!(
                "{}",
                build_void_return_type_required_error_message(&self.fn_decl, self.source_map)
            )
        }

        let return_ts_type = self.get_return_ts_type();

        if let swc_ecma_ast::TsType::TsKeywordType(keyword) = return_ts_type {
            if let swc_ecma_ast::TsKeywordTypeKind::TsVoidKeyword = keyword.kind {
                return;
            }
        }

        panic!(
            "{}",
            build_void_return_type_required_error_message(&self.fn_decl, self.source_map)
        )
    }

    pub fn assert_not_async(&self) {
        if self.fn_decl.function.is_async {
            panic!(
                "{}",
                build_async_not_allowed_error_message(
                    &self.fn_decl,
                    self.source_map,
                    &self.annotation.method_type
                )
            )
        }

        if let TsType::TsTypeRef(type_ref) =
            &*self.fn_decl.function.return_type.as_ref().unwrap().type_ann
        {
            match type_ref.type_name {
                swc_ecma_ast::TsEntityName::TsQualifiedName(_) => todo!(),
                swc_ecma_ast::TsEntityName::Ident(_) => todo!(),
            }
        }
    }
}

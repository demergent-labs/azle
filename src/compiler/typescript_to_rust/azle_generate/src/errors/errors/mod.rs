mod argument_error;
mod array_destructuring_in_params_not_supported;
mod file_syntax;
mod function_params_must_have_type;
mod guard_function_not_found;
mod internal_error;
mod object_destructuring_not_supported;
mod rest_parameters_not_supported;
mod syntax_error;
mod type_error;
mod type_not_found;
mod unable_to_load_file;

use swc_common::SourceMap;
use swc_ecma_ast::{Param, Pat};

use crate::{
    traits::{GetParamRange, GetSourceFileInfo},
    ts_ast::source_map::Range,
};

pub use argument_error::ArgumentError;
pub use array_destructuring_in_params_not_supported::ArrayDestructuringInParamsNotSupported;
pub use file_syntax::FileSyntaxError;
pub use function_params_must_have_type::FunctionParamsMustHaveType;
pub use guard_function_not_found::GuardFunctionNotFound;
pub use internal_error::InternalError;
pub use object_destructuring_not_supported::ObjectDestructuringNotSupported;
pub use rest_parameters_not_supported::RestParametersNotSupported;
pub use syntax_error::SyntaxError;
pub use type_error::TypeError;
pub use type_not_found::TypeNotFound;
pub use unable_to_load_file::UnableToLoadFile;

impl GetParamRange for Param {
    fn get_destructure_range(&self, source_map: &SourceMap) -> Range {
        match &self.pat {
            Pat::Ident(ident) => source_map.get_range(ident.span),
            Pat::Array(array_pat) => {
                let full_param_span_range = source_map.get_range(array_pat.span);
                if array_pat.type_ann.is_none() {
                    return full_param_span_range;
                }
                // UNWRAP HERE
                let ts_type_ann = array_pat.type_ann.as_ref().unwrap();
                let type_ann_range = source_map.get_range(ts_type_ann.span);
                let range_without_type_annotation = (full_param_span_range.0, type_ann_range.0);
                range_without_type_annotation
            }
            Pat::Rest(rest_pat) => {
                let full_param_span_range = source_map.get_range(rest_pat.span);
                if rest_pat.type_ann.is_none() {
                    return full_param_span_range;
                }
                // UNWRAP HERE
                let ts_type_ann = rest_pat.type_ann.as_ref().unwrap();
                let type_ann_range = source_map.get_range(ts_type_ann.span);
                let range_without_type_annotation = (full_param_span_range.0, type_ann_range.0);
                range_without_type_annotation
            }
            Pat::Object(object_pat) => {
                let full_param_span_range = source_map.get_range(object_pat.span);
                if object_pat.type_ann.is_none() {
                    return full_param_span_range;
                }
                // UNWRAP HERE
                let ts_type_ann = object_pat.type_ann.as_ref().unwrap();
                let type_ann_range = source_map.get_range(ts_type_ann.span);
                let range_without_type_annotation = (full_param_span_range.0, type_ann_range.0);
                range_without_type_annotation
            }
            Pat::Assign(assign_pat) => source_map.get_range(assign_pat.span),
            Pat::Invalid(invalid) => source_map.get_range(invalid.span),
            Pat::Expr(_) => panic!("Something's very wrong with your parameters"), // TODO: handle this better
        }
    }
}

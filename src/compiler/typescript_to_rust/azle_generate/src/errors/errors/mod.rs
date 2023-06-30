mod argument_error;
mod array_destructuring_in_params_not_supported;
mod file_syntax_error;
mod function_params_must_have_type;
mod guard_function_not_found;
mod internal_error;
mod multiple_canister_method_definitions;
mod multiple_guard_function_definitions;
mod multiple_type_definitions;
mod object_destructuring_not_supported;
mod rest_parameters_not_supported;
mod syntax_error;
mod type_error;
mod type_not_found;
mod unable_to_load_file;
mod unable_to_load_plugin;
mod unable_to_parse_plugin;

use swc_common::SourceMap;
use swc_ecma_ast::{ArrayPat, ObjectPat, RestPat};

use crate::{
    traits::{GetDestructureRange, GetSourceFileInfo},
    ts_ast::source_map::Range,
};

pub use argument_error::ArgumentError;
pub use array_destructuring_in_params_not_supported::ArrayDestructuringInParamsNotSupported;
pub use file_syntax_error::FileSyntaxError;
pub use function_params_must_have_type::FunctionParamsMustHaveType;
pub use guard_function_not_found::GuardFunctionNotFound;
pub use internal_error::InternalError;
pub use multiple_canister_method_definitions::MultipleCanisterMethodDefinitions;
pub use multiple_guard_function_definitions::MultipleGuardFunctionDefinitions;
pub use multiple_type_definitions::MultipleTypeDefinitions;
pub use object_destructuring_not_supported::ObjectDestructuringNotSupported;
pub use rest_parameters_not_supported::RestParametersNotSupported;
pub use syntax_error::SyntaxError;
pub use type_error::TypeError;
pub use type_not_found::TypeNotFound;
pub use unable_to_load_file::UnableToLoadFile;
pub use unable_to_load_plugin::UnableToLoadPlugin;
pub use unable_to_parse_plugin::UnableToParsePlugin;

impl GetDestructureRange for ArrayPat {
    fn get_destructure_range(&self, source_map: &SourceMap) -> Range {
        let full_param_span_range = source_map.get_range(self.span);
        let ts_type_ann = match &self.type_ann {
            Some(type_ann) => type_ann,
            None => return full_param_span_range,
        };
        let type_ann_range = source_map.get_range(ts_type_ann.span);
        let range_without_type_annotation = (full_param_span_range.0, type_ann_range.0);
        range_without_type_annotation
    }
}

impl GetDestructureRange for RestPat {
    fn get_destructure_range(&self, source_map: &SourceMap) -> Range {
        let full_param_span_range = source_map.get_range(self.span);
        let ts_type_ann = match &self.type_ann {
            Some(type_ann) => type_ann,
            None => return full_param_span_range,
        };
        let type_ann_range = source_map.get_range(ts_type_ann.span);
        let range_without_type_annotation = (full_param_span_range.0, type_ann_range.0);
        range_without_type_annotation
    }
}

impl GetDestructureRange for ObjectPat {
    fn get_destructure_range(&self, source_map: &SourceMap) -> Range {
        let full_param_span_range = source_map.get_range(self.span);
        let ts_type_ann = match &self.type_ann {
            Some(ts_type_ann) => ts_type_ann,
            None => return full_param_span_range,
        };
        let type_ann_range = source_map.get_range(ts_type_ann.span);
        let range_without_type_annotation = (full_param_span_range.0, type_ann_range.0);
        range_without_type_annotation
    }
}

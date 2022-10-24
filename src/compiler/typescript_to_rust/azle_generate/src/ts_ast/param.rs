use swc_common::SourceMap;
use swc_ecma_ast::{Param, Pat};

use crate::ts_ast::source_map::{GetSourceFileInfo, Range};

pub trait GetParamRange {
    fn get_destructure_range(&self, source_map: &SourceMap) -> Range;
}

impl GetParamRange for Param {
    fn get_destructure_range(&self, source_map: &SourceMap) -> Range {
        match &self.pat {
            Pat::Ident(ident) => source_map.get_range(ident.span),
            Pat::Array(array_pat) => {
                let full_param_span_range = source_map.get_range(array_pat.span);
                if array_pat.type_ann.is_none() {
                    return full_param_span_range;
                }
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

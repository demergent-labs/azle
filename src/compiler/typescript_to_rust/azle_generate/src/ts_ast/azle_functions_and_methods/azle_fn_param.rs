use swc_common::SourceMap;
use swc_ecma_ast::{BindingIdent, TsFnParam, TsType};

use crate::{
    errors::ErrorMessage,
    ts_ast::{ast_traits::GetTsType, source_map::GetSourceFileInfo},
};

use super::errors;

pub enum AzleFnParam<'a> {
    AzleIdentifier(AzleIdentifier<'a>),
}

pub struct AzleIdentifier<'a> {
    binding_ident: BindingIdent,
    source_map: &'a SourceMap,
}

impl AzleFnParam<'_> {
    pub(super) fn from_ts_fn_param(ts_fn_param: TsFnParam, source_map: &SourceMap) -> AzleFnParam {
        match ts_fn_param {
            TsFnParam::Ident(binding_ident) => AzleFnParam::AzleIdentifier(AzleIdentifier {
                binding_ident,
                source_map,
            }),
            _ => panic!(
                "{}",
                errors::unsupported_type_error(ts_fn_param, source_map)
            ),
        }
    }
}

impl GetTsType for AzleFnParam<'_> {
    fn get_ts_type(&self) -> TsType {
        match self {
            AzleFnParam::AzleIdentifier(azle_identifier) => azle_identifier.get_ts_type(),
        }
    }
}

impl GetTsType for AzleIdentifier<'_> {
    fn get_ts_type(&self) -> TsType {
        match &self.binding_ident.type_ann {
            Some(type_ann) => type_ann.get_ts_type(),
            None => panic!("{}", self.no_type_annotation_error()),
        }
    }
}

impl AzleIdentifier<'_> {
    pub(super) fn no_type_annotation_error(&self) -> ErrorMessage {
        ErrorMessage {
            title: "Type Annotation Needed".to_string(),
            origin: self.source_map.get_origin(self.binding_ident.span),
            line_number: self.source_map.get_line_number(self.binding_ident.span),
            source: self.source_map.get_source(self.binding_ident.span),
            range: self.source_map.get_range(self.binding_ident.span),
            annotation: "type annotation needed for this member".to_string(),
            suggestion: None,
        }
    }
}

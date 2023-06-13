use swc_common::Span;
use swc_ecma_ast::{TsType, TsTypeRef};

use crate::{
    traits::{GetName, GetSourceFileInfo, GetSpan},
    ts_ast::SourceMapped,
    Error,
};

impl SourceMapped<'_, TsTypeRef> {
    /// Returns the span of the enclosed type if it exists, otherwise returns
    /// the span of the enclosing type
    pub fn get_enclosed_span(&self) -> Span {
        match &self.type_params {
            Some(type_params) => type_params.span,
            None => self.span,
        }
    }

    pub fn generate_example_func(&self) -> String {
        if self.get_enclosed_ts_types().len() == 0 {
            "Func<Update<() => void>>".to_string()
        } else {
            let enclosed_types = self.get_enclosed_ts_types().iter().enumerate().fold(
                String::new(),
                |acc, (index, enclosed_type)| {
                    let source_text = self.source_map.get_text(enclosed_type.get_span());
                    format!("{}param_name{}: {}, ", acc, index, source_text)
                },
            );
            let enclosed_types = enclosed_types[..enclosed_types.len() - 2].to_string();
            format!("<Update<({}) => void>", enclosed_types)
        }
    }

    pub fn generate_example_variant(&self) -> Result<String, Error> {
        if self.get_enclosed_ts_types().len() == 0 {
            Ok(format!("{}<{{variant_name: null}}>", self.get_name()))
        } else {
            let enclosed_type = self.get_enclosed_ts_types().iter().enumerate().fold(
                String::new(),
                |acc, (index, enclosed_type)| {
                    let source_text = self.source_map.get_text(enclosed_type.get_span());
                    format!("{}    variant_name{}: {},\n", acc, index, source_text)
                },
            );
            let enclosed_type = enclosed_type[..enclosed_type.len() - 2].to_string();
            Ok(format!("<{{\n{}\n}}>", enclosed_type))
        }
    }

    pub fn generate_example_option(&self) -> Result<String, Error> {
        if self.get_enclosed_ts_types().len() == 0 {
            return Ok(format!("{}<boolean>", self.get_name()));
        }
        let enclosed_types: String = self.get_enclosed_ts_types().iter().enumerate().fold(
            String::new(),
            |acc, (index, enclosed_type)| {
                let source_text = self.source_map.get_text(enclosed_type.get_span());
                format!("{}    member_name{}: {},\n", acc, index, source_text)
            },
        );
        Ok(format!("<{{\n{}\n}}>", enclosed_types))
    }

    pub fn generate_example_record(&self) -> String {
        "Record<{prop1: Type2, prop2: Type2, propN: TypeN}>".to_string()
    }

    pub fn generate_example_tuple(&self) -> String {
        "Tuple<[Type1, Type2, TypeN]>".to_string()
    }

    pub fn generate_example_vec(&self) -> String {
        "Vec<Type>".to_string()
    }

    pub fn get_param_count(&self) -> usize {
        self.get_enclosed_ts_types().len()
    }
}

trait GetEnclosedTsTypes {
    fn get_enclosed_ts_types(&self) -> Vec<TsType>;
}

impl GetEnclosedTsTypes for TsTypeRef {
    fn get_enclosed_ts_types(&self) -> Vec<TsType> {
        match &self.type_params {
            Some(params) => params.params.iter().map(|param| *param.clone()).collect(),
            None => vec![],
        }
    }
}

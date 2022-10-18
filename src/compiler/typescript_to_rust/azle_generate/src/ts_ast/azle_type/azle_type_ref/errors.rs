use swc_common::Span;

use crate::{
    errors::{ErrorMessage, Suggestion},
    ts_ast::{
        ast_traits::GetSourceInfo, source_map::GetSourceFileInfo, ts_type::GetSpan,
        ts_type_ref::TsTypeRefHelperMethods, GetName, GetSourceText,
    },
};

use super::AzleTypeRef;

impl AzleTypeRef<'_> {
    pub(super) fn wrong_number_of_params_error(&self) -> ErrorMessage {
        match self.get_name() {
            "Variant" => self.variant_wrong_number_of_params_error(),
            "Func" => self.func_wrong_number_of_params_error(),
            "Opt" => self.option_wrong_number_of_params_error(),
            _ => panic!("Unreachable: {} is not a valid type.\nFuncs, Variants, and Opts must have exactly one enclosed type.", self.get_source_text()),
        }
    }

    pub(super) fn wrong_enclosed_type_error(&self) -> ErrorMessage {
        match self.get_name() {
            "Variant" => self.variant_wrong_enclosed_type_error(),
            "Func" => self.func_wrong_enclosed_type_error(),
            _ => panic!("Unreachable: {} is not a valid type.\nFuncs, Variants only support certain enclosed types.", self.get_source_text()),
        }
    }

    fn func_wrong_number_of_params_error(&self) -> ErrorMessage {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example_func = format!("{}{}", well_formed, self.generate_example_func());
        let annotation = if self.ts_type_ref.get_enclosed_ts_types().len() == 0 {
            "Needs to have an enclosed type here."
        } else {
            "Only one enclosed type allowed here."
        };
        let suggestion_annotation = if self.ts_type_ref.get_enclosed_ts_types().len() == 0 {
            "If the func has no parameters or return type then you could do this."
        } else {
            "Did you mean to have many parameters?"
        };
        let suggestion = Some(Suggestion {
            title: "Funcs must have exactly one enclosed type.".to_string(),
            range: (well_formed.len() + "Func<".len(), example_func.len() - 1),
            source: example_func,
            annotation: Some(suggestion_annotation.to_string()),
        });
        ErrorMessage {
            title: "Invalid Func".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.source_map.get_range(self.get_enclosed_span()),
            annotation: annotation.to_string(),
            suggestion,
        }
    }

    fn option_wrong_number_of_params_error(&self) -> ErrorMessage {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example = self.generate_example_option();
        let example_option = format!("{}{}", well_formed, example);
        let annotation = if self.ts_type_ref.get_enclosed_ts_types().len() == 0 {
            "Needs to have an enclosed type here."
        } else {
            "Only one enclosed type allowed here."
        };
        let suggestion_annotation = if self.ts_type_ref.get_enclosed_ts_types().len() == 0 {
            "For example if you want an optional boolean value, enclose boolean with Opt"
        } else {
            "Try wrapping everything in a type literal"
        };
        let suggestion = Some(Suggestion {
            title: "Opts must have exactly one enclosed type.".to_string(),
            range: (
                well_formed.len() + "Opt<".len() - 1,
                example_option.len() - 1,
            ),
            source: example_option,
            annotation: Some(suggestion_annotation.to_string()),
        });
        ErrorMessage {
            title: "Invalid Opt".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.source_map.get_range(self.get_enclosed_span()),
            annotation: annotation.to_string(),
            suggestion,
        }
    }

    fn variant_wrong_number_of_params_error(&self) -> ErrorMessage {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example = self.generate_example_variant();
        let example_variant = format!("\n{}{}\n", well_formed, example);
        let annotation = if self.ts_type_ref.get_enclosed_ts_types().len() == 0 {
            "Needs to have an enclosed type here."
        } else {
            "Only one enclosed type allowed here."
        };
        let suggestion_annotation = if self.ts_type_ref.get_enclosed_ts_types().len() == 0 {
            "The simplest Variant is a type literal with a single member with type null"
        } else {
            "Try wrapping everything in a type literal"
        };
        let suggestion = Some(Suggestion {
            title: "Variant must have exactly one enclosed type. If you need multiple variants, put them all in type literal."
                .to_string(),
            range: (well_formed.len() + "Variant<".len(), example_variant.len() - 2),
            source: example_variant,
            annotation: Some(suggestion_annotation.to_string())
        });
        ErrorMessage {
            title: "Invalid Variant".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.source_map.get_range(self.get_enclosed_span()),
            annotation: annotation.to_string(),
            suggestion,
        }
    }

    fn variant_wrong_enclosed_type_error(&self) -> ErrorMessage {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example = self.generate_example_variant();
        let example_variant = format!("{}{}", well_formed, example);
        let suggestion = Some(Suggestion {
            title: "Variants must have a type literal as the enclosed type.".to_string(),
            range: (
                well_formed.len() + "Variant>".len(),
                example_variant.len() - 2,
            ),
            source: example_variant,
            annotation: Some("Try wrapping your value in a type literal.".to_string()),
        });
        ErrorMessage {
            title: "Invalid Variant".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.source_map.get_range(self.get_enclosed_span()),
            annotation: "Must have type literal enclosed here.".to_string(),
            suggestion,
        }
    }

    fn func_wrong_enclosed_type_error(&self) -> ErrorMessage {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example_func = format!("{}{}", well_formed, self.generate_example_func());
        let suggestion = Some(Suggestion {
            title: "Funcs must have a function as the enclosed type.".to_string(),
            range: (
                well_formed.len() + "Func<".len(),
                example_func.len() - "=> Update<void>>".len() - 1,
            ),
            source: example_func,
            annotation: Some("Did you mean to have that type as a parameter?".to_string()),
        });
        ErrorMessage {
            title: "Invalid Func".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.source_map.get_range(self.get_enclosed_span()),
            annotation: "Must have a function enclosed here.".to_string(),
            suggestion,
        }
    }

    fn generate_example_option(&self) -> String {
        if self.ts_type_ref.get_enclosed_ts_types().len() == 0 {
            return format!("{}<boolean>;", self.get_name());
        }
        let enclosed_types: String = self
            .ts_type_ref
            .get_enclosed_ts_types()
            .iter()
            .enumerate()
            .fold(String::new(), |acc, (index, enclosed_type)| {
                let source_text = self.source_map.get_text(enclosed_type.get_span());
                format!("{}    member_name{}: {},\n", acc, index, source_text)
            });
        format!("{}<{{\n{}\n}}>;", self.get_name(), enclosed_types)
    }

    fn generate_example_func(&self) -> String {
        let enclosed_types: String = if self.ts_type_ref.get_enclosed_ts_types().len() == 0 {
            "".to_string()
        } else {
            let result = self
                .ts_type_ref
                .get_enclosed_ts_types()
                .iter()
                .enumerate()
                .fold(String::new(), |acc, (index, enclosed_type)| {
                    let source_text = self.source_map.get_text(enclosed_type.get_span());
                    format!("{}param_name{}: {}, ", acc, index, source_text)
                });
            result[..result.len() - 2].to_string()
        };

        format!("Func<({}) => Update<void>>", enclosed_types)
    }

    fn generate_example_variant(&self) -> String {
        let enclosed_types: String = if self.ts_type_ref.get_enclosed_ts_types().len() == 0 {
            "variant_name: null".to_string()
        } else {
            let result = self
                .ts_type_ref
                .get_enclosed_ts_types()
                .iter()
                .enumerate()
                .fold(String::new(), |acc, (index, enclosed_type)| {
                    let source_text = self.source_map.get_text(enclosed_type.get_span());
                    format!("{}    variant_name{}: {},\n", acc, index, source_text)
                });
            result[..result.len() - 2].to_string()
        };
        format!("{}<{{\n{}\n}}>;", self.get_name(), enclosed_types)
    }

    /// Returns the span of the enclosed type if it exists, otherwise returns
    /// the span of the enclosing type
    fn get_enclosed_span(&self) -> Span {
        match &self.ts_type_ref.type_params {
            Some(type_params) => type_params.span,
            None => self.ts_type_ref.span,
        }
    }
}

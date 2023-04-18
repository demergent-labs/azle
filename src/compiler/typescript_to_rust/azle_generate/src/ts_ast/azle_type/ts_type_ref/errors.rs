use swc_common::{source_map::Pos, Span};
use swc_ecma_ast::{TsType, TsTypeRef};

use crate::{
    errors::{ErrorMessage, Suggestion},
    traits::{GetName, GetSourceFileInfo, GetSourceInfo, GetSourceText, GetSpan},
    ts_ast::SourceMapped,
};

impl SourceMapped<'_, TsTypeRef> {
    pub(super) fn wrong_number_of_params_error(&self) -> ErrorMessage {
        match self.get_name() {
            "Canister" => self.canister_wrong_number_of_params_error(),
            "Variant" => self.variant_wrong_number_of_params_error(),
            "Func" => self.func_wrong_number_of_params_error(),
            "Opt" => self.option_wrong_number_of_params_error(),
            _ => panic!("Unreachable: {} is not a valid type.\nFuncs, Variants, and Opts must have exactly one enclosed type.", self.get_source_text()),
        }
    }

    pub fn wrong_enclosed_type_error(&self) -> ErrorMessage {
        match self.get_name() {
            "Variant" => self.variant_wrong_enclosed_type_error(),
            "Func" => self.func_wrong_enclosed_type_error(),
            _ => panic!("Unreachable: {} is not a valid type.\nFuncs, Variants only support certain enclosed types.", self.get_source_text()),
        }
    }

    pub(super) fn qualified_name_error(&self, unqualified_name: String) -> ErrorMessage {
        ErrorMessage {
            title: "Namespace-qualified types are not currently supported".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: "qualified name here".to_string(),
            suggestion: Some(Suggestion {
                title: "Either declare the type locally or import it without a wildcard"
                    .to_string(),
                source: self
                    .source_map
                    .generate_modified_source(self.span, &unqualified_name),
                range: self
                    .source_map
                    .generate_modified_range(self.span, &unqualified_name),
                annotation: Some("Use type directly here".to_string()),
                import_suggestion: None,
            }),
        }
    }

    fn canister_wrong_number_of_params_error(&self) -> ErrorMessage {
        let example = self.generate_example_canister();
        let modified_source = self
            .source_map
            .generate_modified_source(self.get_enclosed_span(), &example);
        let annotation = if self.get_enclosed_ts_types().len() == 0 {
            "Needs to have an enclosed type here."
        } else {
            "Only one enclosed type allowed here."
        };
        let suggestion = Some(Suggestion {
            title: "Canister must have exactly one enclosed type. For example:".to_string(),
            range: self
                .source_map
                .generate_modified_range(self.get_enclosed_span(), &example),
            source: modified_source,
            annotation: None,
            import_suggestion: None,
        });
        ErrorMessage {
            title: "Invalid Canister".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.source_map.get_range(self.get_enclosed_span()),
            annotation: annotation.to_string(),
            suggestion,
        }
    }

    fn func_wrong_number_of_params_error(&self) -> ErrorMessage {
        let example_func = self.generate_example_func();
        let modified_source = self
            .source_map
            .generate_modified_source(self.get_enclosed_span(), &example_func);
        let annotation = if self.get_enclosed_ts_types().len() == 0 {
            "Needs to have an enclosed type here."
        } else {
            "Only one enclosed type allowed here."
        };
        let suggestion_annotation = if self.get_enclosed_ts_types().len() == 0 {
            "If the func has no parameters or return type then you could do this."
        } else {
            "Did you mean to have multiple parameters?"
        };
        let suggestion = Some(Suggestion {
            title: "Funcs must have exactly one enclosed type.".to_string(),
            range: self
                .source_map
                .generate_modified_range(self.get_enclosed_span(), &example_func),
            source: modified_source,
            annotation: Some(suggestion_annotation.to_string()),
            import_suggestion: None,
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
        let example_option = self.generate_example_option();
        let modified_source = self
            .source_map
            .generate_modified_source(self.get_enclosed_span(), &example_option);
        let annotation = if self.get_enclosed_ts_types().len() == 0 {
            "Needs to have an enclosed type here."
        } else {
            "Only one enclosed type allowed here."
        };
        let suggestion_annotation = if self.get_enclosed_ts_types().len() == 0 {
            "For example if you want an optional boolean value, enclose boolean with Opt"
        } else {
            "Try wrapping everything in a type literal"
        };
        let suggestion = Some(Suggestion {
            title: "Opts must have exactly one enclosed type.".to_string(),
            range: self
                .source_map
                .generate_modified_range(self.get_enclosed_span(), &example_option),
            source: modified_source,
            annotation: Some(suggestion_annotation.to_string()),
            import_suggestion: None,
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
        let example = self.generate_example_variant();
        let modified_source = self
            .source_map
            .generate_modified_source(self.get_enclosed_span(), &example);
        let annotation = if self.get_enclosed_ts_types().len() == 0 {
            "Needs to have an enclosed type here."
        } else {
            "Only one enclosed type allowed here."
        };
        let suggestion_annotation = if self.get_enclosed_ts_types().len() == 0 {
            "The simplest Variant is a type literal with a single member with type null"
        } else {
            "Try wrapping everything in a type literal"
        };
        let suggestion = Some(Suggestion {
            title: "Variant must have exactly one enclosed type. If you need multiple variants, put them all in type literal."
                .to_string(),
            range: self.source_map.generate_modified_range(self.get_enclosed_span(), &example),
            source: modified_source,
            annotation: Some(suggestion_annotation.to_string()),
            import_suggestion: None,
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
        let example_variant = self.generate_example_variant();
        let modified_source = self
            .source_map
            .generate_modified_source(self.get_enclosed_span(), &example_variant);
        let suggestion = Some(Suggestion {
            title: "Variants must have a type literal as the enclosed type.".to_string(),
            range: self
                .source_map
                .generate_modified_range(self.get_enclosed_span(), &example_variant),
            source: modified_source,
            annotation: Some("Try wrapping your value in a type literal.".to_string()),
            import_suggestion: None,
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

    // TODO: 2 ways to improve this:
    //
    // 1. If the enclosed type is a TsFunc type, suggest that they wrap it in
    // `Oneway`, `Query`, or `Update` and show them what that would look like in
    // the example.
    //
    // 2. If the enclosed type is a TypeRef that contains a TsFunc, just with
    // the wrong name, we should only modify the name in the example, (rather
    // than nuking their function signature).
    fn func_wrong_enclosed_type_error(&self) -> ErrorMessage {
        let example_func = "Update<() => void>".to_string();

        let type_params_absolute_range = (self.get_enclosed_span().lo, self.get_enclosed_span().hi);
        let source = self
            .source_map
            .get_source_from_range(type_params_absolute_range);

        let start_pos = self.source_map.get_range(self.get_enclosed_span()).0;
        let offset = type_params_absolute_range.0.to_usize() - start_pos;
        let end_pos = self.get_enclosed_span().hi.to_usize() - offset;
        let range = (start_pos, end_pos);

        let modified_source = format!(
            "{}{}{}",
            source[..start_pos + 1].to_string(),
            example_func,
            source[end_pos - 1..].to_string()
        );

        ErrorMessage {
            title: "Invalid Func declaration".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source,
            range,
            annotation: "the type params here are invalid".to_string(),
            suggestion: Some(Suggestion {
                title:
                    "Funcs must have either Query, Update, or Oneway as the enclosed type. E.g.:"
                        .to_string(),
                range: (start_pos + 1, start_pos + 1 + example_func.len()),
                source: modified_source,
                annotation: None,
                import_suggestion: None,
            }),
        }
    }

    fn generate_example_option(&self) -> String {
        if self.get_enclosed_ts_types().len() == 0 {
            return format!("{}<boolean>", self.get_name());
        }
        let enclosed_types: String = self.get_enclosed_ts_types().iter().enumerate().fold(
            String::new(),
            |acc, (index, enclosed_type)| {
                let source_text = self.source_map.get_text(enclosed_type.get_span());
                format!("{}    member_name{}: {},\n", acc, index, source_text)
            },
        );
        format!("<{{\n{}\n}}>", enclosed_types)
    }

    fn generate_example_canister(&self) -> String {
        if self.get_enclosed_ts_types().len() == 0 {
            "Canister<{method(): CallResult<void>}>".to_string()
        } else {
            "<{method(): CallResult<void>}>".to_string()
        }
    }

    fn generate_example_func(&self) -> String {
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

    fn generate_example_variant(&self) -> String {
        if self.get_enclosed_ts_types().len() == 0 {
            format!("{}<{{variant_name: null}}>", self.get_name())
        } else {
            let enclosed_type = self.get_enclosed_ts_types().iter().enumerate().fold(
                String::new(),
                |acc, (index, enclosed_type)| {
                    let source_text = self.source_map.get_text(enclosed_type.get_span());
                    format!("{}    variant_name{}: {},\n", acc, index, source_text)
                },
            );
            let enclosed_type = enclosed_type[..enclosed_type.len() - 2].to_string();
            format!("<{{\n{}\n}}>", enclosed_type)
        }
    }

    /// Returns the span of the enclosed type if it exists, otherwise returns
    /// the span of the enclosing type
    fn get_enclosed_span(&self) -> Span {
        match &self.type_params {
            Some(type_params) => type_params.span,
            None => self.span,
        }
    }
}

pub trait GetEnclosedTsTypes {
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

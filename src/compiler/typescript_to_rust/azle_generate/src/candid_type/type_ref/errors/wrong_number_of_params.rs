use swc_ecma_ast::TsTypeRef;

use crate::{
    candid_type::errors::utils::GetEnclosedTsTypes,
    errors::{CompilerOutput, Location, Suggestion},
    internal_error,
    traits::{GetNameWithError, GetSourceFileInfo, GetSourceInfo},
    ts_ast::SourceMapped,
    Error,
};

#[derive(Debug, Clone, PartialEq)]
pub struct WrongNumberOfParams {
    compiler_output: CompilerOutput,
}

impl WrongNumberOfParams {
    pub fn error_from_ts_type_ref(sm_ts_type_ref: &SourceMapped<TsTypeRef>) -> Error {
        Self {
            compiler_output: match sm_ts_type_ref.wrong_number_of_params_error() {
                Ok(compiler_output) => compiler_output,
                Err(err) => return err,
            },
        }
        .into()
    }
}

impl From<WrongNumberOfParams> for crate::Error {
    fn from(error: WrongNumberOfParams) -> Self {
        Self::WrongNumberOfParams(error)
    }
}

impl std::fmt::Display for WrongNumberOfParams {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.compiler_output)
    }
}
impl SourceMapped<'_, TsTypeRef> {
    fn wrong_number_of_params_error(&self) -> Result<CompilerOutput, Error> {
        Ok(match self.get_name()? {
            "Canister" => self.canister_wrong_number_of_params_error(),
            "Variant" => self.variant_wrong_number_of_params_error()?,
            "Func" => self.func_wrong_number_of_params_error(),
            "Opt" => self.option_wrong_number_of_params_error()?,
            _ => internal_error!(),
        })
    }

    fn canister_wrong_number_of_params_error(&self) -> CompilerOutput {
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
        CompilerOutput {
            title: "Invalid Canister".to_string(),
            location: Location {
                origin: self.get_origin(),
                line_number: self.get_line_number(),
                source: self.get_source(),
                range: self.source_map.get_range(self.get_enclosed_span()),
            },
            annotation: annotation.to_string(),
            suggestion,
        }
    }

    fn variant_wrong_number_of_params_error(&self) -> Result<CompilerOutput, Error> {
        let example = self.generate_example_variant()?;
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
        Ok(CompilerOutput {
            title: "Invalid Variant".to_string(),
            location: Location {
                origin: self.get_origin(),
                line_number: self.get_line_number(),
                source: self.get_source(),
                range: self.source_map.get_range(self.get_enclosed_span()),
            },
            annotation: annotation.to_string(),
            suggestion,
        })
    }

    fn func_wrong_number_of_params_error(&self) -> CompilerOutput {
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
        CompilerOutput {
            title: "Invalid Func".to_string(),
            location: Location {
                origin: self.get_origin(),
                line_number: self.get_line_number(),
                source: self.get_source(),
                range: self.source_map.get_range(self.get_enclosed_span()),
            },
            annotation: annotation.to_string(),
            suggestion,
        }
    }

    fn option_wrong_number_of_params_error(&self) -> Result<CompilerOutput, Error> {
        let example_option = self.generate_example_option()?;
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
        Ok(CompilerOutput {
            title: "Invalid Opt".to_string(),
            location: Location {
                origin: self.get_origin(),
                line_number: self.get_line_number(),
                source: self.get_source(),
                range: self.source_map.get_range(self.get_enclosed_span()),
            },
            annotation: annotation.to_string(),
            suggestion,
        })
    }
}

use std::fmt::Display;

use swc_ecma_ast::TsTypeRef;

use crate::{
    candid_type::errors::utils,
    errors::{CompilerOutput, InternalError, Location, Suggestion},
    internal_error,
    traits::{GetNameWithError, GetSourceFileInfo, GetSourceInfo},
    ts_ast::SourceMapped,
    Error,
};

#[derive(Debug, Clone, PartialEq)]
pub struct WrongNumberOfParams {
    name: String,
    param_count: usize,
    location: Location,
    modified_source: String,
    modified_range: (usize, usize),
}

impl WrongNumberOfParams {
    pub fn error_from_ts_type_ref(sm_ts_type_ref: &SourceMapped<TsTypeRef>) -> Error {
        let name = match sm_ts_type_ref.get_name() {
            Ok(name) => name.to_string(),
            Err(err) => return err,
        };
        let param_count = sm_ts_type_ref.get_param_count();
        let (modified_source, modified_range) = match sm_ts_type_ref.get_suggestion_modifications()
        {
            Ok(ok) => ok,
            Err(err) => return err,
        };
        Self {
            location: sm_ts_type_ref.get_location(),
            name,
            param_count,
            modified_source,
            modified_range,
        }
        .into()
    }

    fn create_canister_error(&self) -> CompilerOutput {
        let annotation = if self.param_count == 0 {
            "Needs to have an enclosed type here."
        } else {
            "Only one enclosed type allowed here."
        };
        let suggestion = Some(Suggestion {
            title: "Canister must have exactly one enclosed type. For example:".to_string(),
            source: self.modified_source.clone(),
            range: self.modified_range,
            annotation: None,
            import_suggestion: None,
        });
        CompilerOutput {
            title: "Invalid Canister".to_string(),
            location: self.location.clone(),
            annotation: annotation.to_string(),
            suggestion,
        }
    }

    fn create_variant_error(&self) -> CompilerOutput {
        let annotation = if self.param_count == 0 {
            "Needs to have an enclosed type here."
        } else {
            "Only one enclosed type allowed here."
        };
        let suggestion_annotation = if self.param_count == 0 {
            "The simplest Variant is a type literal with a single member with type null"
        } else {
            "Try wrapping everything in a type literal"
        };
        let suggestion = Some(Suggestion {
            title: "Variant must have exactly one enclosed type. If you need multiple variants, put them all in type literal."
                .to_string(),
            range: self.modified_range,
            source: self.modified_source.clone(),
            annotation: Some(suggestion_annotation.to_string()),
            import_suggestion: None,
        });
        CompilerOutput {
            title: "Invalid Variant".to_string(),
            location: self.location.clone(),
            annotation: annotation.to_string(),
            suggestion,
        }
    }

    fn create_func_error(&self) -> CompilerOutput {
        let annotation = if self.param_count == 0 {
            "Needs to have an enclosed type here."
        } else {
            "Only one enclosed type allowed here."
        };
        let suggestion_annotation = if self.param_count == 0 {
            "If the func has no parameters or return type then you could do this."
        } else {
            "Did you mean to have multiple parameters?"
        };
        let suggestion = Some(Suggestion {
            title: "Funcs must have exactly one enclosed type.".to_string(),
            range: self.modified_range,
            source: self.modified_source.clone(),
            annotation: Some(suggestion_annotation.to_string()),
            import_suggestion: None,
        });
        CompilerOutput {
            title: "Invalid Func".to_string(),
            location: self.location.clone(),
            annotation: annotation.to_string(),
            suggestion,
        }
    }

    fn create_option_error(&self) -> CompilerOutput {
        let annotation = if self.param_count == 0 {
            "Needs to have an enclosed type here."
        } else {
            "Only one enclosed type allowed here."
        };
        let suggestion_annotation = if self.param_count == 0 {
            "For example if you want an optional boolean value, enclose boolean with Opt"
        } else {
            "Try wrapping everything in a type literal"
        };
        let suggestion = Some(Suggestion {
            title: "Opts must have exactly one enclosed type.".to_string(),
            range: self.modified_range,
            source: self.modified_source.clone(),
            annotation: Some(suggestion_annotation.to_string()),
            import_suggestion: None,
        });
        CompilerOutput {
            title: "Invalid Opt".to_string(),
            location: self.location.clone(),
            annotation: annotation.to_string(),
            suggestion,
        }
    }
}

impl std::error::Error for WrongNumberOfParams {}

impl From<WrongNumberOfParams> for crate::Error {
    fn from(error: WrongNumberOfParams) -> Self {
        Self::WrongNumberOfParams(error)
    }
}

impl Display for WrongNumberOfParams {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let compiler_output = match self.name.as_str() {
            "Canister" => self.create_canister_error(),
            "Variant" => self.create_variant_error(),
            "Func" => self.create_func_error(),
            "Opt" => self.create_option_error(),
            _ => return write!(f, "{}", Error::InternalError(InternalError {})),
        };
        write!(f, "{}", compiler_output)
    }
}

impl SourceMapped<'_, TsTypeRef> {
    fn get_suggestion_modifications(&self) -> Result<(String, (usize, usize)), Error> {
        Ok(match self.get_name()? {
            "Canister" => self.get_canister_suggestion_modifications(),
            "Variant" => self.get_variant_suggestion_modifications()?,
            "Func" => self.get_func_suggestion_modifications(),
            "Opt" => self.get_option_suggestion_modifications()?,
            _ => internal_error!(),
        })
    }

    fn get_canister_suggestion_modifications(&self) -> (String, (usize, usize)) {
        let example = utils::generate_example_canister(self.get_param_count());
        let modified_source = self
            .source_map
            .generate_modified_source(self.get_enclosed_span(), &example);
        let modified_range = self
            .source_map
            .generate_modified_range(self.get_enclosed_span(), &example);
        (modified_source, modified_range)
    }

    fn get_variant_suggestion_modifications(&self) -> Result<(String, (usize, usize)), Error> {
        let example = self.generate_example_variant()?;
        let modified_source = self
            .source_map
            .generate_modified_source(self.get_enclosed_span(), &example);
        let modified_range = self
            .source_map
            .generate_modified_range(self.get_enclosed_span(), &example);
        Ok((modified_source, modified_range))
    }

    fn get_func_suggestion_modifications(&self) -> (String, (usize, usize)) {
        let example_func = self.generate_example_func();
        let modified_source = self
            .source_map
            .generate_modified_source(self.get_enclosed_span(), &example_func);
        let modified_range = self
            .source_map
            .generate_modified_range(self.get_enclosed_span(), &example_func);
        (modified_source, modified_range)
    }

    fn get_option_suggestion_modifications(&self) -> Result<(String, (usize, usize)), Error> {
        let example_option = self.generate_example_option()?;
        let modified_source = self
            .source_map
            .generate_modified_source(self.get_enclosed_span(), &example_option);
        let modified_range = self
            .source_map
            .generate_modified_range(self.get_enclosed_span(), &example_option);
        Ok((modified_source, modified_range))
    }
}

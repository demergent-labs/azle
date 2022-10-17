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
            "Option" => self.option_wrong_number_of_params_error(),
            _ => panic!("Unreachable: {} is not a valid type.\nFuncs, Variants, and Options must have exactly one enclosed type", self.get_source_text()),
        }
    }

    pub(super) fn wrong_enclosed_type_error(&self) -> ErrorMessage {
        match self.get_name() {
            "Variant" => self.variant_wrong_enclosed_type_error(),
            "Func" => self.func_wrong_enclosed_type_error(),
            _ => panic!("Unreachable: {} is not a valid type.\nFuncs, Variants, and Options must have exactly one enclosed type", self.get_source_text()),
        }
    }

    fn func_wrong_number_of_params_error(&self) -> ErrorMessage {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example_func = format!("\n{}{}\n", well_formed, self.generate_example_func());
        let suggestion = Some(Suggestion {
            title: "Funcs must have exactly one enclosed type.".to_string(),
            source: example_func,
            range: (0, 0),
        });
        ErrorMessage {
            title: "Invalid Func".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: "This is the annotation".to_string(),
            suggestion,
        }
    }

    fn option_wrong_number_of_params_error(&self) -> ErrorMessage {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example = self.generate_example_option();
        let example_option = format!("\n{}{}\n", well_formed, example);
        let suggestion = Some(Suggestion {
            title: "Funcs must have exactly one enclosed type.".to_string(),
            source: example_option,
            range: (0, 0),
        });
        ErrorMessage {
            title: "Invalid Func".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: "This is the annotation".to_string(),
            suggestion,
        }
    }

    fn variant_wrong_number_of_params_error(&self) -> ErrorMessage {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example = self.generate_example_variant();
        let example_variant = format!("\n{}{}\n", well_formed, example);
        let suggestion = Some(Suggestion {
            title: "Variant must have exactly one enclosed type. If you need multiple variants, put them all in type literal."
                .to_string(),
            source: example_variant,
            range: (0, 100),
        });
        ErrorMessage {
            title: "Invalid Variant".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: "This is the annotation".to_string(),
            suggestion,
        }
    }

    fn variant_wrong_enclosed_type_error(&self) -> ErrorMessage {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example = self.generate_example_variant();
        let example_variant = format!("{}{}", well_formed, example);
        let suggestion = Some(Suggestion {
            title: "Variants must have a type literal as the enclosed type.".to_string(),
            source: example_variant,
            range: (well_formed.len(), well_formed.len() + 9),
        });
        ErrorMessage {
            title: "Invalid Variant".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: "This is the annotation".to_string(),
            suggestion,
        }
    }

    fn func_wrong_enclosed_type_error(&self) -> ErrorMessage {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example_func = format!("\n{}{}\n", well_formed, self.generate_example_func());
        let suggestion = Some(Suggestion {
            title: "Funcs must have a function as the enclosed type.".to_string(),
            source: example_func,
            range: (0, 0),
        });
        ErrorMessage {
            title: "Invalid Func".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: "This is the annotation".to_string(),
            suggestion,
        }
    }

    fn generate_example_option(&self) -> String {
        let enclosed_types: String = self
            .ts_type_ref
            .get_enclosed_ts_types()
            .iter()
            .enumerate()
            .fold(String::new(), |acc, (index, enclosed_type)| {
                let source_text = self.source_map.get_text(enclosed_type.get_span());
                format!("{}    member_name{}: {},\n", acc, index, source_text)
            });
        format!("{}<{{\n{}}}>;", self.get_name(), enclosed_types)
    }

    fn generate_example_func(&self) -> String {
        let enclosed_types: String = if self.ts_type_ref.get_enclosed_ts_types().len() == 0 {
            "param_name: param_type".to_string()
        } else {
            self.ts_type_ref
                .get_enclosed_ts_types()
                .iter()
                .enumerate()
                .fold(String::new(), |acc, (index, enclosed_type)| {
                    let source_text = self.source_map.get_text(enclosed_type.get_span());
                    format!("{}param_name{}: {}, ", acc, index, source_text)
                })
        };

        format!("Func<({enclosed_types}) => Update<Type>>")
    }

    fn generate_example_variant(&self) -> String {
        let enclosed_types: String = self
            .ts_type_ref
            .get_enclosed_ts_types()
            .iter()
            .enumerate()
            .fold(String::new(), |acc, (index, enclosed_type)| {
                let source_text = self.source_map.get_text(enclosed_type.get_span());
                format!("{}    variant_name{}: {},\n", acc, index, source_text)
            });
        format!("{}<{{\n{}}}>;", self.get_name(), enclosed_types)
    }
}

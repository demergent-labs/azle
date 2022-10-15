use crate::ts_ast::{
    source_map::GetSourceFileInfo, ts_type::GetSpan, ts_type_ref::TsTypeRefPrivateMethods, GetName,
    GetSourceText,
};

use super::AzleTypeRef;

impl AzleTypeRef<'_> {
    pub(super) fn wrong_number_of_params_error(&self) -> String {
        match self.get_name() {
            "Variant" => self.variant_wrong_number_of_params_error(),
            "Func" => self.func_wrong_number_of_params_error(),
            "Option" => self.option_wrong_number_of_params_error(),
            _ => format!("Unreachable: {} is not a valid type.\nFuncs, Variants, and Options must have exactly one enclosed type", self.get_source_text()),
        }
    }

    pub(super) fn wrong_enclosed_type_error(&self) -> String {
        match self.get_name() {
            "Variant" => self.variant_wrong_enclosed_type_error(),
            "Func" => self.func_wrong_enclosed_type_error(),
            _ => format!("Unreachable: {} is not a valid type.\nFuncs, Variants, and Options must have exactly one enclosed type", self.get_source_text()),
        }
    }

    fn func_wrong_number_of_params_error(&self) -> String {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example_func = format!("\n{}{}\n", well_formed, self.generate_example_func());
        let location = self.source_map.get_line_info(self.ts_type_ref.span);
        let highlighted_line = self
            .source_map
            .generate_highlighted_line(self.ts_type_ref.span);
        format!("Invalid Func at {}\n{}\nFuncs must have exactly one enclosed type. An example func looks like this:\n{}", location, highlighted_line, example_func)
    }

    fn option_wrong_number_of_params_error(&self) -> String {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example = self.generate_example_option();
        let example_option = format!("\n{}{}\n", well_formed, example);
        let location = self.source_map.get_line_info(self.ts_type_ref.span);
        let highlighted_line = self
            .source_map
            .generate_highlighted_line(self.ts_type_ref.span);
        format!("Invalid Option at {}\n{}\nOptions must have exactly one enclosed type. If you need multiple values in the option, put them all in type literal like this:\n{}", location, highlighted_line, example_option)
    }

    fn variant_wrong_number_of_params_error(&self) -> String {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example = self.generate_example_variant();
        let example_variant = format!("\n{}{}\n", well_formed, example);
        let location = self.source_map.get_line_info(self.ts_type_ref.span);
        let highlighted_line = self
            .source_map
            .generate_highlighted_line(self.ts_type_ref.span);
        format!("Invalid variant at {}\n{}\nVariants must have exactly one enclosed type. If you need multiple variants, put them all in type literal like this:\n{}", location, highlighted_line, example_variant)
    }

    fn variant_wrong_enclosed_type_error(&self) -> String {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example = self.generate_example_variant();
        let example_variant = format!("\n{}{}\n", well_formed, example);
        let location = self.source_map.get_line_info(self.ts_type_ref.span);
        let highlighted_line = self
            .source_map
            .generate_highlighted_line(self.ts_type_ref.span);
        format!("Invalid variant at {}\n{}\nVariants must have a type literal as the enclosed type. Try this:\n{}", location, highlighted_line, example_variant)
    }

    fn func_wrong_enclosed_type_error(&self) -> String {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example_func = format!("\n{}{}\n", well_formed, self.generate_example_func());
        let location = self.source_map.get_line_info(self.ts_type_ref.span);
        let highlighted_line = self
            .source_map
            .generate_highlighted_line(self.ts_type_ref.span);
        format!("Invalid Func at {}\n{}\nFuncs must have a function as the enclosed type. Try this:\n{}", location, highlighted_line, example_func)
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
        format!("{}<\n{{\n{}}}>;", self.get_name(), enclosed_types)
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

        format!("For example: Func<({enclosed_types}) => Update<Type>>")
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
        format!("{}<\n{{\n{}}}>;", self.get_name(), enclosed_types)
    }
}

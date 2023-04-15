use swc_ecma_ast::{ClassDecl, ClassProp};

use crate::{
    errors::service_method::ParseError,
    traits::{GetName, GetSourceFileInfo},
    ts_ast::SourceMapped,
};

impl SourceMapped<'_, ClassDecl> {
    pub fn build_invalid_class_prop_error_message(
        &self,
        class_prop: &ClassProp,
        error_message: ParseError,
    ) -> String {
        let service_class_name = self.ident.get_name().to_string();

        let origin = self.source_map.get_origin(class_prop.span);
        let line_number = self.source_map.get_line_number(class_prop.span);
        let column_number = self.source_map.get_range(class_prop.span).0 + 1;
        let location = format!("{}:{}:{}", origin, line_number, column_number);

        format!(
            "{}\n\nin class {}\nat {}",
            error_message.error_message(),
            service_class_name,
            location
        )
    }
}

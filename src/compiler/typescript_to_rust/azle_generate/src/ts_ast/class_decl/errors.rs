use swc_ecma_ast::{ClassDecl, ClassMember, ClassProp};

use crate::{
    errors::external_canister_method::ParseError,
    ts_ast::{
        source_map::{GetSourceFileInfo, SourceMapped},
        GetName,
    },
};

impl SourceMapped<'_, ClassDecl> {
    pub fn build_invalid_class_member_error_message(&self, class_member: &ClassMember) -> String {
        let member_type = match class_member {
            ClassMember::Constructor(_) => "constructor",
            ClassMember::Method(_) => "method",
            ClassMember::PrivateMethod(_) => "private method",
            ClassMember::ClassProp(_) => "class prop",
            ClassMember::PrivateProp(_) => "private prop",
            ClassMember::TsIndexSignature(_) => "TS index signature",
            ClassMember::Empty(_) => "empty block",
            ClassMember::StaticBlock(_) => "static block",
        };

        let span = match class_member {
            ClassMember::Constructor(constructor) => constructor.span,
            ClassMember::Method(method) => method.span,
            ClassMember::PrivateMethod(private_method) => private_method.span,
            ClassMember::ClassProp(class_prop) => class_prop.span,
            ClassMember::PrivateProp(private_prop) => private_prop.span,
            ClassMember::TsIndexSignature(ts_index_signature) => ts_index_signature.span,
            ClassMember::Empty(empty) => empty.span,
            ClassMember::StaticBlock(static_block) => static_block.span,
        };

        let external_canister_class_name = self.ident.get_name().to_string();

        let origin = self.source_map.get_origin(span);
        let line_number = self.source_map.get_line_number(span);
        let column_number = self.source_map.get_range(span).0 + 1;

        format!(
            "Invalid {} in class {}\nat {}:{}:{}\n\nHelp: Remove this member or make it a property",
            member_type, external_canister_class_name, origin, line_number, column_number
        )
    }

    pub fn build_invalid_class_prop_error_message(
        &self,
        class_prop: &ClassProp,
        error_message: ParseError,
    ) -> String {
        let external_canister_class_name = self.ident.get_name().to_string();

        let origin = self.source_map.get_origin(class_prop.span);
        let line_number = self.source_map.get_line_number(class_prop.span);
        let column_number = self.source_map.get_range(class_prop.span).0 + 1;
        let location = format!("{}:{}:{}", origin, line_number, column_number);

        format!(
            "{}\n\nin class {}\nat {}",
            error_message.error_message(),
            external_canister_class_name,
            location
        )
    }
}

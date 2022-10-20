use crate::ts_ast::GetDependencies;
use crate::ts_ast::GetTsType;

use super::{AzleType, AzleTypeElement};

impl GetDependencies for AzleTypeElement<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &std::collections::HashMap<String, crate::ts_ast::AzleTypeAliasDecl>,
        found_type_names: &std::collections::HashSet<String>,
    ) -> std::collections::HashSet<String> {
        let ts_type = match &self.ts_type_element {
            swc_ecma_ast::TsTypeElement::TsPropertySignature(ts_property_signature) => {
                ts_property_signature
            }
            _ => panic!("{}", self.unsupported_member_error()),
        }
        .get_ts_type();
        let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
        azle_type.get_dependent_types(type_alias_lookup, &found_type_names)
    }
}

use std::collections::{HashMap, HashSet};
use swc_ecma_ast::TsTypeElement;

use super::{AzleType, AzleTypeElement};
use crate::ts_ast::{
    azle_functions_and_methods::FunctionAndMethodTypeHelperMethods, AzleTypeAliasDecl,
    GetDependencies, GetTsType,
};

impl GetDependencies for AzleTypeElement<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        match &self.ts_type_element {
            TsTypeElement::TsPropertySignature(ts_property_signature) => {
                let ts_type = ts_property_signature.get_ts_type();
                let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
                azle_type.get_dependent_types(type_alias_lookup, &found_type_names)
            }
            TsTypeElement::TsMethodSignature(method_sig) => {
                let return_types = match method_sig.get_return_type() {
                    Some(return_type) => vec![return_type],
                    None => vec![],
                };
                let param_types = method_sig.get_param_types();
                let ts_types = vec![return_types, param_types].concat();
                ts_types.iter().fold(HashSet::new(), |acc, ts_type| {
                    let azle_type = AzleType::from_ts_type(ts_type.clone(), self.source_map);
                    acc.union(&azle_type.get_dependent_types(type_alias_lookup, &acc))
                        .cloned()
                        .collect()
                })
            }
            _ => panic!("{}", self.unsupported_member_error()),
        }
    }
}

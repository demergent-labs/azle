use cdk_framework::{
    act::node::{candid::Func, node_parts::mode::Mode},
    traits::CollectResults,
};
use std::ops::Deref;
use swc_ecma_ast::{TsFnOrConstructorType, TsType, TsTypeAliasDecl, TsTypeAnn, TsTypeRef};

use crate::{
    errors::CollectResults as OtherCollectResults,
    traits::{GetName, GetNameWithError, GetTsType},
    ts_ast::SourceMapped,
    Error,
};

use super::errors::WrongEnclosedType;

mod rust;

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_func(&self) -> Result<Option<Func>, Vec<Error>> {
        self.process_ts_type_ref("Func", |ts_type_ref| {
            ts_type_ref.to_func(Some(self.id.get_name().to_string()))
        })
    }
}

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_func(&self, name: Option<String>) -> Result<Func, Vec<Error>> {
        let request_type_ts_type = self.get_ts_type()?;
        let request_type_type_ref = match request_type_ts_type.deref() {
            TsType::TsTypeRef(ts_type_ref) => SourceMapped::new(ts_type_ref, self.source_map),
            _ => return Err(vec![WrongEnclosedType::error_from_ts_type_ref(self).into()]),
        };

        let mode = match request_type_type_ref.get_name()? {
            "Query" => Mode::Query,
            "Update" => Mode::Update,
            "Oneway" => Mode::Oneway,
            _ => return Err(vec![WrongEnclosedType::error_from_ts_type_ref(self).into()]),
        };

        let ts_type = request_type_type_ref.get_ts_type()?;
        let ts_fn_type = match ts_type.deref() {
            TsType::TsFnOrConstructorType(TsFnOrConstructorType::TsFnType(ts_fn_type)) => {
                SourceMapped::new(ts_fn_type, self.source_map)
            }
            _ => return Err(vec![WrongEnclosedType::error_from_ts_type_ref(self).into()]),
        };

        let (params, return_type) = (
            ts_fn_type
                .get_param_types()?
                .iter()
                .map(|param| SourceMapped::new(param, self.source_map).to_candid_type())
                .collect_results(),
            SourceMapped::new(&ts_fn_type.get_ts_type_ann().get_ts_type(), self.source_map)
                .to_candid_type(),
        )
            .collect_results()?;

        let to_vm_value = |name: String| rust::generate_into_vm_value_impl(name);
        let list_to_vm_value = |name: String| rust::generate_list_into_vm_value_impl(name);
        let from_vm_value = |name: String| rust::generate_from_vm_value_impl(name);
        let list_from_vm_value = |name: String| rust::generate_list_from_vm_value_impl(name);

        Ok(Func::new(
            name,
            params,
            return_type,
            mode,
            to_vm_value,
            list_to_vm_value,
            from_vm_value,
            list_from_vm_value,
        ))
    }
}

impl GetTsType for TsTypeAnn {
    fn get_ts_type(&self) -> swc_ecma_ast::TsType {
        *self.type_ann.clone()
    }
}

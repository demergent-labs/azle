use cdk_framework::{
    act::node::{candid::Func, node_parts::mode::Mode},
    traits::{CollectIterResults, CollectResults},
};
use std::ops::Deref;
use swc_ecma_ast::{TsFnOrConstructorType, TsType, TsTypeAliasDecl, TsTypeAnn, TsTypeRef};

use crate::{
    traits::{GetName, GetTsType},
    ts_ast::SourceMapped,
    Error,
};

use super::errors::WrongEnclosedType;

mod rust;

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_func(&self) -> Result<Option<Func>, Vec<Error>> {
        if self.is_something_that_could_be_in_the_alias_table() {
            return Ok(None);
        }
        self.process_ts_type_ref(&self.alias_table.func, |ts_type_ref| {
            ts_type_ref.to_func(Some(self.id.get_name()))
        })
        .map(|result| result.flatten())
    }
}

impl SourceMapped<'_, TsTypeRef> {
    pub fn is_func(&self) -> bool {
        self.alias_table.func.contains(&self.get_name())
    }

    pub fn to_func(&self, name: Option<String>) -> Result<Option<Func>, Vec<Error>> {
        if !self.is_func() {
            return Ok(None);
        }
        let request_type_ts_type = self.get_ts_type()?;
        let request_type_type_ref = match request_type_ts_type.deref() {
            TsType::TsTypeRef(ts_type_ref) => self.spawn(ts_type_ref),
            _ => return Err(vec![WrongEnclosedType::error_from_ts_type_ref(self).into()]),
        };

        let (mode, ts_type) = (
            {
                let name = request_type_type_ref.get_name();
                match name.as_str() {
                    _ if self.alias_table.query_mode.contains(&name) => Ok(Mode::Query),
                    _ if self.alias_table.update_mode.contains(&name) => Ok(Mode::Update),
                    _ if self.alias_table.oneway_mode.contains(&name) => Ok(Mode::Oneway),
                    _ => Err(vec![WrongEnclosedType::error_from_ts_type_ref(self).into()]),
                }
            },
            request_type_type_ref.get_ts_type().map_err(Error::into),
        )
            .collect_results()?;

        let ts_fn_type = match ts_type.deref() {
            TsType::TsFnOrConstructorType(TsFnOrConstructorType::TsFnType(ts_fn_type)) => {
                self.spawn(ts_fn_type)
            }
            _ => return Err(vec![WrongEnclosedType::error_from_ts_type_ref(self).into()]),
        };

        let param_to_candid = |param: &TsType| self.spawn(param).to_candid_type();

        let (params, return_type) = (
            ts_fn_type
                .get_param_types()?
                .iter()
                .map(param_to_candid)
                .collect_results(),
            self.spawn(&ts_fn_type.get_ts_type_ann().get_ts_type())
                .to_candid_type(),
        )
            .collect_results()?;

        let to_vm_value = |name: String| rust::generate_into_vm_value_impl(name);
        let list_to_vm_value = |name: String| rust::generate_list_into_vm_value_impl(name);
        let from_vm_value = |name: String| rust::generate_from_vm_value_impl(name);
        let list_from_vm_value = |name: String| rust::generate_list_from_vm_value_impl(name);

        Ok(Some(Func::new(
            name,
            params,
            return_type,
            mode,
            to_vm_value,
            list_to_vm_value,
            from_vm_value,
            list_from_vm_value,
        )))
    }
}

impl GetTsType for TsTypeAnn {
    fn get_ts_type(&self) -> swc_ecma_ast::TsType {
        *self.type_ann.clone()
    }
}

use cdk_framework::act::node::{candid::Func, node_parts::mode::Mode, CandidType};
use swc_ecma_ast::{TsTypeAliasDecl, TsTypeAnn};

use crate::ts_ast::{
    azle_type::{AzleType, AzleTypeRef},
    source_map::SourceMapped,
    traits::GetTsType,
    AzleFnOrConstructorType, FunctionAndMethodTypeHelperMethods, GetName,
};

mod rust;

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_func(&self) -> Option<Func> {
        self.process_ts_type_ref("Func", |azle_type_ref| {
            azle_type_ref.to_func(Some(self.id.get_name().to_string()))
        })
    }
}

impl AzleTypeRef<'_> {
    pub fn to_func(&self, name: Option<String>) -> Func {
        let request_type_type_ref = match self.get_enclosed_azle_type() {
            AzleType::AzleTypeRef(azle_type_ref) => azle_type_ref,
            _ => panic!("{}", self.wrong_enclosed_type_error()),
        };

        let mode = match request_type_type_ref.get_name() {
            "Query" => Mode::Query,
            "Update" => Mode::Update,
            "Oneway" => Mode::Oneway,
            _ => panic!("{}", self.wrong_enclosed_type_error()),
        };

        let azle_fn_type = match request_type_type_ref.get_enclosed_azle_type() {
            AzleType::AzleFnOrConstructorType(fn_or_const) => match fn_or_const {
                AzleFnOrConstructorType::AzleFnType(ts_fn_type) => ts_fn_type,
            },
            _ => panic!("{}", self.wrong_enclosed_type_error()),
        };

        let params: Vec<CandidType> = azle_fn_type
            .get_param_types()
            .iter()
            .map(|param| {
                let azle_param = AzleType::from_ts_type(param.clone(), self.source_map);
                azle_param.to_data_type()
            })
            .collect();

        let return_type = AzleType::from_ts_type(
            azle_fn_type.get_ts_type_ann().get_ts_type(),
            self.source_map,
        )
        .to_data_type();

        let to_vm_value = |name: String| rust::generate_into_vm_value_impl(name);
        let list_to_vm_value = |name: String| rust::generate_list_into_vm_value_impl(name);
        let from_vm_value = |name: String| rust::generate_from_vm_value_impl(name);
        let list_from_vm_value = |name: String| rust::generate_list_from_vm_value_impl(name);

        Func::new(
            name,
            params,
            return_type,
            mode,
            to_vm_value,
            list_to_vm_value,
            from_vm_value,
            list_from_vm_value,
        )
    }
}

impl GetTsType for TsTypeAnn {
    fn get_ts_type(&self) -> swc_ecma_ast::TsType {
        *self.type_ann.clone()
    }
}

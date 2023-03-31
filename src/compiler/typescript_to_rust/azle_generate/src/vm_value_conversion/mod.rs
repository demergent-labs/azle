use cdk_framework::act::VmValueConversion;

use super::TsAst;

pub mod try_from_vm_value_impls;
pub mod try_into_vm_value_impls;

impl TsAst {
    pub fn build_vm_value_conversion(&self) -> VmValueConversion {
        let try_into_vm_value_impls = try_into_vm_value_impls::generate();
        let try_from_vm_value_impls = try_from_vm_value_impls::generate();

        VmValueConversion {
            try_from_vm_value_impls,
            try_into_vm_value_impls,
        }
    }
}

use cdk_framework::act::node::candid::Service;

use super::TsAst;
use crate::ts_ast::azle_program::HelperMethods;

impl TsAst {
    pub fn build_services(&self) -> Vec<Service> {
        let service_class_declarations = self.azle_programs.get_service_class_declarations();

        service_class_declarations
            .iter()
            .map(|service_class_decl| service_class_decl.to_act_service())
            .collect()
    }
}

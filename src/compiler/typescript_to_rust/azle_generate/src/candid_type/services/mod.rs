use cdk_framework::act::node::candid::Service;

use crate::ts_ast::TsAst;
use get_service_class_decls::GetFlattenedServiceClassDecls;

mod class_decl;
mod get_service_class_decls;

impl TsAst {
    pub fn build_services(&self) -> Vec<Service> {
        let service_class_declarations = self.azle_programs.get_service_class_declarations();

        service_class_declarations
            .iter()
            .map(|service_class_decl| service_class_decl.to_service())
            .collect()
    }
}

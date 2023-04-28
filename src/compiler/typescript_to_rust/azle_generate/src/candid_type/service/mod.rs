use cdk_framework::act::node::candid::Service;
use swc_ecma_ast::ClassDecl;

use crate::{
    traits::GetName,
    ts_ast::{SourceMapped, TsAst},
};
use get_service_class_decls::GetFlattenedServiceClassDecls;
use vm_value_conversions::{from_vm_value, list_from_vm_value, list_to_vm_value, to_vm_value};

mod get_service_class_decls;
mod method;
mod vm_value_conversions;

impl TsAst {
    pub fn build_services(&self) -> Vec<Service> {
        let service_class_declarations = self.programs.get_service_class_declarations();

        service_class_declarations
            .iter()
            .map(|service_class_decl| service_class_decl.to_service())
            .collect()
    }
}

impl SourceMapped<'_, ClassDecl> {
    pub fn to_service(&self) -> Service {
        let name = self.ident.get_name().to_string();
        let methods = self.build_service_methods();

        Service {
            name,
            methods,
            to_vm_value,
            list_to_vm_value,
            from_vm_value,
            list_from_vm_value,
        }
    }
}

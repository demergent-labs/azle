use cdk_framework::act::node::candid::Service;
use swc_ecma_ast::TsTypeAliasDecl;

use crate::ts_ast::{azle_program::HelperMethods, source_map::SourceMapped, TsAst};

impl TsAst {
    pub fn extract_candid_types<F, T>(&self, extractor: F) -> Vec<T>
    where
        F: Fn(&SourceMapped<TsTypeAliasDecl>) -> Option<T>,
    {
        self.ts_type_alias_decls()
            .iter()
            .filter_map(|ts_type_alias_decl| extractor(ts_type_alias_decl))
            .collect()
    }

    pub fn build_services(&self) -> Vec<Service> {
        let service_class_declarations = self.azle_programs.get_service_class_declarations();

        service_class_declarations
            .iter()
            .map(|service_class_decl| service_class_decl.to_service())
            .collect()
    }
}

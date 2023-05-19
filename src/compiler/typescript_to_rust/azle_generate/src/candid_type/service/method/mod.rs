use cdk_framework::act::node::candid::service::Method;
use swc_ecma_ast::{ClassDecl, ClassMember};

use crate::{errors::CollectResults, ts_ast::SourceMapped, Error};

mod errors;
mod to_service_method;

impl SourceMapped<'_, ClassDecl> {
    pub fn build_service_methods(&self) -> Result<Vec<Method>, Vec<Error>> {
        self.class
            .body
            .iter()
            .map(|class_member| match class_member {
                ClassMember::ClassProp(class_prop) => {
                    let class_prop_with_source_map = SourceMapped::new(class_prop, self.source_map);

                    let service_method_result = class_prop_with_source_map.to_service_method();

                    match service_method_result {
                        Ok(service_method) => Ok(service_method),
                        Err(_) => Err(vec![Error::InvalidClassProp]),
                    }
                }
                _ => Err(vec![Error::InvalidClassMember]),
            })
            .collect_results()
    }
}

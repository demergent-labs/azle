use cdk_framework::{act::node::candid::service::Method, traits::CollectIterResults};
use swc_ecma_ast::{ClassDecl, ClassMember};

use crate::{ts_ast::SourceMapped, Error};

use self::errors::InvalidClassMember;

pub mod errors;
mod to_service_method;

impl SourceMapped<'_, ClassDecl> {
    pub fn build_service_methods(&self) -> Result<Vec<Method>, Vec<Error>> {
        self.class
            .body
            .iter()
            .map(|member| self.class_member_to_service_method(member))
            .collect_results()
    }

    fn class_member_to_service_method(
        &self,
        class_member: &ClassMember,
    ) -> Result<Method, Vec<Error>> {
        match class_member {
            ClassMember::ClassProp(class_prop) => {
                let class_prop_with_source_map = self.spawn(class_prop);

                class_prop_with_source_map.to_service_method()
            }
            _ => Err(vec![InvalidClassMember::from_class_decl(
                self,
                class_member,
            )
            .into()]),
        }
    }
}

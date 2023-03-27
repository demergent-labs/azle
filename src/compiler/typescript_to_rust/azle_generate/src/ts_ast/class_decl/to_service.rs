use cdk_framework::act::node::candid::{service::Method, Service};
use swc_ecma_ast::{ClassDecl, ClassMember};

use crate::ts_ast::{source_map::SourceMapped, GetName};

use super::vm_value_conversions::{
    from_vm_value, list_from_vm_value, list_to_vm_value, to_vm_value,
};

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

    fn build_service_methods(&self) -> Vec<Method> {
        self.class
            .body
            .iter()
            .fold(vec![], |acc, class_member| match class_member {
                ClassMember::ClassProp(class_prop) => {
                    let class_prop_with_source_map = SourceMapped::new(class_prop, self.source_map);

                    let service_method_result = class_prop_with_source_map.to_service_method();

                    match service_method_result {
                        Ok(service_method) => vec![acc, vec![service_method]].concat(),
                        Err(e) => panic!(
                            "{}",
                            self.build_invalid_class_prop_error_message(class_prop, e)
                        ),
                    }
                }
                _ => panic!(
                    "{}",
                    self.build_invalid_class_member_error_message(class_member)
                ),
            })
    }
}

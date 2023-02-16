use cdk_framework::nodes::{ActExternalCanister, ActExternalCanisterMethod};
use swc_ecma_ast::{ClassDecl, ClassMember};

use crate::ts_ast::{source_map::SourceMapped, GetName};

impl SourceMapped<'_, ClassDecl> {
    pub fn to_act_external_canister(&self) -> ActExternalCanister {
        let methods = self.build_external_canister_methods();

        ActExternalCanister {
            name: self.ident.get_name().to_string(),
            methods,
        }
    }

    fn build_external_canister_methods(&self) -> Vec<ActExternalCanisterMethod> {
        if self.class.body.len() == 0 {
            panic!("external canister declarations must contain a constructor and at least one property")
        }

        self.class
            .body
            .iter()
            .fold(vec![], |mut acc, class_member| {
                if let ClassMember::ClassProp(class_prop) = class_member {
                    let mapped_class_prop = SourceMapped::new(class_prop, self.source_map);
                    let possible_canister_method =
                        mapped_class_prop.to_act_external_canister_method();
                    if let Some(canister_method) = possible_canister_method {
                        acc.push(canister_method);
                    }
                }
                // TODO: Handle other types of class members. Decide if we should
                // Error out, or give a warning, or what.
                acc
            })
    }
}

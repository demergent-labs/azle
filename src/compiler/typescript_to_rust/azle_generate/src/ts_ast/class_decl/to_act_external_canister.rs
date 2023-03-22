use cdk_framework::{
    act::node::{external_canister::Method, ExternalCanister},
    traits::ToIdent,
};
use quote::quote;
use swc_ecma_ast::{ClassDecl, ClassMember};

use crate::ts_ast::{source_map::SourceMapped, GetName};

impl SourceMapped<'_, ClassDecl> {
    pub fn to_act_external_canister(&self) -> ExternalCanister {
        let name = self.ident.get_name().to_string();
        let methods = self.build_external_canister_methods();

        ExternalCanister {
            name,
            methods,
            to_vm_value: |name| {
                let service_name = name.to_ident();

                quote! {
                    impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for #service_name {
                        fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                            Ok(context.eval(
                                format!(
                                    "new {}(Principal.fromText(\"{}\"))",
                                    stringify!(#service_name),
                                    self.0.principal.to_string()
                                )
                            ).unwrap())
                        }
                    }
                }
            },
            list_to_vm_value: |name| {
                let service_name = name.to_ident();

                quote! {
                    impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<#service_name> {
                        fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                            try_into_vm_value_generic_array(self, context)
                        }
                    }
                }
            },
            from_vm_value: |name| {
                let service_name = name.to_ident();

                quote! {
                    impl CdkActTryFromVmValue<#service_name, &mut boa_engine::Context> for boa_engine::JsValue {
                        fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<#service_name, CdkActTryFromVmValueError> {
                            let js_object = self.as_object().unwrap();
                            let canister_id_js_value = js_object.get("canisterId", context).unwrap();
                            let canister_id_js_object = canister_id_js_value.as_object().unwrap();
                            let canister_id_to_string_js_value = canister_id_js_object.get("toText", context).unwrap();
                            let canister_id_to_string_js_object = canister_id_to_string_js_value.as_object().unwrap();
                            let canister_id_string_js_value = canister_id_to_string_js_object.call(
                                &canister_id_js_value,
                                &[],
                                context
                            ).unwrap();
                            let canister_id_js_string = canister_id_string_js_value.to_string(context).unwrap();
                            let canister_id_string = canister_id_js_string.to_std_string_escaped();

                            Ok(#service_name::new(ic_cdk::export::Principal::from_str(&canister_id_string).unwrap()))
                        }
                    }
                }
            },
            list_from_vm_value: |name| {
                let service_name = name.to_ident();

                quote! {
                    impl CdkActTryFromVmValue<Vec<#service_name>, &mut boa_engine::Context> for boa_engine::JsValue {
                        fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<#service_name>, CdkActTryFromVmValueError> {
                            try_from_vm_value_generic_array(self, context)
                        }
                    }
                }
            },
        }
    }

    fn build_external_canister_methods(&self) -> Vec<Method> {
        self.class
            .body
            .iter()
            .fold(vec![], |acc, class_member| match class_member {
                ClassMember::ClassProp(class_prop) => {
                    let class_prop_with_source_map = SourceMapped::new(class_prop, self.source_map);

                    let canister_method_result =
                        class_prop_with_source_map.to_act_external_canister_method();

                    match canister_method_result {
                        Ok(canister_method) => vec![acc, vec![canister_method]].concat(),
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

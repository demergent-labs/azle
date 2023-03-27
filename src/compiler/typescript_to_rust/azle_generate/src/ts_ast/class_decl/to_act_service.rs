use cdk_framework::{
    act::node::candid::{service::Method, Service},
    traits::ToIdent,
};
use quote::quote;
use swc_ecma_ast::{ClassDecl, ClassMember};

use crate::ts_ast::{source_map::SourceMapped, GetName};

impl SourceMapped<'_, ClassDecl> {
    pub fn to_act_service(&self) -> Service {
        let name = self.ident.get_name().to_string();
        let methods = self.build_service_methods();

        Service {
            name,
            methods,
            to_vm_value: |name| {
                let service_name = name.to_ident();

                quote! {
                    impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for #service_name {
                        fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                            Ok(_azle_unwrap_boa_result(context.eval(
                                format!(
                                    "new {}(Principal.fromText(\"{}\"))",
                                    stringify!(#service_name),
                                    self.0.principal.to_string()
                                )
                            ), context))
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
                            let canister_id_js_value = _azle_unwrap_boa_result(js_object.get("canisterId", context), context);
                            let canister_id_js_object = canister_id_js_value.as_object().unwrap();
                            let canister_id_to_string_js_value = _azle_unwrap_boa_result(canister_id_js_object.get("toText", context), context);
                            let canister_id_to_string_js_object = canister_id_to_string_js_value.as_object().unwrap();
                            let canister_id_string_js_value = _azle_unwrap_boa_result(canister_id_to_string_js_object.call(
                                &canister_id_js_value,
                                &[],
                                context
                            ), context);
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

    fn build_service_methods(&self) -> Vec<Method> {
        self.class
            .body
            .iter()
            .fold(vec![], |acc, class_member| match class_member {
                ClassMember::ClassProp(class_prop) => {
                    let class_prop_with_source_map = SourceMapped::new(class_prop, self.source_map);

                    let service_method_result = class_prop_with_source_map.to_act_service_method();

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

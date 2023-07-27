pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for () {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(boa_engine::JsValue::Null)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for bool {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for String {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue>
            for candid::Empty
        {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Err(CdkActTryIntoVmValueError(
                    "Empty cannot be converted into JsValue".to_string(),
                ))
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue>
            for candid::Reserved
        {
            fn try_into_vm_value(
                self,
                _: &mut boa_engine::Context,
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(boa_engine::JsValue::Null)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue>
            for candid::Func
        {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(boa_engine::object::builtins::JsArray::from_iter(
                    [
                        self.principal.try_into_vm_value(context)?,
                        self.method.into(),
                    ],
                    context,
                )
                .into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue>
            for candid::Principal
        {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                let exports_js_value =
                    context.eval(boa_engine::Source::from_bytes("exports"))?;

                let exports_js_object = exports_js_value
                    .as_object()
                    .ok_or_else(|| "TypeError: 'exports' is not an object")?;

                let principal_class_js_value = exports_js_object.get("Principal", context)?;
                let principal_class_js_object = principal_class_js_value
                    .as_object()
                    .ok_or_else(|| "ReferenceError: Principal is not defined")?;

                let from_text_js_value = principal_class_js_object.get("fromText", context)?;
                let from_text_js_object = from_text_js_value
                    .as_object()
                    .ok_or_else(|| "TypeError: Principal.fromText is not a function")?;

                let principal_js_value = from_text_js_object.call(
                    &principal_class_js_value,
                    &[self.to_text().into()],
                    context,
                )?;

                Ok(principal_js_value)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue>
            for ic_cdk_timers::TimerId
        {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                let timer_id_as_u64 = self.data().as_ffi();
                Ok(boa_engine::JsValue::BigInt(timer_id_as_u64.into()))
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue>
            for ic_cdk::api::stable::StableMemoryError
        {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                match self {
                    ic_cdk::api::stable::StableMemoryError::OutOfMemory => {
                        Ok(boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "OutOfMemory",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into())
                    }
                    ic_cdk::api::stable::StableMemoryError::OutOfBounds => {
                        Ok(boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "OutOfBounds",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into())
                    }
                }
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue>
            for ic_stable_structures::btreemap::InsertError
        {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                match self {
                    ic_stable_structures::btreemap::InsertError::KeyTooLarge { given, max } => {
                        let given_js_value = given.try_into_vm_value(context)?;
                        let max_js_value = max.try_into_vm_value(context)?;

                        let key_too_large_object =
                            boa_engine::object::ObjectInitializer::new(context)
                                .property(
                                    "given",
                                    given_js_value,
                                    boa_engine::property::Attribute::all(),
                                )
                                .property(
                                    "max",
                                    max_js_value,
                                    boa_engine::property::Attribute::all(),
                                )
                                .build();

                        Ok(boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "KeyTooLarge",
                                key_too_large_object,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into())
                    }
                    ic_stable_structures::btreemap::InsertError::ValueTooLarge { given, max } => {
                        let given_js_value = given.try_into_vm_value(context)?;
                        let max_js_value = max.try_into_vm_value(context)?;

                        let value_too_large_object =
                            boa_engine::object::ObjectInitializer::new(context)
                                .property(
                                    "given",
                                    given_js_value,
                                    boa_engine::property::Attribute::all(),
                                )
                                .property(
                                    "max",
                                    max_js_value,
                                    boa_engine::property::Attribute::all(),
                                )
                                .build();

                        Ok(boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "ValueTooLarge",
                                value_too_large_object,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into())
                    }
                }
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue>
            for ic_cdk::api::call::RejectionCode
        {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                match self {
                    ic_cdk::api::call::RejectionCode::NoError => {
                        Ok(boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "NoError",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into())
                    }
                    ic_cdk::api::call::RejectionCode::SysFatal => {
                        Ok(boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "SysFatal",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into())
                    }
                    ic_cdk::api::call::RejectionCode::SysTransient => {
                        Ok(boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "SysTransient",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into())
                    }
                    ic_cdk::api::call::RejectionCode::DestinationInvalid => {
                        Ok(boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "DestinationInvalid",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into())
                    }
                    ic_cdk::api::call::RejectionCode::CanisterReject => {
                        Ok(boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "CanisterReject",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into())
                    }
                    ic_cdk::api::call::RejectionCode::CanisterError => {
                        Ok(boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "CanisterError",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into())
                    }
                    ic_cdk::api::call::RejectionCode::Unknown => {
                        Ok(boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "Unknown",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into())
                    }
                }
            }
        }
    }
}

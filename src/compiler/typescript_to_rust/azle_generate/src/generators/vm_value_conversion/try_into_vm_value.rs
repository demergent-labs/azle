pub fn generate_try_into_vm_value_impls() -> proc_macro2::TokenStream {
    quote::quote! {
        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for () {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(boa_engine::JsValue::Null)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for bool {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for String {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::export::candid::Empty {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                panic!("Empty cannot be converted into JsValue");
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::export::candid::Reserved {
            fn try_into_vm_value(self, _: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(boa_engine::JsValue::Null)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::export::candid::Func {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(boa_engine::object::builtins::JsArray::from_iter([
                    self.principal.try_into_vm_value(context).unwrap(),
                    self.method.into()
                ], context).into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::export::Principal {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                let exports_js_value = _azle_handle_boa_result(context.eval("exports"), context);
                let exports_js_object = exports_js_value.as_object().unwrap();

                let principal_class_js_value = exports_js_object.get("Principal", context).unwrap();
                let principal_class_js_object = principal_class_js_value.as_object().unwrap();

                let from_text_js_value = principal_class_js_object.get("fromText", context).unwrap();
                let from_text_js_object = from_text_js_value.as_object().unwrap();

                let principal_js_value = _azle_handle_boa_result(from_text_js_object.call(&principal_class_js_value, &[self.to_text().into()], context), context);

                Ok(principal_js_value)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::api::stable::StableMemoryError {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
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

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::api::call::RejectionCode {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
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

        // Number types

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for f64 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for f32 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::export::candid::Int {
            fn try_into_vm_value(self, _: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(boa_engine::JsValue::BigInt(boa_engine::bigint::JsBigInt::new(self.0)))
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for i128 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(boa_engine::bigint::JsBigInt::new(self).into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for i64 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(boa_engine::JsValue::BigInt(self.into()))
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for i32 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for i16 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for i8 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.into())
            }
        }

        // TODO a non-string conversion might be better
        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::export::candid::Nat {
            fn try_into_vm_value(self, _: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(boa_engine::JsValue::BigInt(boa_engine::bigint::JsBigInt::from_string(&self.0.to_string()).unwrap()))
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for u128 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(boa_engine::bigint::JsBigInt::new(self).into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for u64 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(boa_engine::JsValue::BigInt(self.into()))
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for usize {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for u32 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for u16 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for u8 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.into())
            }
        }

        // Generic types

        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for (T,)
        where
            T : for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>,
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.0.try_into_vm_value(context).unwrap())
            }
        }

        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Box<T>
        where
            T : for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>,
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok((*self).try_into_vm_value(context).unwrap())
            }
        }

        // TODO I wonder if we will have some problems with Option because of the type bound??
        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Option<T>
        where
            T: for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                match self {
                    Some(value) => Ok(value.try_into_vm_value(context).unwrap()),
                    None => Ok(boa_engine::JsValue::Null)
                }
            }
        }

        impl<T, K> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Result<T, K>
        where
            T: for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>,
            K: for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                match self {
                    Ok(ok) => {
                        let ok_js_value = ok.try_into_vm_value(context).unwrap();

                        let result_js_object = boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "ok",
                                ok_js_value,
                                boa_engine::property::Attribute::all()
                            )
                            .build();

                        let result_js_value = result_js_object.into();

                        Ok(result_js_value)
                    },
                    Err(err) => {
                        let err_js_value = err.try_into_vm_value(context).unwrap();

                        let result_js_object = boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "err",
                                err_js_value,
                                boa_engine::property::Attribute::all()
                            )
                            .build();

                        let result_js_value = result_js_object.into();

                        Ok(result_js_value)
                    }
                }
            }
        }

        // Vec types
        trait AzleTryIntoVec {}

        impl AzleTryIntoVec for () {}

        impl AzleTryIntoVec for bool {}

        impl AzleTryIntoVec for String {}

        impl AzleTryIntoVec for ic_cdk::export::candid::Empty {}

        impl AzleTryIntoVec for ic_cdk::export::candid::Reserved {}

        impl AzleTryIntoVec for ic_cdk::export::candid::Func {}

        impl AzleTryIntoVec for ic_cdk::export::Principal {}

        impl AzleTryIntoVec for ic_cdk::api::call::RejectionCode {}

        // TODO add all number types
        // TODO need to figure out how to convert number Vecs to Vec<u8>
        // TODO need to abstract the number vecs out

        impl AzleTryIntoVec for f64 {}

        impl AzleTryIntoVec for f32 {}

        impl AzleTryIntoVec for ic_cdk::export::candid::Int {}

        impl AzleTryIntoVec for i128 {}

        impl AzleTryIntoVec for i64 {}

        impl AzleTryIntoVec for i32 {}

        impl AzleTryIntoVec for i16 {}

        impl AzleTryIntoVec for i8 {}

        impl AzleTryIntoVec for ic_cdk::export::candid::Nat {}

        impl AzleTryIntoVec for u128 {}

        impl AzleTryIntoVec for u64 {}

        impl AzleTryIntoVec for usize {}

        impl AzleTryIntoVec for u32 {}

        impl AzleTryIntoVec for u16 {}

        impl<T> AzleTryIntoVec for Option<T> {}

        impl<T> AzleTryIntoVec for Vec<T> {}

        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<T>
        where
            T: AzleTryIntoVec,
            T: for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                try_into_vm_value_generic_array(self, context)
            }
        }

        // TODO in the future maybe the other number types can be optimized like this (optimization implementation is currently in boa From trait impl)
        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<u8> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.into())
            }
        }

        fn try_into_vm_value_generic_array<T>(generic_array: Vec<T>, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError>
        where
            T:  for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>
        {
            let js_values = generic_array.into_iter().map(|item| item.try_into_vm_value(context).unwrap()).collect::<Vec<boa_engine::JsValue>>();
            Ok(boa_engine::object::builtins::JsArray::from_iter(js_values, context).into())
        }
    }
}

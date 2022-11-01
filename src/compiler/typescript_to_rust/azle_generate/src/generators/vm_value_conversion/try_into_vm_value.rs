pub fn generate_try_into_vm_value_impls() -> proc_macro2::TokenStream {
    quote::quote! {
        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for () {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::Null
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for bool {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for String {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::export::candid::Empty {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                panic!("Empty cannot be converted into JsValue");
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::export::candid::Reserved {
            fn try_into_vm_value(self, _: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::Null
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::export::candid::Func {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::object::JsArray::from_iter([
                    self.principal.try_into_vm_value(context),
                    self.method.into()
                ], context).into()
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::export::Principal {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                let exports_js_value = handle_boa_result(context.eval("exports"), context);
                let exports_js_object = exports_js_value.as_object().unwrap();

                let principal_class_js_value = exports_js_object.get("Principal", context).unwrap();
                let principal_class_js_object = principal_class_js_value.as_object().unwrap();

                let from_text_js_value = principal_class_js_object.get("fromText", context).unwrap();
                let from_text_js_object = from_text_js_value.as_object().unwrap();

                let principal_js_value = handle_boa_result(from_text_js_object.call(&principal_class_js_value, &[self.to_text().into()], context), context);

                principal_js_value
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::api::stable::StableMemoryError {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                match self {
                    ic_cdk::api::stable::StableMemoryError::OutOfMemory => {
                        boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "OutOfMemory",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into()
                    }
                    ic_cdk::api::stable::StableMemoryError::OutOfBounds => {
                        boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "OutOfBounds",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into()
                    }
                }
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::api::call::RejectionCode {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                match self {
                    ic_cdk::api::call::RejectionCode::NoError => {
                        boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "NoError",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into()
                    }
                    ic_cdk::api::call::RejectionCode::SysFatal => {
                        boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "SysFatal",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into()
                    }
                    ic_cdk::api::call::RejectionCode::SysTransient => {
                        boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "SysTransient",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into()
                    }
                    ic_cdk::api::call::RejectionCode::DestinationInvalid => {
                        boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "DestinationInvalid",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into()
                    }
                    ic_cdk::api::call::RejectionCode::CanisterReject => {
                        boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "CanisterReject",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into()
                    }
                    ic_cdk::api::call::RejectionCode::CanisterError => {
                        boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "CanisterError",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into()
                    }
                    ic_cdk::api::call::RejectionCode::Unknown => {
                        boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "Unknown",
                                boa_engine::JsValue::Null,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into()
                    }
                }
            }
        }

        // Number types

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for f64 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for f32 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::export::candid::Int {
            fn try_into_vm_value(self, _: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::BigInt(boa_engine::bigint::JsBigInt::new(self.0))
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for i128 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::bigint::JsBigInt::new(self).into()
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for i64 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::BigInt(self.into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for i32 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for i16 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for i8 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        // TODO a non-string conversion might be better
        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for ic_cdk::export::candid::Nat {
            fn try_into_vm_value(self, _: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::BigInt(boa_engine::bigint::JsBigInt::from_string(&self.0.to_string()).unwrap())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for u128 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::bigint::JsBigInt::new(self).into()
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for u64 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::BigInt(self.into())
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for usize {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for u32 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for u16 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for u8 {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        // Generic types

        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for (T,)
        where
            T : for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>,
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.0.try_into_vm_value(context)
            }
        }

        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Box<T>
        where
            T : for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>,
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                (*self).try_into_vm_value(context)
            }
        }

        // TODO I wonder if we will have some problems with Option because of the type bound??
        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Option<T>
        where
            T: for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                match self {
                    Some(value) => value.try_into_vm_value(context),
                    None => boa_engine::JsValue::Null
                }
            }
        }

        impl<T, K> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Result<T, K>
        where
            T: for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>,
            K: for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                match self {
                    Ok(ok) => {
                        let ok_js_value = ok.try_into_vm_value(context);

                        let result_js_object = boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "ok",
                                ok_js_value,
                                boa_engine::property::Attribute::all()
                            )
                            .build();

                        let result_js_value = result_js_object.into();

                        result_js_value
                    },
                    Err(err) => {
                        let err_js_value = err.try_into_vm_value(context);

                        let result_js_object = boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "err",
                                err_js_value,
                                boa_engine::property::Attribute::all()
                            )
                            .build();

                        let result_js_value = result_js_object.into();

                        result_js_value
                    }
                }
            }
        }

        // Vec types

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<()> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<bool> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<String> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<ic_cdk::export::candid::Empty> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<ic_cdk::export::candid::Reserved> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<ic_cdk::export::candid::Func> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<ic_cdk::export::Principal> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<ic_cdk::api::call::RejectionCode> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        // TODO add all number types
        // TODO need to figure out how to convert number Vecs to Vec<u8>
        // TODO need to abstract the number vecs out

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<f64> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<f32> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<ic_cdk::export::candid::Int> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<i128> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<i64> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<i32> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<i16> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<i8> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<ic_cdk::export::candid::Nat> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<u128> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<u64> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<usize> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<u32> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<u16> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        // TODO in the future maybe the other number types can be optimized like this (optimization implementation is currently in boa From trait impl)
        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<u8> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        // TODO consider creating a macro that can derive Vec of Vec multiple levels deep for any type
        impl CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<Vec<u8>> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<Box<T>>
        where
            T: for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Vec<Option<T>>
        where
            T: for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                try_into_vm_value_generic_array(self, context)
            }
        }

        fn try_into_vm_value_generic_array<T>(generic_array: Vec<T>, context: &mut boa_engine::Context) -> boa_engine::JsValue
        where
            T:  for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>
        {
            let js_values = generic_array.into_iter().map(|item| item.try_into_vm_value(context)).collect::<Vec<boa_engine::JsValue>>();
            boa_engine::object::JsArray::from_iter(js_values, context).into()
        }
    }
}

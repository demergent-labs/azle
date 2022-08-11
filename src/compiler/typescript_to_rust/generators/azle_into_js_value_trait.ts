import { Rust } from '../../../types';

export function generateAzleIntoJsValueTrait(): Rust {
    return /* rust */ `
        pub trait AzleIntoJsValue {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue;
        }

        // Basic types

        impl AzleIntoJsValue for () {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::Null
            }
        }

        impl AzleIntoJsValue for bool {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl AzleIntoJsValue for String {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl AzleIntoJsValue for ic_cdk::export::candid::Empty {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                panic!("Empty cannot be converted into JsValue");
            }
        }

        impl AzleIntoJsValue for ic_cdk::export::candid::Reserved {
            fn azle_into_js_value(self, _: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::Null
            }
        }

        impl AzleIntoJsValue for ic_cdk::export::candid::Func {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::object::JsArray::from_iter([
                    self.principal.azle_into_js_value(context),
                    self.method.into()
                ], context).into()
            }
        }

        impl AzleIntoJsValue for ic_cdk::export::Principal {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                let exports_js_value = context.eval("exports").unwrap();
                let exports_js_object = exports_js_value.as_object().unwrap();

                let principal_class_js_value = exports_js_object.get("Principal", context).unwrap();
                let principal_class_js_object = principal_class_js_value.as_object().unwrap();

                let from_text_js_value = principal_class_js_object.get("fromText", context).unwrap();
                let from_text_js_object = from_text_js_value.as_object().unwrap();

                let principal_js_value = from_text_js_object.call(&principal_class_js_value, &[self.to_text().into()], context).unwrap();

                principal_js_value
            }
        }

        impl AzleIntoJsValue for ic_cdk::api::stable::StableMemoryError {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
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

        impl AzleIntoJsValue for ic_cdk::api::call::RejectionCode {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
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

        impl AzleIntoJsValue for f64 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl AzleIntoJsValue for f32 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl AzleIntoJsValue for ic_cdk::export::candid::Int {
            fn azle_into_js_value(self, _: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::BigInt(boa_engine::bigint::JsBigInt::new(self.0))
            }
        }

        impl AzleIntoJsValue for i128 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::bigint::JsBigInt::new(self).into()
            }
        }

        impl AzleIntoJsValue for i64 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::BigInt(self.into())
            }
        }

        impl AzleIntoJsValue for i32 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl AzleIntoJsValue for i16 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl AzleIntoJsValue for i8 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        // TODO a non-string conversion might be better
        impl AzleIntoJsValue for ic_cdk::export::candid::Nat {
            fn azle_into_js_value(self, _: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::BigInt(boa_engine::bigint::JsBigInt::from_string(&self.0.to_string()).unwrap())
            }
        }

        impl AzleIntoJsValue for u128 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::bigint::JsBigInt::new(self).into()
            }
        }

        impl AzleIntoJsValue for u64 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::BigInt(self.into())
            }
        }

        impl AzleIntoJsValue for usize {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl AzleIntoJsValue for u32 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl AzleIntoJsValue for u16 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl AzleIntoJsValue for u8 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        // Generic types

        impl<T: AzleIntoJsValue> AzleIntoJsValue for Box<T> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                (*self).azle_into_js_value(context)
            }
        }

        // TODO I wonder if we will have some problems with Option because of the type bound??
        impl<T: AzleIntoJsValue> AzleIntoJsValue for Option<T> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                match self {
                    Some(value) => value.azle_into_js_value(context),
                    None => boa_engine::JsValue::Null
                }
            }
        }

        impl<T: AzleIntoJsValue, K: AzleIntoJsValue> AzleIntoJsValue for Result<T, K> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                match self {
                    Ok(ok) => {
                        let ok_js_value = ok.azle_into_js_value(context);

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
                        let err_js_value = err.azle_into_js_value(context);

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

        impl AzleIntoJsValue for Vec<()> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<bool> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<String> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<ic_cdk::export::candid::Empty> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<ic_cdk::export::candid::Reserved> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<ic_cdk::export::candid::Func> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<ic_cdk::export::Principal> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<ic_cdk::api::call::RejectionCode> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        // TODO add all number types
        // TODO need to figure out how to convert number Vecs to Vec<u8>
        // TODO need to abstract the number vecs out

        impl AzleIntoJsValue for Vec<f64> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<f32> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<ic_cdk::export::candid::Int> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<i128> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<i64> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<i32> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<i16> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<i8> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<ic_cdk::export::candid::Nat> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<u128> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<u64> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<usize> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<u32> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl AzleIntoJsValue for Vec<u16> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        // TODO in the future maybe the other number types can be optimized like this (optimization implementation is currently in boa From trait impl)
        impl AzleIntoJsValue for Vec<u8> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into()
            }
        }

        impl AzleIntoJsValue for Vec<Vec<u8>> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl<T: AzleIntoJsValue> AzleIntoJsValue for Vec<Box<T>> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }

        impl<T: AzleIntoJsValue> AzleIntoJsValue for Vec<Option<T>> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                azle_into_js_value_generic_array(self, context)
            }
        }


        fn azle_into_js_value_generic_array<T: AzleIntoJsValue>(generic_array: Vec<T>, context: &mut boa_engine::Context) -> boa_engine::JsValue {
            let js_values = generic_array.into_iter().map(|item| item.azle_into_js_value(context)).collect::<Vec<boa_engine::JsValue>>();
            boa_engine::object::JsArray::from_iter(js_values, context).into()
        }
    `;
}

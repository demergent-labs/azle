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
                    self.principal.to_text().into(),
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

        // TODO we want to see if the other number types can also be optimized like this
        impl AzleIntoJsValue for Vec<u8> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                let self_len = self.len();

                let array_buffer = boa_engine::builtins::array_buffer::ArrayBuffer {
                    array_buffer_data: Some(self),
                    array_buffer_byte_length: self_len,
                    array_buffer_detach_key: boa_engine::JsValue::undefined()
                };            

                let uint8_array_js_object = boa_engine::object::JsObject::from_proto_and_data(
                    context.intrinsics().constructors().typed_uint8_array().prototype(),
                    boa_engine::object::ObjectData {
                        kind: boa_engine::object::ObjectKind::ArrayBuffer(array_buffer),
                        internal_methods: &boa_engine::object::internal_methods::ORDINARY_INTERNAL_METHODS
                    }
                );

                // TODO this is how a I get an array_buffer, and then I think I can do similarly for all other TypedArrays I might need
                // TODO leaving this here in case we decide to do TypedArrays for any other Vec number types
                // let array_buffer_js_object = boa_engine::object::JsObject::from_proto_and_data(
                //     context.intrinsics().constructors().array_buffer().prototype(),
                //     boa_engine::object::ObjectData {
                //         kind: boa_engine::object::ObjectKind::ArrayBuffer(array_buffer),
                //         internal_methods: &boa_engine::object::internal_methods::ORDINARY_INTERNAL_METHODS
                //     }
                // );

                uint8_array_js_object.into()
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

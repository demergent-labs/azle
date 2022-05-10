import { Rust } from '../../../types';

export function generateAzleIntoJsValueTrait(): Rust {
    return `
        pub trait AzleIntoJsValue {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue;
        }

        impl AzleIntoJsValue for () {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::Undefined
            }
        }

        impl AzleIntoJsValue for bool {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into_js_value(context)
            }
        }

        impl AzleIntoJsValue for f64 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into_js_value(context)
            }
        }

        impl AzleIntoJsValue for f32 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into_js_value(context)
            }
        }

        impl AzleIntoJsValue for i128 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into_js_value(context)
            }
        }

        // TODO I think I need to force this to a bigint always
        impl AzleIntoJsValue for i64 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                // self.into_js_value(context)
                boa_engine::JsValue::BigInt(self.into())
            }
        }

        impl AzleIntoJsValue for i32 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into_js_value(context)
            }
        }

        impl AzleIntoJsValue for i16 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into_js_value(context)
            }
        }

        impl AzleIntoJsValue for i8 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into_js_value(context)
            }
        }

        impl AzleIntoJsValue for String {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into_js_value(context)
            }
        }

        impl AzleIntoJsValue for u128 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into_js_value(context)
            }
        }

        // TODO I think I need to force this to a bigint always
        impl AzleIntoJsValue for u64 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                // self.into_js_value(context)
                boa_engine::JsValue::BigInt(self.into())
            }
        }

        impl AzleIntoJsValue for u32 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into_js_value(context)
            }
        }

        impl AzleIntoJsValue for u16 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into_js_value(context)
            }
        }

        impl AzleIntoJsValue for u8 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into_js_value(context)
            }
        }

        impl<T: AzleIntoJsValue> AzleIntoJsValue for Box<T> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                (*self).azle_into_js_value(context)
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

        // TODO I wonder if we will have some problems with Option because of the type bound??
        impl<T: AzleIntoJsValue> AzleIntoJsValue for Option<T> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                match self {
                    Some(value) => value.azle_into_js_value(context),
                    None => boa_engine::JsValue::Null
                }
            }
        }

        // TODO consider that each type might need its own explicit impl for Vec
        // TODO the derive attribute might need to be used in that case
        // TODO I wonder if we will have some problems with Vec because of the type bound??
        impl<T: AzleIntoJsValue> AzleIntoJsValue for Vec<T> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                // TODO this is extremely unoptimized I think
                // TODO I think I can get rid of the collect here which might help
                // TODO I just need to not pass the context into azle_into_js_value, I don't think it's necessary
                // TODO once we stop relying on into_js_value in boa
                let js_values = self.into_iter().map(|item| item.azle_into_js_value(context)).collect::<Vec<boa_engine::JsValue>>();
                // let js_values = self.into_iter().map(|item| item.azle_into_js_value(context));

                boa_engine::object::JsArray::from_iter(js_values, context).into()
            }
        }

        // TODO I would like to create typed arrays for u8 etc in addition to the impl for Vec<T>
        // impl IntoJsValue for Vec<u8> {
        //     fn into_js_value(self, context: &mut Context) -> JsValue {
        //         let js_values = self.into_iter().map(|item| item.into_js_value(context)).collect::<Vec<JsValue>>();

        //         Array::create_array_from_list(
        //             js_values,
        //             context
        //         ).into()
        //     }
        // }

        impl AzleIntoJsValue for ic_cdk::export::Principal {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.to_text().into_js_value(context)
            }
        }

        impl AzleIntoJsValue for ic_cdk::export::candid::Int {
            fn azle_into_js_value(self, _: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::BigInt(boa_engine::bigint::JsBigInt::new(self.0))
            }
        }

        // TODO a non-string conversion might be better
        impl AzleIntoJsValue for ic_cdk::export::candid::Nat {
            fn azle_into_js_value(self, _: &mut boa_engine::Context) -> boa_engine::JsValue {
                boa_engine::JsValue::BigInt(boa_engine::bigint::JsBigInt::from_string(&self.0.to_string()).unwrap())
            }
        }
    `;
}
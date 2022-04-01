import { Rust } from '../../../types';

export function generateAzleIntoJsValueTrait(): Rust {
    return `
        pub trait AzleIntoJsValue {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue;
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

        impl AzleIntoJsValue for i64 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into_js_value(context)
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

        // TODO I wonder if we will have some problems with Option because of the type bound??
        impl<T: AzleIntoJsValue> AzleIntoJsValue for Option<T> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                match self {
                    Some(value) => value.azle_into_js_value(context),
                    None => boa_engine::JsValue::Null
                }
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

        impl AzleIntoJsValue for u64 {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                self.into_js_value(context)
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

        // TODO consider that each type might need its own explicit impl for Vec
        // TODO the derive attribute might need to be used in that case
        // TODO I wonder if we will have some problems with Vec because of the type bound??
        impl<T: AzleIntoJsValue> AzleIntoJsValue for Vec<T> {
            fn azle_into_js_value(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                // TODO fix the boa pull request with this implementation
                let js_values = self.into_iter().map(|item| item.azle_into_js_value(context)).collect::<Vec<boa_engine::JsValue>>();

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
pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        trait AzleTryIntoVec {}

        impl AzleTryIntoVec for () {}

        impl AzleTryIntoVec for bool {}

        impl AzleTryIntoVec for String {}

        impl AzleTryIntoVec for ic_cdk::export::candid::Empty {}

        impl AzleTryIntoVec for ic_cdk::export::candid::Reserved {}

        impl AzleTryIntoVec for ic_cdk::export::candid::Func {}

        impl AzleTryIntoVec for ic_cdk::export::Principal {}

        impl AzleTryIntoVec for ic_cdk_timers::TimerId {}

        impl AzleTryIntoVec for ic_cdk::api::call::RejectionCode {}

        // TODO add all number types
        // TODO need to figure out how to convert number Vecs to Vec<u8>
        // TODO need to abstract the number vecs out

        impl AzleTryIntoVec for f64 {}

        impl AzleTryIntoVec for _CdkFloat64 {}

        impl AzleTryIntoVec for f32 {}

        impl AzleTryIntoVec for _CdkFloat32 {}

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

        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for Vec<T>
        where
            T: AzleTryIntoVec,
            T: for<'a, 'b> CdkActTryIntoVmValue<&'a mut boa_engine::Context<'b>, boa_engine::JsValue>
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                try_into_vm_value_generic_array(self, context)
            }
        }

        // TODO in the future maybe the other number types can be optimized like this
        impl CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for Vec<u8> {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                let js_array_buffer = boa_engine::object::builtins::JsArrayBuffer::from_byte_block(self, context).unwrap();
                let js_uint8_array = boa_engine::object::builtins::JsUint8Array::from_array_buffer(js_array_buffer, context).unwrap();

                Ok(js_uint8_array.into())
            }
        }

        fn try_into_vm_value_generic_array<T>(generic_array: Vec<T>, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError>
        where
            T: for<'a, 'b> CdkActTryIntoVmValue<&'a mut boa_engine::Context<'b>, boa_engine::JsValue>
        {
            let js_values = generic_array.into_iter().map(|item| item.try_into_vm_value(context).unwrap()).collect::<Vec<boa_engine::JsValue>>();
            Ok(boa_engine::object::builtins::JsArray::from_iter(js_values, context).into())
        }
    }
}

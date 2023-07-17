pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        trait AzleTryFromVec {}

        impl AzleTryFromVec for () {}
        impl AzleTryFromVec for bool {}
        impl AzleTryFromVec for String {}
        impl AzleTryFromVec for ic_cdk::export::candid::Empty {}
        impl AzleTryFromVec for ic_cdk::export::candid::Reserved {}
        impl AzleTryFromVec for ic_cdk::export::candid::Func {}
        impl AzleTryFromVec for ic_cdk::export::Principal {}
        impl AzleTryFromVec for ic_cdk_timers::TimerId {}
        impl AzleTryFromVec for f64 {}
        impl AzleTryFromVec for _CdkFloat64 {}
        impl AzleTryFromVec for f32 {}
        impl AzleTryFromVec for _CdkFloat32 {}
        impl AzleTryFromVec for ic_cdk::export::candid::Int {}
        impl AzleTryFromVec for i128 {}
        impl AzleTryFromVec for i64 {}
        impl AzleTryFromVec for i32 {}
        impl AzleTryFromVec for i16 {}
        impl AzleTryFromVec for i8 {}
        impl AzleTryFromVec for ic_cdk::export::candid::Nat {}
        impl AzleTryFromVec for u128 {}
        impl AzleTryFromVec for u64 {}
        impl AzleTryFromVec for u32 {}
        impl AzleTryFromVec for u16 {}
        impl<T> AzleTryFromVec for Option<T> {}
        impl<T> AzleTryFromVec for Vec<T> {}

        impl<T> CdkActTryFromVmValue<Vec<T>, &mut boa_engine::Context<'_>> for boa_engine::JsValue
        where
            T: AzleTryFromVec,
            boa_engine::JsValue:
                for<'a, 'b> CdkActTryFromVmValue<T, &'a mut boa_engine::Context<'b>>,
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<Vec<T>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array::<T>(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<u8>, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<Vec<u8>, CdkActTryFromVmValueError> {
                // TODO maybe a better way to do this, I had some issues: https://github.com/boa-dev/boa/blob/main/boa_examples/src/bin/jsarraybuffer.rs#L24-L35
                // Ok(boa_engine::object::builtins::JsArrayBuffer::from_object(self.as_object().unwrap().clone()).unwrap().take().unwrap())

                Ok(self
                        .as_object()
                        .ok_or_else(|| "TypeError: Value is not of type 'blob'")?
                        .borrow()
                        .as_typed_array()
                        .ok_or_else(|| "[TypeError: Value is not of type 'blob'] {\n  [cause]: TypeError: Value is not an instance of 'TypedArray'\n}")?
                        .viewed_array_buffer()
                        .ok_or_else(|| "[TypeError: Value is not of type 'blob'] {\n  [cause]: InternalError: TypedArray does not have an associated DataView\n}")?
                        .borrow()
                        .as_array_buffer()
                        .ok_or_else(|| "[TypeError: Value is not of type 'blob'] {\n  [cause]: InternalError: TypedArray does not have an associated ArrayBuffer\n}")?
                        .array_buffer_data
                        .clone()
                        .ok_or_else(|| "[TypeError: Value is not of type 'blob'] {\n  [cause]: InternalError: No data in ArrayBuffer\n}")?
                )
            }
        }

        // TODO this seems like such a messy and inefficient way to do it
        fn try_from_vm_value_generic_array<T>(
            js_value: boa_engine::JsValue,
            context: &mut boa_engine::Context,
        ) -> Result<Vec<T>, CdkActTryFromVmValueError>
        where
            boa_engine::JsValue:
                for<'a, 'b> CdkActTryFromVmValue<T, &'a mut boa_engine::Context<'b>>,
        {
            let js_object = js_value
                .as_object()
                .ok_or_else(|| "TypeError: Value is not of type 'Vec'")?;

            if !js_object.is_array() {
                return Err(CdkActTryFromVmValueError(
                    "TypeError: Value is not of type 'Vec'".to_string(),
                ));
            }

            let mut index: usize = 0;
            let mut result = vec![];

            loop {
                let js_value = js_object
                    .get(index, context)
                    .map_err(|err| err.to_string())?;

                if js_value.is_undefined() {
                    break;
                }

                result.push(js_value.try_from_vm_value(context)?);
                index += 1;
            }

            Ok(result)
        }
    }
}

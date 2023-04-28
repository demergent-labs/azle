pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn stable64_read(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let offset: u64 = aargs
                .get(0)
                .unwrap()
                .clone()
                .try_from_vm_value(&mut *context)
                .unwrap();
            let length: u64 = aargs
                .get(1)
                .unwrap()
                .clone()
                .try_from_vm_value(&mut *context)
                .unwrap();

            let mut buf: Vec<u8> = vec![0; length as usize];
            ic_cdk::api::stable::stable64_read(offset, &mut buf);
            Ok(buf.to_vec().try_into_vm_value(context).unwrap())
        }
    }
}

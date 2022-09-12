pub fn generate_get_top_level_call_frame_fn() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_get_top_level_call_frame(call_frame: &boa_engine::vm::call_frame::CallFrame) -> boa_engine::vm::call_frame::CallFrame {
            if let Some(prev_call_frame) = &call_frame.prev {
                return _azle_get_top_level_call_frame(&prev_call_frame);
            }
            else {
                return call_frame.clone();
            }
        }
    }
}

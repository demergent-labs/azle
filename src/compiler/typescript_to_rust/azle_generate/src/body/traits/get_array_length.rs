pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        trait GetArrayLength {
            fn get_length(
                &self,
                context: &mut boa_engine::Context,
            ) -> Result<usize, boa_engine::JsError>;
        }

        impl GetArrayLength for boa_engine::JsObject {
            fn get_length(
                &self,
                context: &mut boa_engine::Context,
            ) -> Result<usize, boa_engine::JsError> {
                if !self.is_array() {
                    return Err("TypeError: Expected 'Array', given 'Object'".to_js_error(None));
                }

                let length_f64: f64 =
                    self.get("length", context)?.as_number().ok_or_else(|| {
                        "TypeError: property 'length' is not a number".to_js_error(None)
                    })?;

                if length_f64.fract() != 0.0 {
                    return Err("TypeError: Array length must be a whole number".to_js_error(None));
                }

                if length_f64 < 0.0 || length_f64 > (usize::MAX as f64) {
                    return Err("RangeError: Array length out of range".to_js_error(None));
                }

                Ok(length_f64 as usize)
            }
        }
    }
}

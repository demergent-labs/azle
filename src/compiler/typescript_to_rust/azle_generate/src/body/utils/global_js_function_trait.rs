use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        pub trait GlobalFunction {
            fn call_global_function(
                &mut self,
                function_name: &str,
                args: &[boa_engine::JsValue]
            ) -> boa_engine::JsValue;
        }

        impl GlobalFunction for boa_engine::Context {
            fn call_global_function(
                &mut self,
                function_name: &str,
                args: &[boa_engine::JsValue]
            ) -> boa_engine::JsValue {
                let exports_js_value = self.eval("exports").or_trap(self);
                let exports_js_object = exports_js_value.as_object().unwrap();
                let function_js_value = exports_js_object.get(function_name, self).unwrap();
                let function_js_object = function_js_value.as_object().unwrap().clone();
                function_js_object.call(&boa_engine::JsValue::Null, args, self).or_trap(self)
            }
        }
    }
}

use proc_macro2::TokenStream;
use quote::quote;

mod object;
mod string;

pub fn generate() -> TokenStream {
    let js_object_to_string_function_definition = object::generate();
    let string_to_std_string_function_definition = string::generate();

    quote! {
        trait ToStdString {
            fn to_std_string(
                self,
                nesting_level: usize,
                context: &mut boa_engine::Context,
            ) -> Result<String, boa_engine::JsError>;
        }

        impl ToStdString for boa_engine::JsError {
            fn to_std_string(
                self,
                nesting_level: usize,
                context: &mut boa_engine::Context,
            ) -> Result<String, boa_engine::JsError> {
                self.to_opaque(context)
                    .to_std_string(nesting_level, context)
            }
        }

        impl ToStdString for boa_engine::JsValue {
            fn to_std_string(
                self,
                nesting_level: usize,
                context: &mut boa_engine::Context,
            ) -> Result<String, boa_engine::JsError> {
                Ok(match &self {
                    boa_engine::JsValue::BigInt(bigint) => {
                        format!("{}n", bigint.to_string()).yellow()
                    }
                    boa_engine::JsValue::Boolean(boolean) => boolean.to_string().yellow(),
                    boa_engine::JsValue::Integer(integer) => integer.to_string().yellow(),
                    boa_engine::JsValue::Null => "null".bold(),
                    boa_engine::JsValue::Object(object) => {
                        js_object_to_string(&self, &object, nesting_level, context)?
                    }
                    boa_engine::JsValue::Rational(rational) => {
                        rational.to_std_string(0, context)?.yellow()
                    }
                    boa_engine::JsValue::String(string) => {
                        string_to_std_string(string, nesting_level)?
                    }
                    boa_engine::JsValue::Symbol(symbol) => symbol.to_string().green(),
                    boa_engine::JsValue::Undefined => "undefined".dim(),
                })
            }
        }

        impl ToStdString for f64 {
            fn to_std_string(
                self,
                nesting_level: usize,
                context: &mut boa_engine::Context,
            ) -> Result<String, boa_engine::JsError> {
                if self.is_infinite() {
                    return Ok(if self.is_sign_negative() {
                        "-Infinity".to_string()
                    } else {
                        "Infinity".to_string()
                    });
                }

                Ok(self.to_string())
            }
        }

        #js_object_to_string_function_definition
        #string_to_std_string_function_definition
    }
}

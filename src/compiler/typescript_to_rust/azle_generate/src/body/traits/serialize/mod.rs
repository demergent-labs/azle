use proc_macro2::TokenStream;
use quote::quote;

mod object;
mod string;

pub fn generate() -> TokenStream {
    let serialize_js_object_function_definition = object::generate();
    let serialize_string_function_definition = string::generate();

    quote! {
        trait Serialize {
            fn serialize(
                self,
                nesting_level: usize,
                context: &mut boa_engine::Context,
            ) -> Result<String, boa_engine::JsError>;
        }

        impl Serialize for boa_engine::JsError {
            fn serialize(
                self,
                nesting_level: usize,
                context: &mut boa_engine::Context,
            ) -> Result<String, boa_engine::JsError> {
                self.to_opaque(context).serialize(nesting_level, context)
            }
        }

        impl Serialize for boa_engine::JsValue {
            fn serialize(
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
                        serialize_js_object(&self, &object, nesting_level, context)?
                    }
                    boa_engine::JsValue::Rational(rational) => {
                        rational.serialize(0, context)?.yellow()
                    }
                    boa_engine::JsValue::String(string) => serialize_string(string, nesting_level)?,
                    boa_engine::JsValue::Symbol(symbol) => symbol.to_string().green(),
                    boa_engine::JsValue::Undefined => "undefined".dim(),
                })
            }
        }

        impl Serialize for f64 {
            fn serialize(
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

        #serialize_js_object_function_definition
        #serialize_string_function_definition
    }
}

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
                colorize: bool,
                context: &mut boa_engine::Context,
            ) -> Result<String, boa_engine::JsError>;
        }

        impl Serialize for boa_engine::JsError {
            fn serialize(
                self,
                nesting_level: usize,
                colorize: bool,
                context: &mut boa_engine::Context,
            ) -> Result<String, boa_engine::JsError> {
                self.to_opaque(context)
                    .serialize(nesting_level, colorize, context)
            }
        }

        impl Serialize for boa_engine::JsValue {
            fn serialize(
                self,
                nesting_level: usize,
                colorize: bool,
                context: &mut boa_engine::Context,
            ) -> Result<String, boa_engine::JsError> {
                Ok(match &self {
                    boa_engine::JsValue::BigInt(bigint) => {
                        let output = format!("{}n", bigint.to_string());

                        if colorize {
                            output.yellow()
                        } else {
                            output
                        }
                    }
                    boa_engine::JsValue::Boolean(boolean) => {
                        let output = boolean.to_string();

                        if colorize {
                            output.yellow()
                        } else {
                            output
                        }
                    }
                    boa_engine::JsValue::Integer(integer) => {
                        let output = integer.to_string();

                        if colorize {
                            output.yellow()
                        } else {
                            output
                        }
                    }
                    boa_engine::JsValue::Null => {
                        let output = "null";

                        if colorize {
                            output.bold()
                        } else {
                            output.to_string()
                        }
                    }
                    boa_engine::JsValue::Object(object) => {
                        serialize_js_object(&self, &object, nesting_level, colorize, context)?
                    }
                    boa_engine::JsValue::Rational(rational) => {
                        rational.serialize(0, colorize, context)?
                    }
                    boa_engine::JsValue::String(string) => {
                        serialize_string(string, nesting_level, colorize)?
                    }
                    boa_engine::JsValue::Symbol(symbol) => {
                        let output = symbol.to_string();

                        if colorize {
                            output.green()
                        } else {
                            output
                        }
                    }
                    boa_engine::JsValue::Undefined => {
                        let output = "undefined";

                        if colorize {
                            output.dim()
                        } else {
                            output.to_string()
                        }
                    }
                })
            }
        }

        impl Serialize for f64 {
            fn serialize(
                self,
                nesting_level: usize,
                colorize: bool,
                context: &mut boa_engine::Context,
            ) -> Result<String, boa_engine::JsError> {
                let output = if self.is_infinite() {
                    if self.is_sign_negative() {
                        "-Infinity".to_string()
                    } else {
                        "Infinity".to_string()
                    }
                } else {
                    self.to_string()
                };

                Ok(if colorize { output.yellow() } else { output })
            }
        }

        #serialize_js_object_function_definition
        #serialize_string_function_definition
    }
}

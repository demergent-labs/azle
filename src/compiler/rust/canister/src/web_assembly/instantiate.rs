use wasmedge_quickjs::{AsObject, Context, JsFn, JsValue};

use crate::WASM_INSTANCES;

// TODO technically this should return a promise because that the official API
pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let instance_uuid = if let JsValue::String(js_string) = argv.get(0).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        let wasm_bytes = if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(1).unwrap() {
            js_array_buffer.to_vec()
        } else {
            panic!("conversion from JsValue to JsArrayBuffer failed")
        };

        let engine = wasmi::Engine::default();
        let module = wasmi::Module::new(&engine, &mut &wasm_bytes[..]).unwrap();

        let mut linker = <wasmi::Linker<()>>::new(&engine);

        let mut store = wasmi::Store::new(&engine, ());

        let instance = linker
            .instantiate(&mut store, &module)
            .unwrap()
            .start(&mut store)
            .unwrap();

        let mut exports_js_object = context.new_object();

        for (index, export) in instance.exports(&mut store).enumerate() {
            let export_name = export.name();

            exports_js_object.set(
                export_name,
                context
                    .wrap_function(
                        export_name,
                        move |context: &mut Context, this_val: JsValue, argv: &[JsValue]| {
                            let this_val_js_object = this_val.to_obj().unwrap();

                            let instance_uuid = this_val_js_object
                                .get("instanceUuid")
                                .to_string()
                                .unwrap()
                                .to_string();

                            let export_name_string = this_val_js_object
                                .get("exportName")
                                .to_string()
                                .unwrap()
                                .to_string();

                            // TODO dealing with the host import types seems the hardest now
                            // This global static variable is required to gain access to the Wasm
                            // instance from within this native function
                            WASM_INSTANCES.with(|instances| {
                                let mut instances = instances.borrow_mut();

                                // TODO removing probably isn't the best way to get ownership
                                let (instance, mut the_store) =
                                    instances.remove(&instance_uuid).unwrap();

                                let export = instance
                                    .get_export(&mut the_store, &export_name_string)
                                    .unwrap();

                                let func = export.into_func().unwrap();

                                let func_ty = func.ty(&mut the_store);
                                let func_param_types = func_ty.params();

                                // TODO check all of these conversions, they are bad
                                let params: Vec<wasmi::Value> = func_param_types
                                    .iter()
                                    .enumerate()
                                    .map(|(index, param_value_type)| match param_value_type {
                                        wasmi::core::ValueType::I32 => {
                                            let param_i32 = if let JsValue::Int(int) =
                                                argv.get(index).unwrap()
                                            {
                                                int
                                            } else {
                                                panic!("conversion from JsValue to i32 failed")
                                            };

                                            wasmi::Value::I32(*param_i32)
                                        }
                                        wasmi::core::ValueType::I64 => {
                                            let param_i64 = if let JsValue::Int(int) =
                                                argv.get(index).unwrap()
                                            {
                                                int
                                            } else {
                                                panic!("conversion from JsValue to i32 failed")
                                            };

                                            wasmi::Value::I64(*param_i64 as i64)
                                        }
                                        wasmi::core::ValueType::F32 => {
                                            let param_f64 = if let JsValue::Float(float) =
                                                argv.get(index).unwrap()
                                            {
                                                float
                                            } else {
                                                panic!("conversion from JsValue to i32 failed")
                                            };

                                            wasmi::Value::F32((*param_f64 as u32).into())
                                        }
                                        wasmi::core::ValueType::F64 => {
                                            let param_f64 = if let JsValue::Float(float) =
                                                argv.get(index).unwrap()
                                            {
                                                float
                                            } else {
                                                panic!("conversion from JsValue to i32 failed")
                                            };

                                            wasmi::Value::F64((*param_f64 as u64).into())
                                        }
                                        wasmi::core::ValueType::FuncRef => todo!(),
                                        wasmi::core::ValueType::ExternRef => todo!(),
                                    })
                                    .collect();

                                // TODO Can a Wasm exported function return more than one result?
                                // TODO I am confused on this point, for now I'll just return
                                // TODO the first result
                                let func_result_types = func_ty.results();

                                let mut buf: Vec<wasmi::Value> =
                                    vec![
                                        wasmi::Value::default(wasmi::core::ValueType::I32);
                                        func_result_types.len()
                                    ];

                                func.call(&mut the_store, &params, &mut buf[..]).unwrap();

                                // TODO this probably is not the most elegant way to get ownership
                                instances.insert(instance_uuid, (instance, the_store));

                                // TODO check all of these conversions, they are bad
                                match func_result_types.get(0).unwrap() {
                                    wasmi::core::ValueType::I32 => {
                                        JsValue::Int(buf.get(0).unwrap().i32().unwrap())
                                    }
                                    wasmi::core::ValueType::I64 => {
                                        JsValue::Int(buf.get(0).unwrap().i64().unwrap() as i32)
                                        // TODO should this not be a bigint?
                                    }
                                    wasmi::core::ValueType::F32 => {
                                        let u32: u32 = buf.get(0).unwrap().f32().unwrap().into();

                                        JsValue::Float(u32 as f64)
                                    }
                                    wasmi::core::ValueType::F64 => {
                                        let u64: u64 = buf.get(0).unwrap().f64().unwrap().into();

                                        JsValue::Float(u64 as f64)
                                    }
                                    wasmi::core::ValueType::FuncRef => todo!(),
                                    wasmi::core::ValueType::ExternRef => todo!(),
                                }
                            })
                        },
                    )
                    .into(),
            );
        }

        WASM_INSTANCES.with(|instances| {
            let mut instances = instances.borrow_mut();

            instances.insert(instance_uuid, (instance, store));
        });

        let mut instance_js_object = context.new_object();

        instance_js_object.set("exports", exports_js_object.into());

        let mut instantiated_source_js_object = context.new_object();

        instantiated_source_js_object.set("instance", instance_js_object.into());

        instantiated_source_js_object.into()
    }
}

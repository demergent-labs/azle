import { writeFileSync } from 'fs';
import { getCanisterName, unwrap } from './utils';
import { join } from 'path';

azle();

function azle() {
    console.log('it ran');

    // TODO compile the typescript code to JS and put in appropriate location
    // TODO create the lib.rs file and put it in the appropriate location

    const mainJs = `
        
    `;

    const libRs = `
        use quickjs_wasm_rs::{JSContextRef, JSValueRef, JSValue, to_qjs_value};
        use std::convert::TryFrom;
        use std::cell::RefCell;

        const MAIN_JS: &[u8] = include_bytes!("main.js");

        thread_local! {
            static CONTEXT: RefCell<Option<JSContextRef>> = RefCell::new(None);
        }

        #[ic_cdk_macros::init]
        fn init() {
            unsafe { ic_wasi_polyfill::init(&[], &[]); }

            let context = JSContextRef::default();

            context.eval_global("exports.js", "globalThis.exports = {};").unwrap();
            context.eval_global("main.js", std::str::from_utf8(MAIN_JS).unwrap()).unwrap();

            CONTEXT.with(|ctx| {
                let mut ctx = ctx.borrow_mut();
                *ctx = Some(context);
            });
        }

        #[ic_cdk_macros::post_upgrade]
        fn post_upgrade() {
            unsafe { ic_wasi_polyfill::init(&[], &[]); }

            let context = JSContextRef::default();

            context.eval_global("exports.js", "globalThis.exports = {}").unwrap();
            context.eval_global("main.js", std::str::from_utf8(MAIN_JS).unwrap()).unwrap();

            CONTEXT.with(|ctx| {
                let mut ctx = ctx.borrow_mut();
                *ctx = Some(context);
            });
        }

        // TODO this part is kind of simple
        // TODO we need to gather all of the functions and put them here
        // TODO and then we just do the exact some thing for each function
        #[ic_cdk_macros::query(manual_reply = true)]
        fn test() {
            execute_js("test");
        }

        fn execute_js(function_name: &str) {
            CONTEXT.with(|context| {
                let mut context = context.borrow_mut();
                let context = context.as_mut().unwrap();

                let global = context.global_object().unwrap();
                let exports = global.get_property("exports").unwrap();
                let method = exports.get_property(function_name).unwrap();

                let candid_args = ic_cdk::api::call::arg_data_raw();

                let candid_args_js_value: JSValue = candid_args.into();
                let candid_args_js_value_ref = to_qjs_value(&context, &candid_args_js_value).unwrap();

                // TODO I am not sure what the first parameter to call is supposed to be
                let result = method.call(&method, &[candid_args_js_value_ref]).unwrap();

                ic_cdk::api::call::reply_raw(result.as_bytes().unwrap());
            });
        }
    `;

    const canisterName = unwrap(getCanisterName(process.argv));
    const canisterPath = join('.azle', canisterName);
    const libRsPath = join(canisterPath, 'src', 'src', 'lib.rs');

    writeFileSync(libRsPath, libRs);
}

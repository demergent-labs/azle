import { generateIcObject } from '../ic_object';
import {
    JavaScript,
    Rust
} from '../../../../types';

export function generateCanisterMethodInit(js: JavaScript): Rust {
    const icObject: Rust = generateIcObject();

    return `
        #[ic_cdk_macros::init]
        fn init() {
            BOA_CONTEXT.with(|boa_context_ref_cell| {
                let mut boa_context = boa_context_ref_cell.borrow_mut();

                ${icObject}

                boa_context.register_global_property(
                    "ic",
                    ic,
                    boa_engine::property::Attribute::all()
                );

                boa_context.eval(format!(
                    "let exports = {{}}; {compiled_js}",
                    compiled_js = r#"${js}"#
                )).unwrap();
            });
        }
    `;
}
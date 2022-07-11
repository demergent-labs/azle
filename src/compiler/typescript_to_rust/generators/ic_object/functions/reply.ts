import { CanisterMethodFunctionInfo, Rust } from '../../../../../types';

export function generateIcObjectFunctionReply(
    canisterMethodFunctionInfos: CanisterMethodFunctionInfo[]
): Rust {
    return /* rust */ `
        fn _azle_ic_reply(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let top_level_call_frame = get_top_level_call_frame(&_context.vm.frame.as_ref().unwrap());
            let function_name_sym = top_level_call_frame.code.name;
            let function_name = &_context.interner.resolve_expect(function_name_sym.clone());

            match &function_name[..] {
                ${canisterMethodFunctionInfos
                    .filter(
                        (canisterMethodFunctionInfo) =>
                            canisterMethodFunctionInfo.manual === true
                    )
                    .map((canisterMethodFunctionInfo) => {
                        return `
                        "${canisterMethodFunctionInfo.name}" => {
                            let reply_value: ${canisterMethodFunctionInfo.rustReturnType} = _aargs.get(0).unwrap().clone().azle_try_from_js_value(_context).unwrap();
                            Ok(ic_cdk::api::call::reply((reply_value,)).azle_into_js_value(_context))
                        }
                    `;
                    })
                    .join(',\n')}
                _ => panic!("This cannot happen")
            }
        }
    `;
}

import { CanisterMethodFunctionInfo, Rust } from '../../../../../types';
import { getRustTypeNameFromTypeNode } from '../../../ast_utilities/miscellaneous';
import { SourceFile } from 'typescript';

export function generateIcObjectFunctionArgData(
    sourceFiles: readonly SourceFile[],
    canisterMethodFunctionInfos: CanisterMethodFunctionInfo[]
): Rust {
    return /* rust */ `
        fn _azle_ic_arg_data(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let top_level_call_frame = get_top_level_call_frame(&_context.vm.frame.as_ref().unwrap());
            let function_name_sym = top_level_call_frame.code.name;
            let function_name = &_context.interner.resolve_expect(function_name_sym.clone());

            match &function_name[..] {
                ${canisterMethodFunctionInfos
                    .map((info) => {
                        return `
                        "${info.name}" => {
                            let arg_data: (${info.params
                                .map((param) =>
                                    getRustTypeNameFromTypeNode(
                                        sourceFiles,
                                        param.typeNode
                                    )
                                )
                                .join(', ')}${
                            info.params.length > 0 ? ',' : ''
                        }) = ic_cdk::api::call::arg_data();

                            let arg_js_values = vec![${info.params
                                .map(
                                    (_, i) =>
                                        `arg_data.${i}.azle_into_js_value(_context)`
                                )
                                .join(', ')}];

                            let arg_data_js_array = boa_engine::object::JsArray::from_iter(arg_js_values, _context);
                            Ok(arg_data_js_array.into())
                        }
                    `;
                    })
                    .join(',\n')}
                _ => panic!("This cannot happen")
            }
        }
    `;
}

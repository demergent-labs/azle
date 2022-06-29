import { Rust, RustParam } from '../../../../types';

export function generateCallFunctionBody(
    methodName: string,
    params: RustParam[]
): Rust {
    const cycles_removed_param_names = params.filter((param) => param.paramName !== 'cycles').map((param) => param.paramName);
    const cycles_param: {
        paramName: string;
        paramType: string;
    } | undefined = params.find((param) => param.paramName === 'cycles');
    const cycles = cycles_param === undefined ? '' : ',cycles';
    const call_function_name = cycles_param === undefined ? `call` : cycles_param.paramType === 'u64' ? `call_with_payment` : `call_with_payment128`;

    return `
        ic_cdk::api::call::${call_function_name}(
            canister_id_principal,
            "${methodName}",
            (${cycles_removed_param_names.join(', ')}${cycles_removed_param_names.length === 1 ? ',' : ''})
            ${cycles}
        ).await
    `;
}

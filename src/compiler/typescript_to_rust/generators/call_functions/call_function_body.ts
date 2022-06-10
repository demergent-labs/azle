import { Rust } from '../../../../types';
import * as tsc from 'typescript';

export function generateCallFunctionBody(
    functionReturnType: string,
    methodName: string,
    paramNames: string[]
): Rust {
    return `
        ic_cdk::api::call::call(
            canister_id_principal,
            "${methodName}",
            (${paramNames.join(', ')}${paramNames.length === 1 ? ',' : ''})
        ).await
    `;
}
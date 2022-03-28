import { Rust } from '../../../../types';
import * as tsc from 'typescript';

export function generateCallFunctionBody(
    functionReturnType: string,
    methodName: string,
    paramNames: string[]
): Rust {
    return `
        let call_result: Result<(${functionReturnType}, ()), _> = ic_cdk::api::call::call(
            ic_cdk::export::Principal::from_text(canisterId).unwrap(),
            "${methodName}",
            (${paramNames.join(', ')})
        ).await;

        call_result.unwrap().0
    `;
}
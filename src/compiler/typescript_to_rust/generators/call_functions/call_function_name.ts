import * as tsc from 'typescript';

export function generateCallFunctionName(
    methodSignature: tsc.MethodSignature,
    typeAliasName: string
): {
    methodName: string;
    callFunctionName: string;
    callWithPaymentFunctionName: string;
    callWithPayment128FunctionName: string;
    notifyFunctionName: string;
    notifyWithPayment128FunctionName: string;
} {
    if (methodSignature.name.kind !== tsc.SyntaxKind.Identifier) {
        throw new Error(`Method signature must be an identifier`);
    }

    return {
        methodName: methodSignature.name.escapedText.toString(),
        callFunctionName: `_azle_call_${typeAliasName}_${methodSignature.name.escapedText.toString()}`,
        callWithPaymentFunctionName: `_azle_call_with_payment_${typeAliasName}_${methodSignature.name.escapedText.toString()}`,
        callWithPayment128FunctionName: `_azle_call_with_payment128_${typeAliasName}_${methodSignature.name.escapedText.toString()}`,
        notifyFunctionName: `_azle_notify_${typeAliasName}_${methodSignature.name.escapedText.toString()}`,
        notifyWithPayment128FunctionName: `_azle_notify_with_payment128_${typeAliasName}_${methodSignature.name.escapedText.toString()}`
    };
}

import { Rust } from '../../../../types';
import * as tsc from 'typescript';

export function generateCallFunctionName(
    methodSignature: tsc.MethodSignature,
    typeAliasName: string
): {
    methodName: string;
    callFunctionName: string;
} {
    if (methodSignature.name.kind !== tsc.SyntaxKind.Identifier) {
        throw new Error(`Method signature must be an identifier`);
    }

    return {
        methodName: methodSignature.name.escapedText.toString(),
        callFunctionName: `_azle_${typeAliasName}_${methodSignature.name.escapedText.toString()}`
    };
}
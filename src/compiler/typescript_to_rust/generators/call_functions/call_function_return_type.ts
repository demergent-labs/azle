import { Rust } from '../../../../types';
import * as tsc from 'typescript';
import { getRustTypeNameFromTypeNode } from '../../ast_utilities/miscellaneous';

export function generateCallFunctionReturnType(methodSignature: tsc.MethodSignature): Rust {
    if (methodSignature.type === undefined) {
        return '';
    }

    const rustTypeName = getRustTypeNameFromTypeNode(methodSignature.type);

    return rustTypeName;
}
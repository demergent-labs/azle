import { Rust } from '../../../../types';
import * as tsc from 'typescript';
import { getRustTypeNameFromTypeNode } from '../../ast_utilities/miscellaneous';

export function generateCallFunctionReturnType(
    sourceFiles: readonly tsc.SourceFile[],
    methodSignature: tsc.MethodSignature
): Rust {
    if (methodSignature.type === undefined) {
        return '';
    }

    const rustTypeName = getRustTypeNameFromTypeNode(
        sourceFiles,
        methodSignature.type
    );

    return rustTypeName;
}

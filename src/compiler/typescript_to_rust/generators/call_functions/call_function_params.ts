import { RustParam } from '../../../../types';
import * as tsc from 'typescript';
import {
    getParamName,
    getRustTypeNameFromTypeNode
} from '../../ast_utilities/miscellaneous';

export function generateCallFunctionParams(
    sourceFiles: readonly tsc.SourceFile[],
    methodSignature: tsc.MethodSignature
): RustParam[] {
    return methodSignature.parameters.map((parameterDeclaration) => {
        const paramName = getParamName(parameterDeclaration);

        if (parameterDeclaration.type === undefined) {
            throw new Error(`Parameter must have a type`);
        }

        const paramType = getRustTypeNameFromTypeNode(
            sourceFiles,
            parameterDeclaration.type
        );

        return {
            paramName,
            paramType
        };
    });
}

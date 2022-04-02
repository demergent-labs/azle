import { Rust } from '../../../../types';
import * as tsc from 'typescript';
import {
    getParamName,
    getRustTypeNameFromTypeNode
} from '../../ast_utilities/miscellaneous';

export function generateCallFunctionParams(methodSignature: tsc.MethodSignature): {
    paramName: string;
    paramType: string;
}[] {
    return methodSignature.parameters.map((parameterDeclaration) => {
        const paramName = getParamName(parameterDeclaration);

        if (parameterDeclaration.type === undefined) {
            throw new Error(`Parameter must have a type`);
        }

        const paramType = getRustTypeNameFromTypeNode(parameterDeclaration.type);

        return {
            paramName,
            paramType
        };
    });
}
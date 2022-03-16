import * as tsc from 'typescript';
import { Candid } from '../../../types';
import { getFunctionName } from '../ast_utilities/canister_methods';
import { generateCandidTypeName } from './type_name';

export function generateCandidService(
    queryMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    updateMethodFunctionDeclarations: tsc.FunctionDeclaration[]
): Candid {
    const queryServiceMethodDefinitions = generateCandidServiceMethodDefinitions(
        queryMethodFunctionDeclarations,
        true
    ).join('');

    const updateServiceMethodDefinitions = generateCandidServiceMethodDefinitions(
        updateMethodFunctionDeclarations,
        false
    );

    return `service: {${queryServiceMethodDefinitions}${updateServiceMethodDefinitions}\n}`;
}

function generateCandidServiceMethodDefinitions(
    functionDeclarations: tsc.FunctionDeclaration[],
    query: boolean
): Candid[] {
    return functionDeclarations.map((functionDeclaration) => {
        const functionName = getFunctionName(functionDeclaration);
        const functionParameterTypeNames = generateCandidServiceMethodParameterTypeNames(functionDeclaration);
        const returnTypeName = generateCandidServiceMethodReturnTypeName(functionDeclaration);

        return `\n    ${functionName} : (${functionParameterTypeNames.join(', ')}) -> (${returnTypeName})${query === true ? ' query' : ''};`;
    });
}

function generateCandidServiceMethodParameterTypeNames(functionDeclaration: tsc.FunctionDeclaration): Candid[] {
    return functionDeclaration
        .parameters
        .map((parameter) => {
            if (parameter.type === null || parameter.type === undefined) {
                throw new Error(`There must be a static type for parameter: ${parameter}`);
            }

            return generateCandidTypeName(parameter.type);
        });
}

function generateCandidServiceMethodReturnTypeName(functionDeclaration: tsc.FunctionDeclaration): Candid {
    if (functionDeclaration.type === undefined) {
        throw new Error(`There must be a return type for function declaration: ${JSON.stringify(functionDeclaration, null, 2)}`);
    }

    if (functionDeclaration.type.kind === tsc.SyntaxKind.TypeReference) {
        const typeReferenceNode = functionDeclaration.type as tsc.TypeReferenceNode;

        if (typeReferenceNode.typeArguments === undefined) {
            throw new Error(`There must be a return type argument for type reference node: ${JSON.stringify(typeReferenceNode, null, 2)}`);
        }

        return generateCandidTypeName(typeReferenceNode.typeArguments[0]);
    }

    throw new Error(`Return type must be Query or Update for function declaration: ${JSON.stringify(functionDeclaration, null, 2)}`);
}
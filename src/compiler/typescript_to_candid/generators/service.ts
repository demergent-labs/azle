import { getFunctionName } from '../ast_utilities/miscellaneous';
import { generateCandidTypeInfo } from './type_info';
import {
    Candid,
    CandidTypeInfo
} from '../../../types';
import * as tsc from 'typescript';

export function generateCandidService(
    sourceFiles: readonly tsc.SourceFile[],
    queryMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    updateMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    candidRecordNames: string[]
): {
    serviceWithDummyMethod: Candid,
    service: Candid
} {
    const queryServiceMethodDefinitions = generateCandidServiceMethodDefinitions(
        sourceFiles,
        queryMethodFunctionDeclarations,
        true
    ).join('');

    const updateServiceMethodDefinitions = generateCandidServiceMethodDefinitions(
        sourceFiles,
        updateMethodFunctionDeclarations,
        false
    ).join('');

    const dummyMethodDefinition = generateDummyMethodDefinition(candidRecordNames);

    return {
        serviceWithDummyMethod: `service: {${queryServiceMethodDefinitions}${updateServiceMethodDefinitions}    \n${dummyMethodDefinition}\n}`,
        service: `service: {${queryServiceMethodDefinitions}${updateServiceMethodDefinitions}\n}`
    };
}

function generateCandidServiceMethodDefinitions(
    sourceFiles: readonly tsc.SourceFile[],
    functionDeclarations: tsc.FunctionDeclaration[],
    query: boolean
): Candid[] {
    return functionDeclarations.map((functionDeclaration) => {
        const functionName = getFunctionName(functionDeclaration);
        const functionParameterTypeNames = generateCandidServiceMethodParameterTypeNames(
            sourceFiles,
            functionDeclaration
        );
        const returnTypeName = generateCandidServiceMethodReturnTypeName(
            sourceFiles,
            functionDeclaration
        );

        return `\n    "${functionName}": (${functionParameterTypeNames.map((candidTypeName) => candidTypeName.text).join(', ')}) -> (${returnTypeName.text})${query === true ? ' query' : ''};`;
    });
}

function generateCandidServiceMethodParameterTypeNames(
    sourceFiles: readonly tsc.SourceFile[],
    functionDeclaration: tsc.FunctionDeclaration
): CandidTypeInfo[] {
    return functionDeclaration
        .parameters
        .map((parameter) => {
            if (parameter.type === null || parameter.type === undefined) {
                throw new Error(`There must be a static type for parameter: ${parameter}`);
            }

            return generateCandidTypeInfo(
                sourceFiles,
                parameter.type
            );
        });
}

function generateCandidServiceMethodReturnTypeName(
    sourceFiles: readonly tsc.SourceFile[],
    functionDeclaration: tsc.FunctionDeclaration
): CandidTypeInfo {
    if (functionDeclaration.type === undefined) {
        throw new Error(`There must be a return type for function declaration: ${JSON.stringify(functionDeclaration, null, 2)}`);
    }

    if (functionDeclaration.type.kind === tsc.SyntaxKind.TypeReference) {
        const typeReferenceNode = functionDeclaration.type as tsc.TypeReferenceNode;

        if (typeReferenceNode.typeArguments === undefined) {
            throw new Error(`There must be a return type argument for type reference node: ${JSON.stringify(typeReferenceNode, null, 2)}`);
        }

        return generateCandidTypeInfo(
            sourceFiles,
            typeReferenceNode.typeArguments[0]
        );
    }

    throw new Error(`Return type must be Query or Update for function declaration: ${JSON.stringify(functionDeclaration, null, 2)}`);
}

// TODO this is here to fix this bug: https://github.com/dfinity/candid/issues/330
function generateDummyMethodDefinition(candidRecordNames: string[]): Candid {
    return `"_azle_dummy_method": (${candidRecordNames.join(', ')}) -> ();`;
}
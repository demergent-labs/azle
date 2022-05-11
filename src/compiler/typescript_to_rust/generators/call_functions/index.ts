import { CallFunctionInfo } from '../../../../types';
import * as tsc from 'typescript';
import { getTypeAliasDeclarationsFromSourceFiles } from '../../../typescript_to_candid/ast_utilities/type_aliases';
import { generateCallFunctionName } from './call_function_name';
import { generateCallFunctionParams } from './call_function_params';
import { generateCallFunctionReturnType } from './call_function_return_type';
import { generateCallFunctionBody } from './call_function_body';

export function generateCallFunctions(sourceFiles: readonly tsc.SourceFile[]): CallFunctionInfo[] {
    const typeAliasDeclarations = getCanisterTypeAliasDeclarations(sourceFiles);

    return generateCallFunctionsFromTypeAliasDeclarations(typeAliasDeclarations);
}

function generateCallFunctionsFromTypeAliasDeclarations(typeAliasDeclarations: tsc.TypeAliasDeclaration[]): CallFunctionInfo[] {
    return typeAliasDeclarations.reduce((result: CallFunctionInfo[], typeAliasDeclaration) => {
        return [
            ...result,
            ...generateCallFunctionsFromTypeAliasDeclaration(typeAliasDeclaration)
        ];
    }, []);
}

function generateCallFunctionsFromTypeAliasDeclaration(typeAliasDeclaration: tsc.TypeAliasDeclaration): CallFunctionInfo[] {
    if (typeAliasDeclaration.type.kind !== tsc.SyntaxKind.TypeReference) {
        throw new Error('This cannot happen');
    }

    const typeRefenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

    if (typeRefenceNode.typeArguments === undefined) {
        throw new Error('This cannot happen');
    }

    const firstTypeArgument = typeRefenceNode.typeArguments[0];

    if (firstTypeArgument.kind !== tsc.SyntaxKind.TypeLiteral) {
        throw new Error('This cannot happen');
    }

    const typeLiteralNode = firstTypeArgument as tsc.TypeLiteralNode;

    return generateCallFunctionsFromTypeLiteralNode(
        typeLiteralNode,
        typeAliasDeclaration.name.escapedText.toString()
    );
}

function generateCallFunctionsFromTypeLiteralNode(
    typeLiteralNode: tsc.TypeLiteralNode,
    typeAliasName: string
): CallFunctionInfo[] {
    return typeLiteralNode.members.map((member) => {
        return generateCallFunctionFromTypeElement(
            member,
            typeAliasName
        );
    });
}

function generateCallFunctionFromTypeElement(
    typeElement: tsc.TypeElement,
    typeAliasName: string
): CallFunctionInfo {
    if (typeElement.kind !== tsc.SyntaxKind.MethodSignature) {
        throw new Error('Must use method signature syntax');
    }

    const methodSignature = typeElement as tsc.MethodSignature;

    const {
        methodName,
        callFunctionName
    } = generateCallFunctionName(
        methodSignature,
        typeAliasName
    );
    const functionParams = generateCallFunctionParams(methodSignature);
    const functionReturnType = generateCallFunctionReturnType(methodSignature);
    const functionBody = generateCallFunctionBody(
        functionReturnType,
        methodName,
        functionParams.map((param) => param.paramName)
    );

    return {
        functionName: callFunctionName,
        params: functionParams,
        text: `
            async fn ${callFunctionName}(canisterId: String${functionParams.length === 0 ? '' : ', '}${functionParams.map((param) => `${param.paramName}: ${param.paramType}`).join(', ')})${functionReturnType === '' ? '' : ` -> CallResult<(${functionReturnType},)>`} {
                ${functionBody}
            }
        `
    };
}

// TODO put this somewhere, like an AST utilities file. Also generalize it
export function getCanisterTypeAliasDeclarations(sourceFiles: readonly tsc.SourceFile[]): tsc.TypeAliasDeclaration[] {
    const typeAliasDeclarations = getTypeAliasDeclarationsFromSourceFiles(sourceFiles);

    return typeAliasDeclarations.filter((typeAliasDeclaration) => {
        if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.TypeReference) {
            const typeReferenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

            if (typeReferenceNode.typeName.kind === tsc.SyntaxKind.Identifier) {
                return typeReferenceNode.typeName.escapedText.toString() === 'Canister';
            }

            return false;
        }

        return false;
    });
}

// TODO put this somewhere, like an AST utilities file. Also generalize it
export function getStableTypeAliasDeclarations(sourceFiles: readonly tsc.SourceFile[]): tsc.TypeAliasDeclaration[] {
    const typeAliasDeclarations = getTypeAliasDeclarationsFromSourceFiles(sourceFiles);

    return typeAliasDeclarations.filter((typeAliasDeclaration) => {
        if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.TypeReference) {
            const typeReferenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

            if (typeReferenceNode.typeName.kind === tsc.SyntaxKind.Identifier) {
                return typeReferenceNode.typeName.escapedText.toString() === 'Stable';
            }

            return false;
        }

        return false;
    });
}

// TODO put this somewhere, like an AST utilities file. Also generalize it
export function getFuncTypeAliasDeclarations(sourceFiles: readonly tsc.SourceFile[]): tsc.TypeAliasDeclaration[] {
    const typeAliasDeclarations = getTypeAliasDeclarationsFromSourceFiles(sourceFiles);

    return typeAliasDeclarations.filter((typeAliasDeclaration) => {
        if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.TypeReference) {
            const typeReferenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

            if (typeReferenceNode.typeName.kind === tsc.SyntaxKind.Identifier) {
                return typeReferenceNode.typeName.escapedText.toString() === 'Func';
            }

            return false;
        }

        return false;
    });
}
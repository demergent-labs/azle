import * as tsc from 'typescript';
import { Candid } from '../../../types';
import { generateCandidTypeInfo } from './type_info';

export function generate_candid_funcs(
    sourceFiles: readonly tsc.SourceFile[],
    funcTypeAliasDeclarations: tsc.TypeAliasDeclaration[]
): {
    candid_funcs: Candid;
    candid_func_names: string[];
} {
    const candid_funcs = funcTypeAliasDeclarations.map((typeAliasDeclaration) => {
        const func_name = typeAliasDeclaration.name.escapedText.toString();

        const type_reference_node = typeAliasDeclaration.type as tsc.TypeReferenceNode;

        if (type_reference_node.typeArguments === undefined) {
            throw new Error('This cannot happen');
        }

        const first_argument = type_reference_node.typeArguments[0];

        if (first_argument.kind !== tsc.SyntaxKind.FunctionType) {
            throw new Error('This cannot happen');
        }

        const function_type_node = first_argument as tsc.FunctionTypeNode;

        const candid_func_params = generate_candid_func_params(
            sourceFiles,
            function_type_node
        );

        const candid_func_return_type = generate_candid_func_return_type(
            sourceFiles,
            function_type_node
        );

        return `type ${func_name} = func (${candid_func_params.join(', ')}) -> ${candid_func_return_type};`;
    }).join('\n');

    const candid_func_names = funcTypeAliasDeclarations.map((typeAliasDeclaration) => typeAliasDeclaration.name.escapedText.toString());

    return {
        candid_funcs,
        candid_func_names
    };
}

function generate_candid_func_params(
    sourceFiles: readonly tsc.SourceFile[],
    function_type_node: tsc.FunctionTypeNode
): Candid[] {
    return function_type_node.parameters.map((parameter) => {
        if (parameter.type === undefined) {
            throw new Error(`Parameter must have a type`);
        }

        const candid_type_info = generateCandidTypeInfo(
            sourceFiles,
            parameter.type
        );

        return candid_type_info.text;
    });
}

function generate_candid_func_return_type(
    sourceFiles: readonly tsc.SourceFile[],
    function_type_node: tsc.FunctionTypeNode
): Candid {
    if (function_type_node.type.kind !== tsc.SyntaxKind.TypeReference) {
        throw new Error(`Func return type must be Query, Update, or Oneway`);
    }

    const type_reference_node = function_type_node.type as tsc.TypeReferenceNode;

    if (type_reference_node.typeArguments === undefined) {
        throw new Error('This cannot happen');
    }

    const first_argument = type_reference_node.typeArguments[0];

    const candid_type_info = generateCandidTypeInfo(
        sourceFiles,
        first_argument
    );

    if (type_reference_node.typeName.kind !== tsc.SyntaxKind.Identifier) {
        throw new Error(`This cannot happen`);
    }

    const type_name = (type_reference_node.typeName as tsc.Identifier).escapedText.toString();

    const suffix = type_name === 'Query' ? ' query' : type_name === 'Oneway' ? ' oneway' : '';

    return `(${candid_type_info.text})${suffix}`;
}
import { CallFunctionInfo } from '../../../../types';
import * as tsc from 'typescript';
import { getTypeAliasDeclarationsFromSourceFiles } from '../../../typescript_to_candid/ast_utilities/type_aliases';
import { generateCallFunctionName } from './call_function_name';
import { generateCallFunctionParams } from './call_function_params';
import { generateCallFunctionReturnType } from './call_function_return_type';

export function generateCallFunctions(
    sourceFiles: readonly tsc.SourceFile[]
): CallFunctionInfo[] {
    const typeAliasDeclarations = getCanisterTypeAliasDeclarations(sourceFiles);

    return generateCallFunctionsFromTypeAliasDeclarations(
        sourceFiles,
        typeAliasDeclarations
    );
}

function generateCallFunctionsFromTypeAliasDeclarations(
    sourceFiles: readonly tsc.SourceFile[],
    typeAliasDeclarations: tsc.TypeAliasDeclaration[]
): CallFunctionInfo[] {
    return typeAliasDeclarations.reduce(
        (result: CallFunctionInfo[], typeAliasDeclaration) => {
            return [
                ...result,
                ...generateCallFunctionsFromTypeAliasDeclaration(
                    sourceFiles,
                    typeAliasDeclaration
                )
            ];
        },
        []
    );
}

function generateCallFunctionsFromTypeAliasDeclaration(
    sourceFiles: readonly tsc.SourceFile[],
    typeAliasDeclaration: tsc.TypeAliasDeclaration
): CallFunctionInfo[] {
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
        sourceFiles,
        typeLiteralNode,
        typeAliasDeclaration.name.escapedText.toString()
    );
}

function generateCallFunctionsFromTypeLiteralNode(
    sourceFiles: readonly tsc.SourceFile[],
    typeLiteralNode: tsc.TypeLiteralNode,
    typeAliasName: string
): CallFunctionInfo[] {
    return typeLiteralNode.members.map((member) => {
        return generateCallFunctionFromTypeElement(
            sourceFiles,
            member,
            typeAliasName
        );
    });
}

function generateCallFunctionFromTypeElement(
    sourceFiles: readonly tsc.SourceFile[],
    typeElement: tsc.TypeElement,
    typeAliasName: string
): CallFunctionInfo {
    if (typeElement.kind !== tsc.SyntaxKind.MethodSignature) {
        throw new Error('Must use method signature syntax');
    }

    const methodSignature = typeElement as tsc.MethodSignature;

    const {
        methodName,
        callFunctionName,
        callWithPaymentFunctionName,
        callWithPayment128FunctionName,
        notifyFunctionName,
        notifyWithPayment128FunctionName
    } = generateCallFunctionName(methodSignature, typeAliasName);
    const functionParams = generateCallFunctionParams(
        sourceFiles,
        methodSignature
    );
    const functionReturnType = generateCallFunctionReturnType(
        sourceFiles,
        methodSignature
    );
    const param_names = functionParams.map(
        (rust_param) => rust_param.paramName
    );

    return {
        call: {
            functionName: callFunctionName,
            params: functionParams,
            rust: `
                async fn ${callFunctionName}(canister_id_principal: ic_cdk::export::Principal${
                functionParams.length === 0 ? '' : ', '
            }${functionParams
                .map((param) => `${param.paramName}: ${param.paramType}`)
                .join(', ')})${
                functionReturnType === ''
                    ? ''
                    : ` -> CallResult<(${functionReturnType},)>`
            } {
                ic_cdk::api::call::call(
                    canister_id_principal,
                    "${methodName}",
                    (${param_names.join(', ')}${
                param_names.length === 1 ? ',' : ''
            })
                ).await
            }
            `
        },
        call_with_payment: {
            functionName: callWithPaymentFunctionName,
            params: functionParams,
            rust: `
                async fn ${callWithPaymentFunctionName}(canister_id_principal: ic_cdk::export::Principal${
                functionParams.length === 0 ? '' : ', '
            }${functionParams
                .map((param) => `${param.paramName}: ${param.paramType}`)
                .join(', ')}, cycles: u64)${
                functionReturnType === ''
                    ? ''
                    : ` -> CallResult<(${functionReturnType},)>`
            } {
                    ic_cdk::api::call::call_with_payment(
                        canister_id_principal,
                        "${methodName}",
                        (${param_names.join(', ')}${
                param_names.length === 1 ? ',' : ''
            }),
                        cycles
                    ).await
                }
            `
        },
        call_with_payment128: {
            functionName: callWithPayment128FunctionName,
            params: functionParams,
            rust: `
                async fn ${callWithPayment128FunctionName}(canister_id_principal: ic_cdk::export::Principal${
                functionParams.length === 0 ? '' : ', '
            }${functionParams
                .map((param) => `${param.paramName}: ${param.paramType}`)
                .join(', ')}, cycles: u128)${
                functionReturnType === ''
                    ? ''
                    : ` -> CallResult<(${functionReturnType},)>`
            } {
                    ic_cdk::api::call::call_with_payment128(
                        canister_id_principal,
                        "${methodName}",
                        (${param_names.join(', ')}${
                param_names.length === 1 ? ',' : ''
            }),
                        cycles
                    ).await
                }
            `
        },
        notify: {
            functionName: notifyFunctionName,
            params: functionParams,
            rust: `
                fn ${notifyFunctionName}(
                    _this: &boa_engine::JsValue,
                    _aargs: &[boa_engine::JsValue],
                    _context: &mut boa_engine::Context
                ) -> boa_engine::JsResult<boa_engine::JsValue> {
                    let canister_id_js_value = _aargs.get(0).unwrap().clone();
                    let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.azle_try_from_js_value(_context).unwrap();

                    let args_js_value = _aargs.get(1).unwrap().clone();
                    let args_js_object = args_js_value.as_object().unwrap();

                    ${functionParams
                        .map((param, index) => {
                            return `
                            let ${param.paramName}_js_value = args_js_object.get("${index}", _context).unwrap();
                            let ${param.paramName}: ${param.paramType} = ${param.paramName}_js_value.azle_try_from_js_value(_context).unwrap();
                        `;
                        })
                        .join('\n')}

                    let notify_result = ic_cdk::api::call::notify(
                        canister_id_principal,
                        "${methodName}",
                        (${param_names.join(', ')}${
                param_names.length === 1 ? ',' : ''
            })
                    );

                    Ok(notify_result.azle_into_js_value(_context))
                }
            `
        },
        notify_with_payment128: {
            functionName: notifyWithPayment128FunctionName,
            params: functionParams,
            rust: `
            fn ${notifyWithPayment128FunctionName}(
                _this: &boa_engine::JsValue,
                _aargs: &[boa_engine::JsValue],
                _context: &mut boa_engine::Context
            ) -> boa_engine::JsResult<boa_engine::JsValue> {
                let canister_id_js_value = _aargs.get(0).unwrap().clone();
                let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.azle_try_from_js_value(_context).unwrap();

                let args_js_value = _aargs.get(1).unwrap().clone();
                let args_js_object = args_js_value.as_object().unwrap();

                ${functionParams
                    .map((param, index) => {
                        return `
                        let ${param.paramName}_js_value = args_js_object.get("${index}", _context).unwrap();
                        let ${param.paramName}: ${param.paramType} = ${param.paramName}_js_value.azle_try_from_js_value(_context).unwrap();
                    `;
                    })
                    .join('\n')}

                let cycles_js_value = _aargs.get(2).unwrap().clone();
                let cycles: u128 = cycles_js_value.azle_try_from_js_value(_context).unwrap();

                let notify_result = ic_cdk::api::call::notify_with_payment128(
                    canister_id_principal,
                    "${methodName}",
                    (${param_names.join(', ')}${
                param_names.length === 1 ? ',' : ''
            }),
                    cycles
                );

                Ok(notify_result.azle_into_js_value(_context))
            }
        `
        }
    };
}

// TODO put this somewhere, like an AST utilities file. Also generalize it
export function getCanisterTypeAliasDeclarations(
    sourceFiles: readonly tsc.SourceFile[]
): tsc.TypeAliasDeclaration[] {
    const typeAliasDeclarations =
        getTypeAliasDeclarationsFromSourceFiles(sourceFiles);

    return typeAliasDeclarations.filter((typeAliasDeclaration) => {
        if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.TypeReference) {
            const typeReferenceNode =
                typeAliasDeclaration.type as tsc.TypeReferenceNode;

            if (typeReferenceNode.typeName.kind === tsc.SyntaxKind.Identifier) {
                return (
                    typeReferenceNode.typeName.escapedText.toString() ===
                    'Canister'
                );
            }

            return false;
        }

        return false;
    });
}

// TODO put this somewhere, like an AST utilities file. Also generalize it
export function getStableTypeAliasDeclarations(
    sourceFiles: readonly tsc.SourceFile[]
): tsc.TypeAliasDeclaration[] {
    const typeAliasDeclarations =
        getTypeAliasDeclarationsFromSourceFiles(sourceFiles);

    return typeAliasDeclarations.filter((typeAliasDeclaration) => {
        if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.TypeReference) {
            const typeReferenceNode =
                typeAliasDeclaration.type as tsc.TypeReferenceNode;

            if (typeReferenceNode.typeName.kind === tsc.SyntaxKind.Identifier) {
                return (
                    typeReferenceNode.typeName.escapedText.toString() ===
                    'Stable'
                );
            }

            return false;
        }

        return false;
    });
}

// TODO put this somewhere, like an AST utilities file. Also generalize it
export function getFuncTypeAliasDeclarations(
    sourceFiles: readonly tsc.SourceFile[]
): tsc.TypeAliasDeclaration[] {
    const typeAliasDeclarations =
        getTypeAliasDeclarationsFromSourceFiles(sourceFiles);

    return typeAliasDeclarations.filter((typeAliasDeclaration) => {
        if (typeAliasDeclaration.type.kind === tsc.SyntaxKind.TypeReference) {
            const typeReferenceNode =
                typeAliasDeclaration.type as tsc.TypeReferenceNode;

            if (typeReferenceNode.typeName.kind === tsc.SyntaxKind.Identifier) {
                return (
                    typeReferenceNode.typeName.escapedText.toString() === 'Func'
                );
            }

            return false;
        }

        return false;
    });
}

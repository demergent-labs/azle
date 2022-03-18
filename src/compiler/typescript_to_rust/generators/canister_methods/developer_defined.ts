// TODO we need to wrap this up into an npm package
import synInit, {
    parseFile,
    printAst
} from '../../../../../../astexplorer-syn/typescript/astexplorer_syn';
import {
    CanisterMethodTypeName,
    JavaScript,
    Rust
} from '../../../../types';
import * as tsc from 'typescript';
import { nodeIsCanisterMethodFunctionDeclaration } from '../../../typescript_to_candid/ast_utilities/canister_methods';

type RustType =
    'bool' |
    'String' |
    'i64' |
    'i32' |
    'i16' |
    'i8' |
    'u128' |
    'u64' |
    'u32' |
    'u16' |
    'u8' |
    // 'ic_cdk::export::candid::Nat' | // TODO replaced with u128 for now
    'Vec<u8>' |
    'ic_cdk::export::candid::Principal';

type RustProperty = Readonly<{
    name: string;
    type: RustType;
}>;

const rustTypes: {
    [key: string]: RustType | undefined
} = {
    'bool': 'bool',
    'String': 'String',
    'i64': 'i64',
    'i32': 'i32',
    'i16': 'i16',
    'i8': 'i8',
    'u64': 'u64',
    'u32': 'u32',
    'u16': 'u16',
    'u8': 'u8',
    // 'Nat': 'ic_cdk::export::candid::Nat', // TODO replaced with u128 for now
    'Nat': 'u128', // TODO replaced with u128 for now
    'ICBlob': 'Vec<u8>',
    'Principal': 'ic_cdk::export::candid::Principal'
};

export function generateCanisterMethodsDeveloperDefined(
    sourceFiles: readonly tsc.SourceFile[],
    js: JavaScript
): Rust {
    const rustQueryFunctions = generateRustFunctionsFromSourceFiles(
        sourceFiles,
        js,
        'Query'
    );

    const rustUpdateFunctions = generateRustFunctionsFromSourceFiles(
        sourceFiles,
        js,
        'Update'
    );

    return [
        ...rustQueryFunctions,
        ...rustUpdateFunctions
    ].join('\n');
}

function generateRustFunctionsFromSourceFiles(
    sourceFiles: ReadonlyArray<tsc.SourceFile>,
    compiledJs: string,
    canisterMethodTypeName: CanisterMethodTypeName
): ReadonlyArray<string> {
    const rustFunctions = sourceFiles.reduce((result: ReadonlyArray<string>, sourceFile) => {
        return [
            ...result,
            ...generateRustFunctionsFromNodes(
                sourceFile,
                sourceFile.getChildren(),
                compiledJs,
                canisterMethodTypeName
            )
        ];
    }, []);

    return rustFunctions;
}

function generateRustFunctionsFromNodes(
    sourceFile: tsc.SourceFile,
    nodes: ReadonlyArray<tsc.Node>,
    compiledJs: string,
    canisterMethodTypeName: CanisterMethodTypeName
): ReadonlyArray<string> {
    if (nodes.length === 0) {
        return [];
    }

    return nodes.reduce((result: ReadonlyArray<string>, node) => {
        const rustFunction = generateRustFunctionFromNode(
            node,
            compiledJs,
            canisterMethodTypeName
        );

        return [
            ...result,
            ...(rustFunction === null ? [] : [rustFunction]),
            ...generateRustFunctionsFromNodes(
                sourceFile,
                node.getChildren(sourceFile),
                compiledJs,
                canisterMethodTypeName
            )
        ];
    }, []);
}

function generateRustFunctionFromNode(
    node: tsc.Node,
    compiledJs: string,
    icFunctionType: CanisterMethodTypeName
): string | null {
    if (nodeIsCanisterMethodFunctionDeclaration(
        node,
        icFunctionType
    ) === false) {
        return null;
    }

    const functionDeclaration = node as tsc.FunctionDeclaration;
    const functionName = functionDeclaration.name?.escapedText.toString() || 'NO_FUNCTION_NAME' as string;
    const functionReturnType = getFunctionReturnType(
        functionDeclaration,
        icFunctionType
    );
    const functionParameters = getFunctionParameters(functionDeclaration);
    const functionParametersString = stringifyFunctionParameters(functionParameters);

    // TODO these number conversions are horrendous
    const returnValueConversionCode = {
        'bool': 'serde_json::from_str(&return_value).unwrap()',
        'String': 'return_value',
        'i64': 'return_value.parse::<i64>().unwrap()',
        'i32': 'return_value.parse::<i32>().unwrap()',
        'i16': 'return_value.parse::<i16>().unwrap()',
        'i8': 'return_value.parse::<i8>().unwrap()',
        'u128': 'return_value.parse::<u128>().unwrap()',
        'u64': 'return_value.parse::<u64>().unwrap()',
        'u32': 'return_value.parse::<u32>().unwrap()',
        'u16': 'return_value.parse::<u16>().unwrap()',
        'u8': 'return_value.parse::<u8>().unwrap()',
        // 'ic_cdk::export::candid::Nat': 'return_value.parse::<ic_cdk::export::candid::Nat>().unwrap()',
        'Vec<u8>': 'return_value.parse::<Vec<u8>>.unwrap()', // TODO have not tested this
        'ic_cdk::export::candid::Principal': 'return_value.parse::<ic_cdk::export::candid::Principal>().unwrap()'
    }[functionReturnType] ?? `serde_json::from_str::<${functionReturnType}>(&return_value).unwrap()`;

    // TODO serde_json::from_str(boa_engine::builtins::json::stringify(return_value)) as TransferRequest

    if (icFunctionType === 'Query') {
        return generateRustFunction(
            'QUERY',
            functionName,
            functionParametersString,
            functionReturnType,
            functionParameters,
            compiledJs,
            returnValueConversionCode
        );
    }
    
    if (icFunctionType === 'Update') {
        return generateRustFunction(
            'UPDATE',
            functionName,
            functionParametersString,
            functionReturnType,
            functionParameters,
            compiledJs,
            returnValueConversionCode
        );
    }

    return null;
}

// TODO ensure values are cleanly sanitized
function generateRustFunction(
    queryOrUpdate: 'QUERY' | 'UPDATE',
    functionName: string,
    functionParametersString: string,
    functionReturnType: RustType,
    functionParameters: ReadonlyArray<RustProperty>,
    compiledJs: string,
    returnValueConversionCode: string
): string {
    return `
        #[ic_cdk_macros::${queryOrUpdate === 'QUERY' ? 'query' : 'update'}]
        #[ic_cdk::export::candid::candid_method(${queryOrUpdate === 'QUERY' ? 'query' : 'update'})]
        async fn ${functionName}(${functionParametersString}) -> ${functionReturnType} {
            // let string = futures::executor::block_on(async {
            //     let call_result: Result<(String,), _> = ic_cdk::api::call::call(
            //         ic_cdk::export::Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap(),
            //         "testString",
            //         ()
            //     ).await;

            //     return call_result.unwrap().0;
            // });

            // ic_cdk::println!("string: {}", string);

            // ic_cdk::block_on(async {
            //     let call_result: Result<(String,), _> = ic_cdk::api::call::call(
            //         ic_cdk::export::Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap(),
            //         "testString",
            //         ()
            //     ).await;

            //     let string = call_result.unwrap().0;

            //     ic_cdk::println!("string: {}", string);
            // });

            BOA_CONTEXT.with(|boa_context_ref_cell| {
                let mut boa_context = boa_context_ref_cell.borrow_mut();

                // TODO grab the error message from the return value and panic on it if possible, the errors are almost unreadable
                let return_value = boa_context.eval(format!(
                    "
                        JSON.stringify(${functionName}(${functionParameters.map((functionParameter) => {
                            return `{${functionParameter.name}}`;
                        }).join(',')}));
                    ",
                    ${functionParameters.map((functionParameter) => {
                        return `${functionParameter.name} = serde_json::to_string(&${functionParameter.name}).unwrap()`;
                    }).join(',')}
                ))
                .unwrap()
                .as_string()
                .unwrap()
                .to_string();

                ${returnValueConversionCode}
            })
        }
    `;
}

function getFunctionReturnType(
    functionDeclaration: tsc.FunctionDeclaration,
    canisterMethodTypeName: CanisterMethodTypeName
): RustType {
    const functionName = functionDeclaration.name?.escapedText;

    if (functionDeclaration.type === undefined) {
        throw new Error(`Azle::compile::getFunctionReturnType: TypeScript query function ${functionName} must have a return type`);
    }

    // TODO this might be repeat code
    if (tsc.isTypeReferenceNode(functionDeclaration.type)) {
        const typeReferenceNode = functionDeclaration.type as tsc.TypeReferenceNode;
        
        if (
            tsc.isIdentifier(typeReferenceNode.typeName) &&
            typeReferenceNode.typeName.escapedText === canisterMethodTypeName &&
            typeReferenceNode.typeArguments !== undefined &&
            typeReferenceNode.typeArguments.length === 1
        ) {
            const typeArgument = typeReferenceNode.typeArguments[0];

            if (typeArgument.kind === tsc.SyntaxKind.StringKeyword) {
                return 'String';
            }
        
            if (typeArgument.kind === tsc.SyntaxKind.BooleanKeyword) {
                return 'bool';
            }

            if (
                tsc.isTypeReferenceNode(typeArgument) &&
                tsc.isIdentifier(typeArgument.typeName)
            ) {
                const functionReturnType = rustTypes[typeArgument.typeName.escapedText as string];
        
                if (functionReturnType !== undefined) {
                    return functionReturnType;
                }
                else {
                    // TODO figure this out better
                    return (typeArgument.typeName as any).escapedText;
                }
            }

            console.log('typeArgument', typeArgument);
        }
    }

    throw new Error(`Azle::compile::getFunctionReturnType: TypeScript query function ${functionName} return type not supported`);
}

function getFunctionParameters(functionDeclaration: tsc.FunctionDeclaration): ReadonlyArray<RustProperty> {
    return functionDeclaration.parameters.map((parameter) => {
        if (
            tsc.isIdentifier(parameter.name) &&
            parameter.type !== undefined
            // &&
            // tsc.isTypeReferenceNode(parameter.type)
        ) {
            const parameterName = parameter.name.escapedText.toString();
            // const rustType = transformTypeReferenceNodeToRustType(parameter.type);
            const rustType = transformTypeNodeToRustType(parameter.type);
            
            return {
                name: parameterName,
                type: rustType
            };
        }
        
        throw new Error();
    });
}

// TODO here is where I think we want to follow aliases
function transformTypeNodeToRustType(typeNode: tsc.TypeNode): RustType {
    if (typeNode.kind === tsc.SyntaxKind.StringKeyword) {
        return 'String';
    }

    if (typeNode.kind === tsc.SyntaxKind.BooleanKeyword) {
        return 'bool';
    }

    if (
        tsc.isLiteralTypeNode(typeNode) &&
        typeNode.literal.kind === tsc.SyntaxKind.NullKeyword
    ) {
        return 'None' as any;
    }

    if (
        tsc.isTypeReferenceNode(typeNode) &&
        tsc.isIdentifier(typeNode.typeName)
    ) {
        const rustType = rustTypes[typeNode.typeName.escapedText as string];

        if (rustType !== undefined) {
            return rustType;
        }
        else {
            return (typeNode.typeName as any).escapedText;
        }
    }

    if (tsc.isArrayTypeNode(typeNode)) {
        if (typeNode.elementType.kind === tsc.SyntaxKind.StringKeyword) {
            return `Vec<String>` as any;
        }

        if (
            tsc.isTypeReferenceNode(typeNode.elementType) &&
            tsc.isIdentifier(typeNode.elementType.typeName)
        ) {
            return `Vec<${typeNode.elementType.typeName.escapedText}>` as any;
        }
    }

    throw new Error('TypeScript type not supported');
}

function stringifyFunctionParameters(functionParameters: ReadonlyArray<RustProperty>): string {
    return functionParameters.map((functionParameter) => {
        return `${functionParameter.name}: ${functionParameter.type}`;
    }).join(', ');
}
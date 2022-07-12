import { printAst } from 'azle-syn';
import {
    getImplItemMethods,
    getImpls
} from '../../../ast_utilities/miscellaneous';
import {
    parse,
    parseRustFuncAttrs,
    parseRustFuncOutput
} from '../../../ast_utilities/parsing';
import { AST, Fn, ImplItemMethod } from '../../../ast_utilities/types';
import { generateReturnValueHandler } from './return_value_handler';
import { CanisterMethodFunctionInfo, Rust } from '../../../../../types';

export async function generateCanisterMethodsDeveloperDefined(
    rustCandidTypes: Rust,
    canisterMethodFunctionInfos: CanisterMethodFunctionInfo[]
): Promise<Rust> {
    const rustCandidTypesAst: AST = parse(rustCandidTypes);

    const impls = getImpls(rustCandidTypesAst);
    const impl = impls[0];

    const implItemMethods = getImplItemMethods(impl);
    const fns = generateItemFnsFromImplItemMethods(
        implItemMethods,
        canisterMethodFunctionInfos
    );

    const fnsAst = {
        items: [
            ...fns.map((fn) => {
                return {
                    fn
                };
            })
        ]
    };

    return printAst(JSON.stringify(fnsAst));
}

function generateItemFnsFromImplItemMethods(
    implItemMethods: ImplItemMethod[],
    canisterMethodFunctionInfos: CanisterMethodFunctionInfo[]
): Fn[] {
    return implItemMethods.map((implItemMethod) => {
        return generateItemFnFromImplItemMethod(
            implItemMethod,
            canisterMethodFunctionInfos
        );
    });
}

function generateItemFnFromImplItemMethod(
    implItemMethod: ImplItemMethod,
    canisterMethodFunctionInfos: CanisterMethodFunctionInfo[]
): Fn {
    const inputsWithoutSelfParam = implItemMethod.inputs.slice(1);

    const canisterMethodFunctionInfo = canisterMethodFunctionInfos.find(
        (functionInfo) => functionInfo.name === implItemMethod.ident
    );

    if (canisterMethodFunctionInfo === undefined) {
        throw new Error('This cannot happen');
    }

    const body: Rust = getBody(
        implItemMethod,
        inputsWithoutSelfParam,
        canisterMethodFunctionInfo
    );

    const bodyAst: AST = parse(body);

    if (bodyAst.items[0]?.fn === undefined) {
        throw new Error('This cannot happen');
    }

    return {
        attrs: getAttrs(canisterMethodFunctionInfo),
        async: implItemMethod.async,
        ident: implItemMethod.ident,
        inputs: inputsWithoutSelfParam,
        output: getOutput(implItemMethod, canisterMethodFunctionInfo),
        stmts: bodyAst.items[0].fn.stmts
    };
}

function getBody(
    implItemMethod: ImplItemMethod,
    inputs: any[],
    canisterMethodFunctionInfo: CanisterMethodFunctionInfo
): Rust {
    const returnValueHandler: Rust = generateReturnValueHandler(
        implItemMethod,
        canisterMethodFunctionInfo
    );

    const functionName = implItemMethod.ident;

    return `
        fn dummy() {
            unsafe {
                let mut boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                let exports_js_value = boa_context.eval("exports").unwrap();
                let exports_js_object = exports_js_value.as_object().unwrap();

                let ${functionName}_js_value = exports_js_object.get("${functionName}", &mut boa_context).unwrap();
                let ${functionName}_js_object = ${functionName}_js_value.as_object().unwrap();

                let _azle_return_value = ${functionName}_js_object.call(
                    &boa_engine::JsValue::Null,
                    &[
                        ${inputs
                            .map((input) => {
                                return `${input.typed.pat.ident.ident}.azle_into_js_value(&mut boa_context)`;
                            })
                            .join(',')}
                    ],
                    &mut boa_context
                ).unwrap();

                ${returnValueHandler}
            }
        }
    `;
}

// TODO current deployed unsafe version
// fn dummy() {
//     unsafe {
//         let mut boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

//         let return_value = boa_context.eval(format!(
//             "
//                 ${implItemMethod.ident}(${inputs.map((input) => {
//                     return `{${input.typed.pat.ident.ident}}`;
//                 }).join(',')});
//             ",
//             ${inputs.map((input) => {
//                 return `${input.typed.pat.ident.ident} = serde_json::to_string(&${input.typed.pat.ident.ident}).unwrap()`;
//             }).join(',')}
//         )).unwrap();

//         ${returnValueHandler}

//     }
// }

// TODO old safe working version
// fn dummy() {
//     BOA_CONTEXT.with(|boa_context_ref_cell| {
//         let mut boa_context = boa_context_ref_cell.borrow_mut();

//         let return_value = boa_context.eval(format!(
//             "
//                 ${implItemMethod.ident}(${inputs.map((input) => {
//                     return `{${input.typed.pat.ident.ident}}`;
//                 }).join(',')});
//             ",
//             ${inputs.map((input) => {
//                 return `${input.typed.pat.ident.ident} = serde_json::to_string(&${input.typed.pat.ident.ident}).unwrap()`;
//             }).join(',')}
//         )).unwrap();

//         ${returnValueHandler}
//     })
// }

function getAttrs(
    canisterMethodFunctionInfo: CanisterMethodFunctionInfo
): any[] {
    const queryOrUpdateText =
        canisterMethodFunctionInfo.queryOrUpdate === 'QUERY'
            ? 'query'
            : 'update';
    const manualReplyText =
        canisterMethodFunctionInfo.manual === true
            ? `(manual_reply = true)`
            : '';

    return parseRustFuncAttrs(
        `#[ic_cdk_macros::${queryOrUpdateText}${manualReplyText}]`
    );
}

function getOutput(
    implItemMethod: ImplItemMethod,
    canisterMethodFunctionInfo: CanisterMethodFunctionInfo
): any {
    const rawOutput = getRawOutput(implItemMethod);

    if (canisterMethodFunctionInfo.manual === true) {
        return wrapOutputWithManualReply(rawOutput);
    } else {
        return rawOutput;
    }
}

function getRawOutput(implItemMethod: ImplItemMethod): any {
    const output =
        implItemMethod.output?.path.segments[0].arguments.angle_bracketed
            .args[0].type.tuple.elems[0];

    if (output?.tuple?.elems?.length === 0) {
        return createCandidNullOutput();
    } else {
        return output;
    }
}

function createCandidNullOutput() {
    return {
        tuple: {
            elems: [
                {
                    tuple: {
                        elems: []
                    }
                }
            ]
        }
    };
}

function wrapOutputWithManualReply(output: any) {
    let manualReplyWrappedOutput = parseRustFuncOutput(
        `ic_cdk::api::call::ManualReply<PLACEHOLDER>`
    );

    manualReplyWrappedOutput.path.segments[3].arguments.angle_bracketed.args[0].type =
        output;

    return manualReplyWrappedOutput;
}

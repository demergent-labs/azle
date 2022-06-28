import { parseFile, printAst } from 'azle-syn';
import {
    getImplItemMethods,
    getImpls
} from '../../../ast_utilities/miscellaneous';
import { AST, Fn, ImplItemMethod } from '../../../ast_utilities/types';
import { generateReturnValueHandler } from './return_value_handler';
import { CanisterMethodFunctionInfo, Rust } from '../../../../../types';

export async function generateCanisterMethodsDeveloperDefined(
    rustCandidTypes: Rust,
    queryMethodFunctionInfos: CanisterMethodFunctionInfo[],
    updateMethodFunctionInfos: CanisterMethodFunctionInfo[]
): Promise<Rust> {
    const rustCandidTypesAstString = parseFile(rustCandidTypes);
    const rustCandidTypesAst: AST = JSON.parse(rustCandidTypesAstString);

    const impls = getImpls(rustCandidTypesAst);
    const impl = impls[0];

    const implItemMethods = getImplItemMethods(impl);
    const fns = generateItemFnsFromImplItemMethods(
        implItemMethods,
        queryMethodFunctionInfos,
        updateMethodFunctionInfos
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
    queryMethodFunctionInfos: CanisterMethodFunctionInfo[],
    updateMethodFunctionInfos: CanisterMethodFunctionInfo[]
): Fn[] {
    return implItemMethods.map((implItemMethod) => {
        return generateItemFnFromImplItemMethod(
            implItemMethod,
            queryMethodFunctionInfos,
            updateMethodFunctionInfos
        );
    });
}

function generateItemFnFromImplItemMethod(
    implItemMethod: ImplItemMethod,
    queryMethodFunctionInfos: CanisterMethodFunctionInfo[],
    updateMethodFunctionInfos: CanisterMethodFunctionInfo[]
): Fn {
    const inputsWithoutSelfParam = implItemMethod.inputs.slice(1);

    const queryMethodFunctionInfo = queryMethodFunctionInfos.find((queryMethodFunctionInfo) => queryMethodFunctionInfo.name === implItemMethod.ident);
    const updateMethodFunctionInfo = updateMethodFunctionInfos.find((updateMethodFunctionInfo) => updateMethodFunctionInfo.name === implItemMethod.ident);

    const canisterMethodFunctionInfo = queryMethodFunctionInfo ?? updateMethodFunctionInfo;

    if (canisterMethodFunctionInfo === undefined) {
        throw new Error('This cannot happen');
    }

    const body: Rust = getBody(implItemMethod, inputsWithoutSelfParam, canisterMethodFunctionInfo);

    const bodyAst: AST = JSON.parse(parseFile(body));

    if (bodyAst.items[0]?.fn === undefined) {
        throw new Error('This cannot happen');
    }

    return {
        attrs: getAttrs(
            canisterMethodFunctionInfo
        ),
        async: implItemMethod.async,
        ident: implItemMethod.ident,
        inputs: inputsWithoutSelfParam,
        output: getOutput(implItemMethod, canisterMethodFunctionInfo),
        stmts: bodyAst.items[0].fn.stmts
    };
}

function getBody(implItemMethod: ImplItemMethod, inputs: any[], canisterMethodFunctionInfo: CanisterMethodFunctionInfo): Rust {
    const returnValueHandler: Rust = generateReturnValueHandler(implItemMethod, canisterMethodFunctionInfo);

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
    const queryOrUpdateText = canisterMethodFunctionInfo.queryOrUpdate === 'QUERY' ? 'query' : 'update';
    const manualReplyText = canisterMethodFunctionInfo.manual === true ? `(manual_reply = true)` : '';

    // #[ic_cdk_macros::${queryOrUpdateText}${manualReplyText}]
    return JSON.parse(parseFile(`
        #[ic_cdk_macros::${queryOrUpdateText}${manualReplyText}]
        fn dummy() {}       
    `)).items[0].fn.attrs;
}

function getOutput(implItemMethod: ImplItemMethod, canisterMethodFunctionInfo: CanisterMethodFunctionInfo): any {
    const nonManualReplyWrappedOutput = getNonManualReplyWrappedOutput(implItemMethod);

    if (canisterMethodFunctionInfo.manual === true) {
        // return `ic_cdk::api::call::ManualReply<String>`;
        // return `ic_cdk::api::call::ManualReply<${nonManualReplyWrappedOutput}>`;
        // TODO get the type argument to ManualReply
        return JSON.parse(parseFile(`
            fn dummy() -> ic_cdk::api::call::ManualReply<String> {}
        `)).items[0].fn.output;
    }
    else {
        return nonManualReplyWrappedOutput;
    }
}

function getNonManualReplyWrappedOutput(implItemMethod: ImplItemMethod): any {
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

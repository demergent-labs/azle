import {
    parseFile,
    printAst
} from 'azle-syn';
import {
    getImplItemMethods,
    getImpls
} from '../../../ast_utilities/miscellaneous';
import {
    AST,
    Fn,
    ImplItemMethod
} from '../../../ast_utilities/types';
import { generateReturnValueHandler } from './return_value_handler';
import {
    CallFunctionInfo,
    Rust
} from '../../../../../types';

export async function generateCanisterMethodsDeveloperDefined(
    rustCandidTypes: Rust,
    queryMethodFunctionNames: string[],
    updateMethodFunctionNames: string[]
): Promise<Rust> {
    const rustCandidTypesAstString = parseFile(rustCandidTypes);
    const rustCandidTypesAst: AST = JSON.parse(rustCandidTypesAstString);

    const impls = getImpls(rustCandidTypesAst);
    const impl = impls[0];

    const implItemMethods = getImplItemMethods(impl);
    const fns = generateItemFnsFromImplItemMethods(
        implItemMethods,
        queryMethodFunctionNames,
        updateMethodFunctionNames
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
    queryMethodFunctionNames: string[],
    updateMethodFunctionNames: string[]
): Fn[] {
    return implItemMethods.map((implItemMethod) => {
        return generateItemFnFromImplItemMethod(
            implItemMethod,
            queryMethodFunctionNames,
            updateMethodFunctionNames
        );
    });
}

function generateItemFnFromImplItemMethod(
    implItemMethod: ImplItemMethod,
    queryMethodFunctionNames: string[],
    updateMethodFunctionNames: string[]
): Fn {
    const inputsWithoutSelfParam = implItemMethod.inputs.slice(1);

    const body: Rust = getBody(
        implItemMethod,
        inputsWithoutSelfParam
    );
    const bodyAst: AST = JSON.parse(parseFile(body));

    if (bodyAst.items[0]?.fn === undefined) {
        throw new Error('This cannot happen');
    }

    return {
        attrs: getAttrs(
            implItemMethod,
            queryMethodFunctionNames,
            updateMethodFunctionNames
        ),
        async: implItemMethod.async,
        ident: implItemMethod.ident,
        inputs: inputsWithoutSelfParam,
        output: getOutput(implItemMethod),
        stmts: bodyAst.items[0].fn.stmts
    };
}

function getBody(implItemMethod: ImplItemMethod, inputs: any[]): Rust {
    const returnValueHandler: Rust = generateReturnValueHandler(implItemMethod);

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
                        ${inputs.map((input) => {
                            return `${input.typed.pat.ident.ident}.azle_into_js_value(&mut boa_context)`;
                        }).join(',')}
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
    implItemMethod: ImplItemMethod,
    queryMethodFunctionNames: string[],
    updateMethodFunctionNames: string[]
): any[] {
    const queryMacroString = `
        #[ic_cdk_macros::query]    
        fn dummy() {}
    `;
    const queryMacroAst: AST = JSON.parse(parseFile(queryMacroString));

    const updateMacroString = `
        #[ic_cdk_macros::update]    
        fn dummy() {}
    `;
    const updateMacroAst: AST = JSON.parse(parseFile(updateMacroString));

    if (queryMacroAst.items[0]?.fn?.attrs === undefined) {
        throw new Error('This cannot happen');
    }

    if (updateMacroAst.items[0]?.fn?.attrs === undefined) {
        throw new Error('This cannot happen');
    }

    return queryOrUpdate(
        implItemMethod.ident,
        queryMethodFunctionNames,
        updateMethodFunctionNames
    ) === 'query' ? queryMacroAst.items[0].fn.attrs : updateMacroAst.items[0].fn.attrs;
}

function queryOrUpdate(
    functionName: string,
    queryMethodFunctionNames: string[],
    updateMethodFunctionNames: string[]
): 'query' | 'update' {
    if (queryMethodFunctionNames.includes(functionName)) {
        return 'query';
    }

    if (updateMethodFunctionNames.includes(functionName)) {
        return 'update';
    }

    throw new Error(`Function ${functionName} is neither a query nor update function`);
}

function getOutput(implItemMethod: ImplItemMethod): any | undefined {
    return implItemMethod.output?.path.segments[0].arguments.angle_bracketed.args[0].type.tuple.elems[0];
}
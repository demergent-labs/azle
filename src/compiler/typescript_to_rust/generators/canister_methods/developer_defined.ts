// TODO we need to wrap this up into an npm package
import initSyn, {
    parseFile,
    printAst
} from '../../../../../../astexplorer-syn/typescript/astexplorer_syn';
import {
    getImplItemMethods,
    getImpls
} from '../../ast_utilities/miscellaneous';
import {
    AST,
    Fn,
    ImplItemMethod
} from '../../ast_utilities/types';
import { Rust } from '../../../../types';

export async function generateCanisterMethodsDeveloperDefined(
    rustCandidTypes: Rust,
    queryMethodFunctionNames: string[],
    updateMethodFunctionNames: string[]
): Promise<Rust> {
    await initSyn('../../../astexplorer-syn/typescript/astexplorer_syn_bg.wasm');

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

function getBody(
    implItemMethod: ImplItemMethod,
    inputs: any[]
): Rust {
    return `
        fn dummy() {
            BOA_CONTEXT.with(|boa_context_ref_cell| {
                let mut boa_context = boa_context_ref_cell.borrow_mut();

                let return_value = boa_context.eval(format!(
                    "
                        ${implItemMethod.ident}(${inputs.map((input) => {
                            return `{${input.typed.pat.ident.ident}}`;
                        }).join(',')});
                    ",
                    ${inputs.map((input) => {
                        return `${input.typed.pat.ident.ident} = serde_json::to_string(&${input.typed.pat.ident.ident}).unwrap()`;
                    }).join(',')}
                )).unwrap();
            
                serde_json::from_value(return_value.to_json(&mut boa_context).unwrap()).unwrap()
            })
        }
    `;
}

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
// TODO we need to wrap this up into an npm package
import initSyn, {
    parseFile,
    printAst
} from '../../../../../../astexplorer-syn/typescript/astexplorer_syn';
import { Rust } from '../../../../types';
import {
    AST,
    ImplItemMethod,
    Fn
} from '../../ast_utilities/types';
import {
    getImplItemMethods,
    getImpls
} from '../../ast_utilities/miscellaneous';

export async function generateCanisterMethodsDeveloperDefined(
    rustCandidTypes: Rust,
    queryMethodFunctionNames: string[],
    updateMethodFunctionNames: string[]
): Promise<Rust> {
    await initSyn('../../../astexplorer-syn/typescript/astexplorer_syn_bg.wasm');

    // TODO make types for the ast
    const astString = parseFile(rustCandidTypes);
    const ast: AST = JSON.parse(astString);


    const impls = getImpls(ast);
    const impl = impls[0];

    const implItemMethods = getImplItemMethods(impl);

    // console.log('implItemMethods', implItemMethods);

    // console.log(JSON.stringify(JSON.parse(parseFile(`
    //     #[ic_cdk_macros::query]
    //     async fn query() -> String {
    //     5
    //     }
    // `))));

    const fns = generateItemFnsFromImplItemMethods(
        implItemMethods,
        queryMethodFunctionNames,
        updateMethodFunctionNames
    );

    // console.log('fns', fns);

    const modifiedAst = {
        items: [
            ...fns.map((fn) => {
                return {
                    fn
                };
            })
        ]
    };

    return printAst(JSON.stringify(modifiedAst));
}

// TODO we need to put the query and update macros in place as well
function generateItemFnsFromImplItemMethods(
    implItemMethods: ImplItemMethod[],
    queryMethodFunctionNames: string[],
    updateMethodFunctionNames: string[]
): Fn[] {
    // TODO if there is no output make sure to handle that
    return implItemMethods.map((implItemMethod) => {
        // console.log('implItemMethod output', implItemMethod.output.path.segments[0].arguments.angle_bracketed.args[0].type.tuple.elems);

        const newInputs = implItemMethod.inputs.slice(1);

        // console.log(JSON.stringify(newInputs, null, 2))

        const bodyString = `
            fn dummy() {
                BOA_CONTEXT.with(|boa_context_ref_cell| {
                    let mut boa_context = boa_context_ref_cell.borrow_mut();
    
                    let return_value = boa_context.eval(format!(
                        "
                            ${implItemMethod.ident}(${newInputs.map((input) => {
                                return `{${input.typed.pat.ident.ident}}`;
                            }).join(',')});
                        ",
                        ${newInputs.map((input) => {
                            return `${input.typed.pat.ident.ident} = serde_json::to_string(&${input.typed.pat.ident.ident}).unwrap()`;
                        }).join(',')}
                    )).unwrap();
                
                    serde_json::from_value(return_value.to_json(&mut boa_context).unwrap()).unwrap()
                })
            }
        `;

        // TODO then put the bodyAst as the stmts
        const bodyAst: AST = JSON.parse(parseFile(bodyString));

        // console.log('bodyAst', bodyAst);

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

        return {
            attrs: queryOrUpdate(implItemMethod.ident, queryMethodFunctionNames, updateMethodFunctionNames) === 'query' ? queryMacroAst.items[0].fn.attrs : updateMacroAst.items[0].fn.attrs,
            async: implItemMethod.async,
            ident: implItemMethod.ident,
            inputs: implItemMethod.inputs.slice(1),
            output: implItemMethod.output.path.segments[0].arguments.angle_bracketed.args[0].type.tuple.elems[0],
            stmts: bodyAst.items[0].fn.stmts
        }
    });
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
import { printAst } from 'azle-syn';
import { AST, Enum, Item, Struct } from '../ast_utilities/types';
import { Rust } from '../../../types';
import { parse, parseRustMacros } from '../ast_utilities/parsing';

// TODO remove this once this issue is resolved: https://github.com/demergent-labs/azle/issues/93
export async function modifyRustCandidTypes(
    rustCandidTypes: Rust,
    func_names: string[]
): Promise<Rust> {
    const attrsWithSerialize = getAttrsWithSerialize();

    const ast: AST = parse(rustCandidTypes);

    const modifiedAst = {
        ...ast,
        items: modifyItems(ast.items, attrsWithSerialize, func_names)
    };

    const printedAST = printAst(JSON.stringify(modifiedAst));

    return printedAST;
}

function getAttrsWithSerialize(): any[] {
    // TODO I will probably be adding my own attributes for the custom JsValue traits here
    const macro = `#[derive(CandidType, Deserialize, AzleIntoJsValue, AzleTryFromJsValue)]`;

    return parseRustMacros(macro);
}

function modifyItems(
    items: Item[],
    attrsWithSerialize: any[] | undefined,
    func_names: string[]
): Item[] {
    // the printAst function seems to have a bug that removes the , from the CallResult tuple, thus I just filter out the impl with the generated methods (they are not needed)
    return items
        .filter((item) => {
            // TODO also remove func unit structs
            return (
                item.impl === undefined &&
                !(
                    item.type !== undefined &&
                    func_names.includes(item.type.ident)
                ) &&
                !(
                    item.struct !== undefined &&
                    func_names.includes(item.struct.ident)
                )
            );
        })
        .map((item) => {
            if (
                item.struct !== undefined &&
                item.struct.ident !== 'SERVICE' // We do not want to modify the automatically generated SERVICE struct
            ) {
                return {
                    struct: modifyStruct(item.struct, attrsWithSerialize)
                };
            }

            if (item.enum !== undefined) {
                return {
                    enum: modifyEnum(item.enum, attrsWithSerialize)
                };
            }

            return item;
        });
}

function modifyStruct(
    struct: Struct,
    attrsWithSerialize: any[] | undefined
): Struct {
    return {
        ...struct,
        attrs: attrsWithSerialize
    };
}

function modifyEnum(enum_: Enum, attrsWithSerialize: any[] | undefined): Enum {
    return {
        ...enum_,
        attrs: attrsWithSerialize
    };
}

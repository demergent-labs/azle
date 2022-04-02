import {
    parseFile,
    printAst
} from 'azle-syn';
import {
    AST,
    Enum,
    Item,
    Struct
} from '../ast_utilities/types';
import { Rust } from '../../../types';

// TODO remove this once this issue is resolved: https://github.com/demergent-labs/azle/issues/93
export async function modifyRustCandidTypes(rustCandidTypes: Rust): Promise<Rust> {
    const attrsWithSerialize = getAttrsWithSerialize();

    const ast: AST = JSON.parse(parseFile(rustCandidTypes));
    const modifiedAst = {
        ...ast,
        items: modifyItems(
            ast.items,
            attrsWithSerialize
        )
    };

    const printedAST = printAst(JSON.stringify(modifiedAst));

    return printedAST;
}

function getAttrsWithSerialize(): any[] | undefined {
    // TODO I will probably be adding my own attributes for the custom JsValue traits here
    const structMacroString = `
        #[derive(CandidType, Deserialize, AzleIntoJsValue, AzleTryFromJsValue)]
        struct Dummy {}
    `;
    const structMacroAst: AST = JSON.parse(parseFile(structMacroString));

    return structMacroAst.items[0].struct?.attrs;
}

function modifyItems(
    items: Item[],
    attrsWithSerialize: any[] | undefined
): Item[] {
    // the printAst function seems to have a bug that removes the , from the CallResult tuple, thus I just filter out the impl with the generated methods (they are not needed)
    return items.filter((item) => item.impl === undefined).map((item) => {
        if (
            item.struct !== undefined &&
            item.struct.ident !== 'SERVICE' // We do not want to modify the automatically generated SERVICE struct
        ) {
            return {
                struct: modifyStruct(
                    item.struct,
                    attrsWithSerialize
                )
            };
        }

        if (item.enum !== undefined) {
            return {
                enum: modifyEnum(
                    item.enum,
                    attrsWithSerialize
                )
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

function modifyEnum(
    enum_: Enum,
    attrsWithSerialize: any[] | undefined
): Enum {
    return {
        ...enum_,
        attrs: attrsWithSerialize
    };
}
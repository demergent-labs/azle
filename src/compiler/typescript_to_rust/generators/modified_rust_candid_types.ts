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

    // TODO Remove this once these issues are resolved: https://forum.dfinity.org/t/deserialize-to-candid-nat/8192/16, https://github.com/dfinity/candid/issues/331
    const printedASTNatReplacedWithU128 = printedAST.replace(/candid :: Nat/g, 'u128');

    return printedASTNatReplacedWithU128;
}

function getAttrsWithSerialize(): any[] | undefined {
    const structMacroString = `
        #[derive(CandidType, Deserialize, serde::Serialize)]
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
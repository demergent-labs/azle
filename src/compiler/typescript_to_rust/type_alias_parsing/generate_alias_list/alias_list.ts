import * as ts from 'typescript';
import { isSymbolFromAzle } from './is_from_azle';
import { debug } from '../utils/debug';

export function generateAliasListFromSymbolTable(
    symbolTable: ts.SymbolTable,
    program: ts.Program
): string[] {
    let aliasTable: string[] = [];
    // ts.SymbolTable does not use regular iterator conventions thus it's
    // difficult to turn it into an array, so we have to use forEach instead of
    // reduce here
    symbolTable.forEach((symbol, name) => {
        if (name === 'Unused3') {
            debug.print = true;
        }
        if ((name as string).includes('Unused')) {
            console.log(name);
        }
        if (isSymbolTypeAliasDeclaration(symbol)) {
            if (isSymbolFromAzle(symbol, name as string, program)) {
                aliasTable = [...aliasTable, name as string];
            }
        }
        debug.print = false;
    });

    return aliasTable;
}

// TODO move this to utils and use it everywhere you can
function isNullKeyword(node: ts.Node): boolean {
    if (node.kind === ts.SyntaxKind.LiteralType) {
        if ('literal' in node) {
            let literal = node.literal;
            if (
                typeof literal === 'object' &&
                literal !== null &&
                'kind' in literal
            ) {
                if (literal.kind === ts.SyntaxKind.NullKeyword) {
                    return true;
                }
            }
        }
    }
    return false;
}

function isSymbolTypeAliasDeclaration(symbol: ts.Symbol): boolean {
    const declarations = symbol.declarations;
    if (declarations === undefined || declarations.length !== 1) {
        return false;
    }
    let declaration = declarations[0];
    if (
        ts.isTypeAliasDeclaration(declaration) &&
        (ts.isTypeReferenceNode(declaration.type) ||
            isNullKeyword(declaration.type) ||
            declaration.type.kind === ts.SyntaxKind.NumberKeyword ||
            declaration.type.kind === ts.SyntaxKind.BigIntKeyword ||
            declaration.type.kind === ts.SyntaxKind.StringKeyword ||
            declaration.type.kind === ts.SyntaxKind.VoidKeyword ||
            declaration.type.kind === ts.SyntaxKind.BooleanKeyword)
    ) {
        return true;
    }
    if (debug.print) {
        if (ts.isTypeAliasDeclaration(declaration)) {
            console.log('The reason is because of this');
            console.log(ts.SyntaxKind[declaration.type.kind]);
        }
    }
    console.log();
    return false;
}

import * as ts from 'typescript';
import * as aliasTable from './generate_alias_table/';
import { AliasList, GenerationType } from './types';
import { isNullKeyword } from './utils';

export function generateAliasListFromSymbolTable(
    symbolTable: ts.SymbolTable,
    program: ts.Program,
    generationType: GenerationType
): AliasList {
    let aliasList: AliasList = [];
    // ts.SymbolTable does not use regular iterator conventions thus it's
    // difficult to turn it into an array, so we have to use forEach instead of
    // reduce here
    symbolTable.forEach((symbol, name) => {
        if (isSymbolTypeAliasDeclaration(symbol)) {
            const result = aliasTable.generateForSymbol(
                symbol,
                name as string,
                program,
                generationType
            );
            if (!aliasTable.isEmpty(result)) {
                aliasList = [...aliasList, name as string];
            }
        }
    });

    return aliasList;
}

function isSymbolTypeAliasDeclaration(symbol: ts.Symbol): boolean {
    const declarations = symbol.declarations;
    if (declarations === undefined || declarations.length !== 1) {
        return false;
    }
    const declaration = declarations[0];
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
    return false;
}

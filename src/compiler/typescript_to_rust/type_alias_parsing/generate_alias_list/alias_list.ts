import * as ts from 'typescript';
import { isSymbolFromAzle } from './is_from_azle';
import { isNullKeyword } from '../utils';

export function generateAliasListFromSymbolTable(
    symbolTable: ts.SymbolTable,
    program: ts.Program
): string[] {
    let aliasList: string[] = [];
    // ts.SymbolTable does not use regular iterator conventions thus it's
    // difficult to turn it into an array, so we have to use forEach instead of
    // reduce here
    symbolTable.forEach((symbol, name) => {
        if (isSymbolTypeAliasDeclaration(symbol)) {
            if (isSymbolFromAzle(symbol, name as string, program)) {
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
    return false;
}

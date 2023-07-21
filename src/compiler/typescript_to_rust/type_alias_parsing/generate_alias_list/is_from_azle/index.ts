import * as ts from 'typescript';
import { debug } from '../../utils/debug';
import {
    isExportAssignmentFromAzle,
    isExportDeclarationFromAzle,
    areExportDeclarationsFromAzle,
    isExportSpecifierFromAzle,
    isImportClauseFromAzle,
    isImportSpecifierFromAzle,
    isNamespaceImportExportFromAzle
} from './import_export';
import {
    isAzleTypeAliasDeclaration as isTypeAliasDeclarationFromAzle,
    isAzleVariableDeclaration as isVariableDeclarationFromAzle
} from './type_alias';
import { isAzleSymbol } from '../../utils';

export function isIdentFromAzle(
    ident: ts.Identifier | ts.MemberName,
    alias: string,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): boolean {
    const symbol = symbolTable.get(ident.text as ts.__String);
    if (symbol === undefined) {
        // TODO Couldn't find symbol
        return false;
    }
    return isSymbolFromAzle(symbol, alias, program);
}

export function isSymbolFromAzle(
    symbol: ts.Symbol,
    alias: string,
    program: ts.Program
): boolean {
    if (isAzleSymbol(symbol)) {
        return true;
    }
    const declarations = symbol.declarations;
    if (declarations === undefined || declarations.length === 0) {
        return false; // We need one declaration. If there isn't one then it can't be an export from azle right?
    }
    if (symbol.name === '__export') {
        // Should look like export * from 'place';
        // There are other export declarations, but the only ones that will
        // be a symbol are these unnamed export from clauses
        // TODO I don't know what this looks like. I am having a hard time evitioning this so I'll leave it a lone until it become importatnt
        return false;
        // return isAzleExportDeclarations(
        //     declarations as ts.ExportDeclaration[],
        //     program
        // );
    }
    if (declarations.length > 1) {
        // TODO what kind of symbol has multiple declarations?
        // TODO is it possible for those declarations to be conflicting?
        return false;
    }
    return isDeclarationFromAzle(declarations[0], alias, program);
}

function isDeclarationFromAzle(
    declaration: ts.Declaration,
    alias: string,
    program: ts.Program
): boolean {
    if (debug.print) {
        console.log('This is the kind we are expecting');
        console.log(ts.SyntaxKind[declaration.kind]);
    }
    if (ts.isExportSpecifier(declaration)) {
        // {thing} or {thing as other}
        // as in `export {thing};` or
        // `export {thing as other};`
        return isExportSpecifierFromAzle(declaration, alias, program);
    }
    if (ts.isExportAssignment(declaration)) {
        // export default thing
        return isExportAssignmentFromAzle(declaration, alias, program);
    }
    if (ts.isImportClause(declaration)) {
        // thing
        // as in `import thing from 'place'`
        return isImportClauseFromAzle(declaration, alias, program);
    }
    if (ts.isImportSpecifier(declaration)) {
        // {thing} or {thing as other}
        // as in `import {thing} from 'place'` or
        // `import {thing as other} from 'place'`
        return isImportSpecifierFromAzle(declaration, alias, program);
    }
    if (ts.isTypeAliasDeclaration(declaration)) {
        // export type AliasName = TypeName;
        // type AliasName = TypeName;
        return isTypeAliasDeclarationFromAzle(declaration, alias, program);
    }
    if (ts.isNamespaceImport(declaration)) {
        // import * as thing from 'place'
        // TODO I am mentally struggling with what this would look like... but it seems to compile... so I'll leave it here and see what happens
        return isNamespaceImportExportFromAzle(declaration, program);
    }
    if (ts.isNamespaceExport(declaration)) {
        // export * as thing from 'place';
        // TODO I am mentally struggling with what this would look like... but it seems to compile... so I'll leave it here and see what happens
        return isNamespaceImportExportFromAzle(declaration, program);
    }
    if (ts.isExportDeclaration(declaration)) {
        // export * from 'place'
        // CAUTION: Export Declarations often come in groups (eg export * from
        // 'place' and export * from 'otherPlace' would both be in the list of
        // declarations) and this function is only meant to process one at a
        // time.
        return isExportDeclarationFromAzle(declaration, program);
    }
    if (ts.isVariableDeclaration(declaration)) {
        // export const QueryAlias = azle.$query;
        // export const ServiceAlias = azle.Service;
        return isVariableDeclarationFromAzle(declaration, alias, program);
    }
    if (
        ts.isFunctionDeclaration(declaration) ||
        ts.isClassDeclaration(declaration)
    ) {
        // All of the cases here are known to not need handling and return
        // undefined intentionally
        return false;
    }
    return false;
}

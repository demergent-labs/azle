import * as ts from 'typescript';
import { AliasTable, GenerationType } from '../../types';
import { generateSingleEntryAliasTable } from '../alias_table';
import {
    generateAliasTableForExportAssignment,
    generateAliasTableForExportDeclaration,
    generateAliasTableForExportDeclarations,
    generateAliasTableForExportSpecifier,
    generateAliasTableForImportClause,
    generateAliasTableForImportSpecifier,
    generateAliasTableForNamespaceImportExport
} from './import_export';
import {
    generateAliasTableForTypeAliasDeclaration,
    generateAliasTableForVariableDeclaration
} from './type_alias';
import { isAzleSymbol, getSymbol, returnFalseOrNull } from '../../utils';

const ROBUST_TYPE_ALIASES_IMPLEMENTED = false;

export function generateAliasTableForIdentifier(
    ident: ts.Identifier | ts.MemberName,
    alias: string,
    symbolTable: ts.SymbolTable,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null | boolean {
    if (generationType === 'LIST' && !ROBUST_TYPE_ALIASES_IMPLEMENTED) {
        // TODO get rid of this if block it when working on
        // https://github.com/demergent-labs/azle/issues/1116
        // The feature in that ticket will not work if this is still here
        const symbol = symbolTable.get(ident.text as ts.__String);
        if (symbol === undefined) {
            return false;
        }
        return generateAliasTableForSymbol(
            symbol,
            alias,
            program,
            generationType
        );
    }
    const symbol = getSymbol(ident.text, symbolTable, program);
    if (symbol === undefined) {
        // Couldn't find symbol
        return returnFalseOrNull(generationType);
    }
    return generateAliasTableForSymbol(symbol, alias, program, generationType);
}

export function generateAliasTableForSymbol(
    symbol: ts.Symbol,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null | boolean {
    if (isAzleSymbol(symbol)) {
        if (generationType === 'LIST') return true;
        return generateSingleEntryAliasTable(symbol.name, alias);
    }
    const declarations = symbol.declarations;
    if (declarations === undefined || declarations.length === 0) {
        return returnFalseOrNull(generationType); // We need one declaration. If there isn't one then it can't be an export from azle right?
    }
    if (symbol.name === '__export') {
        // Should look like export * from 'place';
        // There are other export declarations, but the only ones that will
        // be a symbol are these unnamed export from clauses
        return generateAliasTableForExportDeclarations(
            declarations as ts.ExportDeclaration[],
            program,
            generationType
        );
    }
    if (declarations.length > 1) {
        return returnFalseOrNull(generationType);
    }
    return generateAliasTableForDeclaration(
        declarations[0],
        alias,
        program,
        generationType
    );
}

function generateAliasTableForDeclaration(
    declaration: ts.Declaration,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null | boolean {
    if (ts.isExportSpecifier(declaration)) {
        // {thing} or {thing as other}
        // as in `export {thing};` or
        // `export {thing as other};`
        return generateAliasTableForExportSpecifier(
            declaration,
            alias,
            program,
            generationType
        );
    }
    if (ts.isExportAssignment(declaration)) {
        // export default thing
        return generateAliasTableForExportAssignment(
            declaration,
            alias,
            program,
            generationType
        );
    }
    if (ts.isImportClause(declaration)) {
        // thing
        // as in `import thing from 'place'`
        return generateAliasTableForImportClause(
            declaration,
            alias,
            program,
            generationType
        );
    }
    if (ts.isImportSpecifier(declaration)) {
        // {thing} or {thing as other}
        // as in `import {thing} from 'place'` or
        // `import {thing as other} from 'place'`
        return generateAliasTableForImportSpecifier(
            declaration,
            alias,
            program,
            generationType
        );
    }
    if (ts.isTypeAliasDeclaration(declaration)) {
        // export type AliasName = TypeName;
        // type AliasName = TypeName;
        return generateAliasTableForTypeAliasDeclaration(
            declaration,
            alias,
            program,
            generationType
        );
    }
    if (ts.isNamespaceImport(declaration)) {
        // import * as thing from 'place'
        return generateAliasTableForNamespaceImportExport(
            declaration,
            program,
            generationType
        );
    }
    if (ts.isNamespaceExport(declaration)) {
        // export * as thing from 'place';
        return generateAliasTableForNamespaceImportExport(
            declaration,
            program,
            generationType
        );
    }
    if (ts.isExportDeclaration(declaration)) {
        // export * from 'place'
        // CAUTION: Export Declarations often come in groups (eg export * from
        // 'place' and export * from 'otherPlace' would both be in the list of
        // declarations) and this function is only meant to process one at a
        // time.
        return generateAliasTableForExportDeclaration(
            declaration,
            program,
            generationType
        );
    }
    if (ts.isVariableDeclaration(declaration)) {
        // export const QueryAlias = azle.$query;
        // export const ServiceAlias = azle.Service;
        return generateAliasTableForVariableDeclaration(
            declaration,
            alias,
            program,
            generationType
        );
    }
    if (
        ts.isFunctionDeclaration(declaration) ||
        ts.isClassDeclaration(declaration)
    ) {
        // All of the cases here are known to not need handling and return
        // undefined intentionally
        return returnFalseOrNull(generationType);
    }
    return returnFalseOrNull(generationType);
}

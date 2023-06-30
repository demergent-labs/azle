import * as ts from 'typescript';
import { AliasTable } from '../../../utils/types';
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
import { generateAliasTableForTypeAliasDeclaration } from './type_alias';

export function generateAliasTableForSymbol(
    symbol: ts.Symbol,
    alias: string,
    program: ts.Program
): AliasTable | undefined {
    if (isAzleSymbol(symbol)) {
        return generateSingleEntryAliasTable(symbol.name, alias);
    }
    const declarations = symbol.declarations;
    if (declarations === undefined || declarations.length === 0) {
        return undefined; // We need one declaration. If there isn't one then it can't be an export from azle right?
    }
    if (symbol.name === '__export') {
        // Should look like export * from 'place';
        // There are other export declarations, but the only ones that will
        // be a symbol are these unnamed export from clauses
        return generateAliasTableForExportDeclarations(
            declarations as ts.ExportDeclaration[],
            program
        );
    }
    if (declarations.length > 1) {
        // TODO what kind of symbol has multiple declarations?
        // TODO is it possible for those declarations to be conflicting?
        return undefined;
    }
    return generateAliasTableForDeclaration(declarations[0], alias, program);
}

function generateAliasTableForDeclaration(
    declaration: ts.Declaration,
    alias: string,
    program: ts.Program
): AliasTable | undefined {
    if (ts.isExportSpecifier(declaration)) {
        // {thing} or {thing as other}
        // as in `export {thing};` or
        // `export {thing as other};`
        return generateAliasTableForExportSpecifier(
            declaration,
            alias,
            program
        );
    }
    if (ts.isExportAssignment(declaration)) {
        // export default thing
        return generateAliasTableForExportAssignment(
            declaration,
            alias,
            program
        );
    }
    if (ts.isImportClause(declaration)) {
        // thing
        // as in `import thing from 'place'`
        return generateAliasTableForImportClause(declaration, alias, program);
    }
    if (ts.isImportSpecifier(declaration)) {
        // {thing} or {thing as other}
        // as in `import {thing} from 'place'` or
        // `import {thing as other} from 'place'`
        return generateAliasTableForImportSpecifier(
            declaration,
            alias,
            program
        );
    }
    if (ts.isTypeAliasDeclaration(declaration)) {
        // export type AliasName = TypeName;
        // type AliasName = TypeName;
        return generateAliasTableForTypeAliasDeclaration(
            declaration,
            alias,
            program
        );
    }
    if (ts.isNamespaceImport(declaration)) {
        // import * as thing from 'place'
        return generateAliasTableForNamespaceImportExport(declaration, program);
    }
    if (ts.isNamespaceExport(declaration)) {
        // export * as thing from 'place';
        return generateAliasTableForNamespaceImportExport(declaration, program);
    }
    if (ts.isExportDeclaration(declaration)) {
        // export * from 'place'
        // CAUTION: Export Declarations often come in groups (eg export * from
        // 'place' and export * from 'otherPlace' would both be in the list of
        // declarations) and this function is only meant to process one at a
        // time.
        return generateAliasTableForExportDeclaration(declaration, program);
    }
    if (
        ts.isFunctionDeclaration(declaration) ||
        ts.isClassDeclaration(declaration) ||
        ts.isVariableDeclaration(declaration)
    ) {
        // All of the cases here are known to not need handling and return
        // undefined intentionally
        return undefined;
    }
}

// TODO this feels very janky to me. Is there a better way of determining this?
function isAzleSymbol(symbol: ts.Symbol): boolean {
    if ('parent' in symbol) {
        const parent = symbol.parent as ts.Symbol;
        if (parent) {
            if (parent.name.includes('azle/src/lib')) {
                return true;
            }
        }
    }
    return false;
}

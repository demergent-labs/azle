import * as ts from 'typescript';
import * as aliasTable from '../';
import { AliasTable, GenerationType } from '../../types';

export function generateForDeclaration(
    declaration: ts.Declaration,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    if (ts.isExportSpecifier(declaration)) {
        // {thing} or {thing as other}
        // as in `export {thing};` or
        // `export {thing as other};`
        return aliasTable.generateForExportSpecifier(
            declaration,
            alias,
            program,
            generationType
        );
    }
    if (ts.isExportAssignment(declaration)) {
        // export default thing
        return aliasTable.generateForExportAssignment(
            declaration,
            alias,
            program,
            generationType
        );
    }
    if (ts.isImportClause(declaration)) {
        // thing
        // as in `import thing from 'place'`
        return aliasTable.generateForImportClause(
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
        return aliasTable.generateForImportSpecifier(
            declaration,
            alias,
            program,
            generationType
        );
    }
    if (ts.isTypeAliasDeclaration(declaration)) {
        // export type AliasName = TypeName;
        // type AliasName = TypeName;
        return aliasTable.generateForTypeAliasDeclaration(
            declaration,
            alias,
            program,
            generationType
        );
    }
    if (ts.isNamespaceImport(declaration)) {
        // import * as thing from 'place'
        return aliasTable.generateForNamespaceImportExport(
            declaration,
            program,
            generationType
        );
    }
    if (ts.isNamespaceExport(declaration)) {
        // export * as thing from 'place';
        return aliasTable.generateForNamespaceImportExport(
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
        return aliasTable.generateForExportDeclaration(
            declaration,
            program,
            generationType
        );
    }
    if (ts.isVariableDeclaration(declaration)) {
        // export const QueryAlias = azle.$query;
        // export const ServiceAlias = azle.Service;
        return aliasTable.generateForVariableDeclaration(
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
        return null;
    }
    return null;
}

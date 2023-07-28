import * as ts from 'typescript';
import { AliasTable, GenerationType, ModuleSpecifier } from '../../types';
import {
    EMPTY_ALIAS_TABLE,
    renameAliasTable,
    prependNamespaceToAliasTable,
    DEFAULT_ALIAS_TABLE,
    mergeAliasTables
} from '../alias_table';
import * as aliasTable from '../alias_table';
import {
    getSymbolTableForNode,
    getSymbolTableForDeclaration
} from '../../utils/get_symbol_table';
import {
    getDeclarationFromNamespace,
    getDeclarationFromSpecifier,
    getOriginalNameFromSpecifier,
    getModuleSpecifier
} from '../../utils/';
import {
    getSymbolFromModule,
    getSymbolFromExportAssignment,
    getSymbolFromImportExportSpecifier
} from '../../utils/get_symbol';

// Generates an alias table for 'thing' in {thing} or {other as thing} as in:
// `export {thing};` or
// `export {thing as other} from 'place';`
export function generateForExportSpecifier(
    exportSpecifier: ts.ExportSpecifier,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    const exportDecl = getDeclarationFromSpecifier(exportSpecifier);
    if (exportDecl.moduleSpecifier) {
        // If there is a module specifier (ie `export {thing} from 'place'`)
        return generateForModuleImportExportSpecifier(
            exportSpecifier,
            alias,
            program,
            generationType
        );
    }

    // If there is no module specifier (ie `export {thing}`) then the symbol is
    // must be defined locally
    return generateForLocalExportSpecifier(
        exportSpecifier,
        alias,
        program,
        generationType
    );
}

// Generates an alias table for 'thing' as in:
// `export default thing`
export function generateForExportAssignment(
    exportAssignment: ts.ExportAssignment,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    const symbol = getSymbolFromExportAssignment(exportAssignment, program);
    if (symbol === undefined) {
        return null;
    }
    return aliasTable.generateForSymbol(symbol, alias, program, generationType);
}

// Generates an alias table for 'thing' in {thing} or {other as thing} as in:
// `import {thing} from 'place'` or
// `import {other as thing} from 'place'`
export function generateForImportSpecifier(
    importSpecifier: ts.ImportSpecifier,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    return generateForModuleImportExportSpecifier(
        importSpecifier,
        alias,
        program,
        generationType
    );
}

// Generates an alias table for 'thing' as in:
// `import thing from 'place'`
export function generateForImportClause(
    importClause: ts.ImportClause,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    const moduleSpecifier = getModuleSpecifier(importClause.parent);
    if (moduleSpecifier === null) {
        return null;
    }
    let symbol = getSymbolFromModule('default', moduleSpecifier, program);
    if (symbol === undefined) {
        return null;
    }
    return aliasTable.generateForSymbol(symbol, alias, program, generationType);
}

// Generates an alias table for an export declaration as in:
// export * from 'place'
// CAUTION: Export Declarations like this often come in groups (eg export * from
// 'place' and export * from 'otherPlace' would both be in the list of
// declarations) and this function is only meant to process one at a time.
// generateForExportDeclarations() should be called for a list of Export
// Declarations.
export function generateForExportDeclaration(
    exportDeclaration: ts.ExportDeclaration,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    // TODO https://github.com/demergent-labs/azle/issues/1122
    if (generationType === 'LIST') return null;

    if (isAzleDeclaration(exportDeclaration)) {
        return DEFAULT_ALIAS_TABLE;
    }

    const symbolTable = getSymbolTableForDeclaration(
        exportDeclaration,
        program
    );
    if (symbolTable === undefined) return null;

    return aliasTable.generateFromSymbolTable(
        symbolTable,
        program,
        generationType
    );
}

// My expectation is that this will only be called for export declarations in the form:
// `export * from 'thing'`
// My understanding is all other export declarations will be processed in other
// functions because they will fall into the more specific export clause or
// export specifier cases
export function generateForExportDeclarations(
    exportDeclarations: ts.ExportDeclaration[],
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    if (generationType === 'LIST') return null; // TODO https://github.com/demergent-labs/azle/issues/1122
    const aliasTables = exportDeclarations.map((declaration) =>
        generateForExportDeclaration(declaration, program, generationType)
    );
    return aliasTables.reduce((acc: AliasTable, subAliasTable) => {
        if (subAliasTable === null) {
            return { ...acc };
        }
        return { ...mergeAliasTables(acc, subAliasTable) };
    }, EMPTY_ALIAS_TABLE);
}

// The simplest example of this is `export * as namespace from 'azle';` and it
// would generate an alias table that looked like this `{blob: [namespace.blob],
// float32: [namespace.float32], ... vec: [namespace.vec]} which is the
// DEFAULT_ALIAS_TABLE prefixed with the namespace
export function generateForNamespaceImportExport(
    namespace: ts.NamespaceImport | ts.NamespaceExport,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    const importDeclaration = getDeclarationFromNamespace(namespace);
    if (isAzleDeclaration(importDeclaration)) {
        // Process this symbol table the same, then modify it such that every entry has name.whatever
        return prependNamespaceToAliasTable(DEFAULT_ALIAS_TABLE, namespace);
    }
    const symbolTable = getSymbolTableForDeclaration(
        importDeclaration,
        program
    );
    if (symbolTable === undefined) return null;

    const aliasTableResult = aliasTable.generateFromSymbolTable(
        symbolTable,
        program,
        generationType
    );
    if (aliasTableResult === null) return null;

    // process this symbol table the same, then modify it such that every entry has name.whatever
    return prependNamespaceToAliasTable(aliasTableResult, namespace);
}

// export {thing} from 'place'; or export {thing as other} from 'place';
// import {thing} from 'place'; or import {thing as other} from 'place';
function generateForModuleImportExportSpecifier(
    specifier: ts.ExportSpecifier | ts.ImportSpecifier,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    const symbol = getSymbolFromImportExportSpecifier(specifier, program);
    if (symbol === undefined) {
        return null;
    }
    return aliasTable.generateForSymbol(symbol, alias, program, generationType);
}

// export {thing}; or export {thing as other};
function generateForLocalExportSpecifier(
    exportSpecifier: ts.ExportSpecifier,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    const symbolTable = getSymbolTableForNode(exportSpecifier, program);
    if (symbolTable === undefined) {
        return null;
    }

    const name = getOriginalNameFromSpecifier(exportSpecifier);
    // Given `export * from 'moduleThatHasThingFromStarExport'` It is impossible
    // to `export {thingFromStarExport}` so we don't need to consider the
    // __export symbols
    const symbol = symbolTable.get(name.text as ts.__String);
    if (symbol === undefined) {
        return null;
    }

    const aliasTableResult = aliasTable.generateForSymbol(
        symbol,
        alias,
        program,
        generationType
    );
    if (aliasTableResult === null) {
        return null;
    }

    if (isRenamedExport(exportSpecifier)) {
        return renameAliasTable(aliasTableResult, exportSpecifier.name.text);
    }
    return aliasTableResult;
}

/**
 * For `export {thing};` or `export {thing as other};`
 * Returns true if the export was renamed (ie `export {thing as other};`)
 * Otherwise false (ie `export {thing};`)
 * Detail: The exportSpecifier.name will be the name that is used in the file.
 * If the export was renamed the original name will be stored in
 * exportSpecifier.propertyName and the name used in the file will be stored in
 * exportSpecifier.name. If the export was not renamed the original name and the
 * named used in the file will be the same, that name will be in
 * exportSpecifier.name and the exportSpecifier.propertyName will be undefined.
 * So a quick way to tell if the export was renamed is to check to see if
 * exportSpecifier.propertyName is not undefined.
 * @param exportSpecifier
 * @returns
 */
function isRenamedExport(exportSpecifier: ts.ExportSpecifier): boolean {
    return exportSpecifier.propertyName !== undefined;
}

function isAzleModule(moduleSpecifier: ModuleSpecifier) {
    return moduleSpecifier.text === 'azle';
}

function isAzleDeclaration(
    declaration: ts.ExportDeclaration | ts.ImportDeclaration
): boolean {
    const moduleSpecifier = getModuleSpecifier(declaration);
    if (moduleSpecifier === null) {
        return false;
    }
    return isAzleModule(moduleSpecifier);
}

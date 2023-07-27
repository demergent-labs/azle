import * as ts from 'typescript';
import { AliasTable } from '../';
import { GenerationType } from '../../types';
import {
    generateAliasTableFromSymbolTable,
    generateSingleEntryAliasTable,
    EMPTY_ALIAS_TABLE,
    renameAliasTable,
    prependNamespaceToAliasTable,
    DEFAULT_ALIAS_TABLE,
    mergeAliasTables
} from '../alias_table';
import {
    getSymbolTableForNode,
    getSymbolTableForDeclaration,
    getSymbolTableForModuleSpecifier
} from '../../utils/get_symbol_table';
import {
    getDeclarationFromNamespace,
    getDeclarationFromSpecifier,
    getUnderlyingIdentifierFromSpecifier,
    getSymbol
} from '../../utils/';
import { generateAliasTableForSymbol } from '../process_symbol';

// Generates an alias table for 'thing' in {thing} or {other as thing} as in:
// `export {thing};` or
// `export {thing as other} from 'place';`
export function generateAliasTableForExportSpecifier(
    exportSpecifier: ts.ExportSpecifier,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | undefined | boolean {
    const exportDecl = getDeclarationFromSpecifier(exportSpecifier);
    if (exportDecl.moduleSpecifier) {
        // If there is a module specifier (ie `export {thing} from 'place'`)
        return generateAliasTableForModuleImportExportSpecifier(
            exportSpecifier,
            alias,
            program,
            generationType
        );
    }

    // Symbol is not from another module so we will find it locally
    // ie there is no module specifier (ie `export {thing}`)
    return generateAliasTableForLocalExportSpecifier(
        exportSpecifier,
        alias,
        program,
        generationType
    );
}

// Generates an alias table for 'thing' as in:
// `export default thing`
export function generateAliasTableForExportAssignment(
    exportAssignment: ts.ExportAssignment,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | undefined | boolean {
    const typeChecker = program.getTypeChecker();
    const symbol = typeChecker.getSymbolAtLocation(exportAssignment.expression);
    if (symbol) {
        return generateAliasTableForSymbol(
            symbol,
            alias,
            program,
            generationType
        );
    }
}

// Generates an alias table for 'thing' in {thing} or {other as thing} as in:
// `import {thing} from 'place'` or
// `import {other as thing} from 'place'`
export function generateAliasTableForImportSpecifier(
    importSpecifier: ts.ImportSpecifier,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | undefined | boolean {
    return generateAliasTableForModuleImportExportSpecifier(
        importSpecifier,
        alias,
        program,
        generationType
    );
}

// Generates an alias table for 'thing' as in:
// `import thing from 'place'`
export function generateAliasTableForImportClause(
    importClause: ts.ImportClause,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | undefined | boolean {
    if (!ts.isStringLiteral(importClause.parent.moduleSpecifier)) {
        return undefined;
    }
    return generateAliasTableForNameInModule(
        'default',
        importClause.parent.moduleSpecifier,
        alias,
        program,
        generationType
    );
}

// Generates an alias table for an export declaration as in:
// export * from 'place'
// CAUTION: Export Declarations like this often come in groups (eg export * from
// 'place' and export * from 'otherPlace' would both be in the list of
// declarations) and this function is only meant to process one at a time.
// generateAliasTableForExportDeclarations() should be called for a list of
// Export Declarations.
export function generateAliasTableForExportDeclaration(
    exportDeclaration: ts.ExportDeclaration,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | undefined | boolean {
    const moduleSpecifier = exportDeclaration.moduleSpecifier;
    if (moduleSpecifier === undefined || !ts.isStringLiteral(moduleSpecifier)) {
        // Unreachable: An export declaration with a ExportFromClause will
        // always have a FromClause. That FromClause will be `from
        // ModuleSpecifier` and that ModuleSpecifier will always be a
        // StringLiteral
        // https://262.ecma-international.org/13.0/#sec-exports
        return undefined;
    }
    if (exportDeclaration.exportClause) {
        // Unreachable: An export declaration with a * export will never have an
        // exportClause.
        // I don't understand why I thought this was an important check to make.
        // It seems completely unecessary as is. If anything we would want to
        // raise an error here because we shouldn't have gotten here. If we
        // aren't going to do that then there is no reason to have this here
        // https://262.ecma-international.org/13.0/#sec-exports
        return undefined;
    }
    if (moduleSpecifier.text == 'azle') {
        return DEFAULT_ALIAS_TABLE;
    }
    const symbolTable = getSymbolTableForDeclaration(
        exportDeclaration,
        program
    );
    if (symbolTable === undefined) return undefined;

    return generateAliasTableFromSymbolTable(
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
export function generateAliasTableForExportDeclarations(
    exportDeclarations: ts.ExportDeclaration[],
    program: ts.Program,
    generationType: GenerationType
): AliasTable | undefined | boolean {
    const aliasTables = exportDeclarations.map((declaration) =>
        generateAliasTableForExportDeclaration(
            declaration,
            program,
            generationType
        )
    );
    return aliasTables.reduce((acc: AliasTable, subAliasTable) => {
        if (subAliasTable === undefined || typeof subAliasTable === 'boolean') {
            return { ...acc };
        }
        return { ...mergeAliasTables(acc, subAliasTable) };
    }, EMPTY_ALIAS_TABLE);
}

// The simplest example of this is `export * as namespace from 'azle';` and it
// would generate an alias table that looked like this `{blob: [namespace.blob],
// float32: [namespace.float32], ... vec: [namespace.vec]} which is the
// DEFAULT_ALIAS_TABLE prefixed with the namespace
export function generateAliasTableForNamespaceImportExport(
    namespace: ts.NamespaceImport | ts.NamespaceExport,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | undefined | boolean {
    const importDeclaration = getDeclarationFromNamespace(namespace);
    if (
        !importDeclaration.moduleSpecifier ||
        !ts.isStringLiteral(importDeclaration.moduleSpecifier)
    ) {
        return undefined;
    }
    if (importDeclaration.moduleSpecifier.text == 'azle') {
        // Process this symbol table the same, then modify it such that every entry has name.whatever
        return prependNamespaceToAliasTable(DEFAULT_ALIAS_TABLE, namespace);
    }
    const symbolTable = getSymbolTableForDeclaration(
        importDeclaration,
        program
    );
    if (symbolTable === undefined) return undefined;

    const aliasTable = generateAliasTableFromSymbolTable(
        symbolTable,
        program,
        generationType
    );
    if (aliasTable === undefined) return undefined;
    if (typeof aliasTable === 'boolean') return undefined;

    // process this symbol table the same, then modify it such that every entry has name.whatever
    return prependNamespaceToAliasTable(aliasTable, namespace);
}

// TODO make a better name for this
// What is this doing? Where all are we calling it?
// It's called from import/export specifier and from import clause
// The process symbol does a similar thing
// Here we are getting a module. And finding the name in the module so we can get it's symbol
function generateAliasTableForNameInModule(
    name: string,
    moduleSpecifier: ts.StringLiteral,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | undefined | boolean {
    // If the name is from the azle module then we can simply return a single
    // entry alias table here.
    if (moduleSpecifier.text === 'azle') {
        return generateSingleEntryAliasTable(name, alias);
    }
    // Otherwise get the symbol table for the module so we can find the name in
    // there.
    const symbolTable = getSymbolTableForModuleSpecifier(
        moduleSpecifier,
        program
    );
    if (symbolTable === undefined) {
        return undefined;
    }
    const symbol = getSymbol(name, symbolTable, program);
    if (symbol) {
        return generateAliasTableForSymbol(
            symbol,
            alias,
            program,
            generationType
        );
    }
    return undefined;
}

// export {thing} from 'place'; or export {thing as other} from 'place';
// import {thing} from 'place'; or import {thing as other} from 'place';
function generateAliasTableForModuleImportExportSpecifier(
    specifier: ts.ExportSpecifier | ts.ImportSpecifier,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | undefined | boolean {
    const identifier = getUnderlyingIdentifierFromSpecifier(specifier);
    const declaration = getDeclarationFromSpecifier(specifier);

    if (
        !declaration.moduleSpecifier ||
        !ts.isStringLiteral(declaration.moduleSpecifier)
    ) {
        return undefined;
    }
    return generateAliasTableForNameInModule(
        identifier.text,
        declaration.moduleSpecifier,
        alias,
        program,
        generationType
    );
}

// export {thing}; or export {thing as other};
function generateAliasTableForLocalExportSpecifier(
    exportSpecifier: ts.ExportSpecifier,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | undefined | boolean {
    const identifier = getUnderlyingIdentifierFromSpecifier(exportSpecifier);
    // TODO investigate trying to get the original symbol from the above identifier.
    // The commented out code bellow just gets the current symbol instead of the
    // symbol that it comes from. So it literally just goes in circles until we
    // run out of heap
    // const symbol = program.getTypeChecker().getSymbolAtLocation(identifier);
    // if (symbol) {
    //     return processSymbol(originalName, symbol, program);
    // }
    // console.log("========> The new way didn't work");
    const symbolTable = getSymbolTableForNode(exportSpecifier, program);
    if (symbolTable === undefined) {
        return undefined;
    }
    // Given `export * from 'moduleThatHasThingFromStarExport'` It is impossible
    // to `export {thingFromStarExport}` so we don't need to consider the
    // __export symbols
    const symbol = symbolTable.get(identifier.text as ts.__String);
    if (symbol === undefined) {
        return undefined;
    }
    const result = generateAliasTableForSymbol(
        symbol,
        alias,
        program,
        generationType
    );
    if (result === undefined || typeof result === 'boolean') {
        return undefined;
    }

    if (exportSpecifier.propertyName) {
        return renameAliasTable(result, exportSpecifier.name.text);
    }
    return result;
}

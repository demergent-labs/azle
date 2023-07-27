import * as ts from 'typescript';
import { AliasTable, GenerationType } from '../../types';
import {
    generateFromSymbolTable,
    EMPTY_ALIAS_TABLE,
    renameAliasTable,
    prependNamespaceToAliasTable,
    DEFAULT_ALIAS_TABLE,
    mergeAliasTables
} from '../alias_table';
import {
    getSymbolTableForNode,
    getSymbolTableForDeclaration
} from '../../utils/get_symbol_table';
import {
    getDeclarationFromNamespace,
    getDeclarationFromSpecifier,
    getUnderlyingIdentifierFromSpecifier,
    getSymbolFromModule,
    returnFalseOrNull
} from '../../utils/';
import { generateForSymbol } from '../process_symbol';

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

    // Symbol is not from another module so we will find it locally
    // ie there is no module specifier (ie `export {thing}`)
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
    const typeChecker = program.getTypeChecker();
    const symbol = typeChecker.getSymbolAtLocation(exportAssignment.expression);
    if (symbol === undefined) {
        return returnFalseOrNull(generationType);
    }
    return generateForSymbol(symbol, alias, program, generationType);
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
    if (!ts.isStringLiteral(importClause.parent.moduleSpecifier)) {
        return returnFalseOrNull(generationType);
    }
    let symbol = getSymbolFromModule(
        'default',
        importClause.parent.moduleSpecifier,
        program
    );
    if (symbol === undefined) {
        return returnFalseOrNull(generationType);
    }
    return generateForSymbol(symbol, alias, program, generationType);
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
    if (generationType === 'LIST') return null; // TODO https://github.com/demergent-labs/azle/issues/1122
    const moduleSpecifier = exportDeclaration.moduleSpecifier;
    if (moduleSpecifier === undefined || !ts.isStringLiteral(moduleSpecifier)) {
        // Unreachable: An export declaration with a ExportFromClause will
        // always have a FromClause. That FromClause will be `from
        // ModuleSpecifier` and that ModuleSpecifier will always be a
        // StringLiteral
        // https://262.ecma-international.org/13.0/#sec-exports
        return null;
    }
    if (exportDeclaration.exportClause) {
        // Unreachable: An export declaration with a * export will never have an
        // exportClause.
        // I don't understand why I thought this was an important check to make.
        // It seems completely unecessary as is. If anything we would want to
        // raise an error here because we shouldn't have gotten here. If we
        // aren't going to do that then there is no reason to have this here
        // https://262.ecma-international.org/13.0/#sec-exports
        return null;
    }
    if (moduleSpecifier.text == 'azle') {
        return DEFAULT_ALIAS_TABLE;
    }
    const symbolTable = getSymbolTableForDeclaration(
        exportDeclaration,
        program
    );
    if (symbolTable === undefined) return returnFalseOrNull(generationType);

    const result = generateFromSymbolTable(
        symbolTable,
        program,
        generationType
    );
    if (Array.isArray(result)) {
        return null;
    }
    return result;
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
        if (subAliasTable === null || typeof subAliasTable === 'boolean') {
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
    if (
        !importDeclaration.moduleSpecifier ||
        !ts.isStringLiteral(importDeclaration.moduleSpecifier)
    ) {
        return returnFalseOrNull(generationType);
    }
    if (importDeclaration.moduleSpecifier.text == 'azle') {
        // Process this symbol table the same, then modify it such that every entry has name.whatever
        return prependNamespaceToAliasTable(DEFAULT_ALIAS_TABLE, namespace);
    }
    const symbolTable = getSymbolTableForDeclaration(
        importDeclaration,
        program
    );
    if (symbolTable === undefined) return returnFalseOrNull(generationType);

    const aliasTable = generateFromSymbolTable(
        symbolTable,
        program,
        generationType
    );
    if (
        aliasTable === null ||
        (Array.isArray(aliasTable) && aliasTable.length === 0)
    )
        return returnFalseOrNull(generationType);
    if (Array.isArray(aliasTable)) return null;

    // process this symbol table the same, then modify it such that every entry has name.whatever
    return prependNamespaceToAliasTable(aliasTable, namespace);
}

// export {thing} from 'place'; or export {thing as other} from 'place';
// import {thing} from 'place'; or import {thing as other} from 'place';
function generateForModuleImportExportSpecifier(
    specifier: ts.ExportSpecifier | ts.ImportSpecifier,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    const identifier = getUnderlyingIdentifierFromSpecifier(specifier);
    const declaration = getDeclarationFromSpecifier(specifier);

    if (
        !declaration.moduleSpecifier ||
        !ts.isStringLiteral(declaration.moduleSpecifier)
    ) {
        return returnFalseOrNull(generationType);
    }
    const symbol = getSymbolFromModule(
        identifier.text,
        declaration.moduleSpecifier,
        program
    );
    if (symbol === undefined) {
        return returnFalseOrNull(generationType);
    }
    return generateForSymbol(symbol, alias, program, generationType);
}

// export {thing}; or export {thing as other};
function generateForLocalExportSpecifier(
    exportSpecifier: ts.ExportSpecifier,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    const identifier = getUnderlyingIdentifierFromSpecifier(exportSpecifier);

    const symbolTable = getSymbolTableForNode(exportSpecifier, program);
    if (symbolTable === undefined) {
        return returnFalseOrNull(generationType);
    }
    // Given `export * from 'moduleThatHasThingFromStarExport'` It is impossible
    // to `export {thingFromStarExport}` so we don't need to consider the
    // __export symbols
    const symbol = symbolTable.get(identifier.text as ts.__String);
    if (symbol === undefined) {
        return returnFalseOrNull(generationType);
    }
    const result = generateForSymbol(symbol, alias, program, generationType);
    if (result === null || typeof result === 'boolean') {
        return result;
    }

    if (exportSpecifier.propertyName) {
        return renameAliasTable(result, exportSpecifier.name.text);
    }
    return result;
}

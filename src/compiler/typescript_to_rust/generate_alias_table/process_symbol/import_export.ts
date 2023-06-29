import * as ts from 'typescript';
import { AliasTable } from '../../../utils/types';
import {
    generateAliasTableFromSymbolTable,
    generateSingleEntryAliasTable,
    generateEmptyAliasTable,
    renameAliasTable,
    prependNamespaceToAliasTable,
    generateDefaultAliasTable,
    mergeAliasTables
} from '../alias_table';
import {
    getSymbolTable,
    getSymbolTableForDeclaration,
    getSymbolTableForModuleSpecifier
} from '../get_symbol_table';
import {
    getSourceFile,
    getDeclarationFromNamespace,
    getDeclarationFromSpecifier,
    getUnderlyingIdentifierFromSpecifier
} from '../utils';
import { generateAliasTableForSymbol } from '../process_symbol';

// {thing} or {thing as other}
// as in `export {thing};` or
// `export {thing as other} from 'place';`
export function generateAliasTableForExportSpecifier(
    exportSpecifier: ts.ExportSpecifier,
    alias: string,
    program: ts.Program
): AliasTable | undefined {
    const exportDecl = getDeclarationFromSpecifier(exportSpecifier);
    if (exportDecl.moduleSpecifier) {
        return generateAliasTableForModuleImportExportSpecifier(
            exportSpecifier,
            alias,
            program
        );
    }

    // Symbol is not from another module so we will find it locally
    return generateAliasTableForLocalExportSpecifier(
        exportSpecifier,
        alias,
        program
    );
}

export function generateAliasTableForExportAssignment(
    exportAssignment: ts.ExportAssignment,
    alias: string,
    program: ts.Program
): AliasTable | undefined {
    const typeChecker = program.getTypeChecker();
    const symbol = typeChecker.getSymbolAtLocation(exportAssignment.expression);
    if (symbol) {
        return generateAliasTableForSymbol(symbol, alias, program);
    }
}

export function generateAliasTableForImportSpecifier(
    importSpecifier: ts.ImportSpecifier,
    alias: string,
    program: ts.Program
): AliasTable | undefined {
    return generateAliasTableForModuleImportExportSpecifier(
        importSpecifier,
        alias,
        program
    );
}

export function generateAliasTableForImportClause(
    importClause: ts.ImportClause,
    alias: string,
    program: ts.Program
): AliasTable | undefined {
    if (!ts.isStringLiteral(importClause.parent.moduleSpecifier)) {
        return;
    }
    return generateAliasTableForNameInModule(
        'default',
        importClause.parent.moduleSpecifier,
        alias,
        program
    );
}

export function generateAliasTableForExportDeclaration(
    exportDeclaration: ts.ExportDeclaration,
    program: ts.Program
): AliasTable | undefined {
    const moduleSpecifier = exportDeclaration.moduleSpecifier;
    if (!moduleSpecifier || !ts.isStringLiteral(moduleSpecifier)) {
        // Unreachable: An export declaration with a namespace export will always have a FromClause
        // https://262.ecma-international.org/13.0/#sec-exports
        return;
    }
    if (exportDeclaration.exportClause) {
        // Unreachable: An export declaration with a namespace export will never have an ExportClause
        // https://262.ecma-international.org/13.0/#sec-exports
        return;
    }
    if (moduleSpecifier.text == 'azle') {
        return generateDefaultAliasTable();
    }
    const symbolTable = getSymbolTableForDeclaration(
        exportDeclaration,
        program
    );
    if (!symbolTable) {
        return;
    }
    return generateAliasTableFromSymbolTable(symbolTable, program);
}

// My expectation is that this will only be called for export declarations in the form:
// `export * from 'thing'`
// My understanding is all other export declarations will be processed in other
// functions because they will fall into the more specific export clause or
// export specifier cases
export function generateAliasTableForExportDeclarations(
    exportDeclarations: ts.ExportDeclaration[],
    program: ts.Program
): AliasTable | undefined {
    const aliasTables = exportDeclarations.map((declaration) =>
        generateAliasTableForExportDeclaration(declaration, program)
    );
    let aliasTable = generateEmptyAliasTable();
    aliasTables.forEach((subAliasTable) => {
        if (subAliasTable) {
            aliasTable = mergeAliasTables(aliasTable, subAliasTable);
        }
    });
    return aliasTable;
}

export function generateAliasTableForNamespaceImportExport(
    namespace: ts.NamespaceImport | ts.NamespaceExport,
    program: ts.Program
): AliasTable | undefined {
    const importDeclaration = getDeclarationFromNamespace(namespace);
    if (
        !importDeclaration.moduleSpecifier ||
        !ts.isStringLiteral(importDeclaration.moduleSpecifier)
    ) {
        return;
    }
    if (importDeclaration.moduleSpecifier.text == 'azle') {
        // TODO process this symbol table the same, then modify it such that every entry has name.whatever
        return prependNamespaceToAliasTable(
            generateDefaultAliasTable(),
            namespace
        );
    }
    const symbolTable = getSymbolTableForDeclaration(
        importDeclaration,
        program
    );
    if (!symbolTable) {
        return;
    }
    // process this symbol table the same, then modify it such that every entry has name.whatever
    return prependNamespaceToAliasTable(
        generateAliasTableFromSymbolTable(symbolTable, program),
        namespace
    );
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
    program: ts.Program
): AliasTable | undefined {
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
    if (!symbolTable) {
        return;
    }
    // For any symbol it will be resolved as follows:
    // 1) if there is something in the symbol table it will override anything from a * import
    // 2) if not then the symbol will be in the list of start exports
    //      a) if there are two things from two different * exports then that will cause a compiler error

    // So 1) Start by seeing if the symbol is in the list of exports. If so use that symbol
    const symbol = symbolTable.get(name as ts.__String);
    if (symbol) {
        return generateAliasTableForSymbol(symbol, alias, program);
    } else {
        // We couldn't find the symbol in the symbol table for this file
        // So 2) Check if it came from an `export * from 'thing'` declaration
        return generateAliasTableForNameFromStarExport(
            name,
            moduleSpecifier,
            alias,
            program
        );
    }
}

// Get all of the * exports
// get the symbol tables for all of those and check which one has the name we are looking for
function generateAliasTableForNameFromStarExport(
    name: string,
    moduleSpecifier: ts.StringLiteral,
    alias: string,
    program: ts.Program
): AliasTable | undefined {
    const symbolTable = getSymbolTableForModuleSpecifier(
        moduleSpecifier,
        program
    );
    for (const exportDeclaration of symbolTable?.get('__export' as ts.__String)
        ?.declarations ?? []) {
        if (!ts.isExportDeclaration(exportDeclaration)) {
            // All of the declarations under __export should be __export. This
            // check is here only to be super explicit
            continue;
        }
        // Get the module specifiers from export
        const exportModSpecifier = exportDeclaration.moduleSpecifier;
        if (!exportModSpecifier || !ts.isStringLiteral(exportModSpecifier)) {
            // If we don't have an export module specifier or it's not a string
            // literal then it can't have the name in it. We can continue
            // looking
            continue;
        }
        // TODO something is wrong here. It ought to be checking the name right?
        let symbolTable = getSymbolTableForModuleSpecifier(
            exportModSpecifier,
            program
        );
        if (!symbolTable) {
            // If we couldn't find the symbol table then we won't be able to
            // find the name it it
            continue;
        }
        if (!symbolTable.has(name as ts.__String)) {
            // If this export declaration's module's symbol table does have the
            // name we are looking for then move on to the next one
            continue;
        }
        return generateAliasTableForNameInModule(
            name,
            exportModSpecifier,
            alias,
            program
        );
    }
    // return undefined (Couldn't find it)
    return;
}

// export {thing} from 'place'; or export {thing as other} from 'place';
// import {thing} from 'place'; or import {thing as other} from 'place';
function generateAliasTableForModuleImportExportSpecifier(
    specifier: ts.ExportSpecifier | ts.ImportSpecifier,
    alias: string,
    program: ts.Program
): AliasTable | undefined {
    const identifier = getUnderlyingIdentifierFromSpecifier(specifier);
    const declaration = getDeclarationFromSpecifier(specifier);

    if (
        !declaration.moduleSpecifier ||
        !ts.isStringLiteral(declaration.moduleSpecifier)
    ) {
        return;
    }
    return generateAliasTableForNameInModule(
        identifier.text,
        declaration.moduleSpecifier,
        alias,
        program
    );
}

// export {thing}; or export {thing as other};
function generateAliasTableForLocalExportSpecifier(
    exportSpecifier: ts.ExportSpecifier,
    alias: string,
    program: ts.Program
): AliasTable | undefined {
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
    const sourceFile = getSourceFile(exportSpecifier);
    if (!sourceFile) {
        return;
    }
    const symbolTable = getSymbolTable(sourceFile, program);
    if (!symbolTable) {
        return;
    }
    const symbol = symbolTable.get(identifier.text as ts.__String);
    if (!symbol) {
        return;
    }
    const result = generateAliasTableForSymbol(symbol, alias, program);
    if (!result) {
        return;
    }

    if (exportSpecifier.propertyName) {
        return renameAliasTable(result, exportSpecifier.name.text);
    }
    return result;
}

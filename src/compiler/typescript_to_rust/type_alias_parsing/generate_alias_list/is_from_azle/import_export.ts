import * as ts from 'typescript';
import { generateAliasListFromSymbolTable } from '../alias_list';
import {
    getSymbolTableForNode,
    getSymbolTableForDeclaration,
    getSymbolTableForModuleSpecifier
} from '../../utils/get_symbol_table';
import {
    getDeclarationFromNamespace,
    getDeclarationFromSpecifier,
    getUnderlyingIdentifierFromSpecifier,
    getStarExportModuleSpecifierFor
} from '../../utils';
import { isSymbolFromAzle } from '.';

// {thing} or {thing as other}
// as in `export {thing};` or
// `export {thing as other} from 'place';`
export function isExportSpecifierFromAzle(
    exportSpecifier: ts.ExportSpecifier,
    alias: string,
    program: ts.Program
): boolean {
    const exportDecl = getDeclarationFromSpecifier(exportSpecifier);
    if (exportDecl.moduleSpecifier) {
        return isImportExportSpecifierFromAzle(exportSpecifier, alias, program);
    }

    // Symbol is not from another module so we will find it locally
    return isLocalExportSpecifierFromAzle(exportSpecifier, alias, program);
}

// export default thing
export function isExportAssignmentFromAzle(
    exportAssignment: ts.ExportAssignment,
    alias: string,
    program: ts.Program
): boolean {
    const typeChecker = program.getTypeChecker();
    const symbol = typeChecker.getSymbolAtLocation(exportAssignment.expression);
    if (symbol) {
        return isSymbolFromAzle(symbol, alias, program);
    }
    return false;
}

export function isImportSpecifierFromAzle(
    importSpecifier: ts.ImportSpecifier,
    alias: string,
    program: ts.Program
): boolean {
    return isImportExportSpecifierFromAzle(importSpecifier, alias, program);
}

export function isImportClauseFromAzle(
    importClause: ts.ImportClause,
    alias: string,
    program: ts.Program
): boolean {
    if (!ts.isStringLiteral(importClause.parent.moduleSpecifier)) {
        return false;
    }
    return isNameInModuleFromAzle(
        'default',
        importClause.parent.moduleSpecifier,
        alias,
        program
    );
}

export function isExportDeclarationFromAzle(
    exportDeclaration: ts.ExportDeclaration,
    program: ts.Program
): boolean {
    return false;
    // TODO I am having a hard time imagining what this looks like.. so I'll save it for later
    // const moduleSpecifier = exportDeclaration.moduleSpecifier;
    // if (moduleSpecifier === undefined || !ts.isStringLiteral(moduleSpecifier)) {
    //     // Unreachable: An export declaration with a namespace export will always have a FromClause
    //     // https://262.ecma-international.org/13.0/#sec-exports
    //     return false;
    // }
    // if (exportDeclaration.exportClause) {
    //     // Unreachable: An export declaration with a namespace export will never have an ExportClause
    //     // https://262.ecma-international.org/13.0/#sec-exports
    //     return false;
    // }
    // if (moduleSpecifier.text == 'azle') {
    //     return true;
    // }
    // const symbolTable = getSymbolTableForDeclaration(
    //     exportDeclaration,
    //     program
    // );
    // if (symbolTable === undefined) return false;

    // return generateAliasListFromSymbolTable(symbolTable, program);
}

// My expectation is that this will only be called for export declarations in the form:
// `export * from 'thing'`
// My understanding is all other export declarations will be processed in other
// functions because they will fall into the more specific export clause or
// export specifier cases
export function areExportDeclarationsFromAzle(
    exportDeclarations: ts.ExportDeclaration[],
    program: ts.Program
): boolean {
    // TODO I  don't know what this looks like right now
    return false;
}

export function isNamespaceImportExportFromAzle(
    namespace: ts.NamespaceImport | ts.NamespaceExport,
    program: ts.Program
): boolean {
    const importDeclaration = getDeclarationFromNamespace(namespace);
    if (
        !importDeclaration.moduleSpecifier ||
        !ts.isStringLiteral(importDeclaration.moduleSpecifier)
    ) {
        return false;
    }
    if (importDeclaration.moduleSpecifier.text == 'azle') {
        // TODO process this symbol table the same, then modify it such that every entry has name.whatever
        return true;
    }
    const symbolTable = getSymbolTableForDeclaration(
        importDeclaration,
        program
    );
    if (symbolTable === undefined) return false;

    const aliasTable = generateAliasListFromSymbolTable(symbolTable, program);
    if (aliasTable === undefined) return false;

    // process this symbol table the same, then modify it such that every entry has name.whatever
    return true;
}

// TODO make a better name for this
// What is this doing? Where all are we calling it?
// It's called from import/export specifier and from import clause
// The process symbol does a similar thing
// Here we are getting a module. And finding the name in the module so we can get it's symbol
export function isNameInModuleFromAzle(
    name: string,
    moduleSpecifier: ts.StringLiteral,
    alias: string,
    program: ts.Program
): boolean {
    // If the name is from the azle module then we can simply return a single
    // entry alias table here.
    if (moduleSpecifier.text === 'azle') {
        return true;
    }
    // Otherwise get the symbol table for the module so we can find the name in
    // there.
    const symbolTable = getSymbolTableForModuleSpecifier(
        moduleSpecifier,
        program
    );
    if (symbolTable === undefined) {
        return false;
    }
    // For any symbol it will be resolved as follows:
    // 1) if there is something in the symbol table it will override anything from a * import
    // 2) if not then the symbol will be in the list of start exports
    //      a) if there are two things from two different * exports then that will cause a compiler error

    // So 1) Start by seeing if the symbol is in the list of exports. If so use that symbol
    const symbol = symbolTable.get(name as ts.__String);
    if (symbol) {
        return isSymbolFromAzle(symbol, alias, program);
    } else {
        // We couldn't find the symbol in the symbol table for this file
        // So 2) Check if it came from an `export * from 'thing'` declaration
        return isNameInModulesStarExportFromAzle(
            name,
            moduleSpecifier,
            alias,
            program
        );
    }
}

// Get all of the * exports
// get the symbol tables for all of those and check which one has the name we are looking for
function isNameInModulesStarExportFromAzle(
    name: string,
    moduleSpecifier: ts.StringLiteral,
    alias: string,
    program: ts.Program
): boolean {
    const symbolTable = getSymbolTableForModuleSpecifier(
        moduleSpecifier,
        program
    );
    if (symbolTable === undefined) return false;

    const subModuleSpecifier = getStarExportModuleSpecifierFor(
        name,
        symbolTable,
        program
    );

    if (subModuleSpecifier === undefined) return false;

    return isNameInModuleFromAzle(name, subModuleSpecifier, alias, program);
}

// export {thing} from 'place'; or export {thing as other} from 'place';
// import {thing} from 'place'; or import {thing as other} from 'place';
function isImportExportSpecifierFromAzle(
    specifier: ts.ExportSpecifier | ts.ImportSpecifier,
    alias: string,
    program: ts.Program
): boolean {
    const identifier = getUnderlyingIdentifierFromSpecifier(specifier);
    const declaration = getDeclarationFromSpecifier(specifier);

    if (
        !declaration.moduleSpecifier ||
        !ts.isStringLiteral(declaration.moduleSpecifier)
    ) {
        return false;
    }
    return isNameInModuleFromAzle(
        identifier.text,
        declaration.moduleSpecifier,
        alias,
        program
    );
}

// export {thing}; or export {thing as other};
function isLocalExportSpecifierFromAzle(
    exportSpecifier: ts.ExportSpecifier,
    alias: string,
    program: ts.Program
): boolean {
    const identifier = getUnderlyingIdentifierFromSpecifier(exportSpecifier);
    const symbolTable = getSymbolTableForNode(exportSpecifier, program);
    if (symbolTable === undefined) {
        return false;
    }
    const symbol = symbolTable.get(identifier.text as ts.__String);
    if (symbol === undefined) {
        return false;
    }
    return isSymbolFromAzle(symbol, alias, program);
}

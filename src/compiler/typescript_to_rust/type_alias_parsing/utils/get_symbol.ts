import * as ts from 'typescript';
import {
    getStarExportModuleSpecifierFor,
    getOriginalNameFromSpecifier,
    getDeclarationFromSpecifier,
    getModuleSpecifier
} from './index';
import { getSymbolTableForModuleSpecifier } from './get_symbol_table';
import { ModuleSpecifier } from '../types';

/**
 * Helper method to find a symbol in a symbol table.
 *
 * When trying to find a symbol in a symbol table it may be in one of two
 * locations.
 *
 * 1) In the main list of symbols
 * 2) In another module that has had all of it's exports dumped into the symbol
 *    table via a `export * from 'place'`
 *
 * Any symbol that is part of the module from 2) will be in the '__export'
 * portions of the symbol table
 *
 * Any symbol directly in the symbol table will override any symbol in the
 * '__export' portion. For example. If a file has `export * from 'azle'` and
 * `type Record = number`, then Record will show up in the main list of symbols
 * as an alias to the number keyword and it will override the definition of
 * Record that comes from azle.
 *
 * So when trying to get a symbol from a symbol table we should first look in
 * the main symbol table to see if we can find a symbol with the name
 * `symbolName`. If we can't then we should look through all of the modules that
 * have been reexported to see if it is defined there.
 *
 * If it is in neither of those spots then undefined is returned to signify that
 * the symbol could not be found.
 *
 * @param symbolName The name of the symbol to look for
 * @param symbolTable the Symbol Table to look in
 * @param program The program associated with the given symbol table
 * @returns The symbol with the given name in the given symbol table if it
 * exists, otherwise undefined
 */
export function getSymbol(
    symbolName: string,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.Symbol | undefined {
    const symbol = symbolTable.get(symbolName as ts.__String);
    if (symbol === undefined) {
        const exportModSpecifier = getStarExportModuleSpecifierFor(
            symbolName,
            symbolTable,
            program
        );

        if (exportModSpecifier === null) return undefined;

        const subSymbolTable = getSymbolTableForModuleSpecifier(
            exportModSpecifier,
            program
        );

        return subSymbolTable?.get(symbolName as ts.__String);
    }
    return symbol;
}

export function getSymbolFromModule(
    name: string,
    moduleSpecifier: ModuleSpecifier,
    program: ts.Program
): ts.Symbol | undefined {
    const symbolTable = getSymbolTableForModuleSpecifier(
        moduleSpecifier,
        program
    );
    if (symbolTable === undefined) {
        return undefined;
    }
    return getSymbol(name, symbolTable, program);
}

export function getSymbolFromExportAssignment(
    exportAssignment: ts.ExportAssignment,
    program: ts.Program
) {
    const typeChecker = program.getTypeChecker();
    return typeChecker.getSymbolAtLocation(exportAssignment.expression);
}

// export {thing} from 'place'; or export {thing as other} from 'place';
// import {thing} from 'place'; or import {thing as other} from 'place';
export function getSymbolFromImportExportSpecifier(
    specifier: ts.ExportSpecifier | ts.ImportSpecifier,
    program: ts.Program
): ts.Symbol | undefined {
    const identifier = getOriginalNameFromSpecifier(specifier);
    const declaration = getDeclarationFromSpecifier(specifier);
    const moduleSpecifier = getModuleSpecifier(declaration);

    if (moduleSpecifier === null) {
        return undefined;
    }
    return getSymbolFromModule(identifier.text, moduleSpecifier, program);
}

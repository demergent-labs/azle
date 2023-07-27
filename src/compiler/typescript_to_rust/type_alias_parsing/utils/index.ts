import * as ts from 'typescript';
import { getSymbolTableForModuleSpecifier } from './get_symbol_table';
import { GenerationType } from '../types';

// TODO this feels very janky to me. Is there a better way of determining this?
export function isAzleSymbol(symbol: ts.Symbol): boolean {
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

export function isAzleKeywordExpression(
    typeAliasDeclaration: ts.TypeAliasDeclaration | ts.VariableDeclaration
): boolean {
    const sourceFile = getSourceFile(typeAliasDeclaration);
    if (sourceFile === undefined) {
        return false;
    }
    return sourceFile.fileName.includes('azle/src/lib');
}

export function getSourceFile(node: ts.Node): ts.SourceFile | undefined {
    if (ts.isSourceFile(node)) {
        return node;
    }
    if (node.parent === undefined) {
        return undefined;
    }
    return getSourceFile(node.parent);
}

export function getDeclarationFromNamespace(
    namespace: ts.NamespaceImport | ts.NamespaceExport
): ts.ImportDeclaration | ts.ExportDeclaration {
    if (ts.isNamespaceImport(namespace)) {
        return namespace.parent.parent;
    } else {
        return namespace.parent;
    }
}

export function getUnderlyingIdentifierFromSpecifier(
    specifier: ts.ExportSpecifier | ts.ImportSpecifier
): ts.Identifier {
    // e.g. 'thing' in '{thing}' or '{thing as other}'. 'thing' is the symbol we
    // care about. At this point we don't care what it got renamed to, only what
    // it resolves back to.
    if (specifier.propertyName === undefined) {
        // If there is no property name then it was NOT renamed
        return specifier.name;
    } else {
        // If there is a propertyName then it WAS renamed and the property name is the original name before it was renamed
        return specifier.propertyName;
    }
}

export function getDeclarationFromSpecifier(
    specifier: ts.ExportSpecifier | ts.ImportSpecifier
): ts.ImportDeclaration | ts.ExportDeclaration {
    if (ts.isImportSpecifier(specifier)) {
        return specifier.parent.parent.parent;
    } else {
        return specifier.parent.parent;
    }
}

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

/**
 * This function helps to find the original module that a symbol comes from. If
 * a file has multiple export * from 'place' then we may have to look through
 * all of them to find the symbol. This function does that by looping through
 * all of those __export declarations in the symbolTable looking for the
 * keyToKind
 * @param keyToFind
 * @param symbolTable
 * @param program
 * @returns
 */
export function getStarExportModuleSpecifierFor(
    keyToFind: string,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.StringLiteral | null {
    for (const exportDeclaration of symbolTable.get('__export' as ts.__String)
        ?.declarations ?? []) {
        if (!ts.isExportDeclaration(exportDeclaration)) {
            // All of the declarations under __export should be __export. This
            // check is here only to be super explicit
            continue;
        }
        // Get the module specifiers from export
        const exportModSpecifier = exportDeclaration.moduleSpecifier;
        if (
            exportModSpecifier === undefined ||
            !ts.isStringLiteral(exportModSpecifier)
        ) {
            // If we don't have an export module specifier or it's not a string
            // literal then it can't have the name in it. We can continue
            // looking
            continue;
        }
        // TODO something is wrong here. It ought to be checking the name right?
        const subSymbolTable = getSymbolTableForModuleSpecifier(
            exportModSpecifier,
            program
        );
        if (subSymbolTable === undefined) {
            // If we couldn't find the symbol table then we won't be able to
            // find the name it it
            continue;
        }
        if (!subSymbolTable.has(keyToFind as ts.__String)) {
            // If this export declaration's module's symbol table does have the
            // name we are looking for then move on to the next one
            continue;
        }
        return exportModSpecifier;
    }
    return null;
}

export function isNullKeyword(node: ts.Node): boolean {
    if (node.kind === ts.SyntaxKind.LiteralType) {
        if ('literal' in node) {
            let literal = node.literal;
            if (
                typeof literal === 'object' &&
                literal !== null &&
                'kind' in literal
            ) {
                if (literal.kind === ts.SyntaxKind.NullKeyword) {
                    return true;
                }
            }
        }
    }
    return false;
}

export function returnFalseOrNull(
    generationType: GenerationType
): boolean | null {
    if (generationType === 'LIST') return false;
    return null;
}

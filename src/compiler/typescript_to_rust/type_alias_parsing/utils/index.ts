import * as ts from 'typescript';
import { getSymbolTableForModuleSpecifier } from './get_symbol_table';

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
): ts.StringLiteral | undefined {
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
}

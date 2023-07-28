import * as ts from 'typescript';
import { getSymbolTableForModuleSpecifier } from './get_symbol_table';
import { ModuleSpecifier } from '../types';

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

export function isAzleDeclaration(
    declaration: ts.ExportDeclaration | ts.ImportDeclaration
): boolean {
    const moduleSpecifier = getModuleSpecifier(declaration);
    if (moduleSpecifier === null) {
        return false;
    }
    return isAzleModule(moduleSpecifier);
}

export function isAzleModule(moduleSpecifier: ModuleSpecifier) {
    return moduleSpecifier.text === 'azle';
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

export function getOriginalNameFromSpecifier(
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
): ModuleSpecifier | null {
    for (const exportDeclaration of symbolTable.get('__export' as ts.__String)
        ?.declarations ?? []) {
        if (!ts.isExportDeclaration(exportDeclaration)) {
            // All of the declarations under __export should be __export. This
            // check is here only to be super explicit
            continue;
        }
        // Get the module specifiers from export
        const exportModSpecifier = getModuleSpecifier(exportDeclaration);
        if (exportModSpecifier === null) {
            continue;
        }
        const subSymbolTable = getSymbolTableForModuleSpecifier(
            exportModSpecifier,
            program
        );
        if (subSymbolTable === undefined) {
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
            const literal = node.literal;
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

export function getModuleSpecifier(
    declaration: ts.ExportDeclaration | ts.ImportDeclaration
): ModuleSpecifier | null {
    // Valid moduleSpecifiers will not be undefined and will be string literals
    if (
        declaration.moduleSpecifier === undefined ||
        !ts.isStringLiteral(declaration.moduleSpecifier)
    ) {
        return null;
    }
    return declaration.moduleSpecifier;
}

// TODO this should be removed as soon as the robust imports epic is completed (https://github.com/demergent-labs/azle/issues/1096)
export let debug: { print: boolean } = { print: false };

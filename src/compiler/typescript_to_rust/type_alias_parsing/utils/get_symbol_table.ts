import * as ts from 'typescript';
import {
    getSourceFile,
    getDeclarationFromNamespace,
    getDeclarationFromSpecifier,
    getOriginalNameFromSpecifier,
    getModuleSpecifier
} from '.';
import { ModuleSpecifier } from '../types';
import { getSymbol } from './get_symbol';

export function getSymbolTable(
    sourceFile: ts.SourceFile,
    program: ts.Program
): ts.SymbolTable | undefined {
    const typeChecker = program.getTypeChecker();
    const sourceFileSymbol = typeChecker.getSymbolAtLocation(sourceFile);

    if (sourceFileSymbol === undefined) {
        // could not make source file symbol from source file
        return undefined;
    }

    const valueDeclaration = sourceFileSymbol.valueDeclaration;

    if (valueDeclaration === undefined) {
        //  There was no value declaration on the source file symbol. I
        //  don't understand what the value declaration is or under what
        //  circumstances we wouldn't have it
        return undefined;
    }

    if (!('locals' in valueDeclaration)) {
        // There was no symbol table in the source file symbol
        return undefined;
    }

    return valueDeclaration.locals as ts.SymbolTable;
}

/**
 * Returns the symbol table for the file that contains the given node
 * @param node
 * @param program
 * @returns
 */
export function getSymbolTableForNode(
    node: ts.Node,
    program: ts.Program
): ts.SymbolTable | undefined {
    const sourceFile = getSourceFile(node);
    if (sourceFile === undefined) {
        // Couldn't find the sourceFile
        return undefined;
    }

    return getSymbolTable(sourceFile, program);
}

/**
 * Returns the symbol table for the file specified in the import or export declaration
 * For Import/Export Declarations of namespace exports
 * @param declaration
 * @param program
 * @returns
 */
export function getSymbolTableForDeclaration(
    declaration: ts.ExportDeclaration | ts.ImportDeclaration,
    program: ts.Program
): ts.SymbolTable | undefined {
    const moduleSpecifier = getModuleSpecifier(declaration);
    if (moduleSpecifier === null) {
        // Unreachable: An export declaration with a namespace export will always have a FromClause
        // https://262.ecma-international.org/13.0/#sec-exports
        return undefined;
    }
    return getSymbolTableForModuleSpecifier(moduleSpecifier, program);
}

export function getSymbolTableForModuleSpecifier(
    moduleSpecifier: ModuleSpecifier,
    program: ts.Program
): ts.SymbolTable | undefined {
    const typeChecker = program.getTypeChecker();
    const symbol = typeChecker.getSymbolAtLocation(moduleSpecifier);
    if (symbol === undefined) {
        return undefined;
    }
    return symbol.exports;
}

export function getSymbolTableForEntityName(
    left: ts.EntityName,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.SymbolTable | undefined {
    if (ts.isIdentifier(left)) {
        return getSymbolTableForLeftIdentifier(left, symbolTable, program);
    } else {
        const leftSymbolTable = getSymbolTableForEntityName(
            left.left,
            symbolTable,
            program
        );
        if (leftSymbolTable === undefined) {
            return undefined;
        }
        return getSymbolTableForRightIdentifier(
            left.right,
            leftSymbolTable,
            program
        );
    }
}

export function getSymbolTableForExpression(
    left: ts.Expression,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.SymbolTable | undefined {
    if (ts.isIdentifier(left)) {
        return getSymbolTableForLeftIdentifier(left, symbolTable, program);
    }
    if (ts.isPropertyAccessExpression(left)) {
        const leftSymbolTable = getSymbolTableForExpression(
            left.expression,
            symbolTable,
            program
        );
        if (leftSymbolTable === undefined) {
            return undefined;
        }
        return getSymbolTableForRightIdentifier(
            left.name,
            leftSymbolTable,
            program
        );
    }
    return undefined;
}

function getSymbolTableForRightIdentifier(
    right: ts.Identifier | ts.MemberName,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.SymbolTable | undefined {
    const rightSymbol = getSymbol(right.text, symbolTable, program);
    if (rightSymbol === undefined) {
        return undefined;
    }
    if (rightSymbol.declarations?.length != 1) {
        return undefined;
    }
    const namespace = rightSymbol.declarations[0];
    // NOTE: My assumption here is that the only way you can get a qualified
    // name that could resolve back to azle is if it's part of a namespace
    // import or export
    if (!ts.isNamespaceImport(namespace) && !ts.isNamespaceExport(namespace)) {
        return undefined;
    }
    const declaration = getDeclarationFromNamespace(namespace);
    return getSymbolTableForDeclaration(declaration, program);
}

function getSymbolTableForLeftIdentifier(
    left: ts.Identifier,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.SymbolTable | undefined {
    const leftSymbol = getSymbol(left.text, symbolTable, program);
    if (leftSymbol === undefined) {
        return undefined;
    }
    if (leftSymbol.declarations?.length != 1) {
        return undefined;
    }
    const declaration = leftSymbol.declarations[0];
    // NOTE: My assumption here is that the only way you can get a left hand
    // side of a qualified name that would resolved back to azle is if it's
    // some sort of import declaration

    // import * as thing from 'place'
    if (ts.isNamespaceImport(declaration)) {
        const importDeclaration = getDeclarationFromNamespace(declaration);
        return getSymbolTableForDeclaration(importDeclaration, program);
    }
    // import {thing as other} from 'place'
    if (ts.isImportSpecifier(declaration)) {
        const importDeclaration = getDeclarationFromSpecifier(declaration);
        const subSymbolTable = getSymbolTableForDeclaration(
            importDeclaration,
            program
        );
        const identifier = getOriginalNameFromSpecifier(declaration);
        const leftSymbol = subSymbolTable?.get(identifier.text as ts.__String);
        if (leftSymbol === undefined) {
            return undefined;
        }
        if (leftSymbol.declarations?.length != 1) {
            return undefined;
        }
        const subDeclaration = leftSymbol.declarations[0];
        // NOTE: My assumption here is that the only way you can get a left hand
        // side of a qualified name that would resolved back to azle is if it's
        // some sort of import declaration
        if (ts.isNamespaceExport(subDeclaration)) {
            const importDeclaration =
                getDeclarationFromNamespace(subDeclaration);
            return getSymbolTableForDeclaration(importDeclaration, program);
        }
    }
    return undefined;
}

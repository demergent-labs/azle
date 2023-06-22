import * as ts from 'typescript';
import { getDeclarationFromNamespace } from './import_export_utils';

export function getSymbolTable(
    filename: string,
    program: ts.Program
): ts.SymbolTable | undefined {
    const sourceFile = program.getSourceFile(filename);
    if (!sourceFile) {
        // Could not get source file from filename
        return;
    }
    return getSymbolTableFromSourceFile(sourceFile, program);
}

export function getSymbolTableFromSourceFile(
    sourceFile: ts.SourceFile,
    program: ts.Program
): ts.SymbolTable | undefined {
    const typeChecker = program.getTypeChecker();
    const sourceFileSymbol = typeChecker.getSymbolAtLocation(sourceFile);

    if (!sourceFileSymbol) {
        // TODO could not make source file symbol from source file
        return;
    }

    const valueDeclaration = sourceFileSymbol.valueDeclaration;

    if (!valueDeclaration) {
        //  There was no value declaration on the source file symbol. I
        //  don't understand what the value declaration is or under what
        //  circumstances we wouldn't have it
        return;
    }

    if (!('locals' in valueDeclaration)) {
        // There was no symbol table in the source file symbol
        return;
    }

    return valueDeclaration.locals as ts.SymbolTable;
}

export function getSymbolTableForNamespace(
    namespace: ts.NamespaceImport | ts.NamespaceExport,
    program: ts.Program
): ts.SymbolTable | undefined {
    const declaration = getDeclarationFromNamespace(namespace);
    return getSymbolTableForDeclaration(declaration, program);
}

// For Import/Export Declarations of namespace exports
export function getSymbolTableForDeclaration(
    declaration: ts.ExportDeclaration | ts.ImportDeclaration,
    program: ts.Program
): ts.SymbolTable | undefined {
    if (!declaration.moduleSpecifier) {
        // Unreachable: An export declaration with a namespace export will always have a FromClause
        // https://262.ecma-international.org/13.0/#sec-exports
        return;
    }
    return getSymbolTableForModuleSpecifier(
        declaration.moduleSpecifier as ts.StringLiteral,
        program
    );
}

export function getSymbolTableForModuleSpecifier(
    moduleSpecifier: ts.StringLiteral,
    program: ts.Program
): ts.SymbolTable | undefined {
    const typeChecker = program.getTypeChecker();
    const symbol = typeChecker.getSymbolAtLocation(moduleSpecifier);
    if (!symbol) {
        return;
    }
    return symbol.exports;
}

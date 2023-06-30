import * as ts from 'typescript';

export function getSymbolTable(
    sourceFile: ts.SourceFile,
    program: ts.Program
): ts.SymbolTable | undefined {
    const typeChecker = program.getTypeChecker();
    const sourceFileSymbol = typeChecker.getSymbolAtLocation(sourceFile);

    if (sourceFileSymbol === undefined) {
        // TODO could not make source file symbol from source file
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

// For Import/Export Declarations of namespace exports
export function getSymbolTableForDeclaration(
    declaration: ts.ExportDeclaration | ts.ImportDeclaration,
    program: ts.Program
): ts.SymbolTable | undefined {
    if (declaration.moduleSpecifier === undefined) {
        // Unreachable: An export declaration with a namespace export will always have a FromClause
        // https://262.ecma-international.org/13.0/#sec-exports
        return undefined;
    }
    if (!ts.isStringLiteral(declaration.moduleSpecifier)) {
        return undefined;
    }
    return getSymbolTableForModuleSpecifier(
        declaration.moduleSpecifier,
        program
    );
}

export function getSymbolTableForModuleSpecifier(
    moduleSpecifier: ts.StringLiteral,
    program: ts.Program
): ts.SymbolTable | undefined {
    const typeChecker = program.getTypeChecker();
    const symbol = typeChecker.getSymbolAtLocation(moduleSpecifier);
    if (symbol === undefined) {
        return undefined;
    }
    return symbol.exports;
}

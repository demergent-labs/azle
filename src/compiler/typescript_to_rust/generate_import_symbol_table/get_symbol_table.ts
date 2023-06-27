import * as ts from 'typescript';
import { Opt } from '../../../lib';

export function getSymbolTable(
    sourceFile: ts.SourceFile,
    program: ts.Program
): Opt<ts.SymbolTable> {
    const typeChecker = program.getTypeChecker();
    const sourceFileSymbol = typeChecker.getSymbolAtLocation(sourceFile);

    if (!sourceFileSymbol) {
        // TODO could not make source file symbol from source file
        return Opt.None;
    }

    const valueDeclaration = sourceFileSymbol.valueDeclaration;

    if (!valueDeclaration) {
        //  There was no value declaration on the source file symbol. I
        //  don't understand what the value declaration is or under what
        //  circumstances we wouldn't have it
        return Opt.None;
    }

    if (!('locals' in valueDeclaration)) {
        // There was no symbol table in the source file symbol
        return Opt.None;
    }

    return Opt.Some(valueDeclaration.locals as ts.SymbolTable);
}

// For Import/Export Declarations of namespace exports
export function getSymbolTableForDeclaration(
    declaration: ts.ExportDeclaration | ts.ImportDeclaration,
    program: ts.Program
): Opt<ts.SymbolTable> {
    if (!declaration.moduleSpecifier) {
        // Unreachable: An export declaration with a namespace export will always have a FromClause
        // https://262.ecma-international.org/13.0/#sec-exports
        return Opt.None;
    }
    return getSymbolTableForModuleSpecifier(
        declaration.moduleSpecifier as ts.StringLiteral,
        program
    );
}

export function getSymbolTableForModuleSpecifier(
    moduleSpecifier: ts.StringLiteral,
    program: ts.Program
): Opt<ts.SymbolTable> {
    const typeChecker = program.getTypeChecker();
    const symbol = typeChecker.getSymbolAtLocation(moduleSpecifier);
    if (!symbol) {
        return Opt.None;
    }
    if (symbol.exports) {
        return Opt.Some(symbol.exports);
    }
    return Opt.None;
}

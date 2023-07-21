import * as ts from 'typescript';
import {
    getSymbolTable,
    getSymbolTableForExpression,
    getSymbolTableForEntityName
} from '../get_symbol_table';
import { debug } from '../debug';
import { isAzleSymbol } from '../process_symbol';

export function generateAliasLists(
    files: string[],
    program: ts.Program
): { [key: string]: string[] } {
    return files.reduce(
        (acc: { [key: string]: string[] }, filename: string) => {
            return {
                ...acc,
                [filename]: generateAliasList(filename, program)
            };
        },
        {}
    );
}

function generateAliasList(filename: string, program: ts.Program): string[] {
    const sourceFile = program.getSourceFile(filename);

    if (
        filename ===
        '/home/bdemann/code/demergent_labs/azle/examples/rust_type_conversions/src/index.ts'
    ) {
        debug.print = false;
    }

    if (sourceFile === undefined) {
        return [];
    }

    const symbolTable = getSymbolTable(sourceFile, program);
    if (symbolTable) {
        return generateAliasListFromSymbolTable(symbolTable, program);
    }

    debug.print = false;

    return [];
}

export function generateAliasListFromSymbolTable(
    symbolTable: ts.SymbolTable,
    program: ts.Program
): string[] {
    let aliasList: string[] = [];
    // ts.SymbolTable does not use regular iterator conventions thus it's
    // difficult to turn it into an array, so we have to use forEach instead of
    // reduce here
    symbolTable.forEach((symbol, name) => {
        // At this point we only want to process the symbol if the symbol is a type reference
        if (isSymbolTypeAliasDeclaration(symbol)) {
            if (isSymbolAzleAlias(symbol, symbolTable, program)) {
                aliasList = [...aliasList, name as string];
            }
        }
    });

    return aliasList;
}

function isSymbolTypeAliasDeclaration(symbol: ts.Symbol): boolean {
    const declarations = symbol.declarations;
    if (declarations === undefined || declarations.length !== 1) {
        return false;
    }
    let declaration = declarations[0];
    if (
        ts.isTypeAliasDeclaration(declaration) &&
        ts.isTypeReferenceNode(declaration.type)
    ) {
        return true;
    }
    return false;
}

export function isSymbolAzleAlias(
    symbol: ts.Symbol,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): boolean {
    if (isAzleSymbol(symbol)) {
        return true;
    }
    const declarations = symbol.declarations;
    if (declarations === undefined || declarations.length !== 1) {
        return false;
    }
    let declaration = declarations[0];
    if (
        ts.isTypeAliasDeclaration(declaration) &&
        ts.isTypeReferenceNode(declaration.type)
    ) {
        return isAzleName(declaration.type.typeName, symbolTable, program);
    }

    if (ts.isTypeAliasDeclaration(declaration)) {
        // TODO
        return false;
    }

    if (ts.isClassDeclaration(declaration)) {
        if (declaration.heritageClauses === undefined) {
            // If the class doesn't extend anything then it can't extend an candid type
            return false;
        }
        return declaration.heritageClauses.some((heritageClause) => {
            return heritageClause.types.some((types) =>
                isAzleExpression(types.expression, symbolTable, program)
            );
        });
    }
    if (ts.isVariableDeclaration(declaration)) {
        if (declaration.initializer === undefined) {
            // If the variable doesn't have an initializer then the initializer can't be an azle type
            return false;
        }
        return isAzleExpression(declaration.initializer, symbolTable, program);
    }
    return false;
}

function isAzleName(
    typeRef: ts.EntityName,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): boolean {
    const symbol = getSymbolForEntityName(typeRef, symbolTable, program);
    if (symbol === undefined) {
        return false;
    }
    return isSymbolAzleAlias(symbol, symbolTable, program);
}

function isAzleExpression(
    typeRef: ts.Expression,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): boolean {
    const symbol = getSymbolForExpression(typeRef, symbolTable, program);
    if (symbol === undefined) {
        return false;
    }
    const result = isSymbolAzleAlias(symbol, symbolTable, program);
    return result;
}

function getSymbolForExpression(
    typeRef: ts.Expression,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.Symbol | undefined {
    if (ts.isIdentifier(typeRef)) {
        return symbolTable.get(typeRef.text as ts.__String);
    }
    if (ts.isPropertyAccessExpression(typeRef)) {
        const declSymbolTable = getSymbolTableForExpression(
            typeRef.expression,
            symbolTable,
            program
        );
        if (declSymbolTable === undefined) {
            return undefined;
        }
        return declSymbolTable.get(typeRef.name.text as ts.__String);
    }
}

function getSymbolForEntityName(
    typeRef: ts.EntityName,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.Symbol | undefined {
    if (ts.isIdentifier(typeRef)) {
        return symbolTable.get(typeRef.text as ts.__String);
    }
    if (ts.isQualifiedName(typeRef)) {
        const declSymbolTable = getSymbolTableForEntityName(
            typeRef.left,
            symbolTable,
            program
        );
        if (declSymbolTable === undefined) {
            return undefined;
        }
        return declSymbolTable.get(typeRef.right.text as ts.__String);
    }
}

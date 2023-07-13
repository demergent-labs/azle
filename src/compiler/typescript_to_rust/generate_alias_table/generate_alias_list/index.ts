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
        '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/type_alias_decls/index.ts'
    ) {
        debug.print = true;
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
    if (debug.print) {
        console.log(1);
        console.log('Here at the top');
        console.log(`Syntax Kind ${ts.SyntaxKind[declaration.kind]}`);
    }
    if (
        ts.isTypeAliasDeclaration(declaration) &&
        ts.isTypeReferenceNode(declaration.type)
    ) {
        return isAzleName(declaration.type.typeName, symbolTable, program);
    }

    if (debug.print) {
        console.log(2);
    }
    if (ts.isTypeAliasDeclaration(declaration)) {
        // TODO
        console.log('===== TypeAliasDeclaration that isnt a type reference');
        console.log(declaration.type);
        console.log('=====================================================');
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
    if (debug.print) {
        console.log(3);
    }
    if (ts.isVariableDeclaration(declaration)) {
        if (declaration.initializer === undefined) {
            // If the variable doesn't have an initializer then the initializer can't be an azle type
            return false;
        }
        console.log(`looking for ${declaration.name.getText()}`);
        return isAzleExpression(declaration.initializer, symbolTable, program);
    }

    if (debug.print) {
        console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
        console.log(declaration);
        console.log(ts.SyntaxKind[declaration.kind]);
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    }
    if (debug.print) {
        console.log(4);
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
    if (debug.print) {
        console.log('Here we go');
    }
    const symbol = getSymbolForExpression(typeRef, symbolTable, program);
    if (symbol === undefined) {
        console.log('symbol was undefinded');
        return false;
    }
    if (debug.print) {
        console.log(symbol.declarations);
    }
    const result = isSymbolAzleAlias(symbol, symbolTable, program);
    console.log(`Is ${typeRef.getText()} an azle expression? ${result}`);
    return result;
}

function getSymbolForExpression(
    typeRef: ts.Expression,
    symbolTable: ts.SymbolTable,
    program: ts.Program
): ts.Symbol | undefined {
    console.log('++++++++++++++++++ THIS IS THE GOOD STUFF');
    if (ts.isIdentifier(typeRef)) {
        console.log(`We are looking for ${typeRef.text} in:`);
        console.log(symbolTable);
        return symbolTable.get(typeRef.text as ts.__String);
    }
    if (ts.isPropertyAccessExpression(typeRef)) {
        const declSymbolTable = getSymbolTableForExpression(
            typeRef.expression,
            symbolTable,
            program
        );
        if (declSymbolTable === undefined) {
            console.log(
                'did you ever consider that we might not be able to find the symbol table?'
            );
            console.log(typeRef.expression.getText());
            return undefined;
        }
        console.log(`We are looking for ${typeRef.name.text} in:`);
        console.log(declSymbolTable);
        return declSymbolTable.get(typeRef.name.text as ts.__String);
    }
    console.log(
        `Did you ever consider that we were looking at a ${
            ts.SyntaxKind[typeRef.kind]
        }`
    );
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

import * as ts from 'typescript';
import * as aliasTable from '.';
import { isAzleSymbol } from '../utils';
import { AliasTable, GenerationType } from '../types';
import { generateForDeclaration } from './generate_for_declarations';

export function generateFromSymbolTable(
    symbolTable: ts.SymbolTable,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    let aliasTableResult = aliasTable.EMPTY;
    // ts.SymbolTable does not use regular iterator conventions thus it's
    // difficult to turn it into an array, so we have to use forEach instead of
    // reduce here
    symbolTable.forEach((symbol, name) => {
        const subAliasTable = generateForSymbol(
            symbol,
            name as string,
            program,
            generationType
        );
        if (subAliasTable !== null) {
            aliasTableResult = aliasTable.merge(
                aliasTableResult,
                subAliasTable
            );
        }
    });

    if (aliasTable.isEmpty(aliasTableResult)) {
        // If the alias table is empty return undefined.
        // We can skip processing a file if it has no alias table. That's easier
        // to determine with undefined than with an empty table
        return null;
    }
    return aliasTableResult;
}

export function generateForSymbol(
    symbol: ts.Symbol,
    alias: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null {
    if (isAzleSymbol(symbol)) {
        if (generationType === 'LIST') return aliasTable.DEFAULT; // TODO https://github.com/demergent-labs/azle/issues/1136
        return aliasTable.generateSingleEntryAliasTable(symbol.name, alias);
    }
    const declarations = symbol.declarations;
    if (declarations === undefined || declarations.length === 0) {
        return null; // We need one declaration. If there isn't one then it can't be an export from azle right?
    }
    if (symbol.name === '__export') {
        // Should look like export * from 'place';
        // There are other export declarations, but the only ones that will
        // be a symbol are these unnamed export from clauses
        return aliasTable.generateForExportDeclarations(
            declarations as ts.ExportDeclaration[],
            program,
            generationType
        );
    }
    if (declarations.length > 1) {
        return null;
    }
    return generateForDeclaration(
        declarations[0],
        alias,
        program,
        generationType
    );
}

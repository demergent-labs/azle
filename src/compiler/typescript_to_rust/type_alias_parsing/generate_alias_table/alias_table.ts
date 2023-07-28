import * as ts from 'typescript';
import * as aliasTable from './process_symbol/alias_table';
import * as aliasTableForSymbol from './generate_for_symbol';
import { AliasTable, GenerationType } from '../types';

export * from './generate_for_declaratiions/alias_table';

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
        const subAliasTable = aliasTableForSymbol.generateForSymbol(
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

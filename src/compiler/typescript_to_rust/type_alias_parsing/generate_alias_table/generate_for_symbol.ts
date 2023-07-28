import * as ts from 'typescript';
import * as aliasTable from './generate_for_declaratiions/alias_table';
import { isAzleSymbol } from '../utils';
import { AliasTable, GenerationType } from '../types';
import { generateForDeclaration } from './generate_for_declaratiions';

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

import { SymbolTable, SymbolTables } from '../../utils/types';
import * as ts from 'typescript';
import {
    generateEmptyAzleSymbolTable as generateEmptyAzleSymbolTable,
    toAzleSymbolTable
} from './azle_symbol_table';
import { getSymbolTable } from './get_symbol_table';
import { timing, generateTimedResults } from './debug';

export function generateAzleSymbolTables(files: string[]): SymbolTables {
    if (timing) {
        return generateTimedResults(files, generateAzleSymbolTable);
    }
    return files.reduce((accumulator: SymbolTables, filename: string) => {
        return {
            ...accumulator,
            [filename]: generateAzleSymbolTable(filename)
        };
    }, {});
}

function generateAzleSymbolTable(filename: string): SymbolTable {
    const sourceFilePath = filename;
    const program = ts.createProgram([sourceFilePath], {});
    const sourceFile = program.getSourceFile(sourceFilePath);

    if (!sourceFile) {
        return generateEmptyAzleSymbolTable();
    }

    const tsSymbolTable = getSymbolTable(sourceFile, program);
    if (tsSymbolTable) {
        const symbolTable = toAzleSymbolTable(tsSymbolTable, program);
        return symbolTable;
    }

    return generateEmptyAzleSymbolTable();
}

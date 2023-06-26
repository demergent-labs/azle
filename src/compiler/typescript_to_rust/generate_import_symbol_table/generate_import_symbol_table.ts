import { SymbolTable, SymbolTables } from '../../utils/types';
import * as ts from 'typescript';
import {
    createEmptyAzleSymbolTable,
    toAzleSymbolTable
} from './azle_symbol_table';
import { getSymbolTable } from './get_symbol_table';
import { timing, generateImportSymbolTableTimed } from './debug';

export function generateImportSymbolTable(files: string[]): SymbolTables {
    if (timing) {
        return generateImportSymbolTableTimed(files, createAzleSymbolTable);
    }
    return files.reduce((accumulator: SymbolTables, filename: string) => {
        return {
            ...accumulator,
            [filename]: createAzleSymbolTable(filename)
        };
    }, {});
}

function createAzleSymbolTable(filename: string): SymbolTable {
    const sourceFilePath = filename;
    const program = ts.createProgram([sourceFilePath], {});
    const sourceFile = program.getSourceFile(sourceFilePath);

    if (!sourceFile) {
        return createEmptyAzleSymbolTable();
    }

    const tsSymbolTable = getSymbolTable(filename, program);
    if (tsSymbolTable) {
        const symbolTable = toAzleSymbolTable(tsSymbolTable, program);
        return symbolTable;
    }

    return createEmptyAzleSymbolTable();
}

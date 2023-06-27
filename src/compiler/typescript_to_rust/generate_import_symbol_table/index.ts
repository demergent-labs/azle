import { SymbolTable, SymbolTables } from '../../utils/types';
import * as ts from 'typescript';
import { generateAzleSymbolTableFromTsSymbolTable } from './azle_symbol_table';
import { getSymbolTable } from './get_symbol_table';
import { timing, generateTimedResults } from './debug';

export function generateAzleSymbolTables(files: string[]): SymbolTables {
    if (timing) {
        return generateTimedResults(files, generateAzleSymbolTable);
    }
    return files.reduce((acc: SymbolTables, filename: string) => {
        let azleSymbolTable = generateAzleSymbolTable(filename);
        if (!azleSymbolTable) {
            return acc;
        }
        return {
            ...acc,
            [filename]: azleSymbolTable
        };
    }, {});
}

function generateAzleSymbolTable(filename: string): SymbolTable | undefined {
    const sourceFilePath = filename;
    const program = ts.createProgram([sourceFilePath], {});
    const sourceFile = program.getSourceFile(sourceFilePath);

    if (!sourceFile) {
        return;
    }

    const tsSymbolTable = getSymbolTable(sourceFile, program);
    if (tsSymbolTable) {
        return generateAzleSymbolTableFromTsSymbolTable(tsSymbolTable, program);
    }

    return;
}

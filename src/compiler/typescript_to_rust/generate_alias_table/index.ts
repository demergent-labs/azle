import { AliasTable, AliasTables } from '../../utils/types';
import * as ts from 'typescript';
import { generateAliasTableFromSymbolTable } from './alias_table';
import { getSymbolTable } from './get_symbol_table';
import { timing, generateTimedResults } from './debug';

export function generateAliasTables(files: string[]): AliasTables {
    if (timing) {
        return generateTimedResults(files, generateAliasTable);
    }
    return files.reduce((acc: AliasTables, filename: string) => {
        let aliasTable = generateAliasTable(filename);
        if (!aliasTable) {
            return acc;
        }
        return {
            ...acc,
            [filename]: aliasTable
        };
    }, {});
}

function generateAliasTable(filename: string): AliasTable | undefined {
    // TODO should we only create program for the entry point?
    const program = ts.createProgram([filename], {});
    const sourceFile = program.getSourceFile(filename);

    if (!sourceFile) {
        return;
    }

    const symbolTable = getSymbolTable(sourceFile, program);
    if (symbolTable) {
        return generateAliasTableFromSymbolTable(symbolTable, program);
    }

    return;
}

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
    const sourceFilePath = filename;
    const program = ts.createProgram([sourceFilePath], {});
    const sourceFile = program.getSourceFile(sourceFilePath);

    if (!sourceFile) {
        return;
    }

    const symbolTable = getSymbolTable(sourceFile, program);
    if (symbolTable) {
        return generateAliasTableFromSymbolTable(symbolTable, program);
    }

    return;
}

import { AliasTable, AliasTables } from '../../utils/types';
import * as ts from 'typescript';
import { generateAliasTableFromSymbolTable } from './alias_table';
import { getSymbolTable } from './get_symbol_table';

export function generateAliasTables(
    files: string[],
    program: ts.Program
): AliasTables {
    return files.reduce((acc: AliasTables, filename: string) => {
        let aliasTable = generateAliasTable(filename, program);
        if (!aliasTable) {
            return acc;
        }
        return {
            ...acc,
            [filename]: aliasTable
        };
    }, {});
}

function generateAliasTable(
    filename: string,
    program: ts.Program
): AliasTable | undefined {
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

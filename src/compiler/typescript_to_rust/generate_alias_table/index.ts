import { AliasTable, AliasTables } from '../../utils/types';
import * as ts from 'typescript';
import { generateAliasTableFromSymbolTable } from './alias_table';
import { getSymbolTable } from './get_symbol_table';
import { debug } from './debug';

export function generateAliasTables(
    files: string[],
    program: ts.Program
): AliasTables {
    return files.reduce((acc: AliasTables, filename: string) => {
        const aliasTable = generateAliasTable(filename, program);
        if (aliasTable === undefined) {
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

    if (sourceFile === undefined) {
        return undefined;
    }

    const symbolTable = getSymbolTable(sourceFile, program);
    if (symbolTable) {
        return generateAliasTableFromSymbolTable(symbolTable, program);
    }

    return undefined;
}

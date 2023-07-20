import * as ts from 'typescript';
import { generateAliasListFromSymbolTable } from './alias_list';
import { getSymbolTable } from './get_symbol_table';
import { debug } from './debug';

export function generateAliasLists(
    files: string[],
    program: ts.Program
): { [key: string]: string[] } {
    return files.reduce(
        (acc: { [key: string]: string[] }, filename: string) => {
            return {
                ...acc,
                [filename]: generateAliasList(filename, program)
            };
        },
        {}
    );
}

function generateAliasList(filename: string, program: ts.Program): string[] {
    const sourceFile = program.getSourceFile(filename);

    if (sourceFile === undefined) {
        return [];
    }

    const symbolTable = getSymbolTable(sourceFile, program);
    if (symbolTable) {
        return generateAliasListFromSymbolTable(symbolTable, program);
    }

    return [];
}

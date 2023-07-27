import * as ts from 'typescript';
import { generateAliasListFromSymbolTable } from './alias_list';
import { getSymbolTable } from '../utils/get_symbol_table';
import { GenerationType } from '../types';

export type AliasLists = { [filename: string]: string[] };

export function generateAliasLists(
    files: string[],
    program: ts.Program,
    generationType: GenerationType
): { [key: string]: string[] } {
    return files.reduce(
        (acc: { [key: string]: string[] }, filename: string) => {
            return {
                ...acc,
                [filename]: generateAliasList(filename, program, generationType)
            };
        },
        {}
    );
}

function generateAliasList(
    filename: string,
    program: ts.Program,
    generationType: GenerationType
): string[] {
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

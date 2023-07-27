import * as ts from 'typescript';
import { generateAliasTableFromSymbolTable } from './alias_table';
import { getSymbolTable } from '../utils/get_symbol_table';
import {
    AliasTable,
    AliasTables,
    GenerationType,
    AliasLists,
    AliasListsOrTables
} from '../types';

export function generateAliasTables(
    files: string[],
    program: ts.Program,
    generationType: GenerationType
): AliasTables | AliasLists {
    const result = files.reduce((acc: AliasListsOrTables, filename: string) => {
        const aliasTableOrList = generateAliasTable(
            filename,
            program,
            generationType
        );
        if (aliasTableOrList === null) {
            return acc;
        }
        return {
            ...acc,
            [filename]: aliasTableOrList
        };
    }, {});
    if (generationType === 'TABLE') {
        return result as AliasTables;
    }
    return result as AliasLists;
}

function generateAliasTable(
    filename: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null | string[] {
    const sourceFile = program.getSourceFile(filename);

    if (sourceFile === undefined) {
        if (generationType === 'LIST') return [];
        return null;
    }

    const symbolTable = getSymbolTable(sourceFile, program);
    if (symbolTable !== undefined) {
        return generateAliasTableFromSymbolTable(
            symbolTable,
            program,
            generationType
        );
    }

    if (generationType === 'LIST') return [];
    return null;
}

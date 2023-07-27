import * as ts from 'typescript';
import { generateFromSymbolTable } from './alias_table';
import { getSymbolTable } from '../utils/get_symbol_table';
import {
    AliasTable,
    AliasTables,
    GenerationType,
    AliasList,
    AliasLists,
    AliasListsOrTables
} from '../types';

export function generateAll(
    files: string[],
    program: ts.Program,
    generationType: GenerationType
): AliasTables | AliasLists {
    const result = files.reduce((acc: AliasListsOrTables, filename: string) => {
        const aliasTableOrList = generate(filename, program, generationType);
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

function generate(
    filename: string,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | null | AliasList {
    const sourceFile = program.getSourceFile(filename);

    if (sourceFile === undefined) {
        if (generationType === 'LIST') return [];
        return null;
    }

    const symbolTable = getSymbolTable(sourceFile, program);
    if (symbolTable !== undefined) {
        return generateFromSymbolTable(symbolTable, program, generationType);
    }

    if (generationType === 'LIST') return [];
    return null;
}

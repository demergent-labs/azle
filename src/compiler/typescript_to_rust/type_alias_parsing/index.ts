import * as ts from 'typescript';
import * as aliasTable from './generate_alias_table';
import * as aliasList from './generate_alias_list';
import { getSymbolTable } from './utils/get_symbol_table';
import {
    AliasTable,
    AliasTables,
    GenerationType,
    AliasList,
    AliasLists,
    AliasListsOrTables
} from './types';

export function generateAliasStructures(
    files: string[],
    program: ts.Program,
    generationType: GenerationType
): AliasTables | AliasLists {
    const result = files.reduce((acc: AliasListsOrTables, filename: string) => {
        const aliasTableOrList = generateAliasStructure(
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

function generateAliasStructure(
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
    if (symbolTable === undefined) {
        if (generationType === 'LIST') return [];
        return null;
    }

    if (generationType === 'LIST') {
        return aliasList.generateAliasListFromSymbolTable(
            symbolTable,
            program,
            generationType
        );
    }
    return aliasTable.generateFromSymbolTable(
        symbolTable,
        program,
        generationType
    );
}

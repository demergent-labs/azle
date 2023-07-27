import * as ts from 'typescript';
import { generateAliasTableFromSymbolTable } from './alias_table';
import { getSymbolTable } from '../utils/get_symbol_table';
import { AliasTable, AliasTables } from './types';
export { AliasTable, AliasTables } from './types';
import { GenerationType, AliasLists } from '../types';

export function generateAliasTables(
    files: string[],
    program: ts.Program,
    generationType: GenerationType
): AliasTables | AliasLists {
    if (generationType === 'LIST') {
        return files.reduce(
            (acc: { [key: string]: string[] }, filename: string) => {
                const aliasList = generateAliasTable(
                    filename,
                    program,
                    generationType
                );
                if (!Array.isArray(aliasList)) {
                    return acc;
                }
                return {
                    ...acc,
                    [filename]: aliasList
                };
            },
            {}
        );
    }
    return files.reduce((acc: AliasTables, filename: string) => {
        const aliasTable = generateAliasTable(
            filename,
            program,
            generationType
        );
        if (aliasTable === undefined || Array.isArray(aliasTable)) {
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
    program: ts.Program,
    generationType: GenerationType
): AliasTable | undefined | string[] {
    const sourceFile = program.getSourceFile(filename);

    if (sourceFile === undefined) {
        if (generationType === 'LIST') return [];
        return undefined;
    }

    const symbolTable = getSymbolTable(sourceFile, program);
    if (symbolTable) {
        return generateAliasTableFromSymbolTable(
            symbolTable,
            program,
            generationType
        );
    }

    if (generationType === 'LIST') return [];
    return undefined;
}

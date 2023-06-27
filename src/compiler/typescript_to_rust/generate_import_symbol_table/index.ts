import { SymbolTable, SymbolTables } from '../../utils/types';
import * as ts from 'typescript';
import {
    generateEmptyAzleSymbolTable as generateEmptyAzleSymbolTable,
    toAzleSymbolTable as generateAzleSymbolTableFromTsSymbolTable
} from './azle_symbol_table';
import { getSymbolTable } from './get_symbol_table';
import { timing, generateTimedResults } from './debug';
import { Opt, match } from '../../../lib';

export function generateAzleSymbolTables(files: string[]): SymbolTables {
    if (timing) {
        return generateTimedResults(files, generateAzleSymbolTable);
    }
    return files.reduce((accumulator: SymbolTables, filename: string) => {
        const symbolTableOpt = generateAzleSymbolTable(filename);
        return match(symbolTableOpt, {
            Some: (symbolTable) => {
                return {
                    ...accumulator,
                    [filename]: symbolTable
                };
            },
            None: () => {
                return accumulator;
            }
        });
    }, {});
}

function generateAzleSymbolTable(filename: string): Opt<SymbolTable> {
    const sourceFilePath = filename;
    const program = ts.createProgram([sourceFilePath], {});

    const sourceFile = program.getSourceFile(sourceFilePath);
    if (!sourceFile) {
        return Opt.None;
    }

    return match(getSymbolTable(sourceFile, program), {
        Some: (tsSymbolTable) => {
            return Opt.Some(
                generateAzleSymbolTableFromTsSymbolTable(tsSymbolTable, program)
            );
        },
        None: () => {
            return Opt.None;
        }
    });
}

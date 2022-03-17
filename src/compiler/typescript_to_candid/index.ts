import { getCanisterMethodFunctionDeclarationsFromSourceFiles } from './ast_utilities/canister_methods';
import { generateCandidRecords } from './generators/record';
import { generateCandidService } from './generators/service';
import { generateCandidVariants } from './generators/variant';
import { Candid } from '../../types';
import * as tsc from 'typescript';

export function compileTypeScriptToCandid(tsPath: string): Candid {
    const program = tsc.createProgram(
        [tsPath],
        {}
    );
    
    const sourceFiles = program.getSourceFiles();

    const queryMethodFunctionDeclarations = getCanisterMethodFunctionDeclarationsFromSourceFiles(
        sourceFiles,
        'Query'
    );

    const updateMethodFunctionDeclarations = getCanisterMethodFunctionDeclarationsFromSourceFiles(
        sourceFiles,
        'Update'
    );

    const candidRecords = generateCandidRecords(
        sourceFiles,
        queryMethodFunctionDeclarations,
        updateMethodFunctionDeclarations
    );

    const candidVariants = generateCandidVariants(
        sourceFiles,
        queryMethodFunctionDeclarations,
        updateMethodFunctionDeclarations
    );

    const candidService = generateCandidService(
        sourceFiles,
        queryMethodFunctionDeclarations,
        updateMethodFunctionDeclarations
    );

    return `${candidRecords === '' ? '' : `${candidRecords}\n\n`}${candidVariants === '' ? '' : `${candidVariants}\n\n`}${candidService}`;
}
import { getCanisterMethodFunctionDeclarationsFromSourceFiles } from './ast_utilities/canister_methods';
import { generateCandidRecords } from './generators/record';
import { generateCandidService } from './generators/service';
import { generateCandidVariants } from './generators/variant';
import { Candid } from '../../types';
import * as tsc from 'typescript';

export function compileTypeScriptToCandid(sourceFiles: readonly tsc.SourceFile[]): {
    candid: Candid;
    queryMethodFunctionNames: string[];
    updateMethodFunctionNames: string[];
} {
    const queryMethodFunctionDeclarations = getCanisterMethodFunctionDeclarationsFromSourceFiles(
        sourceFiles,
        'Query'
    );

    const updateMethodFunctionDeclarations = getCanisterMethodFunctionDeclarationsFromSourceFiles(
        sourceFiles,
        'Update'
    );

    const candidRecords: Candid = generateCandidRecords(
        sourceFiles,
        queryMethodFunctionDeclarations,
        updateMethodFunctionDeclarations
    );

    const candidVariants: Candid = generateCandidVariants(
        sourceFiles,
        queryMethodFunctionDeclarations,
        updateMethodFunctionDeclarations
    );

    const candidService: Candid = generateCandidService(
        sourceFiles,
        queryMethodFunctionDeclarations,
        updateMethodFunctionDeclarations
    );

    const candid = generateCandid(
        candidRecords,
        candidVariants,
        candidService
    );

    const queryMethodFunctionNames = getCanisterMethodFunctionNames(queryMethodFunctionDeclarations);
    const updateMethodFunctionNames = getCanisterMethodFunctionNames(updateMethodFunctionDeclarations);

    return {
        candid,
        queryMethodFunctionNames,
        updateMethodFunctionNames
    };
}

function generateCandid(
    candidRecords: Candid,
    candidVariants: Candid,
    candidService: Candid
): Candid {
    return `${candidRecords === '' ? '' : `${candidRecords}\n\n`}${candidVariants === '' ? '' : `${candidVariants}\n\n`}${candidService}`;
}

function getCanisterMethodFunctionNames(queryMethodFunctionDeclarations: tsc.FunctionDeclaration[]): string[] {
    return queryMethodFunctionDeclarations.map((functionDeclaration) => {
        if (functionDeclaration.name === undefined) {
            throw new Error('Canister method must have a name');
        }
        
        return functionDeclaration.name.escapedText.toString();
    });
}
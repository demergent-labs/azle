import { getCanisterMethodFunctionDeclarationsFromSourceFiles } from './ast_utilities/canister_methods';
import { generateCandidRecords } from './generators/record';
import { generateCandidService } from './generators/service';
import { generateCandidVariants } from './generators/variant';
import { Candid } from '../../types';
import * as tsc from 'typescript';
import { getCanisterTypeAliasDeclarations } from '../typescript_to_rust/generators/call_functions';

export function compileTypeScriptToCandid(sourceFiles: readonly tsc.SourceFile[]): {
    candid: Candid;
    candidWithDummyMethod: Candid;
    queryMethodFunctionNames: string[];
    updateMethodFunctionNames: string[];
} {
    const queryMethodFunctionDeclarations = getCanisterMethodFunctionDeclarationsFromSourceFiles(
        sourceFiles,
        [
            'Query',
            // 'QueryAsync' // TODO enable once this is resolved: https://forum.dfinity.org/t/inter-canister-query-calls-community-consideration/6754
        ]
    );

    const updateMethodFunctionDeclarations = getCanisterMethodFunctionDeclarationsFromSourceFiles(
        sourceFiles,
        [
            'Update',
            'UpdateAsync'
        ]
    );

    const canisterTypeAliasDeclarations = getCanisterTypeAliasDeclarations(sourceFiles);

    const {
        candidRecords,
        candidRecordNames
    } = generateCandidRecords(
        sourceFiles,
        queryMethodFunctionDeclarations,
        updateMethodFunctionDeclarations,
        canisterTypeAliasDeclarations
    );

    const candidVariants: Candid = generateCandidVariants(
        sourceFiles,
        queryMethodFunctionDeclarations,
        updateMethodFunctionDeclarations,
        canisterTypeAliasDeclarations
    );

    const {
        service,
        serviceWithDummyMethod
    } = generateCandidService(
        sourceFiles,
        queryMethodFunctionDeclarations,
        updateMethodFunctionDeclarations,
        candidRecordNames
    );

    const candid = generateCandid(
        candidRecords,
        candidVariants,
        service
    );

    const candidWithDummyMethod = generateCandid(
        candidRecords,
        candidVariants,
        serviceWithDummyMethod
    );

    const queryMethodFunctionNames = getCanisterMethodFunctionNames(queryMethodFunctionDeclarations);
    const updateMethodFunctionNames = getCanisterMethodFunctionNames(updateMethodFunctionDeclarations);

    return {
        candid,
        candidWithDummyMethod,
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
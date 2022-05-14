import { getCanisterMethodFunctionDeclarationsFromSourceFiles } from './ast_utilities/canister_methods';
import { generateCandidRecords } from './generators/record';
import { generateCandidService } from './generators/service';
import { generateCandidVariants } from './generators/variant';
import { Candid } from '../../types';
import * as tsc from 'typescript';
import {
    getCanisterTypeAliasDeclarations,
    getFuncTypeAliasDeclarations,
    getStableTypeAliasDeclarations
} from '../typescript_to_rust/generators/call_functions';
import { generate_candid_funcs } from './generators/func';

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

    const initMethodFunctionDeclarations = getCanisterMethodFunctionDeclarationsFromSourceFiles(
        sourceFiles,
        ['Init']
    );

    const canisterTypeAliasDeclarations = getCanisterTypeAliasDeclarations(sourceFiles);

    const stableTypeAliasDeclarations = getStableTypeAliasDeclarations(sourceFiles);

    const funcTypeAliasDeclarations = getFuncTypeAliasDeclarations(sourceFiles);

    const {
        candidRecords,
        candidRecordNames
    } = generateCandidRecords(
        sourceFiles,
        [
            ...queryMethodFunctionDeclarations,
            ...updateMethodFunctionDeclarations,
            ...initMethodFunctionDeclarations,
        ],
        canisterTypeAliasDeclarations,
        stableTypeAliasDeclarations,
        funcTypeAliasDeclarations
    );

    const {
        candidVariants,
        candidVariantNames
    } = generateCandidVariants(
        sourceFiles,
        [
            ...queryMethodFunctionDeclarations,
            ...updateMethodFunctionDeclarations,
            ...initMethodFunctionDeclarations,
        ],
        canisterTypeAliasDeclarations,
        stableTypeAliasDeclarations,
        funcTypeAliasDeclarations
    );

    const {
        candid_funcs,
        candid_func_names
    } = generate_candid_funcs(
        sourceFiles,
        funcTypeAliasDeclarations
    );

    const {
        service,
        serviceWithDummyMethod
    } = generateCandidService(
        sourceFiles,
        queryMethodFunctionDeclarations,
        updateMethodFunctionDeclarations,
        candidRecordNames,
        candidVariantNames,
        candid_func_names
    );

    const candid = generateCandid(
        candidRecords,
        candidVariants,
        candid_funcs,
        service
    );

    const candidWithDummyMethod = generateCandid(
        candidRecords,
        candidVariants,
        candid_funcs,
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
    candid_funcs: Candid,
    candidService: Candid
): Candid {
    return `${candidRecords === '' ? '' : `${candidRecords}\n\n`}${candidVariants === '' ? '' : `${candidVariants}\n\n`}${candid_funcs === '' ? '' : `${candid_funcs}\n\n`}${candidService}`;
}

function getCanisterMethodFunctionNames(queryMethodFunctionDeclarations: tsc.FunctionDeclaration[]): string[] {
    return queryMethodFunctionDeclarations.map((functionDeclaration) => {
        if (functionDeclaration.name === undefined) {
            throw new Error('Canister method must have a name');
        }
        
        return functionDeclaration.name.escapedText.toString();
    });
}
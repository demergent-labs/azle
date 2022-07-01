import {
    getCanisterMethodFunctionDeclarationsFromSourceFiles,
    getCanisterMethodTypeName
} from './ast_utilities/canister_methods';
import { generateCandidRecords } from './generators/record';
import { generateCandidService } from './generators/service';
import { generateCandidVariants } from './generators/variant';
import { Candid, CanisterMethodFunctionInfo } from '../../types';
import * as tsc from 'typescript';
import {
    getCanisterTypeAliasDeclarations,
    getFuncTypeAliasDeclarations,
    getStableTypeAliasDeclarations
} from '../typescript_to_rust/generators/call_functions';
import { generate_candid_funcs } from './generators/func';
import { getRustTypeNameFromTypeNode } from '../typescript_to_rust/ast_utilities/miscellaneous';

export function compileTypeScriptToCandid(
    sourceFiles: readonly tsc.SourceFile[]
): {
    candid: Candid;
    candidWithDummyMethod: Candid;
    canisterMethodFunctionInfos: CanisterMethodFunctionInfo[];
} {
    const queryMethodFunctionDeclarations =
        getCanisterMethodFunctionDeclarationsFromSourceFiles(sourceFiles, [
            'Query',
            'QueryManual'
            // 'QueryAsync' // TODO enable once this is resolved: https://forum.dfinity.org/t/inter-canister-query-calls-community-consideration/6754
        ]);

    const updateMethodFunctionDeclarations =
        getCanisterMethodFunctionDeclarationsFromSourceFiles(sourceFiles, [
            'Update',
            'UpdateAsync',
            'UpdateManual'
        ]);

    const initMethodFunctionDeclarations =
        getCanisterMethodFunctionDeclarationsFromSourceFiles(sourceFiles, [
            'Init'
        ]);

    const canisterTypeAliasDeclarations =
        getCanisterTypeAliasDeclarations(sourceFiles);

    const stableTypeAliasDeclarations =
        getStableTypeAliasDeclarations(sourceFiles);

    const funcTypeAliasDeclarations = getFuncTypeAliasDeclarations(sourceFiles);

    const { candidRecords, candidRecordNames } = generateCandidRecords(
        sourceFiles,
        [
            ...queryMethodFunctionDeclarations,
            ...updateMethodFunctionDeclarations,
            ...initMethodFunctionDeclarations
        ],
        canisterTypeAliasDeclarations,
        stableTypeAliasDeclarations,
        funcTypeAliasDeclarations
    );

    const { candidVariants, candidVariantNames } = generateCandidVariants(
        sourceFiles,
        [
            ...queryMethodFunctionDeclarations,
            ...updateMethodFunctionDeclarations,
            ...initMethodFunctionDeclarations
        ],
        canisterTypeAliasDeclarations,
        stableTypeAliasDeclarations,
        funcTypeAliasDeclarations
    );

    const { candid_funcs, candid_func_names } = generate_candid_funcs(
        sourceFiles,
        funcTypeAliasDeclarations
    );

    const { service, serviceWithDummyMethod } = generateCandidService(
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

    // TODO consider combining these
    const queryMethodFunctionInfos = getCanisterMethodFunctionInfos(
        queryMethodFunctionDeclarations,
        'QUERY'
    );
    const updateMethodFunctionInfos = getCanisterMethodFunctionInfos(
        updateMethodFunctionDeclarations,
        'UPDATE'
    );

    return {
        candid,
        candidWithDummyMethod,
        canisterMethodFunctionInfos: [
            ...queryMethodFunctionInfos,
            ...updateMethodFunctionInfos
        ]
    };
}

function generateCandid(
    candidRecords: Candid,
    candidVariants: Candid,
    candid_funcs: Candid,
    candidService: Candid
): Candid {
    return `${candidRecords === '' ? '' : `${candidRecords}\n\n`}${
        candidVariants === '' ? '' : `${candidVariants}\n\n`
    }${candid_funcs === '' ? '' : `${candid_funcs}\n\n`}${candidService}`;
}

function getCanisterMethodFunctionInfos(
    canisterMethodFunctionDeclarations: tsc.FunctionDeclaration[],
    queryOrUpdate: 'QUERY' | 'UPDATE'
): CanisterMethodFunctionInfo[] {
    return canisterMethodFunctionDeclarations.map((functionDeclaration) => {
        if (functionDeclaration.name === undefined) {
            throw new Error('Canister method must have a name');
        }

        const canisterMethodTypeName =
            getCanisterMethodTypeName(functionDeclaration);

        if (functionDeclaration.type === undefined) {
            throw new Error(`${functionDeclaration.name.escapedText.toString()} must have a return type`);
        }

        return {
            name: functionDeclaration.name.escapedText.toString(),
            queryOrUpdate,
            manual: ['QueryManual', 'UpdateManual'].includes(
                canisterMethodTypeName
            ),
            rustReturnType: getRustTypeNameFromTypeNode(functionDeclaration.type)
        };
    });
}

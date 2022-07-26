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
import {
    getParamName,
    getRustTypeNameFromTypeNode
} from '../typescript_to_rust/ast_utilities/miscellaneous';

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
        ]);

    const updateMethodFunctionDeclarations =
        getCanisterMethodFunctionDeclarationsFromSourceFiles(sourceFiles, [
            'Update',
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
        sourceFiles,
        queryMethodFunctionDeclarations,
        'QUERY'
    );
    const updateMethodFunctionInfos = getCanisterMethodFunctionInfos(
        sourceFiles,
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
    }${candid_funcs === '' ? '' : `${candid_funcs}\n\n`}${candidService}\n`;
}

function getCanisterMethodFunctionInfos(
    sourceFiles: readonly tsc.SourceFile[],
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
            throw new Error(
                `${functionDeclaration.name.escapedText.toString()} must have a return type`
            );
        }

        const manual = ['QueryManual', 'UpdateManual'].includes(
            canisterMethodTypeName
        );

        const rustReturnType = manual
            ? getRustTypeNameFromTypeNode(sourceFiles, functionDeclaration.type)
            : '';
        // TODO: update getRustTypeNameFromTypeNode to handle inline types
        //
        // Calling getRustTypeNameFromTypeNode here currently breaks inline
        // types in non-manual calls. This band-aid solution keeps inline types
        // working for non-manual calls until we can implement
        // https://github.com/demergent-labs/azle/issues/474.

        const params = functionDeclaration.parameters.map((param) => {
            if (param.type === undefined) {
                throw new Error(`Parameter must have a type`);
            }

            return {
                name: getParamName(param),
                typeNode: param.type
            };
        });

        return {
            manual,
            name: functionDeclaration.name.escapedText.toString(),
            params,
            queryOrUpdate,
            rustReturnType
        };
    });
}

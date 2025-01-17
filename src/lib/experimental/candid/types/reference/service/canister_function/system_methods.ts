import '../../../../../experimental';

import { IDL } from '@dfinity/candid';

import { idlToString } from '../../../../../../stable/did_file/idl_to_string';
import { Parent, toIdlTypeArray } from '../../../../index';
import { _AzleRecursiveFunction } from '../../../../recursive';
import { CanisterOptions, ServiceFunctionInfo } from '.';

export function createGetInitAndPostUpgradeParamIdlTypes(
    canisterOptions: CanisterOptions
) {
    return (parents: Parent[]): IDL.Type[] => {
        const serviceFunctionInfo = canisterOptions as ServiceFunctionInfo;
        let foundInit = false;
        let foundPostUpgrade = false;

        return Object.entries(serviceFunctionInfo).reduce(
            (accumulator, [_methodName, functionInfo]) => {
                const mode = functionInfo.mode;
                const isInitOrPostUpgradeMethod =
                    mode === 'init' || mode === 'postUpgrade';
                if (!isInitOrPostUpgradeMethod) {
                    return accumulator;
                }

                if (mode === 'init') {
                    if (foundInit === true) {
                        throw new Error(
                            'Init method already found in canister options'
                        );
                    }
                    foundInit = true;
                } else if (mode === 'postUpgrade') {
                    if (foundPostUpgrade === true) {
                        throw new Error(
                            'PostUpgrade method already found in canister options'
                        );
                    }
                    foundPostUpgrade = true;
                }

                const paramIdlTypes = toIdlTypeArray(
                    functionInfo.paramCandidTypes,
                    parents
                );
                if (
                    (mode === 'init' && foundPostUpgrade) ||
                    (mode === 'postUpgrade' && foundInit)
                ) {
                    const functionSignature = idlToString(
                        IDL.Func(paramIdlTypes, [])
                    );

                    const accumulatorSignature = idlToString(
                        IDL.Func(accumulator, [])
                    );

                    if (functionSignature !== accumulatorSignature) {
                        throw new Error(
                            'Init and postUpgrade methods must have the same function signature'
                        );
                    }
                }

                return paramIdlTypes;
            },
            [] as IDL.Type[]
        );
    };
}

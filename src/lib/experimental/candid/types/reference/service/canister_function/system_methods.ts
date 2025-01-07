import '../../../../../experimental';

import { IDL } from '@dfinity/candid';

import { Parent, toIdlTypeArray } from '../../../../index';
import { _AzleRecursiveFunction } from '../../../../recursive';
import { CanisterOptions, ServiceFunctionInfo } from '.';

export function createGetSystemFunctionIdlTypeFunction(
    canisterOptions: CanisterOptions
) {
    return (parents: Parent[]): IDL.FuncClass[] => {
        const serviceFunctionInfo = canisterOptions as ServiceFunctionInfo;

        return Object.entries(serviceFunctionInfo).reduce(
            (accumulator, [_methodName, functionInfo]) => {
                const mode = functionInfo.mode;
                const isSystemMethod = !(mode === 'update' || mode === 'query');
                if (!isSystemMethod) {
                    // IDLs that are in update and query are already accounted for in the standard getIdlType function
                    return accumulator;
                }

                const paramIdlTypes = toIdlTypeArray(
                    functionInfo.paramCandidTypes,
                    parents
                );
                const returnIdlType = toIdlTypeArray(
                    functionInfo.returnCandidType,
                    parents
                );
                return [
                    ...accumulator,
                    IDL.Func(paramIdlTypes, returnIdlType, [mode])
                ];
            },
            [] as IDL.FuncClass[]
        );
    };
}

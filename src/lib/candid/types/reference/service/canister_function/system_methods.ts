import { Parent, toIdlArray } from '../../../../index';
import { _AzleRecursiveFunction } from '../../../../recursive';
import { IDL } from '@dfinity/candid';
import { CanisterOptions, ServiceFunctionInfo } from '.';

type SystemMethod = { name: string } | undefined;

export function createSystemMethod(
    mode:
        | 'init'
        | 'postUpgrade'
        | 'preUpgrade'
        | 'heartbeat'
        | 'inspectMessage',
    canisterOptions: CanisterOptions
): SystemMethod {
    const methodOption = Object.entries(canisterOptions).find(
        ([_methodName, canisterMethod]) => canisterMethod.mode === mode
    );
    if (methodOption === undefined) {
        return undefined;
    }
    return {
        name: methodOption[0]
    };
}

export function createGetSystemFunctionIdlFunction(
    canisterOptions: CanisterOptions
) {
    return (parents: Parent[]): IDL.FuncClass[] => {
        const serviceFunctionInfo = canisterOptions as ServiceFunctionInfo;

        return Object.entries(serviceFunctionInfo).reduce(
            (accumulator, [_methodName, functionInfo]) => {
                const mode = functionInfo.mode;
                const isSystemMethod = !(mode === 'update' || mode === 'query');
                if (!isSystemMethod) {
                    // IDLs that are in update and query are already accounted for in the standard getIdl function
                    return accumulator;
                }

                const paramIdls = toIdlArray(
                    functionInfo.paramCandidTypes,
                    parents
                );
                const returnIdl = toIdlArray(
                    functionInfo.returnCandidType,
                    parents
                );
                return [...accumulator, IDL.Func(paramIdls, returnIdl, [mode])];
            },
            [] as IDL.FuncClass[]
        );
    };
}

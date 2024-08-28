import '../../../../../experimental';

import { IDL } from '@dfinity/candid';

import { MethodMeta } from '../../../../../../../build/stable/utils/types';
import { CanisterMethodInfo } from '../../../../../canister_methods/types/canister_method_info';
import { ic } from '../../../../../ic';
import { CandidType, Parent, toIdlTypeArray } from '../../../../index';
import { _AzleRecursiveFunction } from '../../../../recursive';
import { decode, encode } from '../../../../serde';
import { Principal } from '../../principal';
import { createQueryMethods, createUpdateMethods } from './query_update';
import {
    createGetSystemFunctionIdlTypeFunction,
    createSystemMethod
} from './system_methods';

export type CanisterOptions = {
    [key: string]: CanisterMethodInfo<any, any>;
};

type _AzleFunctionReturnType = {
    (principal: Principal): void;
    methodMeta?: MethodMeta;
    callbacks?: any;
    getSystemFunctionIdlTypes?: (parents: Parent[]) => IDL.FuncClass[];
    getIdlType?: (parents: Parent[]) => IDL.Type<any>;
};

type CallRawFunction = typeof ic.callRaw;
type NotifyRawFunction = typeof ic.notifyRaw;

type FunctionInfo = {
    mode: 'query' | 'update';
    paramCandidTypes: CandidType[];
    returnCandidType: CandidType;
};

type ServiceCall = (
    notify: boolean,
    callFunction: CallRawFunction | NotifyRawFunction,
    cycles: bigint,
    args: any[]
) => void | Promise<any>;

export interface ServiceFunctionInfo {
    [key: string]: FunctionInfo;
}

export function createCanisterFunction(
    canisterOptions: CanisterOptions
): _AzleFunctionReturnType {
    let canister = createCanisterFunctionBase(canisterOptions);

    canister.methodMeta = {};
    canister.methodMeta.init = createSystemMethod('init', canisterOptions);
    canister.methodMeta.heartbeat = createSystemMethod(
        'heartbeat',
        canisterOptions
    );
    canister.methodMeta.post_upgrade = createSystemMethod(
        'postUpgrade',
        canisterOptions
    );
    canister.methodMeta.pre_upgrade = createSystemMethod(
        'preUpgrade',
        canisterOptions
    );
    canister.methodMeta.inspect_message = createSystemMethod(
        'inspectMessage',
        canisterOptions
    );
    canister.methodMeta.queries = createQueryMethods(canisterOptions);
    canister.methodMeta.updates = createUpdateMethods(canisterOptions);

    canister.callbacks = createCallbacks(canisterOptions);

    canister.getIdlType = createGetIdlTypeFunction(canisterOptions);
    canister.getSystemFunctionIdlTypes =
        createGetSystemFunctionIdlTypeFunction(canisterOptions);

    return canister;
}

function createGetIdlTypeFunction(
    canisterOptions: CanisterOptions
): (parents: Parent[]) => IDL.ServiceClass {
    return (parents: Parent[]): IDL.ServiceClass => {
        const serviceFunctionInfo = canisterOptions as ServiceFunctionInfo;

        // We don't want init, post upgrade, etc showing up in the idl type
        const isQueryOrUpdate = (mode: string): boolean => {
            return mode === 'query' || mode === 'update';
        };

        const record = Object.entries(serviceFunctionInfo)
            .filter(([_methodName, functionInfo]) =>
                isQueryOrUpdate(functionInfo.mode)
            )
            .reduce(
                (accumulator, [methodName, functionInfo]) => {
                    return {
                        ...accumulator,
                        [methodName]: createUpdateOrQueryFunctionIdlType(
                            functionInfo,
                            parents
                        )
                    };
                },
                {} as Record<string, IDL.FuncClass>
            );

        return IDL.Service(record);
    };
}

function createAnnotation(mode: 'query' | 'update'): string[] {
    if (mode === 'query') {
        return ['query'];
    }
    return [];
}

function createUpdateOrQueryFunctionIdlType(
    functionInfo: FunctionInfo,
    parents: Parent[]
): IDL.FuncClass {
    const annotations = createAnnotation(functionInfo.mode);
    const paramIdlTypes = toIdlTypeArray(
        functionInfo.paramCandidTypes,
        parents
    );
    const returnIdlType = toIdlTypeArray(
        functionInfo.returnCandidType,
        parents
    );

    return IDL.Func(paramIdlTypes, returnIdlType, annotations);
}

function createCallbacks(
    canisterOptions: CanisterOptions
): Record<string, ((...args: any) => any) | undefined> {
    return Object.entries(canisterOptions).reduce((acc, entry) => {
        const canisterMethod = entry[1];

        return {
            ...acc,
            [canisterMethod.index.toString()]: canisterMethod.callback
        };
    }, {});
}

function createCanisterFunctionBase(
    canisterOptions: CanisterOptions
): _AzleFunctionReturnType {
    return (principal: Principal) => {
        const callbacks = Object.entries(canisterOptions).reduce(
            (acc, entry) => {
                const key = entry[0];
                const value = entry[1];

                return {
                    ...acc,
                    [key]: (
                        notify: boolean,
                        callFunction: CallRawFunction | NotifyRawFunction,
                        cycles: bigint,
                        args: any[]
                    ): ReturnType<ServiceCall> => {
                        return serviceCall(
                            principal as any,
                            key,
                            value.paramCandidTypes,
                            value.returnCandidType
                        )(notify, callFunction, cycles, args);
                    }
                };
            },
            {}
        );

        return {
            ...callbacks,
            principal
        };
    };
}

function serviceCall(
    canisterId: Principal,
    methodName: string,
    paramCandidTypes: CandidType[],
    returnCandidType: CandidType
): ServiceCall {
    return (
        notify: boolean,
        callFunction: CallRawFunction | NotifyRawFunction,
        cycles: bigint,
        args: any[]
    ) => {
        const encodedArgs = encode(paramCandidTypes, args);

        if (notify) {
            return (callFunction as NotifyRawFunction)(
                canisterId,
                methodName,
                encodedArgs,
                cycles
            );
        } else {
            return (async (): Promise<any> => {
                const encodedResult = await (callFunction as CallRawFunction)(
                    canisterId,
                    methodName,
                    encodedArgs,
                    cycles
                );

                return decode(returnCandidType, encodedResult);
            })();
        }
    };
}

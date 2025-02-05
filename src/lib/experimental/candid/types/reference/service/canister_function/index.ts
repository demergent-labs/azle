import '../../../../../experimental';

import { IDL } from '@dfinity/candid';

import {
    Method,
    MethodMeta
} from '../../../../../../../build/stable/utils/types';
import { CanisterMethodMode } from '../../../../../../stable/execute_with_candid_serde';
import { call } from '../../../../../../stable/ic_apis';
import { CanisterMethodInfo } from '../../../../../canister_methods/types/canister_method_info';
import { Callbacks } from '../../../../../globals';
import { CandidType, Parent, toIdlTypeArray } from '../../../../index';
import { _AzleRecursiveFunction } from '../../../../recursive';
import { decode, encode } from '../../../../serde';
import { Principal } from '../../principal';
import { createGetInitAndPostUpgradeParamIdlTypes } from './system_methods';

export type CanisterOptions = {
    [key: string]: CanisterMethodInfo<any, any>;
};

type _AzleFunctionReturnType = {
    (principal: Principal): void;
    methodMeta?: MethodMeta;
    callbacks?: any;
    getInitAndPostUpgradeParamIdlTypes?: (parents: Parent[]) => IDL.Type[];
    getIdlType?: (parents: Parent[]) => IDL.Type<any>;
};

type FunctionInfo = {
    mode: CanisterMethodMode;
    paramCandidTypes: CandidType[];
    returnCandidType: CandidType;
};

type ServiceCall = (
    isNotify: boolean,
    cycles: bigint,
    args: any[]
) => void | Promise<any>;

export type ServiceFunctionInfo = {
    [key: string]: FunctionInfo;
};

export function createCanisterFunction(
    canisterOptions: CanisterOptions
): _AzleFunctionReturnType {
    let canister = createCanisterFunctionBase(canisterOptions);

    const { callbacks, methodMeta } =
        createCallbacksAndMethodMeta(canisterOptions);

    canister.callbacks = callbacks;
    canister.methodMeta = methodMeta;

    canister.getIdlType = createGetIdlTypeFunction(canisterOptions);
    canister.getInitAndPostUpgradeParamIdlTypes =
        createGetInitAndPostUpgradeParamIdlTypes(canisterOptions);

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

function createAnnotation(mode: CanisterMethodMode): string[] {
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

function createCallbacksAndMethodMeta(canisterOptions: CanisterOptions): {
    callbacks: Callbacks;
    methodMeta: MethodMeta;
} {
    return Object.entries(canisterOptions).reduce(
        (acc, [canisterMethodName, canisterMethodInfo], index) => {
            const methodMeta = getMethodMeta(
                canisterMethodName,
                index,
                canisterMethodInfo
            );

            const queries = [
                ...(acc.methodMeta.queries ?? []),
                ...(methodMeta.queries ?? [])
            ];

            const updates = [
                ...(acc.methodMeta.updates ?? []),
                ...(methodMeta.updates ?? [])
            ];

            return {
                callbacks: {
                    ...acc.callbacks,
                    [index.toString()]: canisterMethodInfo.callback!
                },
                methodMeta: {
                    ...acc.methodMeta,
                    ...methodMeta,
                    queries,
                    updates
                }
            };
        },
        {
            callbacks: {} as Callbacks,
            methodMeta: {} as MethodMeta
        }
    );
}

function getMethodMeta(
    canisterMethodName: string,
    index: number,
    canisterMethodInfo: CanisterMethodInfo<any, any>
): MethodMeta {
    const method: Method = {
        name: canisterMethodName,
        index,
        composite:
            canisterMethodInfo.mode === 'query'
                ? canisterMethodInfo.async
                : undefined
    };

    if (canisterMethodInfo.mode === 'init') {
        return {
            init: method
        };
    }

    if (canisterMethodInfo.mode === 'postUpgrade') {
        return {
            post_upgrade: method
        };
    }

    if (canisterMethodInfo.mode === 'preUpgrade') {
        return {
            pre_upgrade: method
        };
    }

    if (canisterMethodInfo.mode === 'inspectMessage') {
        return {
            inspect_message: method
        };
    }

    if (canisterMethodInfo.mode === 'heartbeat') {
        return {
            heartbeat: method
        };
    }

    if (canisterMethodInfo.mode === 'query') {
        return {
            queries: [method]
        };
    }

    if (canisterMethodInfo.mode === 'update') {
        return {
            updates: [method]
        };
    }

    throw new Error(
        `Invalid method mode: ${canisterMethodInfo.mode} for method: ${canisterMethodName}`
    );
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
                        isNotify: boolean,
                        cycles: bigint,
                        args: any[]
                    ): ReturnType<ServiceCall> => {
                        return serviceCall(
                            principal as any,
                            key,
                            value.paramCandidTypes,
                            value.returnCandidType
                        )(isNotify, cycles, args);
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
    return (isNotify: boolean, cycles: bigint, args: any[]): Promise<any> => {
        const encodedArgs = encode(paramCandidTypes, args);

        if (isNotify === true) {
            return call(canisterId, methodName, {
                args: encodedArgs,
                cycles,
                oneway: true
            });
        } else {
            return (async (): Promise<any> => {
                const encodedResult = await call<Uint8Array, Uint8Array>(
                    canisterId,
                    methodName,
                    {
                        args: encodedArgs,
                        cycles
                    }
                );

                return decode(returnCandidType, encodedResult);
            })();
        }
    };
}

import { Parent, CandidType, toIdlArray } from '../../../../index';
import { _AzleRecursiveFunction } from '../../../../recursive';
import { ic } from '../../../../../ic';
import { Principal } from '../../principal';
import { IDL } from '@dfinity/candid';
import { CanisterMethodInfo } from '../../../../../canister_methods/types/canister_method_info';
import { decode, encode } from '../../../../serde';
import { createQueryMethods, createUpdateMethods } from './query_update';
import {
    createGetSystemFunctionIdlFunction,
    createSystemMethod
} from './system_methods';

export type CanisterOptions = {
    [key: string]: CanisterMethodInfo<any, any>;
};

type _AzleFunctionReturnType = {
    (principal: Principal): void;
    init?: any;
    post_upgrade?: any;
    pre_upgrade?: any;
    heartbeat?: any;
    inspect_message?: any;
    queries?: any[];
    updates?: any[];
    callbacks?: any;
    getSystemFunctionIdls?: (parents: Parent[]) => IDL.FuncClass[];
    getIdl?: (parents: Parent[]) => IDL.Type<any>;
};

type CallRawFunction = typeof ic.callRaw | typeof ic.callRaw128;
type NotifyRawFunction = typeof ic.notifyRaw;

type FunctionInfo = {
    mode: 'query' | 'update';
    paramCandidTypes: CandidType[];
    returnCandidType: CandidType;
};

export interface ServiceFunctionInfo {
    [key: string]: FunctionInfo;
}

export function createCanisterFunction(canisterOptions: CanisterOptions) {
    let canister = createCanisterFunctionBase(canisterOptions);
    canister.init = createSystemMethod('init', canisterOptions);
    canister.heartbeat = createSystemMethod('heartbeat', canisterOptions);
    canister.post_upgrade = createSystemMethod('postUpgrade', canisterOptions);
    canister.pre_upgrade = createSystemMethod('preUpgrade', canisterOptions);
    canister.inspect_message = createSystemMethod(
        'inspectMessage',
        canisterOptions
    );
    canister.queries = createQueryMethods(canisterOptions);
    canister.updates = createUpdateMethods(canisterOptions);
    canister.callbacks = createCallbacks(canisterOptions);
    canister.getIdl = createGetIdlFunction(canisterOptions);
    canister.getSystemFunctionIdls =
        createGetSystemFunctionIdlFunction(canisterOptions);

    return canister;
}

function createGetIdlFunction(canisterOptions: CanisterOptions) {
    return (parents: Parent[]): IDL.ServiceClass => {
        const serviceFunctionInfo = canisterOptions as ServiceFunctionInfo;

        // We don't want init, post upgrade, etc showing up in the idl
        const isQueryOrUpdate = (mode: string) => {
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
                        [methodName]: createUpdateOrQueryFunctionIdl(
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

function createUpdateOrQueryFunctionIdl(
    functionInfo: FunctionInfo,
    parents: Parent[]
): IDL.FuncClass {
    const annotations = createAnnotation(functionInfo.mode);
    const paramIdls = toIdlArray(functionInfo.paramCandidTypes, parents);
    const returnIdls = toIdlArray(functionInfo.returnCandidType, parents);

    return IDL.Func(paramIdls, returnIdls, annotations);
}

function createCallbacks(canisterOptions: CanisterOptions) {
    return Object.entries(canisterOptions).reduce((acc, entry) => {
        const methodName = entry[0];
        const canisterMethod = entry[1];

        return {
            ...acc,
            [methodName]: canisterMethod.callback
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
                    [key]: (...args: any[]) => {
                        return serviceCall(
                            principal as any,
                            key,
                            value.paramCandidTypes,
                            value.returnCandidType
                        )(...args);
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
) {
    // This must remain a function and not an arrow function
    // in order to set the context (this) correctly
    return async function (
        this: any, // TODO in lib_new this was Service, I'm not sure we need this anymore
        notify: boolean,
        callFunction: CallRawFunction | NotifyRawFunction,
        cycles: bigint,
        ...args: any[]
    ) {
        const encodedArgs = encode(paramCandidTypes, args);

        if (notify) {
            try {
                return (callFunction as NotifyRawFunction)(
                    canisterId,
                    methodName,
                    encodedArgs,
                    cycles
                );
            } catch (error) {
                throw error;
            }
        } else {
            const encodedResult = await (callFunction as CallRawFunction)(
                canisterId,
                methodName,
                encodedArgs,
                cycles
            );

            return decode(returnCandidType, encodedResult);
        }
    };
}

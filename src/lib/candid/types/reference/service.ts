import {
    TypeMapping,
    Parent,
    toParamIDLTypes,
    toReturnIDLType,
    CandidType
} from '../../index';
import { _AzleRecursiveFunction } from '../../recursive';
import { ic } from '../../../ic';
import { Principal } from './principal';
import { IDL } from '@dfinity/candid';
import { CanisterMethodInfo } from '../../../canister_methods';
import { decode, encodeMultiple } from '../../serde';

type CanisterOptions = {
    [key: string]: CanisterMethodInfo<any, any>;
};

type _AzleCanisterOptions = {
    [key: string]: (
        parentOrUndefined: _AzleRecursiveFunction | undefined
    ) => CanisterMethodInfo<any, any>;
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
    getSystemFunctionIDLs?: (parents: Parent[]) => IDL.FuncClass[];
    getIDL?: (parents: Parent[]) => IDL.Type<any>;
};

type _AzleCanisterReturnType = {
    (parentOrPrincipal: _AzleRecursiveFunction | Principal): void;
    _azleIsCanister?: boolean;
};

type CanisterReturn<T extends CanisterOptions> = {
    [EndpointName in keyof T]: T[EndpointName] extends CanisterMethodInfo<
        infer Params,
        infer Return
    >
        ? (
              ...args: { [K in keyof Params]: TypeMapping<Params[K]> }
          ) => Promise<TypeMapping<Return>>
        : never;
};

type CallableObject<T extends CanisterOptions> = {
    (principal: Principal): CallableObject<T>;
} & CanisterReturn<T>;

export function Canister<T extends CanisterOptions>(
    serviceOptions: T
): CallableObject<T> & { _azleCandidType?: '_azleCandidType' } {
    const _azleCanisterOptions =
        serviceOptions as unknown as _AzleCanisterOptions;
    let result: _AzleCanisterReturnType = (parentOrPrincipal: any) => {
        const originalPrincipal = parentOrPrincipal;
        const parentOrUndefined =
            parentOrPrincipal !== undefined && parentOrPrincipal._isPrincipal
                ? undefined
                : parentOrPrincipal;
        const callbacks = Object.entries(_azleCanisterOptions).reduce(
            (acc, entry) => {
                const key = entry[0];
                const value = entry[1](parentOrUndefined);

                return {
                    ...acc,
                    [key]: {
                        canisterCallback: value.callback,
                        crossCanisterCallback: (...args: any[]) => {
                            return serviceCall(
                                this.principal as any,
                                key,
                                value.paramCandidTypes,
                                value.returnCandidType
                            )(...args);
                        }
                    }
                };
                // }
            },
            {}
        );

        const initOption = Object.entries(_azleCanisterOptions).find(
            ([key, value]) => value(parentOrUndefined).mode === 'init'
        );
        const init =
            initOption === undefined
                ? undefined
                : {
                      name: initOption[0]
                  };

        const postUpgradeOption = Object.entries(_azleCanisterOptions).find(
            ([key, value]) => value(parentOrUndefined).mode === 'postUpgrade'
        );
        const postUpgrade =
            postUpgradeOption === undefined
                ? undefined
                : {
                      name: postUpgradeOption[0]
                  };

        const preUpgradeOption = Object.entries(_azleCanisterOptions).find(
            ([key, value]) => value(parentOrUndefined).mode === 'preUpgrade'
        );
        const preUpgrade =
            preUpgradeOption === undefined
                ? undefined
                : {
                      name: preUpgradeOption[0]
                  };

        const heartbeatOption = Object.entries(_azleCanisterOptions).find(
            ([key, value]) => value(parentOrUndefined).mode === 'heartbeat'
        );
        const heartbeat =
            heartbeatOption === undefined
                ? undefined
                : {
                      name: heartbeatOption[0]
                  };

        const inspectMessageOption = Object.entries(_azleCanisterOptions).find(
            ([key, value]) => value(parentOrUndefined).mode === 'inspectMessage'
        );
        const inspectMessage =
            inspectMessageOption === undefined
                ? undefined
                : {
                      name: inspectMessageOption[0]
                  };

        const queries = Object.entries(_azleCanisterOptions)
            .filter((entry) => {
                const key = entry[0];
                const value = entry[1](parentOrUndefined);

                return value.mode === 'query';
            })
            .map((entry) => {
                const key = entry[0];
                const value = entry[1](parentOrUndefined);

                return {
                    name: key,
                    composite: value.async,
                    guard_name: createGlobalGuard(value.guard, key)
                };
            });

        const updates = Object.entries(_azleCanisterOptions)
            .filter((entry) => {
                const key = entry[0];
                const value = entry[1](parentOrUndefined);

                return value.mode === 'update';
            })
            .map((entry) => {
                const key = entry[0];
                const value = entry[1](parentOrUndefined);

                return {
                    name: key,
                    guard_name: createGlobalGuard(value.guard, key)
                };
            });

        let returnFunction: _AzleFunctionReturnType = (
            principal: Principal
        ) => {
            const callbacks = Object.entries(_azleCanisterOptions).reduce(
                (acc, entry) => {
                    const key = entry[0];
                    const value = entry[1](parentOrUndefined);

                    return {
                        ...acc,
                        [key]: {
                            canisterCallback: value.callback,
                            crossCanisterCallback: (...args: any[]) => {
                                return serviceCall(
                                    principal as any,
                                    key,
                                    value.paramCandidTypes,
                                    value.returnCandidType
                                )(...args);
                            }
                        }
                    };
                    // }
                },
                {}
            );

            return {
                ...callbacks,
                principal
            };
        };

        returnFunction.init = init;
        returnFunction.post_upgrade = postUpgrade;
        returnFunction.pre_upgrade = preUpgrade;
        returnFunction.heartbeat = heartbeat;
        returnFunction.inspect_message = inspectMessage;
        returnFunction.queries = queries;
        returnFunction.updates = updates;
        returnFunction.callbacks = callbacks;
        returnFunction.getSystemFunctionIDLs = (
            parents: Parent[]
        ): IDL.FuncClass[] => {
            const serviceFunctionInfo =
                _azleCanisterOptions as unknown as ServiceFunctionInfo;

            return Object.entries(serviceFunctionInfo).reduce(
                (accumulator, [_methodName, functionInfo]) => {
                    const mode = functionInfo(parentOrUndefined).mode;
                    if (mode === 'update' || mode === 'query') {
                        // We don't want init, post upgrade, etc showing up in the idl
                        return accumulator;
                    }

                    const paramRealIdls = toParamIDLTypes(
                        functionInfo(parentOrUndefined).paramCandidTypes,
                        parents
                    );
                    const returnRealIdl = toReturnIDLType(
                        functionInfo(parentOrUndefined).returnCandidType,
                        parents
                    );
                    return [
                        ...accumulator,
                        IDL.Func(paramRealIdls, returnRealIdl, [mode])
                    ];
                },
                [] as IDL.FuncClass[]
            );
        };
        returnFunction.getIDL = (parents: Parent[]): IDL.ServiceClass => {
            const serviceFunctionInfo =
                _azleCanisterOptions as unknown as ServiceFunctionInfo;

            const record = Object.entries(serviceFunctionInfo).reduce(
                (accumulator, [methodName, functionInfo]) => {
                    const paramRealIdls = toParamIDLTypes(
                        functionInfo(parentOrUndefined).paramCandidTypes,
                        parents
                    );
                    const returnRealIdl = toReturnIDLType(
                        functionInfo(parentOrUndefined).returnCandidType,
                        parents
                    );

                    const mode = functionInfo(parentOrUndefined).mode;
                    let annotations: string[] = [];
                    if (mode === 'update') {
                        // do nothing
                    } else if (mode === 'query') {
                        annotations = ['query'];
                    } else {
                        // We don't want init, post upgrade, etc showing up in the idl
                        return accumulator;
                    }

                    return {
                        ...accumulator,
                        [methodName]: IDL.Func(
                            paramRealIdls,
                            returnRealIdl,
                            annotations
                        )
                    };
                },
                {} as Record<string, IDL.FuncClass>
            );

            return IDL.Service(record);
        };

        if (originalPrincipal !== undefined && originalPrincipal._isPrincipal) {
            return returnFunction(originalPrincipal);
        }

        return returnFunction;
    };
    result._azleIsCanister = true;
    return result as any;
}

type CallRawFunction = typeof ic.callRaw | typeof ic.callRaw128;
type NotifyRawFunction = typeof ic.notifyRaw;

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
        _: '_AZLE_CROSS_CANISTER_CALL',
        notify: boolean,
        callFunction: CallRawFunction | NotifyRawFunction,
        cycles: bigint,
        ...args: any[]
    ) {
        const encodedArgs = encodeMultiple(paramCandidTypes, args);

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
function createGlobalGuard(
    guard: (() => any) | undefined,
    functionName: string
): string | undefined {
    if (guard === undefined) {
        return undefined;
    }

    const guardName = `_azleGuard_${functionName}`;

    (globalThis as any)[guardName] = guard;

    return guardName;
}

type FunctionInfo = {
    mode: 'query' | 'update';
    paramCandidTypes: CandidType[];
    returnCandidType: CandidType;
};

interface ServiceFunctionInfo {
    [key: string]: (parent: _AzleRecursiveFunction | undefined) => FunctionInfo;
}

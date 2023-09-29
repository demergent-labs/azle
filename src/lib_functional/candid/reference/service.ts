import { Principal, TypeMapping } from '../../';
import {
    IDL,
    ServiceFunctionInfo,
    createGlobalGuard,
    serviceCall
} from '../../../lib_new';
import {
    Parent,
    toParamIDLTypes,
    toReturnIDLType
} from '../../../lib_new/utils';
import { CanisterMethodInfo } from '../../canister_methods';

type CanisterOptions = {
    [key: string]: CanisterMethodInfo<any, any>;
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
    let result = (parentOrPrincipal: any) => {
        const originalPrincipal = parentOrPrincipal;
        const parentOrUndefined =
            parentOrPrincipal instanceof Principal
                ? undefined
                : parentOrPrincipal;
        const callbacks = Object.entries(serviceOptions).reduce(
            (acc, entry) => {
                const key = entry[0];
                const value = entry[1](parentOrUndefined);

                // if (principal === undefined) {
                //     return {
                //         ...acc,
                //         [key]: (...args: any[]) => {
                //             return serviceCall(
                //                 principal as any,
                //                 key,
                //                 value.paramsIdls,
                //                 value.returnIdl
                //             )(...args);
                //         }
                //     };
                // } else {
                return {
                    ...acc,
                    [key]: {
                        canisterCallback: value.callback,
                        crossCanisterCallback: (...args: any[]) => {
                            return serviceCall(
                                this.principal as any,
                                key,
                                value.paramsIdls,
                                value.returnIdl
                            )(...args);
                        }
                    }
                };
                // }
            },
            {}
        );

        const initOption = Object.entries(serviceOptions).find(
            ([key, value]) => value(parentOrUndefined).mode === 'init'
        );
        const init =
            initOption === undefined
                ? undefined
                : {
                      name: initOption[0]
                  };

        const postUpgradeOption = Object.entries(serviceOptions).find(
            ([key, value]) => value(parentOrUndefined).mode === 'postUpgrade'
        );
        const postUpgrade =
            postUpgradeOption === undefined
                ? undefined
                : {
                      name: postUpgradeOption[0]
                  };

        const preUpgradeOption = Object.entries(serviceOptions).find(
            ([key, value]) => value(parentOrUndefined).mode === 'preUpgrade'
        );
        const preUpgrade =
            preUpgradeOption === undefined
                ? undefined
                : {
                      name: preUpgradeOption[0]
                  };

        const heartbeatOption = Object.entries(serviceOptions).find(
            ([key, value]) => value(parentOrUndefined).mode === 'heartbeat'
        );
        const heartbeat =
            heartbeatOption === undefined
                ? undefined
                : {
                      name: heartbeatOption[0]
                  };

        const inspectMessageOption = Object.entries(serviceOptions).find(
            ([key, value]) => value(parentOrUndefined).mode === 'inspectMessage'
        );
        const inspectMessage =
            inspectMessageOption === undefined
                ? undefined
                : {
                      name: inspectMessageOption[0]
                  };

        const queries = Object.entries(serviceOptions)
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

        const updates = Object.entries(serviceOptions)
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

        let returnFunction = (principal: Principal) => {
            const callbacks = Object.entries(serviceOptions).reduce(
                (acc, entry) => {
                    const key = entry[0];
                    const value = entry[1](parentOrUndefined);

                    // if (principal === undefined) {
                    //     return {
                    //         ...acc,
                    //         [key]: (...args: any[]) => {
                    //             return serviceCall(
                    //                 principal as any,
                    //                 key,
                    //                 value.paramsIdls,
                    //                 value.returnIdl
                    //             )(...args);
                    //         }
                    //     };
                    // } else {
                    return {
                        ...acc,
                        [key]: {
                            canisterCallback: value.callback,
                            crossCanisterCallback: (...args: any[]) => {
                                return serviceCall(
                                    principal as any,
                                    key,
                                    value.paramsIdls,
                                    value.returnIdl
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
        returnFunction.getIDL = (parents: Parent[]): IDL.ServiceClass => {
            const serviceFunctionInfo: ServiceFunctionInfo = serviceOptions;

            const record = Object.entries(serviceFunctionInfo).reduce(
                (accumulator, [methodName, functionInfo]) => {
                    const paramRealIdls = toParamIDLTypes(
                        functionInfo(parentOrUndefined).paramsIdls,
                        parents
                    );
                    const returnRealIdl = toReturnIDLType(
                        functionInfo(parentOrUndefined).returnIdl,
                        parents
                    );

                    const annotations =
                        functionInfo(parentOrUndefined).mode === 'update'
                            ? []
                            : ['query'];

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

        if (originalPrincipal instanceof Principal) {
            return returnFunction(originalPrincipal);
        }

        return returnFunction;

        // TODO loop through each key and simply grab the candid off
        // TODO grab the init/post_upgrade candid as well
        //     return {
        //         candid: `${
        //             candidTypes.length === 0 ? '' : candidTypes.join('\n') + '\n'
        //         }service: () -> {
        //     ${Object.entries(serviceOptions)
        //         .map((entry) => {
        //             return `${entry[0]}: ${entry[1].candid}`;
        //         })
        //         .join('\n    ')}
        // }
        // `,
        //         queries,
        //         updates,
        //         callbacks,
        //         principal,
        //         ...callbacks, // TODO then we can't use any names that could collide in this object
        //         getIDL(parents: Parent[]): IDL.ServiceClass {
        //             const serviceFunctionInfo: ServiceFunctionInfo = serviceOptions;

        //             const record = Object.entries(serviceFunctionInfo).reduce(
        //                 (accumulator, [methodName, functionInfo]) => {
        //                     const paramRealIdls = toParamIDLTypes(functionInfo.paramsIdls);
        //                     const returnRealIdl = toReturnIDLType(functionInfo.returnIdl);

        //                     const annotations =
        //                         functionInfo.mode === 'update' ? [] : ['query'];

        //                     return {
        //                         ...accumulator,
        //                         [methodName]: IDL.Func(
        //                             paramRealIdls,
        //                             returnRealIdl,
        //                             annotations
        //                         )
        //                     };
        //                 },
        //                 {} as Record<string, IDL.FuncClass>
        //             );

        //             return IDL.Service(record);
        //         }
        //     } as any;
    };
    result._azleIsCanister = true;
    return result;
}

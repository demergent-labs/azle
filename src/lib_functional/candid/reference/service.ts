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

type ServiceOptions = {
    [key: string]: CanisterMethodInfo<any, any>;
};

type ServiceReturn<T extends ServiceOptions> = {
    [EndpointName in keyof T]: T[EndpointName] extends CanisterMethodInfo<
        infer Params,
        infer Return
    >
        ? (
              ...args: { [K in keyof Params]: TypeMapping<Params[K]> }
          ) => Promise<TypeMapping<Return>>
        : never;
};

type CallableObject<T extends ServiceOptions> = {
    (principal: Principal): CallableObject<T>;
} & ServiceReturn<T>;

export function Service<T extends ServiceOptions>(
    serviceOptions: T
): CallableObject<T> {
    const callbacks = Object.entries(serviceOptions).reduce((acc, entry) => {
        const key = entry[0];
        const value = entry[1];

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
    }, {});

    const candidTypes = Object.values(serviceOptions).reduce(
        (acc: string[], canisterMethodInfo) => {
            return [...acc, ...canisterMethodInfo.candidTypes];
        },
        []
    );

    const initOption = Object.entries(serviceOptions).find(
        ([key, value]) => value.mode === 'init'
    );
    const init =
        initOption === undefined
            ? undefined
            : {
                  name: initOption[0]
              };

    const heartbeatOption = Object.entries(serviceOptions).find(
        ([key, value]) => value.mode === 'heartbeat'
    );
    const heartbeat =
        heartbeatOption === undefined
            ? undefined
            : {
                  name: heartbeatOption[0]
              };

    const inspectMessageOption = Object.entries(serviceOptions).find(
        ([key, value]) => value.mode === 'inspectMessage'
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
            const value = entry[1];

            return value.mode === 'query';
        })
        .map((entry) => {
            const key = entry[0];
            const value = entry[1];

            return {
                name: key,
                composite: value.async,
                guard_name: createGlobalGuard(value.guard, key)
            };
        });

    const updates = Object.entries(serviceOptions)
        .filter((entry) => {
            const key = entry[0];
            const value = entry[1];

            return value.mode === 'update';
        })
        .map((entry) => {
            const key = entry[0];
            const value = entry[1];

            return {
                name: key,
                guard_name: createGlobalGuard(value.guard, key)
            };
        });

    let returnFunction = (principal: Principal) => {
        const callbacks = Object.entries(serviceOptions).reduce(
            (acc, entry) => {
                const key = entry[0];
                const value = entry[1];

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

    returnFunction.candid = `${
        candidTypes.length === 0 ? '' : candidTypes.join('\n') + '\n'
    }service: (${initOption?.[1].candid ?? ''}) -> {
    ${Object.entries(serviceOptions)
        .filter(
            ([_, value]) => value.mode === 'query' || value.mode === 'update'
        )
        .map((entry) => {
            return `${entry[0]}: ${entry[1].candid}`;
        })
        .join('\n    ')}
}
`;

    returnFunction.init = init;
    returnFunction.heartbeat = heartbeat;
    returnFunction.inspect_message = inspectMessage;
    returnFunction.queries = queries;
    returnFunction.updates = updates;
    returnFunction.callbacks = callbacks;
    returnFunction.getIDL = (parents: Parent[]): IDL.ServiceClass => {
        const serviceFunctionInfo: ServiceFunctionInfo = serviceOptions;

        const record = Object.entries(serviceFunctionInfo).reduce(
            (accumulator, [methodName, functionInfo]) => {
                const paramRealIdls = toParamIDLTypes(functionInfo.paramsIdls);
                const returnRealIdl = toReturnIDLType(functionInfo.returnIdl);

                const annotations =
                    functionInfo.mode === 'update' ? [] : ['query'];

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
}

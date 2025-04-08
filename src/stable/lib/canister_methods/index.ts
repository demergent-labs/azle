import { IDL } from '@dfinity/candid';

import { MethodMeta } from '#utils/types';

import { idlToString } from '../did_file';
import { handleUncaughtError } from '../error';
import {
    CanisterMethodMode,
    executeAndReplyWithCandidSerde
} from '../execute_with_candid_serde';
import { InitOptions } from './init';
import { InspectMessageOptions } from './inspect_message';
import { PostUpgradeOptions } from './post_upgrade';
import { QueryOptions } from './query';
import { UpdateOptions } from './update';

type CanisterClass = {
    constructor: (new () => unknown) & {
        _azleCanisterClassMeta: CanisterClassMeta;
    };
};

export type CanisterClassMeta = {
    callbacks: {
        [key: string]: () => Promise<void>;
    };
    canisterMethodIdlParamTypes: { [key: string]: IDL.FuncClass };
    canisterMethodsIndex: number;
    initAndPostUpgradeIdlTypes: IDL.Type[];
    definedSystemMethods: DefinedSystemMethods;
    methodMeta: MethodMeta;
};

type DefinedSystemMethods = {
    init: boolean;
    postUpgrade: boolean;
    preUpgrade: boolean;
    inspectMessage: boolean;
    heartbeat: boolean;
    onLowWasmMemory: boolean;
};

export type MethodType<This, Args extends unknown[], Return> = (
    this: This,
    ...args: Args
) => Return;

export type DecoratorFunction<This, Args extends unknown[], Return> = (
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
) => void;

export type OriginalMethod<This, Args extends unknown[], Return> = MethodType<
    This,
    Args,
    Return
>;

export type Context<
    This,
    Args extends unknown[],
    Return
> = ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>;

/**
 * @internal
 *
 * This is the entry point for our overloaded decorator functions before calling the common implementation.
 * It handles determining which overload we are using and then either calling the common implementation or
 * returning a decorator function which calls the common implementation.
 */
export function decoratorArgumentsHandler<This, Args extends unknown[], Return>(
    canisterMethodMode: CanisterMethodMode,
    param1?:
        | OriginalMethod<This, Args, Return>
        | IDL.Type[]
        | InspectMessageOptions,
    param2?:
        | Context<This, Args, Return>
        | IDL.Type
        | InitOptions
        | PostUpgradeOptions,
    param3?: QueryOptions | UpdateOptions
): void | DecoratorFunction<This, Args, Return> {
    const decoratorIsOverloadedWithoutParams =
        isDecoratorOverloadedWithoutParams(param1, param2);

    if (decoratorIsOverloadedWithoutParams === true) {
        const originalMethod = param1 as OriginalMethod<This, Args, Return>;
        const context = param2 as Context<This, Args, Return>;

        return decoratorImplementation(
            canisterMethodMode,
            originalMethod,
            context
        );
    } else {
        const paramIdlTypes = (
            canisterMethodMode === 'query' ||
            canisterMethodMode === 'update' ||
            canisterMethodMode === 'init' ||
            canisterMethodMode === 'postUpgrade'
                ? param1
                : undefined
        ) as IDL.Type[] | undefined;
        const returnIdlType = (
            canisterMethodMode === 'query' || canisterMethodMode === 'update'
                ? param2
                : undefined
        ) as IDL.Type | undefined;
        const options = (
            canisterMethodMode === 'inspectMessage'
                ? param1
                : canisterMethodMode === 'init' ||
                    canisterMethodMode === 'postUpgrade'
                  ? param2
                  : param3
        ) as
            | QueryOptions
            | UpdateOptions
            | InitOptions
            | PostUpgradeOptions
            | InspectMessageOptions
            | undefined;

        return (
            originalMethod: OriginalMethod<This, Args, Return>,
            context: Context<This, Args, Return>
        ): void => {
            return decoratorImplementation(
                canisterMethodMode,
                originalMethod,
                context,
                paramIdlTypes,
                returnIdlType,
                options
            );
        };
    }
}

/**
 * @internal
 *
 * The common implementation for all of our exposed canister method decorators.
 */
function decoratorImplementation<This, Args extends unknown[], Return>(
    canisterMethodMode: CanisterMethodMode,
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>,
    paramIdlTypes?: IDL.Type[],
    returnIdlType?: IDL.Type,
    options?: QueryOptions | UpdateOptions | InitOptions | PostUpgradeOptions
): void {
    context.addInitializer(function () {
        // We either get the somewhat global _azleCanisterClassMeta object from the constructor
        // as set during Azle's initialization process, or we create
        // a local _azleCanisterClassMeta object that will essentially be inert
        // This handles the case of the developer instnatiating a class with canister method
        // decorators, but not exporting that class from the main defined in dfx.json
        // We only ever want canister methods to be registered if they were exported
        // from the main defined in dfx.json
        let defaultCanisterClassMeta: CanisterClassMeta = {
            callbacks: {},
            canisterMethodIdlParamTypes: {},
            canisterMethodsIndex: 0,
            initAndPostUpgradeIdlTypes: [],
            definedSystemMethods: {
                init: false,
                postUpgrade: false,
                preUpgrade: false,
                heartbeat: false,
                inspectMessage: false,
                onLowWasmMemory: false
            },
            methodMeta: {
                queries: [],
                updates: []
            }
        };

        let canisterClassMethodInfo =
            (this as CanisterClass).constructor._azleCanisterClassMeta ??
            defaultCanisterClassMeta;

        const name = context.name as string;

        const index = canisterClassMethodInfo.canisterMethodsIndex++;
        const indexString = index.toString();

        if (canisterMethodMode === 'query') {
            canisterClassMethodInfo.methodMeta.queries?.push({
                name,
                index,
                composite: (options as QueryOptions)?.composite ?? false,
                hidden: (options as QueryOptions)?.hidden ?? false
            });

            canisterClassMethodInfo.canisterMethodIdlParamTypes[name] =
                IDL.Func(
                    paramIdlTypes ?? [],
                    returnIdlType === undefined ? [] : [returnIdlType],
                    ['query']
                );
        }

        if (canisterMethodMode === 'update') {
            canisterClassMethodInfo.methodMeta.updates?.push({
                name,
                index,
                hidden: (options as UpdateOptions)?.hidden ?? false
            });

            canisterClassMethodInfo.canisterMethodIdlParamTypes[name] =
                IDL.Func(
                    paramIdlTypes ?? [],
                    returnIdlType === undefined ? [] : [returnIdlType]
                );
        }

        if (canisterMethodMode === 'init') {
            throwIfMethodAlreadyDefined(
                'init',
                canisterClassMethodInfo.definedSystemMethods.init
            );

            canisterClassMethodInfo.definedSystemMethods.init = true;
            canisterClassMethodInfo.methodMeta.init = {
                name,
                index
            };

            const postUpgradeDefined =
                canisterClassMethodInfo.definedSystemMethods.postUpgrade;

            if (postUpgradeDefined === true) {
                verifyInitAndPostUpgradeHaveTheSameParams(
                    paramIdlTypes ?? [],
                    canisterClassMethodInfo.initAndPostUpgradeIdlTypes
                );
            } else {
                canisterClassMethodInfo.initAndPostUpgradeIdlTypes =
                    paramIdlTypes ?? [];
            }
        }

        if (canisterMethodMode === 'postUpgrade') {
            throwIfMethodAlreadyDefined(
                'postUpgrade',
                canisterClassMethodInfo.definedSystemMethods.postUpgrade
            );

            canisterClassMethodInfo.definedSystemMethods.postUpgrade = true;
            canisterClassMethodInfo.methodMeta.post_upgrade = {
                name,
                index
            };

            const initDefined =
                canisterClassMethodInfo.definedSystemMethods.init;

            if (initDefined === true) {
                verifyInitAndPostUpgradeHaveTheSameParams(
                    paramIdlTypes ?? [],
                    canisterClassMethodInfo.initAndPostUpgradeIdlTypes
                );
            } else {
                canisterClassMethodInfo.initAndPostUpgradeIdlTypes =
                    paramIdlTypes ?? [];
            }
        }

        if (canisterMethodMode === 'preUpgrade') {
            throwIfMethodAlreadyDefined(
                'preUpgrade',
                canisterClassMethodInfo.definedSystemMethods.preUpgrade
            );

            canisterClassMethodInfo.definedSystemMethods.preUpgrade = true;
            canisterClassMethodInfo.methodMeta.pre_upgrade = {
                name,
                index
            };
        }

        if (canisterMethodMode === 'inspectMessage') {
            throwIfMethodAlreadyDefined(
                'inspectMessage',
                canisterClassMethodInfo.definedSystemMethods.inspectMessage
            );

            canisterClassMethodInfo.definedSystemMethods.inspectMessage = true;
            canisterClassMethodInfo.methodMeta.inspect_message = {
                name,
                index
            };
        }

        if (canisterMethodMode === 'heartbeat') {
            throwIfMethodAlreadyDefined(
                'heartbeat',
                canisterClassMethodInfo.definedSystemMethods.heartbeat
            );

            canisterClassMethodInfo.definedSystemMethods.heartbeat = true;
            canisterClassMethodInfo.methodMeta.heartbeat = {
                name,
                index
            };
        }

        if (canisterMethodMode === 'onLowWasmMemory') {
            throwIfMethodAlreadyDefined(
                'onLowWasmMemory',
                canisterClassMethodInfo.definedSystemMethods.onLowWasmMemory
            );

            canisterClassMethodInfo.definedSystemMethods.onLowWasmMemory = true;
            canisterClassMethodInfo.methodMeta.on_low_wasm_memory = {
                name,
                index
            };
        }

        canisterClassMethodInfo.callbacks[indexString] =
            async (): Promise<void> => {
                try {
                    await executeAndReplyWithCandidSerde(
                        canisterMethodMode,
                        originalMethod.bind(this),
                        paramIdlTypes ?? [],
                        returnIdlType,
                        options?.manual ?? false,
                        canisterClassMethodInfo.canisterMethodIdlParamTypes
                    );
                } catch (error) {
                    handleUncaughtError(error);
                }
            };
    });
}

/**
 * @internal
 *
 * Determines if the params are from a pure decorator function without our own parameter currying.
 */
function isDecoratorOverloadedWithoutParams<
    This,
    Args extends unknown[],
    Return
>(
    param1?:
        | MethodType<This, Args, Return>
        | IDL.Type[]
        | InspectMessageOptions,
    param2?:
        | ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
        | IDL.Type
        | InitOptions
        | PostUpgradeOptions
): boolean {
    return (
        typeof param1 === 'function' &&
        param2 !== undefined &&
        'kind' in param2 &&
        param2.kind === 'method' &&
        param2.metadata !== undefined &&
        param2.name !== undefined
    );
}

/**
 * @internal
 *
 * Uses the candid string of the `@init` and `@postUpgrade` methods to verify that
 * they have matching parameter signatures.
 *
 * @param idlTypes - Array of IDL function types representing canister methods
 * @throws {Error} If methods have mismatched parameters or if invalid number of methods
 */
function verifyInitAndPostUpgradeHaveTheSameParams(
    a: IDL.Type[],
    b: IDL.Type[]
): void {
    const aSignature = idlToString(IDL.Func(a, []));
    const bSignature = idlToString(IDL.Func(b, []));

    if (aSignature !== bSignature) {
        throw new Error(
            `'@init' and '@postUpgrade' methods must have the same parameters.\nFound:\n${aSignature}\n${bSignature}`
        );
    }
}

/**
 * @internal
 *
 * Throws an error if a method is already defined in the class.
 *
 * @param methodName - The name of the method
 * @param isDefined - Whether the method is already defined
 * @throws {Error} If the method is already defined
 */
function throwIfMethodAlreadyDefined(
    methodName: keyof DefinedSystemMethods,
    isDefined: boolean
): void {
    if (isDefined === true) {
        throw new Error(
            `'@${methodName}' method can only have one definition in a canister class`
        );
    }
}

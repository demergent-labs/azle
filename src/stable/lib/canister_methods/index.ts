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

// TODO I am starting to think that we should have two different implementations of the decorators
// TODO one is just for running in the node Wasm environment
// TODO one is for running in the canister environment
// TODO I wish we could choose a better Suffix besides Info
export interface CanisterMethodClassInfo {
    // TODO needed in the canister
    _azleCallbacks: {
        [key: string]: () => Promise<void>;
    };
    _azleCanisterMethodIdlParamTypes: { [key: string]: IDL.FuncClass };

    // TODO this might need to be global...or actually maybe we do this at the
    // TODO end of the process once we have all of everything generated
    // TODO then we can go and assign indexes
    _azleCanisterMethodsIndex: number;
    // _azleDefinedSystemMethods?: DefinedSystemMethods;
    // _azleMethodMeta?: MethodMeta;

    // TODO needed in node wasm for candid file generation
    _azleInitAndPostUpgradeIdlTypes: IDL.Type[];

    // TODO this is just a helper anyway
    _azleDefinedSystemMethods: DefinedSystemMethods;
    _azleMethodMeta: MethodMeta;
}

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
        let canisterClassMethodInfo = (this as any).constructor
            ._azleCanisterMethodClassInfo as CanisterMethodClassInfo;

        const name = context.name as string;

        const index = canisterClassMethodInfo._azleCanisterMethodsIndex++;
        const indexString = index.toString();

        if (canisterMethodMode === 'query') {
            canisterClassMethodInfo._azleMethodMeta.queries?.push({
                name,
                index,
                composite: (options as QueryOptions)?.composite ?? false,
                hidden: (options as QueryOptions)?.hidden ?? false
            });

            canisterClassMethodInfo._azleCanisterMethodIdlParamTypes[name] =
                IDL.Func(
                    paramIdlTypes ?? [],
                    returnIdlType === undefined ? [] : [returnIdlType],
                    ['query']
                );
        }

        if (canisterMethodMode === 'update') {
            canisterClassMethodInfo._azleMethodMeta.updates?.push({
                name,
                index,
                hidden: (options as UpdateOptions)?.hidden ?? false
            });

            canisterClassMethodInfo._azleCanisterMethodIdlParamTypes[name] =
                IDL.Func(
                    paramIdlTypes ?? [],
                    returnIdlType === undefined ? [] : [returnIdlType]
                );
        }

        if (canisterMethodMode === 'init') {
            throwIfMethodAlreadyDefined(
                'init',
                canisterClassMethodInfo._azleDefinedSystemMethods.init
            );

            canisterClassMethodInfo._azleDefinedSystemMethods.init = true;
            canisterClassMethodInfo._azleMethodMeta.init = {
                name,
                index
            };

            const postUpgradeDefined =
                canisterClassMethodInfo._azleDefinedSystemMethods.postUpgrade;

            if (postUpgradeDefined === true) {
                verifyInitAndPostUpgradeHaveTheSameParams(
                    paramIdlTypes ?? [],
                    canisterClassMethodInfo._azleInitAndPostUpgradeIdlTypes
                );
            } else {
                canisterClassMethodInfo._azleInitAndPostUpgradeIdlTypes =
                    paramIdlTypes ?? [];
            }
        }

        if (canisterMethodMode === 'postUpgrade') {
            throwIfMethodAlreadyDefined(
                'postUpgrade',
                canisterClassMethodInfo._azleDefinedSystemMethods.postUpgrade
            );

            canisterClassMethodInfo._azleDefinedSystemMethods.postUpgrade =
                true;
            canisterClassMethodInfo._azleMethodMeta.post_upgrade = {
                name,
                index
            };

            const initDefined =
                canisterClassMethodInfo._azleDefinedSystemMethods.init;

            if (initDefined === true) {
                verifyInitAndPostUpgradeHaveTheSameParams(
                    paramIdlTypes ?? [],
                    canisterClassMethodInfo._azleInitAndPostUpgradeIdlTypes
                );
            } else {
                canisterClassMethodInfo._azleInitAndPostUpgradeIdlTypes =
                    paramIdlTypes ?? [];
            }
        }

        if (canisterMethodMode === 'preUpgrade') {
            throwIfMethodAlreadyDefined(
                'preUpgrade',
                canisterClassMethodInfo._azleDefinedSystemMethods.preUpgrade
            );

            canisterClassMethodInfo._azleDefinedSystemMethods.preUpgrade = true;
            canisterClassMethodInfo._azleMethodMeta.pre_upgrade = {
                name,
                index
            };
        }

        if (canisterMethodMode === 'inspectMessage') {
            throwIfMethodAlreadyDefined(
                'inspectMessage',
                canisterClassMethodInfo._azleDefinedSystemMethods.inspectMessage
            );

            canisterClassMethodInfo._azleDefinedSystemMethods.inspectMessage =
                true;
            canisterClassMethodInfo._azleMethodMeta.inspect_message = {
                name,
                index
            };
        }

        if (canisterMethodMode === 'heartbeat') {
            throwIfMethodAlreadyDefined(
                'heartbeat',
                canisterClassMethodInfo._azleDefinedSystemMethods.heartbeat
            );

            canisterClassMethodInfo._azleDefinedSystemMethods.heartbeat = true;
            canisterClassMethodInfo._azleMethodMeta.heartbeat = {
                name,
                index
            };
        }

        if (canisterMethodMode === 'onLowWasmMemory') {
            throwIfMethodAlreadyDefined(
                'onLowWasmMemory',
                canisterClassMethodInfo._azleDefinedSystemMethods
                    .onLowWasmMemory
            );

            canisterClassMethodInfo._azleDefinedSystemMethods.onLowWasmMemory =
                true;
            canisterClassMethodInfo._azleMethodMeta.on_low_wasm_memory = {
                name,
                index
            };
        }

        canisterClassMethodInfo._azleCallbacks[indexString] =
            async (): Promise<void> => {
                try {
                    await executeAndReplyWithCandidSerde(
                        canisterMethodMode,
                        originalMethod.bind(this),
                        paramIdlTypes ?? [],
                        returnIdlType,
                        options?.manual ?? false,
                        canisterClassMethodInfo._azleCanisterMethodIdlParamTypes
                    );
                } catch (error) {
                    handleUncaughtError(error);
                }
            };

        // TODO in the node wasm environment through to just get the data needed
        // TODO otherwise the canister should return normally in the canister wasm environment
        // if (globalThis._azleNodeWasmEnvironment === true) {
        //     throw exportedCanisterClassInstance;
        // }
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
            `'@${methodName}' method can only have one definition in the exported canister class`
        );
    }
}

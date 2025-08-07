import { IDL } from '@dfinity/candid';

import { GenericFuncArgs, toArgsTuple } from '#lib/func';
import { MethodMeta } from '#utils/types';

import { idlToString } from '../did_file';
import { handleUncaughtError } from '../error';
import {
    CanisterMethodMode,
    executeAndReplyWithCandidSerde
} from '../execute_and_reply_with_candid_serde';
import { InitOptions } from './init';
import { InspectMessageOptions } from './inspect_message';
import { PostUpgradeOptions } from './post_upgrade';
import { QueryOptions } from './query';
import { UpdateOptions } from './update';

type CanisterClass = {
    constructor: (new () => unknown) & {
        _azleCanisterClassMeta: CanisterClassMeta | undefined;
    };
};

export type CanisterClassMeta = {
    callbacks: {
        [key: string]: () => Promise<void>;
    };
    canisterMethodIdlParamTypes: { [key: string]: IDL.FuncClass };
    canisterMethodsIndex: number;
    initAndPostUpgradeIdlTypes: GenericFuncArgs;
    methodMeta: MethodMeta;
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
        const paramIdlTypes = toArgsTuple(
            canisterMethodMode === 'query' ||
                canisterMethodMode === 'update' ||
                canisterMethodMode === 'init' ||
                canisterMethodMode === 'postUpgrade'
                ? (param1 as IDL.Type[])
                : undefined
        );
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
    paramIdlTypes?: GenericFuncArgs,
    returnIdlType?: IDL.Type,
    options?: QueryOptions | UpdateOptions | InitOptions | PostUpgradeOptions
): void {
    context.addInitializer(function () {
        let defaultCanisterClassMeta: CanisterClassMeta = {
            callbacks: {},
            canisterMethodIdlParamTypes: {},
            canisterMethodsIndex: 0,
            initAndPostUpgradeIdlTypes: [],
            methodMeta: {
                queries: [],
                updates: []
            }
        };

        // The instantiation of the canister class that occurs in getCanisterClassMeta
        // will set the initial value of this.constructor._azleCanisterClassMeta.
        // this.constructor._azleCanisterClassMeta will be the same reference throughout
        // all instantiations of exported canister classes. If the canister class has not been
        // exported as the default export from the main entrypoint of the canister,
        // then this.constructor._azleCanisterClassMeta will be undefined, and we will
        // then just use a default value that will be thrown away at the end of this function scope.
        // This handles the case of the developer instantiating a class with canister method
        // decorators, but not exporting that class from the main entrypoint.
        // We only ever want canister methods to be registered if they were exported
        // from the main entrypoint defined in dfx.json.
        let canisterClassMeta =
            (this as CanisterClass).constructor._azleCanisterClassMeta ??
            defaultCanisterClassMeta;

        const name = context.name as string;

        const index = canisterClassMeta.canisterMethodsIndex++;
        const indexString = index.toString();

        if (canisterMethodMode === 'query') {
            throwIfMethodAlreadyDefined(
                `@query ${name}`,
                canisterClassMeta.methodMeta.queries?.find(
                    (queryMethod) => queryMethod.name === name
                ) !== undefined
            );

            canisterClassMeta.methodMeta.queries?.push({
                name,
                index,
                composite: (options as QueryOptions)?.composite ?? false,
                hidden: (options as QueryOptions)?.hidden ?? false
            });

            canisterClassMeta.canisterMethodIdlParamTypes[name] = IDL.Func(
                paramIdlTypes ?? [],
                returnIdlType === undefined ? [] : [returnIdlType],
                ['query']
            );
        }

        if (canisterMethodMode === 'update') {
            throwIfMethodAlreadyDefined(
                `@update ${name}`,
                canisterClassMeta.methodMeta.updates?.find(
                    (updateMethod) => updateMethod.name === name
                ) !== undefined
            );

            canisterClassMeta.methodMeta.updates?.push({
                name,
                index,
                hidden: (options as UpdateOptions)?.hidden ?? false
            });

            canisterClassMeta.canisterMethodIdlParamTypes[name] = IDL.Func(
                paramIdlTypes ?? [],
                returnIdlType === undefined ? [] : [returnIdlType]
            );
        }

        if (canisterMethodMode === 'init') {
            throwIfMethodAlreadyDefined(
                '@init',
                canisterClassMeta.methodMeta.init !== undefined
            );

            canisterClassMeta.methodMeta.init = {
                name,
                index
            };

            const postUpgradeDefined =
                canisterClassMeta.methodMeta.post_upgrade !== undefined;

            if (postUpgradeDefined === true) {
                verifyInitAndPostUpgradeHaveTheSameParams(
                    paramIdlTypes ?? [],
                    canisterClassMeta.initAndPostUpgradeIdlTypes
                );
            } else {
                canisterClassMeta.initAndPostUpgradeIdlTypes =
                    paramIdlTypes ?? [];
            }
        }

        if (canisterMethodMode === 'postUpgrade') {
            throwIfMethodAlreadyDefined(
                '@postUpgrade',
                canisterClassMeta.methodMeta.post_upgrade !== undefined
            );

            canisterClassMeta.methodMeta.post_upgrade = {
                name,
                index
            };

            const initDefined = canisterClassMeta.methodMeta.init !== undefined;

            if (initDefined === true) {
                verifyInitAndPostUpgradeHaveTheSameParams(
                    paramIdlTypes ?? [],
                    canisterClassMeta.initAndPostUpgradeIdlTypes
                );
            } else {
                canisterClassMeta.initAndPostUpgradeIdlTypes =
                    paramIdlTypes ?? [];
            }
        }

        if (canisterMethodMode === 'preUpgrade') {
            throwIfMethodAlreadyDefined(
                '@preUpgrade',
                canisterClassMeta.methodMeta.pre_upgrade !== undefined
            );

            canisterClassMeta.methodMeta.pre_upgrade = {
                name,
                index
            };
        }

        if (canisterMethodMode === 'inspectMessage') {
            throwIfMethodAlreadyDefined(
                '@inspectMessage',
                canisterClassMeta.methodMeta.inspect_message !== undefined
            );

            canisterClassMeta.methodMeta.inspect_message = {
                name,
                index
            };
        }

        if (canisterMethodMode === 'heartbeat') {
            throwIfMethodAlreadyDefined(
                '@heartbeat',
                canisterClassMeta.methodMeta.heartbeat !== undefined
            );

            canisterClassMeta.methodMeta.heartbeat = {
                name,
                index
            };
        }

        if (canisterMethodMode === 'onLowWasmMemory') {
            throwIfMethodAlreadyDefined(
                '@onLowWasmMemory',
                canisterClassMeta.methodMeta.on_low_wasm_memory !== undefined
            );

            canisterClassMeta.methodMeta.on_low_wasm_memory = {
                name,
                index
            };
        }

        canisterClassMeta.callbacks[indexString] = async (): Promise<void> => {
            try {
                await executeAndReplyWithCandidSerde(
                    canisterMethodMode,
                    originalMethod.bind(this),
                    paramIdlTypes ?? [],
                    returnIdlType,
                    options?.manual ?? false,
                    canisterClassMeta.canisterMethodIdlParamTypes
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
    a: GenericFuncArgs,
    b: GenericFuncArgs
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
    methodName: string,
    isDefined: boolean
): void {
    if (isDefined === true) {
        throw new Error(
            `'${methodName}' method can only have one definition in the canister`
        );
    }
}

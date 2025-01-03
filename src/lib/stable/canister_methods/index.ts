import { IDL } from '@dfinity/candid';

import { MethodMeta } from '../../../build/stable/utils/types';
import { handleUncaughtError } from '../error';
import {
    CanisterMethodMode,
    executeAndReplyWithCandidSerde
} from '../execute_with_candid_serde';
import { QueryOptions } from './query';
import { UpdateOptions } from './update';

export interface ExportedCanisterClass {
    _azleCallbacks?: {
        [key: string]: (args?: Uint8Array) => Promise<void>;
    };
    _azleCanisterMethodIdlTypes?: { [key: string]: IDL.FuncClass };
    _azleCanisterMethodsIndex?: number;
    _azleInitAndPostUpgradeIdlTypes?: IDL.FuncClass[];
    _azleMethodMeta?: MethodMeta;
    _azleShouldRegisterCanisterMethods?: boolean;
}

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
 * Handles decorator arguments for canister methods, supporting both overloaded and non-overloaded decorators.
 *
 * @param canisterMethodMode - The mode of the canister method (query, update, etc)
 * @param param1 - Either the original method (for overloaded decorators) or an array of IDL types for parameters
 * @param param2 - Either the decorator context (for overloaded decorators) or the IDL return type
 * @param param3 - Optional query or update options
 * @returns Either void (for overloaded decorators) or a decorator function
 */
export function decoratorArgumentsHandler<This, Args extends unknown[], Return>(
    canisterMethodMode: CanisterMethodMode,
    param1?: OriginalMethod<This, Args, Return> | IDL.Type[],
    param2?: Context<This, Args, Return> | IDL.Type,
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
        const paramIdlTypes = param1 as IDL.Type[] | undefined;
        const returnIdlType = param2 as IDL.Type | undefined;
        const options = param3;

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
 * Implements the decorator functionality for canister methods.
 *
 * This function handles the initialization and setup of canister method metadata,
 * IDL types, and callback functions for the decorated method.
 *
 * @param canisterMethodMode - The mode of the canister method (query, update, init, etc)
 * @param originalMethod - The original class method being decorated
 * @param context - The decorator context
 * @param paramIdlTypes - Optional array of Candid IDL types for the method parameters
 * @param returnIdlType - Optional Candid IDL type for the method return value
 * @param options - Optional query or update options
 */
function decoratorImplementation<This, Args extends unknown[], Return>(
    canisterMethodMode: CanisterMethodMode,
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>,
    paramIdlTypes?: IDL.Type[],
    returnIdlType?: IDL.Type,
    options?: QueryOptions | UpdateOptions
): void {
    context.addInitializer(function () {
        let exportedCanisterClassInstance = this as ExportedCanisterClass;

        if (
            exportedCanisterClassInstance._azleCanisterMethodsIndex ===
            undefined
        ) {
            exportedCanisterClassInstance._azleCanisterMethodsIndex = 0;
        }

        if (
            exportedCanisterClassInstance._azleCanisterMethodIdlTypes ===
            undefined
        ) {
            exportedCanisterClassInstance._azleCanisterMethodIdlTypes = {};
        }

        if (
            exportedCanisterClassInstance._azleInitAndPostUpgradeIdlTypes ===
            undefined
        ) {
            exportedCanisterClassInstance._azleInitAndPostUpgradeIdlTypes = [];
        }

        if (exportedCanisterClassInstance._azleMethodMeta === undefined) {
            exportedCanisterClassInstance._azleMethodMeta = {
                queries: [],
                updates: []
            };
        }

        if (exportedCanisterClassInstance._azleCallbacks === undefined) {
            exportedCanisterClassInstance._azleCallbacks = {};
        }

        const name = context.name as string;

        const index = exportedCanisterClassInstance._azleCanisterMethodsIndex++;
        const indexString = index.toString();

        if (canisterMethodMode === 'query') {
            exportedCanisterClassInstance._azleMethodMeta.queries?.push({
                name,
                index,
                composite: (options as QueryOptions)?.composite ?? false
            });

            exportedCanisterClassInstance._azleCanisterMethodIdlTypes[name] =
                IDL.Func(
                    paramIdlTypes ?? [],
                    returnIdlType === undefined ? [] : [returnIdlType],
                    ['query']
                );
        }

        if (canisterMethodMode === 'update') {
            exportedCanisterClassInstance._azleMethodMeta.updates?.push({
                name,
                index
            });

            exportedCanisterClassInstance._azleCanisterMethodIdlTypes[name] =
                IDL.Func(
                    paramIdlTypes ?? [],
                    returnIdlType === undefined ? [] : [returnIdlType]
                );
        }

        if (canisterMethodMode === 'init') {
            exportedCanisterClassInstance._azleMethodMeta.init = {
                name,
                index
            };

            exportedCanisterClassInstance._azleInitAndPostUpgradeIdlTypes.push(
                IDL.Func(paramIdlTypes ?? [], [], ['init'])
            );
        }

        if (canisterMethodMode === 'postUpgrade') {
            exportedCanisterClassInstance._azleMethodMeta.post_upgrade = {
                name,
                index
            };

            exportedCanisterClassInstance._azleInitAndPostUpgradeIdlTypes.push(
                IDL.Func(paramIdlTypes ?? [], [], ['post_upgrade'])
            );
        }

        if (canisterMethodMode === 'preUpgrade') {
            exportedCanisterClassInstance._azleMethodMeta.pre_upgrade = {
                name,
                index
            };
        }

        if (canisterMethodMode === 'heartbeat') {
            exportedCanisterClassInstance._azleMethodMeta.heartbeat = {
                name,
                index
            };
        }

        if (canisterMethodMode === 'inspectMessage') {
            exportedCanisterClassInstance._azleMethodMeta.inspect_message = {
                name,
                index
            };
        }

        exportedCanisterClassInstance._azleCallbacks[indexString] = async (
            args?: Uint8Array
        ): Promise<void> => {
            try {
                await executeAndReplyWithCandidSerde(
                    canisterMethodMode,
                    args ?? new Uint8Array(),
                    originalMethod.bind(exportedCanisterClassInstance as This),
                    paramIdlTypes ?? [],
                    returnIdlType,
                    options?.manual ?? false
                );
            } catch (error: unknown) {
                handleUncaughtError(error);
            }
        };

        if (
            exportedCanisterClassInstance._azleShouldRegisterCanisterMethods ===
                true &&
            globalThis._azleExportedCanisterClassInstance === undefined
        ) {
            globalThis._azleExportedCanisterClassInstance =
                exportedCanisterClassInstance;
        }
    });
}

/**
 * Determines if a decorator is being used without explicit parameter types.
 *
 * This function checks if the decorator is being used in its simple form without Candid IDL type parameters:
 * ```ts
 * @query  // Simple form
 * method() {}
 * ```
 *
 * Rather than with explicit parameter types:
 * ```ts
 * @query([IDL.Text], IDL.Bool)  // With type parameters
 * method(text: string): boolean {}
 * ```
 *
 * @param param1 - Either the original method (for simple form) or an array of parameter IDL types
 * @param param2 - Either the decorator context (for simple form) or the return IDL type
 * @returns True if the decorator is used without type parameters, false otherwise
 */
function isDecoratorOverloadedWithoutParams<
    This,
    Args extends unknown[],
    Return
>(
    param1?: MethodType<This, Args, Return> | IDL.Type[],
    param2?:
        | ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
        | IDL.Type
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

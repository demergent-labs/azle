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
 * @internal
 *
 * This is the entry point for our overloaded decorator functions before calling the common implementation.
 * It handles determining which overload we are using and then either calling the common implementation or
 * returning a decorator function which calls the common implementation.
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
 * @internal
 *
 * Determines if the params are from a pure decorator function without our own parameter currying.
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

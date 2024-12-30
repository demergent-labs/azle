import { IDL } from '@dfinity/candid';

import { handleUncaughtError } from '../error';
import {
    CanisterMethodMode,
    executeAndReplyWithCandidSerde
} from '../execute_with_candid_serde';

export type MethodType<This, Args extends any[], Return> = (
    this: This,
    ...args: Args
) => Return;

export type DecoratorFunction<This, Args extends any[], Return> = (
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext
) => MethodType<This, Args, Return>;

export function decoratorArgumentsHandler<This, Args extends any[], Return>(
    canisterMethodMode: CanisterMethodMode,
    param1?: MethodType<This, Args, Return> | IDL.Type[],
    param2?: ClassMethodDecoratorContext | IDL.Type,
    param3?: { composite?: boolean; manual?: boolean }
): MethodType<This, Args, Return> | DecoratorFunction<This, Args, Return> {
    // First overload - decorator without params
    if (typeof param1 === 'function') {
        const originalMethod = param1;
        const context = param2 as ClassMethodDecoratorContext;

        return decoratorImplementation(
            canisterMethodMode,
            originalMethod,
            context
        );
    }
    // Second overload - decorator with params
    else {
        const paramIdlTypes = param1 as IDL.Type[] | undefined;
        const returnIdlType = param2 as IDL.Type | undefined;
        const options = param3;

        return (
            originalMethod: MethodType<This, Args, Return>,
            context: ClassMethodDecoratorContext
        ): MethodType<This, Args, Return> => {
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

function decoratorImplementation<This, Args extends any[], Return>(
    canisterMethodMode: CanisterMethodMode,
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext,
    paramIdlTypes?: IDL.Type[],
    returnIdlType?: IDL.Type,
    options?: { composite?: boolean; manual?: boolean }
): MethodType<This, Args, Return> {
    const name = context.name as string;

    const index = globalThis._azleCanisterMethodsIndex++;
    const indexString = index.toString();

    if (canisterMethodMode === 'query') {
        globalThis._azleMethodMeta.queries?.push({
            name,
            index,
            composite: options?.composite ?? false
        });

        globalThis._azleCanisterMethodIdlTypes[name] = IDL.Func(
            paramIdlTypes ?? [],
            returnIdlType === undefined ? [] : [returnIdlType],
            ['query']
        );
    }

    if (canisterMethodMode === 'update') {
        globalThis._azleMethodMeta.updates?.push({
            name,
            index
        });

        globalThis._azleCanisterMethodIdlTypes[name] = IDL.Func(
            paramIdlTypes ?? [],
            returnIdlType === undefined ? [] : [returnIdlType]
        );
    }

    if (canisterMethodMode === 'init') {
        globalThis._azleMethodMeta.init = {
            name,
            index
        };

        globalThis._azleInitAndPostUpgradeIdlTypes.push(
            IDL.Func(paramIdlTypes ?? [], [], ['init'])
        );
    }

    if (canisterMethodMode === 'postUpgrade') {
        globalThis._azleMethodMeta.post_upgrade = {
            name,
            index
        };

        globalThis._azleInitAndPostUpgradeIdlTypes.push(
            IDL.Func(paramIdlTypes ?? [], [], ['post_upgrade'])
        );
    }

    if (canisterMethodMode === 'preUpgrade') {
        globalThis._azleMethodMeta.pre_upgrade = {
            name,
            index
        };
    }

    if (canisterMethodMode === 'heartbeat') {
        globalThis._azleMethodMeta.heartbeat = {
            name,
            index
        };
    }

    if (canisterMethodMode === 'inspectMessage') {
        globalThis._azleMethodMeta.inspect_message = {
            name,
            index
        };
    }

    globalThis._azleCallbacks[indexString] = async (
        args?: Uint8Array
    ): Promise<void> => {
        try {
            await executeAndReplyWithCandidSerde(
                canisterMethodMode,
                args ?? new Uint8Array(),
                originalMethod.bind(globalThis._azleCanisterClassInstance),
                paramIdlTypes ?? [],
                returnIdlType,
                options?.manual ?? false
            );
        } catch (error: any) {
            handleUncaughtError(error);
        }
    };

    return originalMethod;
}

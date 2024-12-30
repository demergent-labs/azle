import { IDL } from '@dfinity/candid';

import { Method, MethodMeta } from '../../../build/stable/utils/types';
import { handleUncaughtError } from '../error';
import {
    CanisterMethodMode,
    executeAndReplyWithCandidSerde
} from '../execute_with_candid_serde';

export type MethodType<This, Args extends any[], Return> = (
    this: This,
    ...args: Args
) => Return;

export function decoratorArgumentsHandler<This, Args extends any[], Return>(
    canisterMethodMode: CanisterMethodMode,
    methodMetaKey: keyof MethodMeta,
    param1?: MethodType<This, Args, Return> | IDL.Type[],
    param2?: ClassMethodDecoratorContext | IDL.Type,
    param3?: { composite?: boolean; manual?: boolean }
): any {
    // First overload - decorator without params
    if (typeof param1 === 'function') {
        const originalMethod = param1;
        const context = param2 as ClassMethodDecoratorContext;

        return decoratorImplementation(
            canisterMethodMode,
            methodMetaKey,
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
                methodMetaKey,
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
    methodMetaKey: keyof MethodMeta,
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext,
    paramIdlTypes?: IDL.Type[],
    returnIdlType?: IDL.Type,
    options?: { composite?: boolean; manual?: boolean }
): MethodType<This, Args, Return> {
    const name = context.name as string;

    const index = globalThis._azleCanisterMethodsIndex++;
    const indexString = index.toString();

    if (canisterMethodMode !== 'heartbeat') {
        if (Array.isArray(globalThis._azleMethodMeta[methodMetaKey])) {
            if (canisterMethodMode === 'query') {
                (globalThis._azleMethodMeta[methodMetaKey] as Method[]).push({
                    name,
                    index,
                    composite: options?.composite ?? false
                });
            } else {
                (globalThis._azleMethodMeta[methodMetaKey] as Method[]).push({
                    name,
                    index
                });
            }
        } else {
            (globalThis._azleMethodMeta[methodMetaKey] as Method) = {
                name,
                index
            };
        }
    }

    if (canisterMethodMode === 'query') {
        globalThis._azleCanisterMethodIdlTypes[name] = IDL.Func(
            paramIdlTypes ?? [],
            returnIdlType === undefined ? [] : [returnIdlType],
            ['query']
        );
    }

    if (canisterMethodMode === 'update') {
        globalThis._azleCanisterMethodIdlTypes[name] = IDL.Func(
            paramIdlTypes ?? [],
            returnIdlType === undefined ? [] : [returnIdlType]
        );
    }

    if (canisterMethodMode === 'init') {
        globalThis._azleCanisterMethodIdlTypes[name] = IDL.Func(
            paramIdlTypes ?? [],
            [],
            ['init']
        );
    }

    if (canisterMethodMode === 'postUpgrade') {
        globalThis._azleCanisterMethodIdlTypes[name] = IDL.Func(
            paramIdlTypes ?? [],
            [],
            ['post_upgrade']
        );
    }

    globalThis._azleCallbacks[indexString] = async (
        args: Uint8Array
    ): Promise<void> => {
        try {
            await executeAndReplyWithCandidSerde(
                canisterMethodMode,
                args,
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

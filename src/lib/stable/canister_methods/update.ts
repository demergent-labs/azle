// TODO clean this up and apply the same logic to all decorators

import { IDL } from '@dfinity/candid';

import { handleUncaughtError } from '../error';
import { executeAndReplyWithCandidSerde } from '../execute_with_candid_serde';

export function update<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext
): (this: This, ...args: Args) => Return;

export function update<This, Args extends any[], Return>(
    paramIdlTypes?: IDL.Type[],
    returnIdlType?: IDL.Type,
    options?: {
        manual?: boolean;
    }
): (
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext
) => (this: This, ...args: Args) => Return;

export function update<This, Args extends any[], Return>(
    param1?: ((this: This, ...args: Args) => Return) | IDL.Type[],
    param2?: ClassMethodDecoratorContext | IDL.Type,
    param3?: { manual?: boolean }
): any {
    // First overload - decorator without params
    if (typeof param1 === 'function') {
        const originalMethod = param1;
        const context = param2 as ClassMethodDecoratorContext;

        return handleUpdate(originalMethod, context, [], undefined, {
            manual: false
        });
    }

    // Second overload - decorator with params
    const paramIdlTypes = param1 as IDL.Type[] | undefined;
    const returnIdlType = param2 as IDL.Type | undefined;
    const options = param3;

    return (
        originalMethod: (this: This, ...args: Args) => Return,
        context: ClassMethodDecoratorContext
    ): ((this: This, ...args: Args) => Return) => {
        return handleUpdate(
            originalMethod,
            context,
            paramIdlTypes,
            returnIdlType,
            options
        );
    };
}

function handleUpdate<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext,
    paramIdlTypes: IDL.Type[] | undefined,
    returnIdlType: IDL.Type | undefined,
    options: { manual?: boolean } | undefined
): (this: This, ...args: Args) => Return {
    const index = globalThis._azleCanisterMethodsIndex++;
    const name = context.name as string;
    const indexString = index.toString();
    globalThis._azleMethodMeta.updates?.push({ name, index });

    globalThis._azleCanisterMethodIdlTypes[name] = IDL.Func(
        paramIdlTypes ?? [],
        returnIdlType === undefined ? [] : [returnIdlType]
    );

    globalThis._azleCallbacks[indexString] = async (
        args: Uint8Array
    ): Promise<void> => {
        try {
            await executeAndReplyWithCandidSerde(
                'update',
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

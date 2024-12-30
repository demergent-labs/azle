import { IDL } from '@dfinity/candid';

import { handleUncaughtError } from '../error';
import { executeAndReplyWithCandidSerde } from '../execute_with_candid_serde';

type MethodType<This, Args extends any[], Return> = (
    this: This,
    ...args: Args
) => Return;

export function update<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext
): MethodType<This, Args, Return>;

export function update<This, Args extends any[], Return>(
    paramIdlTypes?: IDL.Type[],
    returnIdlType?: IDL.Type,
    options?: {
        manual?: boolean;
    }
): (
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext
) => MethodType<This, Args, Return>;

export function update<This, Args extends any[], Return>(
    param1?: MethodType<This, Args, Return> | IDL.Type[],
    param2?: ClassMethodDecoratorContext | IDL.Type,
    param3?: { manual?: boolean }
): any {
    // First overload - decorator without params
    if (typeof param1 === 'function') {
        const originalMethod = param1;
        const context = param2 as ClassMethodDecoratorContext;

        return updateImplementation(originalMethod, context);
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
            return updateImplementation(
                originalMethod,
                context,
                paramIdlTypes,
                returnIdlType,
                options
            );
        };
    }
}

// TODO let's put this implementation in one place
function updateImplementation<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext,
    paramIdlTypes?: IDL.Type[],
    returnIdlType?: IDL.Type,
    options?: { manual?: boolean }
): MethodType<This, Args, Return> {
    const name = context.name as string;

    const index = globalThis._azleCanisterMethodsIndex++;
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

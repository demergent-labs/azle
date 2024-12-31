import { IDL } from '@dfinity/candid';

import { decoratorArgumentsHandler, DecoratorFunction, MethodType } from '.';

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
): MethodType<This, Args, Return> | DecoratorFunction<This, Args, Return> {
    return decoratorArgumentsHandler('update', param1, param2, param3);
}

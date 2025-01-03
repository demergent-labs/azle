import { IDL } from '@dfinity/candid';

import { decoratorArgumentsHandler, DecoratorFunction, MethodType } from '.';

// TODO can we use DecoratorFunction somehow here? That's exactly what this is
export function init<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
): void;

export function init<This, Args extends any[], Return>(
    paramIdlTypes?: IDL.Type[]
): DecoratorFunction<This, Args, Return>;

export function init<This, Args extends any[], Return>(
    param1?: MethodType<This, Args, Return> | IDL.Type[],
    param2?: ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
): DecoratorFunction<This, Args, Return> | void {
    return decoratorArgumentsHandler('init', param1, param2);
}

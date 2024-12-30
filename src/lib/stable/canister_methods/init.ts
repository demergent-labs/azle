import { IDL } from '@dfinity/candid';

import { decoratorArgumentsHandler, MethodType } from '.';

export function init<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext
): MethodType<This, Args, Return>;

export function init<This, Args extends any[], Return>(
    paramIdlTypes?: IDL.Type[]
): (
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext
) => MethodType<This, Args, Return>;

export function init<This, Args extends any[], Return>(
    param1?: MethodType<This, Args, Return> | IDL.Type[],
    param2?: ClassMethodDecoratorContext
): any {
    return decoratorArgumentsHandler('init', param1, param2);
}

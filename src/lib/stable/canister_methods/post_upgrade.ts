import { IDL } from '@dfinity/candid';

import { decoratorArgumentsHandler, DecoratorFunction, MethodType } from '.';

export function postUpgrade<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
): void;

export function postUpgrade<This, Args extends any[], Return>(
    paramIdlTypes?: IDL.Type[]
): DecoratorFunction<This, Args, Return>;

export function postUpgrade<This, Args extends any[], Return>(
    param1?: MethodType<This, Args, Return> | IDL.Type[],
    param2?: ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
): DecoratorFunction<This, Args, Return> | void {
    return decoratorArgumentsHandler('postUpgrade', param1, param2);
}

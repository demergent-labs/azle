import { IDL } from '@dfinity/candid';

import {
    Context,
    decoratorArgumentsHandler,
    DecoratorFunction,
    OriginalMethod
} from '.';

export function init<This, Args extends any[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void;

export function init<This, Args extends any[], Return>(
    paramIdlTypes?: IDL.Type[]
): DecoratorFunction<This, Args, Return>;

export function init<This, Args extends any[], Return>(
    param1?: OriginalMethod<This, Args, Return> | IDL.Type[],
    param2?: Context<This, Args, Return>
): void | DecoratorFunction<This, Args, Return> {
    return decoratorArgumentsHandler('init', param1, param2);
}

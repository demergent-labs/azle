import { IDL } from '@dfinity/candid';

import {
    decoratorArgumentsHandler,
    DecoratorFunction,
    ExportedCanisterClass,
    MethodType
} from '.';

export function init<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
): MethodType<ExportedCanisterClass, Args, Return>;

export function init<This, Args extends any[], Return>(
    paramIdlTypes?: IDL.Type[]
): (
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
) => MethodType<ExportedCanisterClass, Args, Return>;

export function init<This, Args extends any[], Return>(
    param1?: MethodType<This, Args, Return> | IDL.Type[],
    param2?: ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
):
    | MethodType<ExportedCanisterClass, Args, Return>
    | DecoratorFunction<ExportedCanisterClass, Args, Return> {
    return decoratorArgumentsHandler('init', param1, param2);
}

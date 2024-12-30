import { IDL } from '@dfinity/candid';

import { decoratorArgumentsHandler, MethodType } from '.';

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
    decoratorArgumentsHandler('update', 'updates', param1, param2, param3);
}

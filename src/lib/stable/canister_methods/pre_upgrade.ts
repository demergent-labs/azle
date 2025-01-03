import { Context, decoratorArgumentsHandler, OriginalMethod } from '.';

export function preUpgrade<This, Args extends unknown[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void {
    decoratorArgumentsHandler('preUpgrade', originalMethod, context);
}

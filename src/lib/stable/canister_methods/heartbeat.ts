import { Context, decoratorArgumentsHandler, OriginalMethod } from '.';

export function heartbeat<This, Args extends unknown[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void {
    decoratorArgumentsHandler('heartbeat', originalMethod, context);
}

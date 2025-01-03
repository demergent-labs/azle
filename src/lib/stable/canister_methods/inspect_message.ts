import { Context, decoratorArgumentsHandler, OriginalMethod } from '.';

// TODO explain here in a jsdoc that the dev can get the raw args using argDataRaw
export function inspectMessage<This, Args extends unknown[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void {
    decoratorArgumentsHandler('inspectMessage', originalMethod, context);
}

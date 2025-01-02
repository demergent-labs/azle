import { decoratorArgumentsHandler, MethodType } from '.';

// TODO explain here in a jsdoc that the dev can get the raw args using argDataRaw
export function inspectMessage<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
): void {
    decoratorArgumentsHandler('inspectMessage', originalMethod, context);
}

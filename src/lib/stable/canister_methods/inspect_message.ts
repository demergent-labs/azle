import { decoratorArgumentsHandler, MethodType } from '.';

// TODO explain here in a jsdoc that the dev can get the raw args using argDataRaw
export function inspectMessage<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext
): MethodType<This, Args, Return> {
    return decoratorArgumentsHandler('inspectMessage', originalMethod, context);
}

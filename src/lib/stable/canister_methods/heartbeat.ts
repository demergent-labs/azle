import { decoratorArgumentsHandler, MethodType } from '.';

export function heartbeat<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext
): MethodType<This, Args, Return> {
    return decoratorArgumentsHandler('heartbeat', originalMethod, context);
}

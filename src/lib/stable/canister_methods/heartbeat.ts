import { decoratorArgumentsHandler, MethodType } from '.';

export function heartbeat<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext
): void {
    decoratorArgumentsHandler('heartbeat', originalMethod, context);
}

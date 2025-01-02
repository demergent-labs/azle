import { decoratorArgumentsHandler, MethodType } from '.';

export function heartbeat<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
): void {
    decoratorArgumentsHandler('heartbeat', originalMethod, context);
}

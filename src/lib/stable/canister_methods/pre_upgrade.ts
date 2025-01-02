import { decoratorArgumentsHandler, MethodType } from '.';

export function preUpgrade<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
): void {
    decoratorArgumentsHandler('preUpgrade', originalMethod, context);
}

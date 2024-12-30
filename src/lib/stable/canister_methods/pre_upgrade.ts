import { decoratorArgumentsHandler, MethodType } from '.';

export function preUpgrade<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext
): void {
    decoratorArgumentsHandler('preUpgrade', originalMethod, context);
}

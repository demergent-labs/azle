import { decoratorArgumentsHandler, MethodType } from '.';

export function preUpgrade<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext
): MethodType<This, Args, Return> {
    return decoratorArgumentsHandler('preUpgrade', originalMethod, context);
}

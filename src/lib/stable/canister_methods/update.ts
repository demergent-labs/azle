import { IDL } from '@dfinity/candid';

import {
    decoratorArgumentsHandler,
    DecoratorFunction,
    ExportedCanisterClass,
    MethodType
} from '.';

/**
 * Decorator to mark a method as an update call entry point.
 * Update calls are read-write and inherit latency from ICP consensus.
 */
export function update<This, Args extends any[], Return>(
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
): MethodType<ExportedCanisterClass, Args, Return>;

/**
 * Decorator to mark a method as an update call entry point.
 * Update calls are read-write and inherit latency from ICP consensus.
 *
 * @param paramIdlTypes - Optional array of Candid IDL types for the method parameters. The runtime arguments will be decoded using these types.
 * @param returnIdlType - Optional Candid IDL type for the method return value. The runtime return value will be encoded using this type.
 * @param options - Optional configuration object
 * @param options.manual - Optional flag to indicate manual handling of the method's runtime return value. This is meant to be used with `reply`, skipping automatic Candid encoding of the runtime return value.
 */
export function update<This, Args extends any[], Return>(
    paramIdlTypes?: IDL.Type[],
    returnIdlType?: IDL.Type,
    options?: {
        manual?: boolean;
    }
): (
    originalMethod: MethodType<This, Args, Return>,
    context: ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
) => MethodType<ExportedCanisterClass, Args, Return>;

export function update<This, Args extends any[], Return>(
    param1?: MethodType<This, Args, Return> | IDL.Type[],
    param2?:
        | ClassMethodDecoratorContext<This, MethodType<This, Args, Return>>
        | IDL.Type,
    param3?: { manual?: boolean }
):
    | MethodType<ExportedCanisterClass, Args, Return>
    | DecoratorFunction<ExportedCanisterClass, Args, Return> {
    return decoratorArgumentsHandler('update', param1, param2, param3);
}

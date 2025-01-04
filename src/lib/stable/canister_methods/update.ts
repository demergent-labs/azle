import { IDL } from '@dfinity/candid';

import {
    Context,
    decoratorArgumentsHandler,
    DecoratorFunction,
    OriginalMethod
} from '.';

export type UpdateOptions = {
    manual?: boolean;
};

/**
 * Decorator to mark a method as an `update` call entry point.
 *
 * @remarks
 *
 * - **State**: read-write
 *
 * - **Replication**: yes
 *
 * - **Async**: yes
 *
 * - **Instruction limit**: [40_000_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits)
 *
 */
export function update<This, Args extends unknown[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void;

/**
 * Decorator to mark a method as an `update` call entry point.
 *
 * @param paramIdlTypes - Optional array of Candid IDL types for the method parameters. The runtime arguments will be decoded using these types.
 * @param returnIdlType - Optional Candid IDL type for the method return value. The runtime return value will be encoded using this type.
 * @param options - Optional configuration object
 * @param options.manual - Optional flag to indicate manual handling of the method's runtime return value. This is meant to be used with `reply` or `reject`, skipping automatic Candid encoding of the runtime return value.
 *
 * @remarks
 *
 * - **State**: read-write
 *
 * - **Replication**: yes
 *
 * - **Async**: yes
 *
 * - **Instruction limit**: [40_000_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits)
 */
export function update<This, Args extends unknown[], Return>(
    paramIdlTypes?: IDL.Type[],
    returnIdlType?: IDL.Type,
    options?: UpdateOptions
): DecoratorFunction<This, Args, Return>;

export function update<This, Args extends unknown[], Return>(
    param1?: OriginalMethod<This, Args, Return> | IDL.Type[],
    param2?: Context<This, Args, Return> | IDL.Type,
    param3?: UpdateOptions
): void | DecoratorFunction<This, Args, Return> {
    return decoratorArgumentsHandler('update', param1, param2, param3);
}

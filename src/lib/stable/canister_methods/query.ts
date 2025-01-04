import { IDL } from '@dfinity/candid';

import {
    Context,
    decoratorArgumentsHandler,
    DecoratorFunction,
    OriginalMethod
} from '.';

export type QueryOptions = {
    composite?: boolean;
    manual?: boolean;
};

/**
 * Decorator to mark a method as a `query` call entry point.
 *
 * @remarks
 *
 * - **State**: read-only
 *
 * - **Replication**: possible
 *
 * - **Async**: yes with `composite` set to true
 *
 * - **Instruction limit**: [5_000_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits)
 *
 */
export function query<This, Args extends unknown[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void;

/**
 * Decorator to mark a method as a `query` call entry point.
 *
 * @remarks
 *
 * - **State**: read-only
 *
 * - **Replication**: possible
 *
 * - **Async**: yes with `composite` set to true
 *
 * - **Instruction limit**: [5_000_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits)
 *
 * @param paramIdlTypes - Optional array of Candid IDL types for the method parameters. The runtime arguments will be decoded using these types.
 * @param returnIdlType - Optional Candid IDL type for the method return value. The runtime return value will be encoded using this type.
 * @param options - Optional configuration object
 * @param options.composite - Optional flag to indicate that the method should be treated as a composite query method capable of some cross-canister query calls.
 * @param options.manual - Optional flag to indicate manual handling of the method's runtime return value. This is meant to be used with `reply`, skipping automatic Candid encoding of the runtime return value.
 */
export function query<This, Args extends unknown[], Return>(
    paramIdlTypes?: IDL.Type[],
    returnIdlType?: IDL.Type,
    options?: QueryOptions
): DecoratorFunction<This, Args, Return>;

export function query<This, Args extends unknown[], Return>(
    param1?: OriginalMethod<This, Args, Return> | IDL.Type[],
    param2?: Context<This, Args, Return> | IDL.Type,
    param3?: QueryOptions
): void | DecoratorFunction<This, Args, Return> {
    return decoratorArgumentsHandler('query', param1, param2, param3);
}

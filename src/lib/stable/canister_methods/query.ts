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
    hidden?: boolean;
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
 * @param paramIdlTypes - Optional array of Candid IDL types for the decorated method parameters. The runtime arguments will be decoded using these types
 * @param returnIdlType - Optional Candid IDL type for the decorated method return value. The runtime return value will be encoded using this type
 * @param options - Optional configuration object
 * @param options.composite - Optional flag to indicate that the decorated method should be treated as a composite query method capable of some cross-canister query calls
 * @param options.manual - Optional flag to indicate manual handling of the decorated method's runtime arguments and return value. This is meant to be used with `msgArgData` and `IDL.decode` for arguments, and `msgReply`/`msgReject` and `IDL.encode` for the return value, skipping automatic Candid decoding of the runtime arguments and encoding of the runtime return value
 * @param options.hidden - Optional flag to indicate that the decorated method should be hidden from the canister's Candid interface
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
 * See [more documentation](https://internetcomputer.org/docs/current/references/ic-interface-spec#http-query).
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

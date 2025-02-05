import { IDL } from '@dfinity/candid';

import {
    Context,
    decoratorArgumentsHandler,
    DecoratorFunction,
    OriginalMethod
} from '.';

export type InitOptions = {
    manual?: boolean;
};

/**
 * Decorator to mark a method as the initialization entry point.
 *
 * @remarks
 *
 * Canister initialization generally happens once per canister lifecycle.
 *
 * Only one `@init` method is allowed per canister.
 *
 * - **State**: read-write
 *
 * - **Replication**: yes
 *
 * - **Async**: no
 *
 * - **Instruction limit**: [300_000_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits)
 *
 * See [more documentation](https://internetcomputer.org/docs/current/references/ic-interface-spec#system-api-init).
 */
export function init<This, Args extends unknown[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void;

/**
 * Decorator to mark a method as the initialization entry point.
 *
 * @param paramIdlTypes - Optional array of Candid IDL types for the decorated method parameters. The runtime arguments will be decoded using these types
 * @param options - Optional configuration object
 * @param options.manual - Optional flag to indicate manual handling of the decorated method's runtime arguments. This is meant to be used with `msgArgData` and `IDL.decode`, skipping automatic Candid decoding of the runtime arguments
 *
 * @remarks
 *
 * Canister initialization generally happens once per canister lifecycle.
 *
 * Only one `@init` method is allowed per canister.
 *
 * - **State**: read-write
 *
 * - **Replication**: yes
 *
 * - **Async**: no
 *
 * - **Instruction limit**: [300_000_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits)
 *
 * See [more documentation](https://internetcomputer.org/docs/current/references/ic-interface-spec#system-api-init).
 */
export function init<This, Args extends unknown[], Return>(
    paramIdlTypes?: IDL.Type[],
    options?: InitOptions
): DecoratorFunction<This, Args, Return>;

export function init<This, Args extends unknown[], Return>(
    param1?: OriginalMethod<This, Args, Return> | IDL.Type[],
    param2?: Context<This, Args, Return> | InitOptions
): void | DecoratorFunction<This, Args, Return> {
    return decoratorArgumentsHandler('init', param1, param2);
}

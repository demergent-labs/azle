import { IDL } from '@dfinity/candid';

import {
    Context,
    decoratorArgumentsHandler,
    DecoratorFunction,
    OriginalMethod
} from '.';

/**
 * Decorator to mark a method as the initialization entry point.
 *
 * @remarks
 *
 * Canister initialization generally happens once per canister lifecycle.
 *
 * Only one `init` method is allowed per canister.
 *
 * - **State**: read-write
 *
 * - **Replication**: yes
 *
 * - **Async**: no
 *
 * - **Instruction limit**: [300_000_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits)
 */
export function init<This, Args extends unknown[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void;

/**
 * Decorator to mark a method as the initialization entry point.
 *
 * @param paramIdlTypes - Optional array of Candid IDL types for the method parameters. The runtime arguments will be decoded using these types.
 *
 * @remarks
 *
 * Canister initialization generally happens once per canister lifecycle.
 *
 * Only one initialization method is allowed per canister.
 *
 * - **State**: read-write
 *
 * - **Replication**: yes
 *
 * - **Async**: no
 *
 * - **Instruction limit**: [300_000_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits)
 */
export function init<This, Args extends unknown[], Return>(
    paramIdlTypes?: IDL.Type[]
): DecoratorFunction<This, Args, Return>;

export function init<This, Args extends unknown[], Return>(
    param1?: OriginalMethod<This, Args, Return> | IDL.Type[],
    param2?: Context<This, Args, Return>
): void | DecoratorFunction<This, Args, Return> {
    return decoratorArgumentsHandler('init', param1, param2);
}

import { IDL } from '@dfinity/candid';

import {
    Context,
    decoratorArgumentsHandler,
    DecoratorFunction,
    OriginalMethod
} from '.';

/**
 * Decorator to mark a method as the `postUpgrade` entry point.
 *
 * @remarks
 *
 * Canister upgrades can be performed multiple times per canister lifecycle.
 *
 * By default canister upgrades erase the canister's heap memory.
 *
 * Only one `postUpgrade` method is allowed per canister.
 *
 * - **State**: read-write
 *
 * - **Replication**: yes
 *
 * - **Async**: no
 *
 * - **Instruction limit**: [300_000_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits) (shared with `preUpgrade`)
 */
export function postUpgrade<This, Args extends unknown[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void;

/**
 * Decorator to mark a method as the `postUpgrade` entry point.
 *
 * @param paramIdlTypes - Optional array of Candid IDL types for the method parameters. The runtime arguments will be decoded using these types.
 *
 * @remarks
 *
 * Canister upgrades can be performed multiple times per canister lifecycle.
 *
 * By default canister upgrades erase the canister's heap memory.
 *
 * Only one `postUpgrade` method is allowed per canister.
 *
 * - **State**: read-write
 *
 * - **Replication**: yes
 *
 * - **Async**: no
 *
 * - **Instruction limit**: [300_000_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits) (shared with `preUpgrade`)
 */
export function postUpgrade<This, Args extends unknown[], Return>(
    paramIdlTypes?: IDL.Type[]
): DecoratorFunction<This, Args, Return>;

export function postUpgrade<This, Args extends unknown[], Return>(
    param1?: OriginalMethod<This, Args, Return> | IDL.Type[],
    param2?: Context<This, Args, Return>
): void | DecoratorFunction<This, Args, Return> {
    return decoratorArgumentsHandler('postUpgrade', param1, param2);
}

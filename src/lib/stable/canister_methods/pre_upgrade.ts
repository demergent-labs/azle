import { Context, decoratorArgumentsHandler, OriginalMethod } from '.';

/**
 * Decorator to mark a method as the `preUpgrade` entry point.
 *
 * @remarks
 *
 * The `preUpgrade` method will be called just before the canister is upgraded.
 *
 * Only one `preUpgrade` method is allowed per canister.
 *
 * - **State**: read-write
 *
 * - **Replication**: yes
 *
 * - **Async**: no
 *
 * - **Instruction limit**: [300_000_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits) (shared with `postUpgrade`)
 */
export function preUpgrade<This, Args extends unknown[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void {
    decoratorArgumentsHandler('preUpgrade', originalMethod, context);
}

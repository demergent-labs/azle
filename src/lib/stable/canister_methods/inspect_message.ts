import { Context, decoratorArgumentsHandler, OriginalMethod } from '.';

/**
 * Decorator to mark a method as the `inspectMessage` entry point.
 *
 * @remarks
 *
 * The `inspectMessage` entry point will be called just before a call to an `update` entry point.
 *
 * Arguments to the `update` entry point can be accessed using `argDataRaw`.
 *
 * Only one `inspectMessage` method is allowed per canister.
 *
 * - **State**: read-only
 *
 * - **Replication**: None
 *
 * - **Async**: No
 *
 * - **Instruction limit**: [200_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits)
 *
 * See [more documentation](https://internetcomputer.org/docs/current/references/ic-interface-spec#system-api-inspect-message).
 */
export function inspectMessage<This, Args extends unknown[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void {
    decoratorArgumentsHandler('inspectMessage', originalMethod, context);
}

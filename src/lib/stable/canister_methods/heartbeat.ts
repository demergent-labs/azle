import { Context, decoratorArgumentsHandler, OriginalMethod } from '.';

/**
 * Decorator to mark a method as the `heartbeat` entry point.
 *
 * @remarks
 *
 * It is advised to use `setTimer` and `setTimerInterval` instead of the `heartbeat` method.
 *
 * The `heartbeat` entry point will be called periodically by the IC (~every second or so).
 *
 * Only one `heartbeat` method is allowed per canister.
 *
 * - **State**: read-write
 *
 * - **Replication**: Yes
 *
 * - **Async**: Yes
 *
 * - **Instruction limit**: [40_000_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits)
 */
export function heartbeat<This, Args extends unknown[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void {
    decoratorArgumentsHandler('heartbeat', originalMethod, context);
}

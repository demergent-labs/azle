import { Context, decoratorArgumentsHandler, OriginalMethod } from '.';

/**
 * Decorator to mark a method as the `onLowWasmMemory` entry point.
 *
 * @remarks
 *
 * The `onLowWasmMemory` entry point will be called when the canister is running low on Wasm memory.
 * This is a system method that allows canisters to handle low memory conditions gracefully.
 *
 * Only one `onLowWasmMemory` method is allowed per canister.
 *
 * // TODO: verify the below info when onLowWasmMemory is fully supported on the IC (see https://forum.dfinity.org/t/how-to-verify-wasm-memory-threshold-is-set-correctly/40670)
 * - **State**: read-write
 *
 * - **Replication**: yes
 *
 * - **Async**: yes
 *
 * - **Instruction limit**: [40_000_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits)
 */
export function onLowWasmMemory<This, Args extends unknown[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void {
    decoratorArgumentsHandler('onLowWasmMemory', originalMethod, context);
}

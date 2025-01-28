import { Context, decoratorArgumentsHandler, OriginalMethod } from '.';

/**
 * Decorator to mark a method as the `onLowWasmMemory` entry point.
 *
 * @remarks
 *
 * The `onLowWasmMemory` entry point will be called when the canister is running low on WASM memory.
 * This is a system method that allows canisters to handle low memory conditions gracefully.
 *
 * Only one `onLowWasmMemory` method is allowed per canister.
 *
 * - **State**: read-write
 *
 * - **Replication**: None // TODO: verify this
 *
 * - **Async**: No // TODO: verify this
 *
 * - **Instruction limit**: [200_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits) // TODO: verify this
 *
 * See [more documentation](https://docs.rs/ic-cdk/0.17.1/ic_cdk/attr.on_low_wasm_memory.html).
 */
export function onLowWasmMemory<This, Args extends unknown[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void {
    decoratorArgumentsHandler('onLowWasmMemory', originalMethod, context);
}

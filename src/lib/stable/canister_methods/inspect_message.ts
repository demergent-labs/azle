import {
    Context,
    decoratorArgumentsHandler,
    DecoratorFunction,
    OriginalMethod
} from '.';

export type InspectMessageOptions = {
    manual?: boolean;
};

/**
 * Decorator to mark a method as the `inspectMessage` entry point.
 *
 * @remarks
 *
 * The `inspectMessage` entry point will be called just before a call to an `update` entry point.
 *
 * The `methodName` of the `update` entry point can be accessed from the first parameter to the decorated method.
 *
 * The arguments to the `update` entry point can be accessed from the rest of the parameters to the decorated method.
 *
 * Returning true allows the inspected `update` entry point to proceed. Returning anything else will block the `update` entry point from proceeding.
 *
 * Only one `@inspectMessage` method is allowed per canister.
 *
 * - **State**: read-only
 *
 * - **Replication**: none
 *
 * - **Async**: no
 *
 * - **Instruction limit**: [200_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits)
 *
 * See [more documentation](https://internetcomputer.org/docs/current/references/ic-interface-spec#system-api-inspect-message).
 */
export function inspectMessage<This, Args extends unknown[], Return>(
    originalMethod: OriginalMethod<This, Args, Return>,
    context: Context<This, Args, Return>
): void;

/**
 * Decorator to mark a method as the `inspectMessage` entry point.
 *
 * @param options - Optional configuration object
 * @param options.manual - Optional flag to indicate manual handling of the method name and runtime arguments of the targeted `update` entry point. This is meant to be used with `msgMethodName`, `msgArgData`, and `IDL.decode`, skipping automatic decoding
 *
 * @remarks
 *
 * The `inspectMessage` entry point will be called just before a call to an `update` entry point.
 *
 * The `methodName` of the `update` entry point can be accessed from the first parameter to the decorated method.
 *
 * The arguments to the `update` entry point can be accessed from the rest of the parameters to the decorated method.
 *
 * Returning true allows the inspected `update` entry point to proceed. Returning anything else will block the `update` entry point from proceeding.
 *
 * Only one `@inspectMessage` method is allowed per canister.
 *
 * - **State**: read-only
 *
 * - **Replication**: none
 *
 * - **Async**: no
 *
 * - **Instruction limit**: [200_000_000](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits)
 *
 * See [more documentation](https://internetcomputer.org/docs/current/references/ic-interface-spec#system-api-inspect-message).
 */
export function inspectMessage<This, Args extends unknown[], Return>(
    options?: InspectMessageOptions
): DecoratorFunction<This, Args, Return>;

export function inspectMessage<This, Args extends unknown[], Return>(
    param1?: OriginalMethod<This, Args, Return> | InspectMessageOptions,
    param2?: Context<This, Args, Return>
): void | DecoratorFunction<This, Args, Return> {
    return decoratorArgumentsHandler('inspectMessage', param1, param2);
}

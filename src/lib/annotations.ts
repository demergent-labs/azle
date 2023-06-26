// Some JS docs licensed under:
//
// - https://github.com/dfinity/cdk-rs/blob/main/LICENSE
// - https://github.com/dfinity/interface-spec/blob/master/LICENSE
//
// Some documentation changed from original work.

import { GuardResult } from './results';
import { ic } from './ic';

/**
 * Configuration options for canister methods
 *
 * @param guard - an optional guard function to be executed before the canister
 * method. When the guard function returns an error, the canister method will
 * not proceed.
 */
export type CanisterMethodOptions = { guard?: () => GuardResult };

/**
 * Marks the subsequent exported function as a "heartbeat" system canister method.
 * {@link $heartbeat} is called with every "tick" of the internet computer and
 * can be use for periodic or time-based execution.
 *
 * {@link $heartbeat} is triggered by the IC, and therefore has no arguments,
 * no caller, and cannot reply or reject.
 *
 * The annotated function should take no parameters and should have a return
 * type of `void`. It may be sync or async.
 *
 * @example
 * ```ts
 * import { $heartbeat, match } from 'azle';
 * import { managementCanister } from 'azle/canisters/management';
 *
 * $heartbeat;
 * export async function heartbeat(): Promise<void> {
 *     const randomnessResult = await managementCanister.raw_rand().call();
 *
 *     match(randomnessResult, {
 *         Ok: (randomness) => {
 *             console.log('heartbeat initialized', randomness.length);
 *         },
 *         Err: () => {}
 *     });
 * }
 * ```
 */
export const $heartbeat = (options?: CanisterMethodOptions) => {};

/**
 * Marks the subsequent exported function as an "init" system canister method.
 * {@link $init} is called on the very first deploy and can be used to set up
 * initial state and invariants.
 *
 * The annotated function may take zero or more parameters (must match
 * {@link $postUpgrade} if present) and should have a return type of `void`.
 *
 * @example
 * ```ts
 * import { blob, $init, Opt, Record } from 'azle';
 *
 * type State = Record<{
 *     data: blob;
 * }>;
 *
 * let state: Opt<State> = Opt.None;
 *
 * $init;
 * export function init(initialState: State): void {
 *     state = Opt.Some(initialState);
 * }
 * ```
 */
export const $init = () => {}; // TODO: See https://github.com/demergent-labs/azle/issues/954

/**
 * Marks the subsequent exported function as an "inspect-message" system
 * canister method. {@link $inspectMessage} is called before all ingress
 * messages and can be used for access control.
 *
 * To accept the message call {@link ic.acceptMessage}. This function traps if
 * invoked twice. If the canister traps in {@link $inspectMessage} or does not
 * call {@link ic.acceptMessage}, then the access is denied.
 *
 * The annotated function should take no parameters and should have a return
 * type of `void`.
 *
 * @example
 * ```ts
 * $inspectMessage;
 * export function controlAccess(): void {
 *   if (ic.methodName() === 'accessible') {
 *     ic.acceptMessage();
 *     return;
 *   }
 *
 *   if (ic.methodName() === 'inaccessible') {
 *     return;
 *   }
 *
 *   throw `Method "${ic.methodName()}" not allowed`;
 * }
 * ```
 */
export const $inspectMessage = (options?: CanisterMethodOptions) => {};

/**
 * Marks the subsequent exported function as a "post-upgrade" system canister
 * method. {@link $postUpgrade} is called after every deploy (except the initial
 * deploy) and can be used to restore data from stable memory after the new code
 * has been installed.
 *
 * The annotated function should take no parameters and should have a return
 * type of `void`.
 *
 * @example
 * ```ts
 * $postUpgrade;
 * export function restoreData(): void {
 *   // Move data from stable memory or initialize state
 * }
 * ```
 */
export const $postUpgrade = () => {}; // TODO: See https://github.com/demergent-labs/azle/issues/954

/**
 * Marks the subsequent exported function as a "pre-upgrade" system canister
 * method. {@link $preUpgrade} is called after every deploy (except the initial
 * deploy) and is used to perform cleanup tasks and move data to stable memory before
 * it gets wiped during the upgrade.
 *
 * The annotated function should have zero or more parameters (must match
 * {@link $init} if present) and should have a return type of `void`.
 *
 * @example
 * ```ts
 * $preUpgrade;
 * export function migrateData(): void {
 *   // Move data to stable memory or clean it up
 * }
 * ```
 */
export const $preUpgrade = (options?: CanisterMethodOptions) => {};

/**
 * Marks the subsequent exported function as a "query" canister method. Query
 * methods do not pass through consensus and state mutations are discarded.
 *
 * @example
 * ```ts
 * $query;
 * export function getMessage(): string {
 *   return "Hello World";
 * }
 * ```
 */
export const $query = (options?: CanisterMethodOptions) => {};

/**
 * Marks the subsequent exported function as an "update" canister method. Update
 * methods pass through consensus and state mutations are preserved.
 *
 * @example
 * ```ts
 * $update;
 * export function updateMessage(newMessage: string): bool {
 *   state = newMessage;
 *   return true;
 * }
 * ```
 */
export const $update = (options?: CanisterMethodOptions) => {};

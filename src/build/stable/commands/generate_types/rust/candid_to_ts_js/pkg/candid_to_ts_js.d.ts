/* tslint:disable */
/* eslint-disable */
/**
 * Converts a Candid service string to its corresponding TypeScript types and JavaScript IDL types.
 *
 * These types can be used with `@query`/`@update`/other method decorators and for inter-canister calls using the `call` function.
 *
 * # Parameters
 *
 * * `candid` - A string containing a valid Candid service definition
 *
 * # Returns
 *
 * TypeScript types and JavaScript IDL types as a string on success,
 * or an error message if parsing or compilation fails
 * ```
 */
export function candid_to_ts_js(candid: string): any;

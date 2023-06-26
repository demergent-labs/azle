// Some JS docs licensed under:
//
// - https://github.com/dfinity/cdk-rs/blob/main/LICENSE
// - https://github.com/dfinity/interface-spec/blob/master/LICENSE
// - https://github.com/dfinity/portal/blob/master/LICENSE
//
// Some documentation changed from original work.

import { Principal, Service } from './';
import { CallResult } from '../results';

/**
 * An alias of a `[Principal, string]` tuple that represents a reference to a
 * {@link Service} method. At runtime it is an array with two values:
 *
 * - the principal of the {@link Service} where the method is
 * defined
 * - the name of the method
 *
 * See https://internetcomputer.org/docs/current/references/candid-ref#type-func---
 *
 * @typeParam Mode - the mode in which to call the referenced {@link Service}
 * method. Its type param specifies the signature of the method. Mode must be one of:
 *
 * - {@link Query}
 * - {@link Update}
 * - {@link Oneway}
 *
 * @example
 * The following Func declaration:
 * ```ts
 * type CanisterMethod = Func<Query<(param: string) => string>>;
 * ```
 * corresponds to this Candid service method definition:
 * ```candid
 * service: {
 *   canisterMethod : (text) -> (text) query;
 * }
 * ```
 */
export type Func<
    Mode extends
        | Query<FuncSignature>
        | Update<FuncSignature>
        | Oneway<FuncSignature>
> = [Principal, string];

/**
 * Indicates that the {@link Func} will be called in query mode
 *
 * @typeParam FuncSignature - the signature of the {@link Service} method
 *
 * @example
 * The following Func declaration:
 * ```ts
 * type CanisterMethod = Func<Query<(param: string) => string>>;
 * ```
 * corresponds to this Candid service method definition:
 * ```candid
 * service: {
 *   canisterMethod : (text) -> (text) query;
 * }
 * ```
 * and will produce this func Candid definition:
 * ```candid
 * type CanisterMethod = func (text) -> (text) query;
 * ```
 */
export type Query<FuncSignature extends (...args: any[]) => any> = [
    Principal,
    string
];

/**
 * Indicates that the {@link Func} will be called in update mode
 *
 * @typeParam FuncSignature - the signature of the {@link Service} method
 *
 * @example
 * The following Func declaration:
 * ```ts
 * type CanisterMethod = Func<Update<(param: string) => string>>;
 * ```
 * corresponds to this Candid service method definition:
 * ```candid
 * service: {
 *   canisterMethod : (text) -> (text);
 * }
 * ```
 * and will produce this func Candid definition:
 * ```candid
 * type CanisterMethod = func (text) -> (text);
 * ```
 */
export type Update<FuncSignature extends (...args: any[]) => any> = [
    Principal,
    string
];

/**
 * Indicates that calls to the {@link Func} should not be awaited. Intended to
 * be used with {@link CallResult.notify}.
 *
 * @typeParam FuncSignature - the signature of the {@link Service} method
 *
 * @example
 * The following Func declaration:
 * ```ts
 * type CanisterMethod = Func<Oneway<(param: string) => string>>;
 * ```
 * corresponds to this Candid service method definition:
 * ```candid
 * service: {
 *   canisterMethod : (text) -> (text);
 * }
 * ```
 * and will produce this func Candid definition:
 * ```candid
 * type CanisterMethod = func (text) -> (text) oneway;
 * ```
 */
export type Oneway<FuncSignature extends (...args: any[]) => any> = [
    Principal,
    string
];

/** Describes the parameter types and return value of the {@link Func} */
export type FuncSignature = (...args: any[]) => any;

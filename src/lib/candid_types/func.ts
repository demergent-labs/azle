import { Principal, Service } from './';

/**
 * Represents a reference to a {@link Service} method. The type param specifies
 * the functional signature of the method but under the hood it is really just
 * an array with two values:
 *
 * - the principal of the {@link Service} where the method is
 * defined
 * - the name of the method.
 *
 * See https://internetcomputer.org/docs/current/references/candid-ref#type-func---
 *
 * @typeParam Mode - the mode in which to call the referenced {@link Service}
 * method. Must be one of:
 *
 * - {@link Query}
 * - {@link Update}
 * - {@link Oneway}
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
 */
export type Query<FuncSignature extends (...args: any[]) => any> = [
    Principal,
    string
];

/**
 * Indicates that the {@link Func} will be called in update mode
 *
 * @typeParam FuncSignature - the signature of the {@link Service} method
 */
export type Update<FuncSignature extends (...args: any[]) => any> = [
    Principal,
    string
];

/**
 * Indicates that the call to the {@link Func} will be oneway
 *
 * @typeParam FuncSignature - the signature of the {@link Service} method
 */
export type Oneway<FuncSignature extends (...args: any[]) => any> = [
    Principal,
    string
];

/** Describes the parameter types and return value of the {@link Func} */
export type FuncSignature = (...args: any[]) => any;

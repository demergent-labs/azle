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
 * @typeParam T - the signature of the referenced {@link Service} method. Must
 * be one of:
 *
 * - {@link Query}
 * - {@link Update}
 * - {@link Oneway}
 */
export type Func<T extends Mode> = T;

export type ServiceMethod = (...args: any[]) => any;

export type Query<T extends ServiceMethod> = [Principal, string];
export type Update<T extends ServiceMethod> = [Principal, string];
export type Oneway<T extends ServiceMethod> = [Principal, string];

export type Mode =
    | Query<ServiceMethod>
    | Update<ServiceMethod>
    | Oneway<ServiceMethod>;

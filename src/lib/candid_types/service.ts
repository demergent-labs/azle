import { nat, nat64, Principal } from './';
import { ic } from '../ic';

/**
 * Parent class for creating Service definitions. To create an service
 * extend this class.
 * @example
 * ```ts
 * export class SomeOtherCanister extends Service {
 *   @query
 *   someCanisterMethod: (someParam: SomeParamType) => CallResult<SomeReturnType>;
 * }
 * ```
 *
 * You can then call a method on that canister like this:
 *
 * ```ts
 * const canister = new SomeOtherCanister(
 *   Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
 * );
 *
 * const result = await canister.someCanisterMethod().call();
 * ```
 */
export class Service {
    canisterId: Principal;

    constructor(canisterId: Principal) {
        this.canisterId = canisterId;
    }
}

/**
 * A decorator for marking query methods on services. Can only be
 * used on class properties with a return type of (args: any[]) =>
 * CallResult<T>.
 *
 * @example
 * ```ts
 * export class SomeOtherCanister extends Service {
 *   @query
 *   someCanisterMethod: (someParam: SomeParamType) => CallResult<SomeReturnType>;
 * }
 * ```
 */
export function serviceQuery(target: any, name: string) {
    serviceMethodDecoration(target, name);
}

/**
 * A decorator for marking update methods on services. Can only be
 * used on class properties with a return type of (args: any[]) =>
 * CallResult<T>.
 *
 * @example
 * ```ts
 * export class SomeOtherCanister extends Service {
 *   @update
 *   someCanisterMethod: (someParam: SomeParamType) => CallResult<SomeReturnType>;
 * }
 * ```
 */
export function serviceUpdate(target: any, name: string) {
    serviceMethodDecoration(target, name);
}

function serviceMethodDecoration(target: any, name: string) {
    Object.defineProperty(target, name, {
        get() {
            return (...args: any[]) => {
                return {
                    call: () => {
                        return (ic as any)[
                            `call_${target.constructor.name}_${name}`
                        ](this.canisterId, args);
                    },
                    notify: () => {
                        return (ic as any)[
                            `notify_${target.constructor.name}_${name}`
                        ](this.canisterId, args);
                    },
                    cycles: (cycles: nat64) => {
                        return {
                            call: () => {
                                return (ic as any)[
                                    `call_with_payment_${target.constructor.name}_${name}`
                                ](this.canisterId, [...args, cycles]);
                            },
                            notify: () => {
                                // There is no notifyWithPayment, there is only a notifyWithPayment128
                                return (ic as any)[
                                    `notify_with_payment128_${target.constructor.name}_${name}`
                                ](this.canisterId, args, cycles);
                            }
                        };
                    },
                    cycles128: (cycles: nat) => {
                        return {
                            notify: () => {
                                // There is no notifyWithPayment, there is only a notifyWithPayment128
                                return (ic as any)[
                                    `notify_with_payment128_${target.constructor.name}_${name}`
                                ](this.canisterId, args, cycles);
                            },
                            call: () => {
                                return (ic as any)[
                                    `call_with_payment128_${target.constructor.name}_${name}`
                                ](this.canisterId, [...args, cycles]);
                            }
                        };
                    }
                };
            };
        }
    });
}

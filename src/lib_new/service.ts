import { ic, IDL, Principal } from './index';
import {
    CandidClass,
    toParamCandidClasses,
    toReturnCandidClass
} from './utils';

type Constructor<T = {}> = new (...args: any[]) => T;

// TODO allow turning this into an IDL
export class Service {
    canisterId: Principal;

    [key: string]: any;

    constructor(canisterId: Principal) {
        this.canisterId = canisterId;

        // This sets the context (this) correctly for
        // ic.call, ic.call128, and ic.notify
        const proto = Object.getPrototypeOf(this);
        Object.getOwnPropertyNames(proto)
            .filter(
                (name) =>
                    typeof proto[name] === 'function' && name !== 'constructor'
            )
            .forEach((name) => {
                this[name] = this[name].bind(this);
            });
    }

    static create<T extends Constructor>(
        this: T,
        props: { canisterId: Principal }
    ): InstanceType<T> {
        return new this(props) as InstanceType<T>;
    }
}

export function serviceDecorator(
    target: any,
    key: string,
    paramsIdls: any[],
    returnIdl: CandidClass
) {
    // This must remain a function and not an arrow function
    // in order to set the context (this) correctly
    target[key] = async function (
        notify: boolean,
        callFunction:
            | typeof ic.callRaw
            | typeof ic.callRaw128
            | typeof ic.notifyRaw,
        cycles: bigint,
        ...args: any[]
    ) {
        const encodedArgs = new Uint8Array(
            IDL.encode(toParamCandidClasses(paramsIdls), args)
        );

        if (notify) {
            try {
                return callFunction(this.canisterId, key, encodedArgs, cycles);
            } catch (error) {
                throw error;
            }
        } else {
            const encodedResult = await callFunction(
                this.canisterId,
                key,
                encodedArgs,
                cycles
            );

            const returnIdls = toReturnCandidClass(returnIdl);
            const decodedResult = IDL.decode(returnIdls, encodedResult)[0];

            return decodedResult;
        }
    };
}
